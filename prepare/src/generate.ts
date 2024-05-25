import fs from "node:fs"

const list = fs
  .readdirSync("./src/private", {
    recursive: true,
    encoding: "utf8",
    withFileTypes: true
  })
  .filter(f => !(f.isDirectory() || f.name.startsWith(".")))

const fileList = list.map(e => ({ location: e.parentPath + "/" + e.name, base64: fs.readFileSync(e.parentPath + "/" + e.name, { encoding: "base64" }) }))

fs.writeFileSync("build.json", JSON.stringify({ files: fileList }, null, 2))