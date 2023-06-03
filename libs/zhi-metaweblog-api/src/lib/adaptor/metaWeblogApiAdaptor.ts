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

import { BlogApi, CategoryInfo, MediaObject, Post, UserBlog } from "zhi-blog-api"
import MetaweblogConfig from "../config/metaweblogConfig"
import { simpleLogger } from "zhi-lib-base"
import { CommonXmlrpcClient } from "zhi-xmlrpc-middleware"
import MetaweblogMethodConstants from "../constants/metaweblogMethodConstants"

/**
 * 通用的 Metaweblog API
 *
 * @author terwer
 * @version 0.9.0
 * @since 0.0.1
 */
class MetaWeblogApiAdaptor extends BlogApi {
  protected logger: any
  protected readonly cfg
  protected readonly commonXmlrpcClient

  /**
   * 初始化思源 API 适配器
   *
   * @param appInstance - 应用实例
   * @param cfg 配置项
   */
  constructor(appInstance: any, cfg: MetaweblogConfig) {
    super()
    this.logger = simpleLogger("zhi-metaweblog-api", "metaweblog-api-adaptor", false)

    this.cfg = cfg
    this.commonXmlrpcClient = new CommonXmlrpcClient(appInstance, cfg.apiUrl)
  }

  public async getUsersBlogs(): Promise<Array<UserBlog>> {
    return await this.commonXmlrpcClient.methodCall(MetaweblogMethodConstants.GET_USERS_BLOGS, [
      "",
      this.cfg.username,
      this.cfg.password,
    ])
  }

  public override async getRecentPostsCount(keyword?: string): Promise<number> {
    return await super.getRecentPostsCount(keyword)
  }

  public override async getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>> {
    return await this.commonXmlrpcClient.methodCall(MetaweblogMethodConstants.GET_RECENT_POSTS, [""])
  }

  public override async newPost(post: Post, publish?: boolean): Promise<string> {
    return await super.newPost(post, publish)
  }

  public override async getPost(postid: string, useSlug?: boolean, skipBody?: boolean): Promise<Post> {
    return await super.getPost(postid, useSlug, skipBody)
  }

  public override async editPost(postid: string, post: Post, publish?: boolean): Promise<boolean> {
    return await super.editPost(postid, post, publish)
  }

  public override async deletePost(postid: string): Promise<boolean> {
    return await super.deletePost(postid)
  }

  public override async getCategories(): Promise<CategoryInfo[]> {
    return await super.getCategories()
  }

  public override async getPreviewUrl(postid: string): Promise<string> {
    return await super.getPreviewUrl(postid)
  }

  public override async newMediaObject(mediaObject: MediaObject, customHandler?: any): Promise<any> {
    return await super.newMediaObject(mediaObject, customHandler)
  }
}

export default MetaWeblogApiAdaptor
