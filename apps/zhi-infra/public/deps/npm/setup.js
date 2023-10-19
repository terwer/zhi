/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

const https = require("https")
const fs = require("fs")
const path = require("path")
const child_process = require("child_process")
const os = require("os")

function downloadAndInstallNodeJS(version, installDir) {
  return new Promise((resolve, reject) => {
    const downloadUrl = (() => {
      switch (os.platform()) {
        case "win32":
          return `https://nodejs.org/dist/${version}/node-${version}-win-x64.zip`
        case "darwin":
          return `https://nodejs.org/dist/${version}/node-${version}-darwin-x64.tar.gz`
        case "linux":
          return `https://nodejs.org/dist/${version}/node-${version}-linux-x64.tar.xz`
        default:
          console.error("不支持的操作系统")
          reject(new Error("不支持的操作系统"))
      }
    })()

    if (!fs.existsSync(installDir)) {
      fs.mkdirSync(installDir, { recursive: true })
    }

    const downloadPath = path.join(installDir, `node-${version}.tar.gz`)
    const file = fs.createWriteStream(downloadPath)

    https
      .get(downloadUrl, (response) => {
        response.pipe(file)
        response.on("end", () => {
          console.log("Node.js安装包下载完成")

          if (os.platform() === "win32") {
            const psCommand = `Expand-Archive -Path ${downloadPath} -DestinationPath ${installDir}`
            child_process.execSync(`powershell ${psCommand}`)
          } else {
            const tarCommand = `tar -xzf ${downloadPath} -C ${installDir}`
            child_process.execSync(tarCommand)
          }

          console.log("Node.js安装包解压完成")
          fs.unlinkSync(downloadPath)
          console.log(`Node.js ${version} 已成功安装到 ${installDir}`)
          resolve()
        })
      })
      .on("error", (error) => {
        console.error("下载Node.js安装包时发生错误:", error)
        reject(error)
      })
  })
}

async function installNodeJS() {
  const nodeVersion = "v18.18.2"
  const installDirectory = "/Users/terwer/Downloads/node"

  try {
    await downloadAndInstallNodeJS(nodeVersion, installDirectory)
  } catch (error) {
    console.error("安装Node.js时发生错误:", error)
  }
}

installNodeJS()
