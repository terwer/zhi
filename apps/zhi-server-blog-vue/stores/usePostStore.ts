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

import { defineStore } from "pinia"
import ZhiServerVue3SsrUtil from "~/utils/ZhiServerVue3SsrUtil"
import { useRoute } from "vue-router"
import { Post } from "zhi-blog-api"
import { SiYuanApiAdaptor } from "zhi-siyuan-api"
import { onBeforeMount, onServerPrefetch, reactive, toRaw } from "vue"
import { StoreKeys } from "~/stores/storeKeys"
import { useCache } from "~/composables/useCache"
import StoreUtil from "~/stores/storeUtil"

export const usePostStore = defineStore(StoreKeys.Store_Post, () => {
  const env = ZhiServerVue3SsrUtil.zhiEnv()
  const logger = ZhiServerVue3SsrUtil.zhiLog("post-deatil-store")
  const common = ZhiServerVue3SsrUtil.zhiCommon()
  // use
  const route = useRoute()
  // props
  const currentPost = reactive({
    post: {} as Post,
  })

  const getPost = async () => {
    const blogApi = new SiYuanApiAdaptor(env)
    const id = (route.params.id ?? "") as string
    const postid = id.replace(/\.html$/, "")
    currentPost.post = await blogApi.getPost(postid)
  }

  /**
   * 从前端缓存读取缓存
   */
  const loadCache = async () => {
    await StoreUtil.loadCache(
      StoreKeys.Store_Post,
      getPost,
      () => {
        return common.objectUtil.isEmptyObject(currentPost.post)
      },
      (result: any) => {
        currentPost.post = result.currentPost.post
      }
    )
  }

  onServerPrefetch(async () => {
    await getPost()
  })
  onBeforeMount(async () => {
    await loadCache()
  })

  return { currentPost }
})
