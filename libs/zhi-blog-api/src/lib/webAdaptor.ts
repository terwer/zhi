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

import BlogAdaptor from "./blogAdaptor"
import Post from "./models/post"
import { simpleLogger } from "zhi-lib-base"
import ElectronCookie from "./models/ElectronCookie"
import WebConfig from "./WebConfig"
import WebApi from "./webApi"

/**
 * 网页授权核心基类
 * 该类提供了网页授权功能的核心基本功能
 *
 * @author terwer
 * @version 0.9.0
 * @since 0.9.0
 * @see [wechatsync BaseAdapter]{@link https://github.com/wechatsync/Wechatsync/blob/master/packages/%40wechatsync/drivers/src/BaseAdapter.js}
 */
class WebAdaptor extends BlogAdaptor {
  private readonly webAdaptor: WebApi

  /**
   * 初始化网页授权的 API
   *
   * @param webAdaptor - 对应博客的适配器，例如：ZhihuWebAdaptor
   */
  constructor(webAdaptor: WebApi) {
    super(webAdaptor)
    this.logger = simpleLogger("web-adaptor", "zhi-blog-api", false)
    this.VERSION = "0.9.0"
    this.webAdaptor = webAdaptor
  }

  public updateCfg(cfg: WebConfig): void {
    return this.webAdaptor.updateCfg(cfg)
  }

  public async buildCookie(cookies: ElectronCookie[]): Promise<string> {
    return await this.webAdaptor.buildCookie(cookies)
  }

  public async getMetaData(): Promise<any> {
    return await this.webAdaptor.getMetaData()
  }

  /**
   * 内容预处理：预处理平台无法兼容的文本内容
   *
   * @param post 文章对象
   * @param id - 思源笔记文档ID
   * @param publishCfg - 发布配置
   */
  public async preEditPost(post: Post, id?: string, publishCfg?: any): Promise<Post> {
    return await this.webAdaptor.preEditPost(post, id, publishCfg)
  }

  public async addPost(post: Post): Promise<void> {
    return await this.webAdaptor.addPost(post)
  }

  public async uploadFile(file: File, filename?: string): Promise<any> {
    return await this.webAdaptor.uploadFile(file, filename)
  }

  public async editPost(postid: string, post: Post, publish?: boolean): Promise<boolean> {
    return this.webAdaptor.editPost(postid, post, publish)
  }
}

export default WebAdaptor
