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
  private static bApi: any
  private static Env: any
  private static BlogConstants: any
  private static BlogTypeEnum: any
  private static SiyuanConstants: any
  private static SiyuanConfig: any
  private static SiYuanApiAdaptor: any
  private static BlogApi: any

  public static init(options: {
    appInstance: any
    Env: any
    BlogConstants: any
    BlogTypeEnum: any
    SiyuanConstants: any
    SiyuanConfig: any
    SiYuanApiAdaptor: any
    BlogApi: any
  }) {
    this.appInstance = options.appInstance
    this.Env = options.Env
    this.BlogConstants = options.BlogConstants
    this.BlogTypeEnum = options.BlogTypeEnum
    this.SiyuanConstants = options.SiyuanConstants
    this.SiyuanConfig = options.SiyuanConfig
    this.SiYuanApiAdaptor = options.SiYuanApiAdaptor
    this.BlogApi = options.BlogApi
  }

  /**
   * 获取 siyuan-kernel-api 实例
   *
   * @param type - Env | BlogTypeEnum
   * @param cfg - BlogConfig
   * @return BlogApi
   */
  public static blogApi(type: any, cfg: any) {
    if (!this.bApi) {
      let apiAdaptor
      let blogType

      console.log(type instanceof this.Env)
      if (type instanceof this.Env) {
        blogType = type.getEnv(this.BlogConstants.DEFAULT_BLOG_TYPE_KEY)
      }
      switch (blogType) {
        case this.BlogTypeEnum.BlogTypeEnum_Wordpress:
          break
        default: {
          if (type instanceof this.Env) {
            const apiUrl = type.getEnvOrDefault(this.SiyuanConstants.VITE_SIYUAN_API_URL_KEY, "http://127.0.0.1:6806")
            const token = type.getStringEnv(this.SiyuanConstants.VITE_SIYUAN_AUTH_TOKEN_KEY)

            const siyuanConfig = new this.SiyuanConfig(apiUrl, token)
            // 显示指定修复标题
            siyuanConfig.fixTitle = true
            apiAdaptor = new this.SiYuanApiAdaptor(siyuanConfig)
          } else {
            apiAdaptor = new this.SiYuanApiAdaptor(cfg)
            apiAdaptor.init(this.appInstance)
          }
          break
        }
      }

      if (!apiAdaptor) {
        throw new Error("ApiAdaptor cannot be null")
      }
      this.bApi = new this.BlogApi(apiAdaptor)
    }
    return this.bApi
  }
}

export default PublishSdk
