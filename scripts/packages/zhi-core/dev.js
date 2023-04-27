#!/usr/local/bin/node

import path from "path"
import { copyDir } from "../../utils/fileutils.js"
import fs from "fs-extra"

async function main() {
  // const projectRoot = path.resolve("../../../")
  const projectRoot = ""
  const src = path.join(projectRoot, "dist/packages/zhi-core/src")
  const dest = "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi"

  // 复制文件
  // src
  await copyDir(src, dest)
  // package.json
  const pkgJsonDest = path.join(
    "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/data/storage/zhi",
    "package.json"
  )
  fs.copyFileSync(path.join(projectRoot, "dist/packages/zhi-core/package.json"), pkgJsonDest)
}

;(async () => {
  await main()
})()
