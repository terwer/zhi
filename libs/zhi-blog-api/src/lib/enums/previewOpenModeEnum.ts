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
 * 文章预览/查看链接的打开方式。
 *
 * 用于声明平台「查看文章」链接应该如何被打开，插件据此选择打开通道。
 * 默认值为 {@link PreviewOpenModeEnum.ExternalUrl}，与历史行为一致（外部浏览器打开），
 * 保证旧数据/旧平台适配器兼容；需要特殊打开的平台在适配器内显式声明。
 */
enum PreviewOpenModeEnum {
  /**
   * 外部浏览器打开公网 URL（大多数平台：文章发布后为公开链接）。
   */
  ExternalUrl = "externalUrl",
  /**
   * 外部/本地打开本地文件（如本地系统导出的 file:// 预览）。
   */
  ExternalFile = "externalFile",
  /**
   * 在应用授权会话窗口中打开（如公众号草稿编辑页，链接绑定授权 cookie 会话，
   * 仅在含该会话的窗口内打开才有效，否则会跳「请重新登录」）。
   */
  AppSession = "appSession",
}

export default PreviewOpenModeEnum