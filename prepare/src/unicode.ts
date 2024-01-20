import fs from "node:fs"

const ranges = [
  { lower: "4E00", upper: "9FFF" },
  { lower: "3400", upper: "4DBF" },
  { lower: "20000", upper: "2A6DF" },
  { lower: "2A700", upper: "2B73F" },
  { lower: "2B740", upper: "2B81F" },
  { lower: "2B820", upper: "2CEAF" },
  { lower: "2CEB0", upper: "2EBEF" },
  { lower: "30000", upper: "3134F" },
  { lower: "31350", upper: "323AF" },
  { lower: "2EBF0", upper: "2EE5F" },
  { lower: "2E80", upper: "2EFF" },
  { lower: "2F00", upper: "2FDF" },
  { lower: "2FF0", upper: "2FFF" },
  { lower: "3000", upper: "303F" },
  { lower: "31C0", upper: "31EF" },
  { lower: "3200", upper: "32FF" },
  { lower: "3300", upper: "33FF" },
  { lower: "F900", upper: "FAFF" },
  { lower: "FE30", upper: "FE4F" },
  { lower: "1F200", upper: "1F2FF" },
  { lower: "2F800", upper: "2FA1F" }
].map(({ lower, upper }) => ({
  lower: parseInt(lower, 16),
  upper: parseInt(upper, 16)
}))

function hexToChar(t: string) {
  return t
    .split(" ")
    .map((h) => String.fromCodePoint(parseInt(h, 16)))
    .join("")
}

function putIntoMap(map: Map<string, string[]>, key: string, content: string) {
  const currentContent = map.has(key) ? map.get(key) ?? [] : []
  map.set(key, [...currentContent, content])
}

export async function unicode() {
  const confusablesText = await (
    await fetch("http://www.unicode.org/Public/security/latest/confusables.txt")
  ).text()

  const confusablesLines = confusablesText
    .split("\n")
    .filter((e) => e !== "" && !e.startsWith("#"))

  const confusableTuples = confusablesLines.map((line) => {
    const [lhs, rhs] = line.split(";")
    return [lhs.trim(), rhs.trim()]
  })

  const wantedTuples = confusableTuples.filter((tuple) => {
    const hexArr = tuple
      .map((chars) => chars.split(" "))
      .flat()
      .map((h) => parseInt(h, 16))

    const elWithinRange = hexArr.find((n) => {
      const r = ranges.find((range) => range.lower <= n && range.upper >= n)
      return !!r
    })

    return !(elWithinRange === undefined)
  })

  const unicodeTuples = wantedTuples.map((tuple) =>
    tuple.map((e) => hexToChar(e))
  )

  const map = new Map<string, string[]>()

  for (const [lhs, rhs] of unicodeTuples) {
    putIntoMap(map, lhs, rhs)
    putIntoMap(map, rhs, lhs)

    // TODO: pool characters together
  }

  fs.writeFileSync(
    "./src/components/alternatives/altdata.ts",
    `export const data: Map<string, string[]> = new Map(${JSON.stringify(Array.from(map.entries()))})`
  )
}
