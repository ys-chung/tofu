import fs from "node:fs"
import { z } from "zod"

export async function privateFiles() {
  const prepJson = z
    .object({
      files: z.array(
        z.object({
          location: z.string(),
          base64: z.string()
        })
      )
    })
    .parse(await(await fetch(process.env.PREP_URL ?? "")).json())

  console.log("Downloaded prep json")

  prepJson.files.forEach(({ location, base64 }) => {
    fs.mkdirSync(location.replace(/\/(?:.(?!\/))+$/, ""), { recursive: true })
    fs.writeFileSync(location, Buffer.from(base64, "base64"))
    console.log("Written", location)
  })
}
