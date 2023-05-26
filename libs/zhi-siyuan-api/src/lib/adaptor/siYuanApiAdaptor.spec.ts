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

import { describe, expect, it, beforeEach, afterEach } from "vitest"
import SiYuanApiAdaptor from "./siYuanApiAdaptor"
import SiyuanConfig from "../siyuanConfig"
import path from "path"
import { Post } from "zhi-blog-api"
import { MediaObject } from "zhi-blog-api"
import * as fs from "fs"

describe("SiYuanApiAdaptor", async () => {
  // appInstance
  const appInstance: any = {}
  const projectBase = path.resolve(__dirname, "../../..")
  const moduleBase = path.resolve(__dirname, "../../../../..")
  const zhiCommon = (await import(path.join(moduleBase, "libs/zhi-common/dist/index.js"))) as any
  appInstance.zhiCommon = {
    ZhiUtil: zhiCommon["ZhiUtil"],
  }
  // lute
  require(path.join(moduleBase, "libs/zhi-common/public/libs/lute/lute-1.7.5-20230410.min.cjs"))

  beforeEach(async () => {
    console.log("======test is starting...======")
  })

  afterEach(() => {
    console.log("======test is finished.========")
  })

  it("test apiAdaptor", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    expect(apiAdaptor).toBeTruthy()
  })

  it("test siyuan getUsersBlogs", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    const usersBlogs = await apiAdaptor.getUsersBlogs()
    console.log(usersBlogs)
  })

  it("test siyuan getRecentPostsCount", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    const recentPostsCount = await apiAdaptor.getRecentPostsCount()
    console.log(recentPostsCount)
  })

  it("test siyuan getRecentPosts", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    const recentPosts = await apiAdaptor.getRecentPosts(10)
    console.log(recentPosts)
  })

  it("test siyuan newPost", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    siyuanConfig.notebook = "20230506132031-qbtyjdk"
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    const post = new Post()
    post.title = "自动发布的测试标题"
    post.description = "自动发布的测试内容"
    post.mt_keywords = "标签1,标签2"
    post.categories = ["分类1", "分类2"]
    // post.dateCreated = new Date()
    const postid = await apiAdaptor.newPost(post)
    console.log(postid)
  })

  it("test siyuan getPost", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    const postid = "20230526221603-3mgotyw"
    const post = await apiAdaptor.getPost(postid)
    console.log(post)
  })

  it("test siyuan editPost", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    const postid = "20230526221603-3mgotyw"
    const post = new Post()
    post.title = "自动发布的测试标题2"
    post.description = "# 自动发布的测试内容2"
    post.mt_keywords = "标签1,标签2"
    post.categories = ["分类1", "分类2"]
    // post.dateCreated = new Date()
    const data = await apiAdaptor.editPost(postid, post)
    console.log(data)
  })

  it("test siyuan deletePost", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    siyuanConfig.notebook = "20230506132031-qbtyjdk"
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    const postid = "20230526224518-oea9ey7"
    const data = await apiAdaptor.deletePost(postid)
    console.log(data)
  })

  it("test siyuan getCategories", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    const data = await apiAdaptor.getCategories()
    console.log(data)
  })

  it("test siyuan getPreviewUrl", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    siyuanConfig.home = "http://127.0.0.1:6806"
    siyuanConfig.previewUrl = "siyuan://blocks/[postid]"
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    const postid = "20230526221603-3mgotyw"
    const data = await apiAdaptor.getPreviewUrl(postid)
    console.log(data)
  })

  it("test siyuan newMediaObject", async () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const apiAdaptor = new SiYuanApiAdaptor(appInstance, siyuanConfig)

    const url = path.join(projectBase, "./testdata/photo.jpg")
    const file = fs.readFileSync(url)
    const mediaObject = new MediaObject("20220616-132401-001.jpg", "image/jpeg", file)
    const data = await apiAdaptor.newMediaObject(mediaObject)
    console.log(data)
  })
})
