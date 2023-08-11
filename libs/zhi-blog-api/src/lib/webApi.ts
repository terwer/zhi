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
import { NotImplementedException } from "zhi-lib-base"
import ElectronCookie from "./models/ElectronCookie"
import WebConfig from "./WebConfig"
import BlogApi from "./blogApi"

/**
 * 网页授权基类
 */
class WebApi extends BlogApi implements IWebApi {
  updateCfg(cfg: WebConfig): void {
    throw new NotImplementedException("You must implement updateCfg in sub class")
  }

  public async buildCookie(cookies: ElectronCookie[]): Promise<string> {
    throw new NotImplementedException("You must implement buildCookie in sub class")
  }

  public async getMetaData(): Promise<any> {
    throw new NotImplementedException("You must implement getMetaData in sub class")
  }

  public async preEditPost(post: Post, id?: string, publishCfg?: any): Promise<Post> {
    throw new NotImplementedException("You must implement preEditPost in sub class")
  }

  public async addPost(post: Post): Promise<any> {
    throw new NotImplementedException("You must implement addPost in sub class")
  }

  public async uploadFile(file: File): Promise<any> {
    throw new NotImplementedException("You must implement uploadFile in sub class")
  }

  public async editPost(postid: string, post: Post, publish?: boolean): Promise<boolean> {
    throw new NotImplementedException("You must implement editPost in sub class")
  }
}

export default WebApi
