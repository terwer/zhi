#!/usr/local/bin/node

import path from "path"
import { copyDir } from "../../utils/fileutils.js"

async function main() {
  // const projectRoot = path.resolve("../../../")
  const projectRoot = ""
  const src = path.join(projectRoot, "dist/packages/zhi-core/src")
  const dest = "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi"

  // 复制文件
  await copyDir(src, dest)
}

;(async () => {
  await main()
})()
