#!/usr/local/bin/node

import path from "path"
import { copyDir, rmrf } from "../../utils/fileutils.js"

async function main() {
  const projectRoot = path.resolve("../../../")
  const src = path.join(projectRoot, "packages/zhi-core/src")
  const dest = "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi"
  const cssPath = path.join(projectRoot, "packages/zhi-core/src", "style", "/**/*.css")

  // 删除临时 css
  await rmrf(cssPath)

  // 复制文件
  await copyDir(src, dest)
}

;(async () => {
  await main()
})()
