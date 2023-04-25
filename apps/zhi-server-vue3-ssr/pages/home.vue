<!--
  - Copyright (c) 2023, Terwer . All rights reserved.
  - DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
  -
  - This code is free software; you can redistribute it and/or modify it
  - under the terms of the GNU General Public License version 2 only, as
  - published by the Free Software Foundation.  Terwer designates this
  - particular file as subject to the "Classpath" exception as provided
  - by Terwer in the LICENSE file that accompanied this code.
  -
  - This code is distributed in the hope that it will be useful, but WITHOUT
  - ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
  - FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
  - version 2 for more details (a copy is included in the LICENSE file that
  - accompanied this code).
  -
  - You should have received a copy of the GNU General Public License version
  - 2 along with this work; if not, write to the Free Software Foundation,
  - Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
  -
  - Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
  - or visit www.terwer.space if you need additional information or have any
  - questions.
  -->

<template>
  <div>
    <!--
   图标使用示例
   import IconAccessibility from "~icons/carbon/accessibility"
   import IconAccountBox from "~icons/mdi/account-box"
   <icon-accessibility />
   <icon-account-box style="font-size: 2em; color: red" />
   -->
    <div v-for="post in recentPosts.posts" :key="post.postid">
      <h1>
        <router-link :to="'/post/' + post.postid">
          {{ post.title }}
        </router-link>
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { SiYuanApiAdaptor } from "zhi-siyuan-api"
import { onServerPrefetch, onBeforeMount, reactive } from "vue"
import ZhiServerVue3SsrUtil from "~/utils/ZhiServerVue3SsrUtil"
import { Post } from "zhi-blog-api"

// zhi-util
const env = ZhiServerVue3SsrUtil.zhiEnv()

// use
const route = useRoute()

// props
const recentPosts = reactive({
  posts: [] as Post[],
})

const fetch_getRecentPosts = async () => {
  const num = 10
  const page = route.query.p ?? 0
  const keyword = ""

  const blogApi = new SiYuanApiAdaptor(env)
  recentPosts.posts = await blogApi.getRecentPosts(num, page, keyword)
}

// lifecycle
// https://vuejs.org/guide/scaling-up/ssr.html#component-lifecycle-hooks
// Since there are no dynamic updates, lifecycle hooks such as onMounted or onUpdated will NOT be called during SSR
// and will only be executed on the client.You should avoid code that produces side effects
// that need cleanup in setup() or the root scope of <script setup>.
// An example of such side effects is setting up timers with setInterval.
// In client-side only code we may setup a timer and then tear it down in onBeforeUnmount or onUnmounted.
// However, because the unmount hooks will never be called during SSR, the timers will stay around forever.
// To avoid this, move your side-effect code into onMounted instead.

// https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch
onServerPrefetch(async () => {
  // component is rendered as part of the initial request
  // pre-fetch data on server as it is faster than on the client
  await fetch_getRecentPosts()
})
onBeforeMount(async () => {
  // 没有数据并且是静态渲染才用客户端获取数据
  if (recentPosts.posts.length == 0) {
    // If data is null on mount, it means the component
    // is dynamically rendered on the client.
    // Perform a client-side fetch instead.
    await fetch_getRecentPosts()
  }
})
</script>
