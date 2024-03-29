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

import UserBlog from "./models/userBlog"
import Post from "./models/post"
import MediaObject from "./models/mediaObject"
import CategoryInfo from "./models/categoryInfo"
import Attachment from "./models/attachmentInfo"
import YamlConvertAdaptor from "./yamlConvertAdaptor"
import TagInfo from "./models/tagInfo"

/**
 * 通用博客接口
 *
 * @public
 * @author terwer
 * @outline deep
 * @version 1.0.0
 * @since 1.0.0
 */
interface IBlogApi {
  /**
   * 检测平台是否可用
   */
  checkAuth(): Promise<boolean>

  /**
   * 博客配置列表
   *
   * @param keyword - 搜索关键字，部分平台不支持
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getUsersBlogs getUsersBlogs}
   * @returns {Promise<Array<UserBlog>>}
   */
  getUsersBlogs(keyword?: string): Promise<Array<UserBlog>>

  /**
   * 最新文章数目
   *
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   * @returns {Promise<number>}
   */
  getRecentPostsCount(keyword?: string): Promise<number>

  /**
   * 最新文章
   *
   * @param numOfPosts - 文章数目
   * @param page - 页码（可选，从0开始，部分平台不支持分页）
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getRecentPosts getRecentPosts}
   * @returns {Promise<Array<Post>>}
   */
  getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>>

  /**
   * 内容预处理：预处理平台无法兼容的文本内容
   *
   * @param post 文章对象
   * @param id - 思源笔记文档ID
   * @param publishCfg - 发布配置
   */
  preEditPost(post: Post, id?: string, publishCfg?: any): Promise<Post>

  /**
   * 发布文章
   *
   * @param post - 文章
   * @param publish - 可选，是否发布
   *
   * ```ts
   *    const post = {
   *         description: "自动发布的测试内容",
   *         title: "自动发布的测试标题",
   *         categories: ["标签1","标签2"],
   *         // dateCreated: new Date(),
   *         // link: "",
   *         // permalink: "",
   *         // postid: "",
   *         // source: {
   *         //  name: "",
   *         //  url: ""
   *         // };
   *         // userid: ""
   *    }
   *
   *    const result = newPost(post, false)
   * ```
   * @see {@link  https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.newPost newPost}
   * @returns {Promise<string>}
   */
  newPost(post: Post, publish?: boolean): Promise<string>

  /**
   * 文章详情
   * @param postid - postid
   * @param useSlug - 是否使用的是别名（可选，部分平台不支持）
   * @param skipBody - 是否忽略正文（可选，部分平台不支持）
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getPost getPost}
   * @returns {Promise<Post>}
   */
  getPost(postid: string, useSlug?: boolean, skipBody?: boolean): Promise<Post>

  /**
   * 更新文章
   *
   * @param postid - 文章id
   * @param post - 文章
   * @param publish - 可选，是否发布
   *
   * ```ts
   *     // wordpress
   *     // const postid = 4115
   *     // conf
   *     // const postid = 1540103
   *     const postid = "2490384_1"
   *     const post = {
   *         description: "修改过的自动发布的测试内容2",
   *         title: "修改过的自动发布的测试标题2",
   *         categories: ["标签1", "标签2"],
   *         // dateCreated: new Date(),
   *         // link: "",
   *         // permalink: "",
   *         // postid: postid,
   *         // source: {
   *         //  name: "",
   *         //  url: ""
   *         // };
   *         // userid: ""
   *     }
   *
   *     const result = editPost(postid, post, false)
   * ```
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.editPost editPost}
   * @returns {Promise<boolean>}
   */
  editPost(postid: string, post: Post, publish?: boolean): Promise<boolean>

  /**
   * 删除文章
   *
   * @param postid - 文章ID
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.deletePost deletePost}
   * @returns {Promise<boolean>}
   */
  deletePost(postid: string): Promise<boolean>

  /**
   * 获取分类列表
   *
   * @param keyword - 搜索关键字，部分平台不支持
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getCategories getCategories}
   * @returns {Promise<CategoryInfo[]>}
   */
  getCategories(keyword?: string): Promise<CategoryInfo[]>

  /**
   * 获取标签列表
   */
  getTags(): Promise<TagInfo[]>

  /**
   * 获取文件树列表
   *
   * @param docPath 完整文件路径，例如：docs/_posts/测试.md
   */
  getCategoryTreeNodes(docPath: string): Promise<any[]>

  /**
   * 获取预览链接
   *
   * @param postid - 文章ID
   * @returns {Promise<string>}
   */
  getPreviewUrl(postid: string): Promise<string>

  /**
   * 获取文章预览链接
   *
   * @param postid - 文章ID
   * @returns {Promise<string>}
   */
  getPostPreviewUrl(postid: string): Promise<string>

  /**
   * 上传附件
   *
   * @param mediaObject - 资源
   * @param customHandler - 自定义处理器
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.newMediaObject newMediaObject}
   * @returns {Promise<MediaObject>}
   */
  newMediaObject(mediaObject: MediaObject, customHandler?: any): Promise<Attachment>

  /**
   * 获取YAML适配器
   */
  getYamlAdaptor(): YamlConvertAdaptor
}

export type { IBlogApi }
