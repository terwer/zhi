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
class Attachment {
  attachment_id?: string
  caption?: string
  date_created_gmt?: Date
  description?: string
  file?: string
  id?: string
  link?: string
  metadata?: {
    width: number
    height: number
    file: string
    filesize: number
    sizes: Array<any>
  }
  parent?: number
  thumbnail?: string
  title?: string
  type?: string
  /**
   * 图片链接，优先级低于链接
   */
  url?: string
  /**
   * 图片宏，优先级高于链接
   */
  macro?: string

  constructor(data: any) {
    this.attachment_id = data.attachment_id
    this.caption = data.caption
    this.date_created_gmt = new Date(data.date_created_gmt)
    this.description = data.description
    this.file = data.file
    this.id = data.id
    this.link = data.link
    this.metadata = {
      width: data?.metadata?.width,
      height: data?.metadata?.height,
      file: data?.metadata?.file,
      filesize: data?.metadata?.filesize,
      sizes: data?.metadata?.sizes ? [...data.metadata.sizes] : [],
    }
    this.parent = data.parent
    this.thumbnail = data.thumbnail
    this.title = data.title
    this.type = data.type
    this.url = data.url
    this.macro = data.macro
  }
}

export default Attachment
