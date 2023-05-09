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
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 解析提交日志并去重
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class ChangelogParser {
  public parseChangelog(): void {
    console.log("start parsing changelog...")

    // make a backup copy of the original file
    const originalFile = path.join(__dirname, "CHANGELOG.md")
    const backupFile = originalFile.replace(".md", "_backup.md")
    fs.copyFileSync(originalFile, backupFile)

    // handle repeat lines
    const fileContents = fs.readFileSync(originalFile, "utf-8")
    const lines = fileContents.split("\n").map((line) => line.trim())
    const uniqueCommits = this.removeSameCommit(lines)

    // save new file
    fs.writeFileSync(originalFile, uniqueCommits.join("\n"), "utf-8")
    console.log(`comment parsed.saved to => ${originalFile}`)
  }

  private removeSameCommit(commitList: string[]): string[] {
    const commitMap = new Map<string, string>()
    for (const line of commitList) {
      let processedLine: string
      if (!line.includes("#")) {
        processedLine = line.toLowerCase()
      } else {
        processedLine = line
      }

      const match = processedLine.match(/(?<=\*\s).*?(?=\()/)
      if (match) {
        const title = match[0].trim()
        commitMap.set(title, line)
      } else {
        const match2 = processedLine.match(/[*] [**](.*)[**] ([^:]+): (.*) \((.*)\)/)
        if (match2) {
          const messageTitle = match2[3].trim()
          commitMap.set(messageTitle, line)
        } else {
          commitMap.set(line, line)
        }
      }
    }

    return Array.from(commitMap.values())
  }
}

const changelogParser = new ChangelogParser()
changelogParser.parseChangelog()
