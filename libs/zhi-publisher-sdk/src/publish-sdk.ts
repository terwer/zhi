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

/**
 * 发布 SDK
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class PublishSdk {
  /**
   * BlogApi
   * @private
   */
  private static appInstance: any

  public static init(options: { appInstance: any }) {
    this.appInstance = options.appInstance
  }

  /**
   * 获取 siyuan-kernel-api 实例
   *
   * @param apiAdaptor - BlogAdaptor
   * @return BlogApi
   */
  public static blogApi(apiAdaptor: any) {
    if (!apiAdaptor) {
      throw new Error("ApiAdaptor cannot be null")
    }

    if (!apiAdaptor.getUsersBlogs) {
      throw new Error(`ApiAdaptor must implements BlogApi`)
    }

    if (apiAdaptor.init) {
      apiAdaptor.init(this.appInstance)
    }

    return new this.appInstance.zhiBlogApi.BlogAdaptor(apiAdaptor)
  }
}

export default PublishSdk
