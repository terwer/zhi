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
 * 文章状态枚举
 *
 * @link https://codex.wordpress.org/Post_Status_Transitions
 */
enum PostStatusEnum {
  /**
   * 无先前状态
   */
  PostStatusEnum_New = "new",
  /**
   * 发布
   */
  PostStatusEnum_Publish = "publish",
  /**
   * 待审核
   */
  PostStatusEnum_Pending = "pending",
  /**
   * 草稿
   */
  PostStatusEnum_Draft = "draft",
  /**
   * 自动草稿
   */
  PostStatusEnum_AutoDraft = "auto-draft",
  /**
   * 定时发布
   */
  PostStatusEnum_Future = "future",
  /**
   * 私密
   */
  PostStatusEnum_Private = "private",
  /**
   * 垃圾箱
   */
  PostStatusEnum_Trash = "trash",
}

export default PostStatusEnum
