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

import fs from "fs"
import path from "path"
import ZhiServerInfraUtil from "../util/ZhiServerInfraUtil"
import crypto from "crypto"

interface PackageJson {
  name: string
  version: string
  description?: string
  main?: string
  scripts?: Record<string, string>
  keywords?: string[]
  author?: string
  license?: string
  dependencies?: Record<string, string>
}

interface Dependencies {
  [key: string]: string
}

const logger = ZhiServerInfraUtil.zhiLog("package-helper")

export function createPackageJson(
  name: string,
  version: string,
  dependencies: Record<string, string>,
  filePath?: string
): void {
  const packageJson: PackageJson = {
    name: name,
    version: version,
    description: "npm store for zhi",
    keywords: ["zhi", "app"],
    author: "terwer",
    license: "GPL",
    dependencies: dependencies,
  }

  if (!filePath) {
    filePath = path.join(process.cwd(), "package.json")
  }

  const data = JSON.stringify(packageJson, null, 2)

  fs.writeFileSync(filePath, data)
  logger.info(`package.json created successfully at ${filePath}!`)
}

export function updatePackageJson(depsFilePath?: string, packageJsonFilePath?: string): boolean {
  if (!depsFilePath) {
    depsFilePath = path.join(process.cwd(), "deps.json")
  }
  if (!packageJsonFilePath) {
    packageJsonFilePath = path.join(process.cwd(), "package.json")
  }

  const depsString = fs.readFileSync(depsFilePath).toString()
  const hash = crypto.createHash("sha256").update(depsString).digest("hex")

  const hashFilePath = path.join(path.dirname(packageJsonFilePath), ".deps-hash")
  let oldHash: string
  try {
    oldHash = fs.readFileSync(hashFilePath).toString()
  } catch (err) {
    oldHash = ""
  }

  if (oldHash === hash) {
    logger.info(`deps.json hasn't changed since last update, skipping...`)
    return false
  }

  fs.writeFileSync(hashFilePath, hash)

  const packageJsonString = fs.readFileSync(packageJsonFilePath).toString()
  const packageJson: PackageJson = JSON.parse(packageJsonString)

  const deps: Dependencies = JSON.parse(depsString)

  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...deps,
  }

  fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJson, null, 2))
  logger.info(`dependencies updated successfully at ${packageJsonFilePath}`)

  return true
}
