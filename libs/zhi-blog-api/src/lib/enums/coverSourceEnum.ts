/*
 * Copyright (c) 2026, Terwer . All rights reserved.
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
 * 通用封面图来源。
 *
 * 发布层按「文档题头图 → 正文首图 → 用户自定义」的顺序解析封面，
 * 平台适配器只需要读取最终写入 `Post.cover` 的地址。
 */
enum CoverSource {
  /**
   * 思源文档题头图。
   */
  TitleImage = "titleImage",
  /**
   * 正文中的第一张图片。
   */
  FirstBodyImage = "firstBodyImage",
  /**
   * 用户自定义上传/填写的图片。
   */
  Custom = "custom",
}

export default CoverSource
