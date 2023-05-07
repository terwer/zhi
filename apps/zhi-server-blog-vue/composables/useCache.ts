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

import { inject } from "vue"
import { cacheSymbol } from "~/plugins/cache-plugin/cacheKeys"
import ZhiServerBlogVueUtil from "~/utils/ZhiServerBlogVueUtil"

/**
 * 读取当前上下文的缓存，在 client/index.ts 注入
 */
export function useCache() {
  const logger = ZhiServerBlogVueUtil.zhiLog("recent-posts-store")

  if (import.meta.env.STATIC) {
    logger.info("you are in SPA mode, cache reset")
    return {}
  }

  const cache = inject(cacheSymbol)
  if (!cache) {
    throw new Error("Cache not found.Do you forget to inject it in SSR?")
  }
  return cache
}
