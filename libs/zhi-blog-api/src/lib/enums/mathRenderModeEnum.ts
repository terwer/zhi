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
 * 平台公式渲染模式。
 *
 * 各平台对数学公式的原生支持差异很大，因此由平台配置声明能力，
 * 发布层再按模式统一处理，避免对单个平台做特判。
 *
 * - `native`：保留 `$...$` / `$$...$$` 原文，交给平台自身渲染（默认）；
 * - `katex`：用 KaTeX 渲染为 HTML（平台需自带 KaTeX 样式，如 CSDN）；
 * - `svg`：用 MathJax 渲染为内联 SVG（适合微信公众号等支持 SVG 的 HTML 平台）；
 * - `remote-image`：按 `mathImageUrlTemplate` 生成平台公式图片地址（如知乎）；
 * - `image`：渲染为位图并经平台图片上传链路发布（适合不接受内联 SVG 的平台）。
 */
enum MathRenderModeEnum {
  /**
   * 保留公式原文，交给平台渲染
   */
  Native = "native",
  /**
   * 渲染为 KaTeX HTML
   */
  KaTeX = "katex",
  /**
   * 渲染为内联 SVG
   */
  Svg = "svg",
  /**
   * 使用平台公式图片地址
   */
  RemoteImage = "remote-image",
  /**
   * 渲染为位图并上传平台图片
   */
  Image = "image",
}

export default MathRenderModeEnum
