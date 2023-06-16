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

import { Attachment, BlogApi, CategoryInfo, MediaObject, Post, PostStatusEnum, UserBlog } from "zhi-blog-api"
import SiyuanKernelApi from "../kernel/siyuanKernelApi"
import SiyuanConfig from "../config/siyuanConfig"
import { NotImplementedException, simpleLogger } from "zhi-lib-base"
import { HtmlUtil, StrUtil } from "zhi-common"
import { MarkdownUtil } from "zhi-common-markdown"

/**
 * 思源笔记API适配器
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class SiYuanApiAdaptor extends BlogApi {
  private logger
  private readonly siyuanKernelApi
  private readonly cfg
  private markdownUtil

  /**
   * 初始化思源 API 适配器
   *
   * @param cfg 配置项
   */
  constructor(cfg: SiyuanConfig) {
    super()

    this.cfg = cfg
    this.logger = simpleLogger("zhi-siyuan-api", "siyuan-api-adaptor", false)
    this.siyuanKernelApi = new SiyuanKernelApi(cfg)
    this.markdownUtil = new MarkdownUtil()
  }

  public override async getUsersBlogs(): Promise<Array<UserBlog>> {
    const usersBlogs: UserBlog[] = []
    const userBlog = new UserBlog()

    userBlog.blogid = "siyuan-note"
    userBlog.url = window.location.origin
    userBlog.blogName = "思源笔记"

    usersBlogs.push(userBlog)

    return usersBlogs
  }

  public override async getRecentPostsCount(keyword?: string): Promise<number> {
    return await this.siyuanKernelApi.getRootBlocksCount(keyword ?? "")
  }

  public override async getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>> {
    const result: Post[] = []

    let pg = 0
    if (page) {
      pg = page
    }
    const k = keyword ?? ""
    const siyuanPosts = await this.siyuanKernelApi.getRootBlocks(pg, numOfPosts, k)
    // logUtil.logInfo(siyuanPosts)

    this.logger.debug("getRecentPosts from siyuan, get counts =>", siyuanPosts.length)
    for (let i = 0; i < siyuanPosts.length; i++) {
      const siyuanPost = siyuanPosts[i]

      // 某些属性详情页控制即可
      const attrs = await this.siyuanKernelApi.getBlockAttrs(siyuanPost.root_id)
      const page = await this.getPost(siyuanPost.root_id, false, true)

      // // 发布状态
      // let isPublished = true
      // const publishStatus = attrs["custom-publish-status"] || "draft"
      // if (publishStatus == "secret") {
      //     isPublished = false;
      // }
      //
      // // 访问密码
      // const postPassword = attrs["custom-publish-password"] || ""

      // 文章别名
      const customSlug = attrs["custom-slug"] || ""

      // 标题处理
      let title = siyuanPost.content ?? ""
      if (this.cfg.fixTitle) {
        title = HtmlUtil.removeTitleNumber(title)
      }

      // 适配公共属性
      const commonPost = new Post()
      commonPost.postid = siyuanPost.root_id
      commonPost.title = title
      commonPost.permalink = StrUtil.appendStr("/s/", siyuanPost.root_id)
      // commonPost.isPublished = isPublished
      commonPost.mt_keywords = page.mt_keywords
      commonPost.description = page.description
      result.push(commonPost)
    }

    return result
  }

  public override async newPost(post: Post, publish?: boolean): Promise<string> {
    return await this.siyuanKernelApi.createDocWithMd(this.cfg.notebook, `/${post.title}`, post.description)
  }

  public override async getPost(postid: string, useSlug?: boolean, skipBody?: boolean): Promise<Post> {
    let pid = postid
    if (useSlug) {
      const pidObj = await this.siyuanKernelApi.getRootBlockBySlug(postid)
      if (pidObj) {
        pid = pidObj.root_id
      }
    }
    const siyuanPost = await this.siyuanKernelApi.getBlockByID(pid)
    if (!siyuanPost) {
      throw new Error("文章不存存在，postid=>" + pid)
    }

    const attrs = await this.siyuanKernelApi.getBlockAttrs(pid)

    // 发布状态
    let isPublished = true
    const publishStatus = attrs["custom-publish-status"] || "draft"
    if (publishStatus === "secret") {
      isPublished = false
    }

    // 访问密码
    const postPassword = attrs["custom-post-password"] || ""

    // 访问密码
    const shortDesc = attrs["custom-desc"] || ""

    // 标题处理
    let title = siyuanPost.content ?? ""
    if (this.cfg.fixTitle) {
      title = HtmlUtil.removeTitleNumber(title)
    }

    // 渲染Markdown
    let html
    // 如果忽略 body，则不进行转换
    if (!skipBody) {
      const md = await this.siyuanKernelApi.exportMdContent(pid)
      html = await this.markdownUtil.renderHTML(md.content)
      // 移除挂件html
      html = HtmlUtil.removeWidgetTag(html)
      if (this.cfg.fixTitle) {
        html = HtmlUtil.removeH1(html)
      }
    }

    // 适配公共属性
    const commonPost = new Post()
    commonPost.postid = siyuanPost.root_id || ""
    commonPost.title = title || ""
    commonPost.description = html || ""
    commonPost.shortDesc = shortDesc || ""
    commonPost.mt_keywords = attrs.tags || ""
    commonPost.post_status = isPublished ? PostStatusEnum.PostStatusEnum_Publish : PostStatusEnum.PostStatusEnum_Draft
    commonPost.wp_password = postPassword
    // commonPost.dateCreated

    return commonPost
  }

  public override async editPost(postid: string, post: Post, publish?: boolean): Promise<boolean> {
    return await super.editPost(postid, post, publish)
  }

  public override async deletePost(postid: string): Promise<boolean> {
    await this.siyuanKernelApi.removeDoc(this.cfg.notebook, `/${postid}.sy`)
    return true
  }

  public override async getCategories(): Promise<CategoryInfo[]> {
    const cats = [] as CategoryInfo[]

    let notebooks: any[] = (await this.siyuanKernelApi.lsNotebooks()).notebooks
    //用户指南不应该作为可以写入的笔记本
    const hiddenNotebook: Set<string> = new Set(["思源笔记用户指南", "SiYuan User Guide"])
    notebooks = notebooks.filter((notebook) => !notebook.closed && !hiddenNotebook.has(notebook.name))
    this.logger.debug("siyuan notebooks=>", notebooks)
    if (notebooks && notebooks.length > 0) {
      notebooks.forEach((notebook) => {
        const cat = new CategoryInfo()
        cat.categoryId = notebook.id
        cat.categoryName = notebook.name
        cat.description = notebook.name
        cat.categoryDescription = notebook.name
        cats.push(cat)
      })
    }

    return cats
  }

  public override async getPreviewUrl(postid: string): Promise<string> {
    // 检查 previewUrl 是否包含 [postid] 参数
    if (!this.cfg.previewUrl?.includes("[postid]")) {
      throw new Error("Missing [postid] parameter in preview URL")
    }

    // 替换文章链接
    let previewUrl = this.cfg.previewUrl
    if (previewUrl.includes("[home]")) {
      previewUrl = previewUrl.replace("[home]", this.cfg.home ?? "")
    }
    return previewUrl.replace("[postid]", postid)
  }

  public override async newMediaObject(mediaObject: MediaObject, customHandler?: any): Promise<any> {
    if (!customHandler) {
      throw new NotImplementedException("You must implement custom handler for siyuan assets")
    }

    this.logger.info("Using custom handler for mediaObject")
    const data = await customHandler(mediaObject)
    this.logger.info("newMediaObject finished, data=>", data)
    const attachmentInfo = new Attachment({})
    if (data && data.succMap) {
      const link = data.succMap[mediaObject.name]
      attachmentInfo.attachment_id = this.extractFileName(link)
      attachmentInfo.date_created_gmt = new Date()
      attachmentInfo.file = mediaObject.name
      attachmentInfo.id = attachmentInfo.attachment_id
      attachmentInfo.link = link
      attachmentInfo.parent = 0
      attachmentInfo.metadata.file = link
      attachmentInfo.thumbnail = link
      attachmentInfo.title = mediaObject.name
      attachmentInfo.type = mediaObject.type
      attachmentInfo.url = link
    }

    return attachmentInfo
  }

  private extractFileName(filePath: string): string {
    const fileNameWithExt = filePath.split("/").pop()!
    const fileNameWithoutExt = fileNameWithExt.split(".").slice(0, -1).join(".")
    if (fileNameWithoutExt.indexOf("-") !== -1) {
      return fileNameWithoutExt.split("-").slice(-2).join("-")
    } else {
      throw new Error(`Failed to extract file name from ${filePath}.`)
    }
  }
}

export default SiYuanApiAdaptor
