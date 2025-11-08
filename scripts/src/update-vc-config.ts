import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

const vcConfigPath = join(
  process.cwd(),
  ".vercel/output/functions/_render.func/.vc-config.json"
)

try {
  const config = JSON.parse(readFileSync(vcConfigPath, "utf-8"))
  config.runtime = "bun1.x"
  writeFileSync(
    vcConfigPath,
    JSON.stringify(config, null, "\t") + "\n",
    "utf-8"
  )
  console.log('✓ Updated .vc-config.json runtime to "bun"')
} catch (error) {
  const err = error as Error
  console.error("Error updating .vc-config.json:", err.message)
  process.exit(1)
}
