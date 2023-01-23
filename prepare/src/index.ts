import fs from "node:fs"
import * as dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const prepJson = z
  .object({
    files: z.array(
      z.object({
        location: z.string(),
        base64: z.string()
      })
    )
  })
  .parse(await (await fetch(process.env.PREP_URL ?? "")).json())

prepJson.files.forEach(({ location, base64 }) => {
  fs.mkdirSync(location, { recursive: true })
  fs.writeFileSync(location, Buffer.from(base64, "base64"))
  console.log("Written", location)
})
