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
 * 思源 API 返回类型
 */
interface SiyuanData {
  /**
   * 非 0 为异常情况
   */
  code: number

  /**
   * 正常情况下是空字符串，异常情况下会返回错误文案
   */
  msg: string

  /**
   * 可能为 \{\}、[] 或者 NULL，根据不同接口而不同
   */
  data: any[] | any | null | undefined
}

/**
 * 思源笔记内核接口定义
 *
 * @see {@link https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md#%E9%89%B4%E6%9D%83 siyuan-api}
 */
interface ISiyuanKernelApi {
  // /api/notebook/lsNotebooks
  lsNotebooks(): Promise<SiyuanData>
  // /api/notebook/openNotebook
  openNotebook(notebookId: string): Promise<SiyuanData>
  // /api/notebook/closeNotebook
  closeNotebook(notebookId: string): Promise<SiyuanData>
  // /api/notebook/renameNotebook
  renameNotebook(notebookId: string, name: string): Promise<SiyuanData>
  // /api/notebook/createNotebook
  createNotebook(name: string): Promise<SiyuanData>
  // /api/notebook/removeNotebook
  removeNotebook(notebookId: string): Promise<SiyuanData>
  // /api/notebook/getNotebookConf
  getNotebookConf(notebookId: string): Promise<SiyuanData>
  // /api/notebook/setNotebookConf
  setNotebookConf(notebookConf: object): Promise<SiyuanData>

  // /api/notification/pushMsg
  pushMsg(msgObj: object): Promise<SiyuanData>
  // /api/notification/pushErrMsg
  pushErrMsg(msgObj: object): Promise<SiyuanData>

  // /api/filetree/createDocWithMd
  createDocWithMd(notebook: string, path: string, md: string): Promise<SiyuanData>
  // /api/filetree/removeDoc
  removeDoc(notebook: string, path: string): Promise<SiyuanData>

  // /api/asset/upload
  uploadAsset(formData: any): Promise<SiyuanData>

  // /api/file/getFile
  getFile(path: string, type: "text" | "json"): Promise<any>
  getPublicFile(path: string): Promise<any>
  // /api/file/removeFile
  removeFile(path: string): Promise<SiyuanData>
  isFileExists(path: string, type: "text" | "json"): Promise<boolean>
  // /api/file/putFile
  putFile(path: string, file: any): Promise<SiyuanData>
  saveTextData(path: string, text: string): Promise<SiyuanData>

  // /api/network/forwardProxy
  forwardProxy(
    url: string,
    headers: any[],
    payload?: any,
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    contentType?: string,
    payloadEncoding?: "text" | "base64" | "base64-std" | "base64-url" | "base32" | "base32-std" | "base32-hex" | "hex",
    responseEncoding?: "text" | "base64" | "base64-std" | "base64-url" | "base32" | "base32-std" | "base32-hex" | "hex",
    timeout?: number
  ): Promise<SiyuanData["data"]>

  // /api/attr/getBlockAttrs
  getBlockAttrs(blockId: string): Promise<any>
  getSingleBlockAttr(blockId: string, key: string): Promise<string>
  // setBlockAttrs
  setBlockAttrs(blockId: string, attrs: any): Promise<any>
  setSingleBlockAttr(blockId: string, key: string, value: string): Promise<any>
  // /api/block/getBlockKramdown
  getBlockKramdown(id: string): Promise<SiyuanData["data"]>
  // /api/block/updateBlock
  updateBlock(id: string, data: string, dataType?: "markdown" | "dom"): Promise<SiyuanData["data"]>

  // /api/outline/getDocOutline
  getOutline(blockId: string, level?: number): Promise<any[]>
  // 先直接解析 path 读取父级向上 level 级，再使用 /api/filetree/listDocsByPath 获取子级向下 level 级
  getDocTree(notebook: string, path: string, level?: number, parentPathArray?: any[]): Promise<any[]>
}

export default ISiyuanKernelApi
export type { SiyuanData }
