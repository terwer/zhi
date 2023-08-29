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

import CommonGitlabClient from "./commonGitlabClient"
import { describe, it } from "vitest"
import fetch from "cross-fetch"
import { Base64 } from "js-base64"
import { CommonFetchClient } from "zhi-fetch-middleware"

describe("test CommonGitlabClient", () => {
  // appInstance
  const appInstance: any = {}
  appInstance.fetch = fetch
  appInstance.CommonFetchClient = CommonFetchClient

  // const commonGithubClient = new CommonGitlabClient(appInstance, "http://localhost:8002", "", "3", "main")
  const commonGithubClient = new CommonGitlabClient(
    appInstance,
    "http://localhost:8002",
    "",
    "terwer",
    "terwer-github-io",
    "main",
    "auto published by siyuan-plugin-publisher",
    "youweics@163.com",
    "terwer"
  )

  it("test getRepositoryFile", async () => {
    // const result = await commonGithubClient.getRepositoryFile(encodeURIComponent("README.md"))
    const result = await commonGithubClient.getRepositoryFile(
      "docs/001.后端开发/002.开源框架/001.MyBatis/110.JDBC的问题分析.md"
    )
    if (result.content) {
      const content = Base64.fromBase64(result.content)
      console.log("content =>", content)
    } else {
      console.log("no content, result=>", result)
    }
  })

  it("test createRepositoryFile", async () => {
    const result = await commonGithubClient.createRepositoryFile("test.md", "# test")
    if (result.file_path) {
      const file_path = result.file_path
      console.log("file_path =>", file_path)
    } else {
      console.log("create content failed, result=>", result)
    }
  })

  it("test updateRepositoryFile", async () => {
    const result = await commonGithubClient.updateRepositoryFile("test.md", "# test2")
    if (result.file_path) {
      const file_path = result.file_path
      console.log("file_path =>", file_path)
    } else {
      console.log("update content failed, result=>", result)
    }
  })

  it("test deleteRepositoryFile", async () => {
    await commonGithubClient.deleteRepositoryFile("test.md")
  })

  it("test getRepositoryTree", async () => {
    // const result = await commonGithubClient.getRepositoryTree("")
    const result = await commonGithubClient.getRepositoryTree("docs")
    console.log("get repository archive, result=>", result)
  })
})
