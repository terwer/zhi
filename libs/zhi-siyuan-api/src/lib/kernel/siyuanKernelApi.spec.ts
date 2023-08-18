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

import { describe, it } from "vitest"
import SiyuanKernelApi from "./siyuanKernelApi"
import SiyuanConfig from "../config/siyuanConfig"

describe("test SiyuanKernelApi", async () => {
  // lute
  // require(path.join(moduleBase, "libs/zhi-common/public/libs/lute/lute-1.7.5-20230410.min.cjs"))

  it("test siyuanConfig", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.sql("select 1 from blocks limit 1")
    console.log("result=>", result)
  })

  it("test getRootBlocksCount", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.getRootBlocksCount("")
    console.log("result=>", result)
  })

  it("test lsNotebooks", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.lsNotebooks()
    console.log("result=>", result)
  })

  it("test openNotebook", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.openNotebook("20220718062546-2nbmy21")
    console.log("result=>", result)
  })

  it("test closeNotebook", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.closeNotebook("20220718062546-2nbmy21")
    console.log("result=>", result)
  })

  it("test renameNotebook", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.renameNotebook("20220621105123-dlyn6nl", "临时文档")
    console.log("result=>", result)
  })

  it("test createNotebook", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.createNotebook("临时文档3")
    console.log("result=>", result)
  })

  it("test removeNotebook", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.removeNotebook("20230401225851-4zgh677")
    console.log("result=>", result)
  })

  it("test getNotebookConf", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.getNotebookConf("20220621105123-dlyn6nl")
    console.log("result=>", result)
  })

  it("test setNotebookConf", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.setNotebookConf({
      notebook: "20220621105123-dlyn6nl",
      conf: {
        name: "测试笔记本",
        closed: false,
        refCreateSavePath: "",
        createDocNameTemplate: "",
        dailyNoteSavePath: '/daily note/{{now | date "2006/01"}}/{{now | date "2006-01-02"}}',
        dailyNoteTemplatePath: "",
      },
    })
    console.log("result=>", result)
  })

  it("test pushMsg", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.pushMsg({
      msg: "测试消息",
    })
    console.log("result=>", result)
  })

  it("test pushErrMsg", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.pushErrMsg({
      msg: "测试错误消息",
    })
    console.log("result=>", result)
  })

  it("test getRootBlocks", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.getRootBlocks(0, 10, "")
    console.log("result=>", result)
  })

  it("test getFile", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    siyuanConfig.cookie = ""
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.getFile("/data/storage/petal/siyuan-blog/app.config.json", "text")
    console.log("result=>", result)
  })

  it("test getPublicFile", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6807", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.getPublicFile("/public/siyuan-blog/share-type.json")
    console.log("result=>", result)
  })

  it("test isFileExists", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.isFileExists("/data/storage/petal/siyuan-blog/app.config.json", "text")
    console.log("result=>", result)
  })

  it("test removeFile", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.removeFile("/data/storage/petal/siyuan-blog/app.config.json")
    console.log("result=>", result)
  })

  it("test putFile", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const result = await kernelApi.putFile("/data/storage/petal/siyuan-blog/app.config.json", "hello")
    console.log("result=>", result)
  })

  it("test forwardProxy", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const url = "https://www.baidu.com"
    const headers = []
    const result = await kernelApi.forwardProxy(url, headers)
    console.log("result=>", result)
  })

  it("test getBlockKramdown", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const id = "20230731201306-ps6ld6p"
    const result = await kernelApi.getBlockKramdown(id)
    console.log("result=>", result)
  })

  it("test getBlockAttrs", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const id = "20230731201306-ps6ld6p"
    const result = await kernelApi.getBlockAttrs(id)
    console.log("result=>", result)
  })

  it("test getBlockAttr", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const id = "20230722212237-oc9s0y8"
    const key = "custom-categories"
    const result = await kernelApi.getSingleBlockAttr(id, key)
    console.log("result=>", result)
  })

  it("test setBlockAttrs", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const kernelApi = new SiyuanKernelApi(siyuanConfig)
    const id = "20230731201306-ps6ld6p"
    const title = "哈哈哈4"
    const result = await kernelApi.setBlockAttrs(id, {
      title: title,
    })
    console.log("result=>", result)
  })
})
