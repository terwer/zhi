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
 * 工具类统一入口，每个应用自己实现
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class ZhiSiyuanApiUtil {
  private static env: any

  /**
   * 通用环境变量
   *
   * @param appInstance - 插件实例
   */
  public static zhiEnv(appInstance: any) {
    if (!this.env) {
      // 环境变量需要在使用的时候显式指定
      this.env = new appInstance.zhiEnv.Env(import.meta.env)
    }
    return this.env
  }

  /**
   * 通用日志
   *
   * @param appInstance - 应用实例
   * @param loggerName - 日志名称
   */
  public static zhiLog(appInstance: any, loggerName: string) {
    const env = this.zhiEnv(appInstance)
    appInstance.zhiCommon.ZhiUtil.initEnv(env)

    // 用 common 里面的，这里面我封装了日志缓存
    return appInstance.zhiCommon.ZhiUtil.zhiLogWithSign("publisher", loggerName)
  }

  /**
   * 通用工具入口
   *
   * @param appInstance - 应用实例
   */
  public static zhiCommon(appInstance: any) {
    return appInstance.zhiCommon.ZhiUtil.zhiCommon()
  }
}

export default ZhiSiyuanApiUtil
