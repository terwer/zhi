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

import { LogConstants, LogLevelEnum } from "zhi-log"
import { ZhiUtil } from "zhi-common"
import Env, { EnvConstants } from "zhi-env"
import { SiYuanApiAdaptor, SiyuanConfig, SiyuanConstants } from "zhi-siyuan-api"
import BlogApi, { BlogConstants, BlogTypeEnum } from "zhi-blog-api"

/**
 * 工具类统一入口，每个应用自己实现
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class ZhiBlogAstroUtil extends ZhiUtil {
  private static bApi: BlogApi

  /**
   * 获取 zhi-env 实例
   */
  public static override zhiEnv() {
    if (!this.env) {
      // https://github.com/vitejs/vite/issues/9539#issuecomment-1206301266
      // 1 add modules:esnext tsconfig.app.json
      // 2 add custom.d.ts
      const envMeta = import.meta.env

      const customEnv = {
        [EnvConstants.NODE_ENV_KEY]: EnvConstants.NODE_ENV_DEVELOPMENT,
        [EnvConstants.VITE_DEBUG_MODE_KEY]: false,
        [LogConstants.LOG_LEVEL_KEY]: LogLevelEnum.LOG_LEVEL_DEBUG,
        [LogConstants.LOG_PREFIX_KEY]: "zhi-blog-astro",
        ...envMeta,
      }

      this.env = new Env(customEnv)
    }
    return this.env
  }

  /**
   * 获取 siyuan-kernel-api 实例
   */
  public static blogApi() {
    if (!this.bApi) {
      const env = this.zhiEnv()

      let apiAdaptor
      const blogType = env.getEnv(BlogConstants.DEFAULT_BLOG_TYPE_KEY)
      switch (blogType) {
        case BlogTypeEnum.BlogTypeEnum_Wordpress:
          break
        default: {
          const apiUrl = env.getEnvOrDefault(SiyuanConstants.VITE_SIYUAN_API_URL_KEY, "http://127.0.0.1:6806")
          const token = env.getStringEnv(SiyuanConstants.VITE_SIYUAN_AUTH_TOKEN_KEY)

          const siyuanConfig = new SiyuanConfig(apiUrl, token)
          // 显示指定修复标题
          siyuanConfig.fixTitle = true
          apiAdaptor = new SiYuanApiAdaptor(siyuanConfig)
          break
        }
      }

      if (!apiAdaptor) {
        throw new Error("ApiAdaptor cannot be null")
      }
      ZhiBlogAstroUtil.bApi = new BlogApi(apiAdaptor)
    }
    return this.bApi
  }

  /**
   * 引入Lute
   *
   * @param basePath - 基本路径
   * @param staticV - 资源版本号
   */
  public static async importLute(basePath: string, staticV: string) {
    const luteImportUrl = basePath + "lib/lute/lute-1.7.5-20230410.min.js?v=" + staticV
    await import(/* @vite-ignore */ luteImportUrl)
  }
}

export default ZhiBlogAstroUtil
