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

import { IBlogApi } from "./IBlogApi"
import Post from "./models/post"
import ElectronCookie from "./models/ElectronCookie"
import WebConfig from "./WebConfig"

/**
 * 通用博客接口
 *
 * @public
 * @author terwer
 * @outline deep
 * @version 1.0.0
 * @since 1.0.0
 */
interface IWebApi extends IBlogApi {
  /**
   * 更新 WebConfig 配置
   *
   * @param cfg - 要更新的 WebConfig 对象
   */
  updateCfg(cfg: WebConfig): void

  /**
   * 构建 Cookie 字符串
   *
   * @param cookies - ElectronCookie 数组
   * @returns 构建后的 Cookie 字符串
   */
  buildCookie(cookies: ElectronCookie[]): Promise<string>

  /**
   * 组装元数据：调用平台 API 获取用户信息和平台信息，并返回组装数据
   *
   * @returns Promise<any> 元数据
   */
  getMetaData(): Promise<any>

  /**
   * 内容预处理：预处理平台无法兼容的文本内容
   *
   * @param post 文章内容
   * @returns Promise<Post> 预处理后的文章内容
   */
  preEditPost(post: Post): Promise<Post>

  /**
   * 创建文章：调用平台 API 创建草稿
   *
   * @param post 文章内容
   */
  addPost(post: Post): Promise<any>

  /**
   * 上传图片：调用平台 API 上传图片
   *
   * @param file 图片文件
   * @returns Promise<string> 上传后的图片地址
   */
  uploadFile(file: File): Promise<any>

  /**
   * 更新文章：调用平台 API 更新文章（发布工具内部通过该接口替换文章内图片地址）
   *
   * @param postid 文章 ID
   * @param post 更新后的文章内容
   * @param publish 是否发布
   * @returns Promise<boolean> 更新结果
   */
  editPost(postid: string, post: Post, publish?: boolean): Promise<boolean>
}

export type { IWebApi }
