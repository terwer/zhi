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

import { IWebApi } from "./IWebApi"
import Post from "./models/post"
import CategoryInfo from "./models/categoryInfo"
import UserBlog from "./models/userBlog"
import MediaObject from "./models/mediaObject"
import Attachment from "./models/attachmentInfo"
import { NotImplementedException } from "zhi-lib-base"
import ElectronCookie from "./models/ElectronCookie"
import WebConfig from "./WebConfig"

/**
 * 网页授权基类
 */
class WebApi implements IWebApi {
  updateCfg(cfg: WebConfig): void {
    throw new NotImplementedException("You must implement updateCfg in sub class")
  }

  public async buildCookie(cookies: ElectronCookie[]): Promise<string> {
    throw new NotImplementedException("You must implement buildCookie in sub class")
  }

  public async addPost(post: Post): Promise<void> {
    throw new NotImplementedException("You must implement addPost in sub class")
  }

  public async deletePost(postid: string): Promise<boolean> {
    throw new NotImplementedException("You must implement deletePost in sub class")
  }

  public async editPost(postid: string, post: Post, publish?: boolean): Promise<boolean> {
    throw new NotImplementedException("You must implement editPost in sub class")
  }

  public async getCategories(): Promise<CategoryInfo[]> {
    throw new NotImplementedException("You must implement getCategories in sub class")
  }

  public async getMetaData(): Promise<object> {
    throw new NotImplementedException("You must implement getMetaData in sub class")
  }

  public async getPost(postid: string, useSlug?: boolean, skipBody?: boolean): Promise<Post> {
    throw new NotImplementedException("You must implement getPost in sub class")
  }

  public async getPreviewUrl(postid: string): Promise<string> {
    throw new NotImplementedException("You must implement getPreviewUrl in sub class")
  }

  public async getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>> {
    throw new NotImplementedException("You must implement getRecentPosts in sub class")
  }

  public async getRecentPostsCount(keyword?: string): Promise<number> {
    throw new NotImplementedException("You must implement getRecentPostsCount in sub class")
  }

  public async getUsersBlogs(): Promise<Array<UserBlog>> {
    throw new NotImplementedException("You must implement getUsersBlogs in sub class")
  }

  public async newMediaObject(mediaObject: MediaObject, customHandler?: any): Promise<Attachment> {
    throw new NotImplementedException("You must implement newMediaObject in sub class")
  }

  public async newPost(post: Post, publish?: boolean): Promise<string> {
    throw new NotImplementedException("You must implement newPost in sub class")
  }

  public async preEditPost(post: Post): Promise<Post> {
    throw new NotImplementedException("You must implement preEditPost in sub class")
  }

  public async uploadFile(file: File): Promise<string> {
    throw new NotImplementedException("You must implement uploadFile in sub class")
  }
}

export default WebApi
