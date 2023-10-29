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

import UserBlog from "./models/userBlog"
import Post from "./models/post"
import CategoryInfo from "./models/categoryInfo"
import MediaObject from "./models/mediaObject"
import { IBlogApi } from "./IBlogApi"
import { NotImplementedException, simpleLogger } from "zhi-lib-base"
import Attachment from "./models/attachmentInfo"
import BlogApi from "./blogApi"
import YamlConvertAdaptor from "./yamlConvertAdaptor"
import TagInfo from "./models/tagInfo"

/**
 * 博客API
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class BlogAdaptor implements IBlogApi {
  protected logger: any
  private readonly apiAdaptor: BlogApi

  /**
   * 博客API版本号
   */
  public VERSION: string

  /**
   * 初始化博客 API
   *
   * @param apiAdaptor - 对应博客的适配器，例如：SiYuanApiAdaptor
   */
  constructor(apiAdaptor: BlogApi) {
    this.logger = simpleLogger("blog-adaptor", "zhi-blog-api", false)
    this.VERSION = "1.0.0"
    this.apiAdaptor = apiAdaptor
  }

  /**
   * 检测平台是否可用
   */
  public async checkAuth(): Promise<boolean> {
    throw await this.apiAdaptor.checkAuth()
  }

  /**
   * 博客配置列表
   */
  public async getUsersBlogs(keyword?: string): Promise<Array<UserBlog>> {
    return await this.apiAdaptor.getUsersBlogs(keyword)
  }

  /**
   * 最新文章数目
   *
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   */
  public async getRecentPostsCount(keyword?: string): Promise<number> {
    return await this.apiAdaptor.getRecentPostsCount(keyword)
  }

  /**
   * 最新文章
   *
   * @param numOfPosts - 文章数目
   * @param page - 页码（可选，从0开始，部分平台不支持分页）
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   */
  public async getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>> {
    try {
      return await this.apiAdaptor.getRecentPosts(numOfPosts, page, keyword)
    } catch (e) {
      this.logger.error("getRecentPosts fetch posts failed", e)
      return Promise.resolve([])
    }
  }

  /**
   * 内容预处理：预处理平台无法兼容的文本内容
   *
   * @param post 文章对象
   * @param id - 思源笔记文档ID
   * @param publishCfg - 发布配置
   */
  public async preEditPost(post: Post, id?: string, publishCfg?: any): Promise<Post> {
    return await this.apiAdaptor.preEditPost(post, id, publishCfg)
  }

  /**
   * 发布文章
   *
   * @param post - 文章
   * @param publish - 可选，是否发布
   */
  public async newPost(post: Post, publish?: boolean): Promise<string> {
    return await this.apiAdaptor.newPost(post, publish)
  }

  /**
   * 文章详情
   * @param postid - postid
   * @param useSlug - 是否使用的是别名（可选，部分平台不支持）
   */
  public async getPost(postid: string, useSlug?: boolean): Promise<Post> {
    try {
      return await this.apiAdaptor.getPost(postid, useSlug)
    } catch (e) {
      this.logger.error(`getPost fetch posts failed => ${postid},`, e)
      return Promise.resolve(new Post())
    }
  }

  /**
   * 更新文章
   *
   * @param postid - 文章id
   * @param post - 文章
   * @param publish - 可选，是否发布
   */
  public async editPost(postid: string, post: Post, publish?: boolean): Promise<boolean> {
    return await this.apiAdaptor.editPost(postid, post, publish)
  }

  /**
   * 删除文章
   *
   * @param postid - 文章ID
   */
  public async deletePost(postid: string): Promise<boolean> {
    return await this.apiAdaptor.deletePost(postid)
  }

  /**
   * 获取标签列表
   */
  public async getTags(): Promise<TagInfo[]> {
    return await this.apiAdaptor.getTags()
  }

  /**
   * 获取分类列表
   */
  public async getCategories(keyword?: string): Promise<CategoryInfo[]> {
    return await this.apiAdaptor.getCategories(keyword)
  }

  /**
   * 获取文件树列表
   *
   * @param docPath 完整文件路径，例如：docs/_posts/测试.md
   */
  public async getCategoryTreeNodes(docPath: string): Promise<any[]> {
    return await this.apiAdaptor.getCategoryTreeNodes(docPath)
  }

  /**
   * 获取预览链接
   *
   * @param postid - 文章ID
   */
  public async getPreviewUrl(postid: string): Promise<string> {
    return await this.apiAdaptor.getPreviewUrl(postid)
  }

  /**
   * 获取文章预览链接
   *
   * @param postid - 文章ID
   */
  public async getPostPreviewUrl(postid: string): Promise<string> {
    return await this.apiAdaptor.getPostPreviewUrl(postid)
  }

  /**
   * 上传附件
   *
   * @param mediaObject - 资源
   * @param customHandler - 自定义处理器
   */
  public async newMediaObject(mediaObject: MediaObject, customHandler?: any): Promise<Attachment> {
    return await this.apiAdaptor.newMediaObject(mediaObject, customHandler)
  }

  /**
   * 获取YAML适配器
   */
  public getYamlAdaptor(): YamlConvertAdaptor {
    return this.apiAdaptor.getYamlAdaptor()
  }
}

export default BlogAdaptor
