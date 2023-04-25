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
import { useCache } from "~/composables/useCache"
import ZhiServerVue3SsrUtil from "~/utils/ZhiServerVue3SsrUtil"

class StoreUtil {
  private static readonly logger = ZhiServerVue3SsrUtil.zhiLog("store-util")

  /**
   * 读取缓存
   *
   * @param storeKey - 缓存key
   * @param fetchFun - 未命中缓存时的获取数据的方法
   * @param checkFun - 检测是否需要缓存
   * @param cacheResultCallback - 缓存结果回调
   */
  public static async loadCache(
    storeKey: string,
    fetchFun: () => Promise<any>,
    checkFun: () => boolean,
    cacheResultCallback: (result: any) => void
  ): Promise<void> {
    const cache = useCache()
    if (checkFun()) {
      const cachedData = cache[storeKey]

      if (cachedData) {
        await cacheResultCallback(cachedData)
        this.logger.info(`Cache hit! Loaded datas from cache.`)
      } else {
        this.logger.info("No cache data found. Fetching...")
        await fetchFun()
        cache[storeKey] = await fetchFun()
        this.logger.info("Cache updated")
      }
    }
  }
}

export default StoreUtil
