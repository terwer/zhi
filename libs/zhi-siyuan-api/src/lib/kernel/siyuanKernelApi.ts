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

import SiyuanConfig from "../config/siyuanConfig"
import ISiyuanKernelApi, { type SiyuanData } from "./ISiyuanKernelApi"
import { JsonUtil, StrUtil } from "zhi-common"
import { createSiyuanAppLogger } from "../utils"

/**
 * 思源笔记服务端API v2.8.2
 *
 * 1. 均是 POST 方法
 *
 * 2. 需要带参的接口，参数为 JSON 字符串，放置到 body 里，标头 Content-Type 为 application/json
 *
 * 3. 鉴权：在 `设置` - `关于` 里查看 API token，请求标头：Authorization: Token xxx
 *
 * @public
 * @author terwer
 * @since 1.0.0
 * @see {@link https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md#%E9%89%B4%E6%9D%83 siyuan-api}
 */
class SiyuanKernelApi implements ISiyuanKernelApi {
  /**
   * 思源笔记服务端API版本号
   */
  public readonly VERSION

  private logger
  public readonly siyuanConfig

  /**
   * 初始化思源服务端 API
   *
   * @param cfg -配置项
   */
  constructor(cfg: SiyuanConfig) {
    this.VERSION = "1.0.0"

    this.siyuanConfig = cfg
    this.logger = createSiyuanAppLogger("siyuan-kernel-api")
  }

  /**
   * 分页获取根文档
   *
   * @param keyword - 关键字
   */
  public async getRootBlocksCount(keyword: string): Promise<number> {
    const stmt = `SELECT COUNT(DISTINCT b1.root_id) as count
        FROM blocks b1
        WHERE 1 = 1
        AND (b1.root_id ='${keyword}' OR (b1.content LIKE '%${keyword}%') OR (b1.tag LIKE '%${keyword}%')
    )`
    const data = (await this.sql(stmt)) as any[]
    this.logger.debug("getRootBlocksCount data=>", data[0].count)
    return data[0].count
  }

  /**
   * 分页获取根文档

   * ```sql
   * select DISTINCT b2.root_id,b2.parent_id,b2.content from blocks b2
   *        WHERE 1==1
   * AND b2.id IN (
   *     SELECT DISTINCT b1.root_id
   *        FROM blocks b1
   *        WHERE 1 = 1
   *        AND ((b1.content LIKE '%github%') OR (b1.tag LIKE '%github%'))
   *        ORDER BY b1.updated DESC,b1.created DESC LIMIT 0,10
   * )
   * ORDER BY b2.updated DESC,b2.created DESC
   * ```
   *
   * @param page 页码
   * @param pagesize 数目
   * @param keyword 可选，搜索关键字
   */
  public async getRootBlocks(page: number, pagesize: number, keyword: string): Promise<any> {
    const stmt = `select DISTINCT b2.root_id,b2.parent_id,b2.content from blocks b2
        WHERE 1==1
        AND b2.id IN (
             SELECT DISTINCT b1.root_id
                FROM blocks b1
                WHERE 1 = 1
                AND (b1.root_id ='${keyword}' OR (b1.content LIKE '%${keyword}%') OR (b1.tag LIKE '%${keyword}%'))
                ORDER BY b1.updated DESC,b1.created DESC LIMIT ${page * pagesize},${pagesize}
        )
        ORDER BY b2.updated DESC,b2.created DESC`
    return await this.sql(stmt)
  }

  /**
   * 获取该文档下面的子文档个数
   *
   * ```sql
   * SELECT COUNT(DISTINCT b1.root_id) AS count
   * FROM blocks b1
   * WHERE b1.path LIKE '%/20220927094918-1d85uyp%';
   * ```
   *
   * @param docId 文档ID
   */
  public async getSubdocCount(docId: string): Promise<number> {
    const stmt = `SELECT COUNT(DISTINCT b1.root_id) AS count
        FROM blocks b1
        WHERE b1.root_id='${docId}' OR b1.path LIKE '%/${docId}%'`
    const data = (await this.sql(stmt)) as any[]
    return data[0].count
  }

  /**
   * 分页获取子文档
   *
   * ```sql
   * SELECT DISTINCT b2.root_id,b2.content,b2.path FROM blocks b2
   * WHERE b2.id IN (
   *   SELECT DISTINCT b1.root_id
   *      FROM blocks b1
   *      WHERE b1.path like '%/20220927094918-1d85uyp%'
   *      AND ((b1.content LIKE '%文档%') OR (b1.tag LIKE '%文档%'))
   *      ORDER BY b1.updated DESC,b1.created DESC LIMIT 0,10
   * )
   * ORDER BY b2.updated DESC,b2.created DESC
   * ```
   *
   * @param docId 文档ID
   * @param page 页码
   * @param pagesize 数目
   * @param keyword 关键字
   */
  public async getSubdocs(docId: string, page: number, pagesize: number, keyword: string): Promise<any> {
    const stmt = `SELECT DISTINCT b2.root_id,b2.content,b2.path FROM blocks b2
        WHERE b2.id IN (
          SELECT DISTINCT b1.root_id
             FROM blocks b1
             WHERE b1.root_id='${docId}' OR b1.path like '%/${docId}%'
             AND ((b1.content LIKE '%${keyword}%') OR (b1.tag LIKE '%${keyword}%'))
             ORDER BY b1.updated DESC,b1.created DESC LIMIT ${page * pagesize},${pagesize}
        )
        ORDER BY b2.content,b2.updated DESC,b2.created DESC,id`

    this.logger.debug("siyuanApi getSubdocs sql=>", stmt)
    return await this.sql(stmt)
  }

  /**
   * 以id获取思源块信息
   * @param blockId 块ID
   */
  public async getBlockByID(blockId: string): Promise<any> {
    const stmt = `select *
                from blocks
                where id = '${blockId}'`
    const data = (await this.sql(stmt)) as any[]
    if (!data || data.length === 0) {
      throw new Error("通过ID查询块信息失败")
    }
    return data[0]
  }

  /**
   * 以slug获取思源块信息
   * @param slug 内容快别名
   */
  public async getRootBlockBySlug(slug: string): Promise<any> {
    const stmt = `select root_id from attributes where name='custom-slug' and value='${slug}' limit 1`
    const data = (await this.sql(stmt)) as any[]
    return data[0]
  }

  /**
   * 以内容块ID获取根块
   *
   * @param blockID 内容块ID
   */
  public async getRootBlock(blockID: string): Promise<any> {
    const stmt = `select root_id from blocks where id='${blockID}' limit 1`
    const data = (await this.sql(stmt)) as any[]
    return data[0]
  }

  /**
   * 导出markdown文本
   *
   * @param docId 文档id
   */
  public async exportMdContent(docId: string): Promise<any> {
    const data = {
      id: docId,
    }
    const url = "/api/export/exportMdContent"
    return await this.siyuanRequest(url, data)
  }

  /**
   * 导出预览
   *
   * @param docId 文档id
   */
  public async exportPreview(docId: string): Promise<any> {
    const data = {
      id: docId,
    }
    const url = "/api/export/preview"
    return await this.siyuanRequest(url, data)
  }

  public async getDoc(docId: string): Promise<SiyuanData["data"]> {
    const params = {
      id: docId,
      isBacklink: false,
      mode: 0,
      size: 128,
    }
    const url = "/api/filetree/getDoc"
    return await this.siyuanRequest(url, params)
  }

  /**
   * 以sql发送请求
   *
   * @param sql - sql
   */
  public async sql(sql: string): Promise<SiyuanData["data"]> {
    const sqldata: { stmt: string } = {
      stmt: sql,
    }
    const url = "/api/query/sql"
    this.logger.debug("sql=>", sql)
    return await this.siyuanRequest(url, sqldata)
  }

  /**
   * 向思源请求数据
   *
   * @param url - url
   * @param data - 数据
   */
  public async siyuanRequest(url: string, data: object): Promise<SiyuanData["data"]> {
    const reqUrl = `${this.siyuanConfig.apiUrl}${url}`

    const fetchOps = {
      body: JSON.stringify(data),
      method: "POST",
    }
    if (!StrUtil.isEmptyString(this.siyuanConfig.password)) {
      Object.assign(fetchOps, {
        headers: {
          Authorization: `Token ${this.siyuanConfig.password}`,
        },
      })
    }
    if (!StrUtil.isEmptyString(this.siyuanConfig.cookie)) {
      Object.assign(fetchOps, {
        headers: {
          Cookie: this.siyuanConfig.cookie,
        },
      })
    }

    this.logger.debug("开始向思源请求数据，reqUrl=>", reqUrl)
    this.logger.debug("开始向思源请求数据，fetchOps=>", fetchOps)

    const response = await fetch(reqUrl, fetchOps)
    const resJson = await response.json()
    this.logger.debug("思源请求数据返回，resJson=>", resJson)

    if (resJson.code === -1) {
      throw new Error(resJson.msg)
    }
    return resJson.code === 0 ? resJson.data : null
  }

  public async siyuanRequestForm(url: string, formData: any): Promise<SiyuanData> {
    const reqUrl = `${this.siyuanConfig.apiUrl}${url}`
    const fetchOps = {
      method: "POST",
      body: formData,
    }
    if (!StrUtil.isEmptyString(this.siyuanConfig.password)) {
      Object.assign(fetchOps, {
        headers: {
          Authorization: `Token ${this.siyuanConfig.password}`,
        },
      })
    }
    if (!StrUtil.isEmptyString(this.siyuanConfig.cookie)) {
      Object.assign(fetchOps, {
        headers: {
          Cookie: this.siyuanConfig.cookie,
        },
      })
    }

    const response = await fetch(reqUrl, fetchOps)

    if (!response.ok) {
      throw new Error(`资源文件上传失败 => ${response.status} ${response.statusText}`)
    } else {
      const resJson = await response.json()
      if (resJson.code === -1) {
        throw new Error(resJson.msg)
      }
      return resJson.code === 0 ? resJson.data : null
    }
  }

  /**
   * 列出笔记本
   */
  public async lsNotebooks(): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/lsNotebooks", {})
  }

  /**
   * 打开笔记本
   *
   * @param notebookId - 笔记本ID
   */
  public async openNotebook(notebookId: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/openNotebook", {
      notebook: notebookId,
    })
  }

  /**
   * 关闭笔记本
   *
   * @param notebookId - 笔记本ID
   */
  public async closeNotebook(notebookId: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/closeNotebook", {
      notebook: notebookId,
    })
  }

  /**
   * 重命名笔记本
   *
   * @param notebookId - 笔记本ID
   * @param name - 新笔记本名称
   */
  public async renameNotebook(notebookId: string, name: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/renameNotebook", {
      notebook: notebookId,
      name: name,
    })
  }

  /**
   * 创建笔记本
   *
   * @param name - 新笔记本名称
   */
  public async createNotebook(name: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/createNotebook", {
      name: name,
    })
  }

  /**
   * 删除笔记本
   *
   * @param notebookId - 笔记本ID
   */
  public async removeNotebook(notebookId: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/removeNotebook", {
      notebook: notebookId,
    })
  }

  /**
   * 获取笔记本配置
   *
   * @param notebookId - 笔记本ID
   */
  public async getNotebookConf(notebookId: string): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/getNotebookConf", {
      notebook: notebookId,
    })
  }

  /**
   * 保存笔记本配置
   *
   * ```json
   * {
   *   "notebook": "20210817205410-2kvfpfn",
   *   "conf": {
   *       "name": "测试笔记本",
   *       "closed": false,
   *       "refCreateSavePath": "",
   *       "createDocNameTemplate": "",
   *       "dailyNoteSavePath": "/daily note/{{now | date \"2006/01\"}}/{{now | date \"2006-01-02\"}}",
   *       "dailyNoteTemplatePath": ""
   *     }
   * }
   * ```
   * @param notebookConf - 笔记本配置
   */
  public async setNotebookConf(notebookConf: object): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notebook/setNotebookConf", notebookConf)
  }

  /**
   * 推送消息
   *
   * 参数
   *
   * ```json
   * {
   *   "msg": "test",
   *   "timeout": 7000
   * }
   * ```
   *
   * timeout：消息持续显示时间，单位为毫秒。可以不传入该字段，默认为 7000 毫秒
   *
   * 返回值
   *
   * ```
   * {
   *   "code": 0,
   *   "msg": "",
   *   "data": {
   *       "id": "62jtmqi"
   *   }
   * }
   *
   * id：消息 ID
   * ```
   *
   * @param msgObj 消息体
   */
  public async pushMsg(msgObj: object): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notification/pushMsg", msgObj)
  }

  /**
   * 推送报错消息
   *
   * 参数
   *
   * ```
   * {
   *   "msg": "test",
   *   "timeout": 7000
   * }
   * ```
   *
   * timeout：消息持续显示时间，单位为毫秒。可以不传入该字段，默认为 7000 毫秒
   *
   * 返回值
   *
   * ```
   * {
   *   "code": 0,
   *   "msg": "",
   *   "data": {
   *       "id": "qc9znut"
   *   }
   * }
   *
   * id：消息 ID
   * ```
   *
   * @param msgObj
   */
  public async pushErrMsg(msgObj: object): Promise<SiyuanData> {
    return await this.siyuanRequest("/api/notification/pushErrMsg", msgObj)
  }

  /**
   * 通过 Markdown 创建文档
   *
   * @param notebook - 笔记本
   * @param path - 路径
   * @param md - md
   */
  public async createDocWithMd(notebook: string, path: string, md: string): Promise<SiyuanData> {
    const params = {
      notebook: notebook,
      path: path,
      markdown: md,
    }
    return await this.siyuanRequest("/api/filetree/createDocWithMd", params)
  }

  /**
   * 删除文档
   *
   * @param notebook - 笔记本
   * @param path - 路径
   */
  public async removeDoc(notebook: string, path: string): Promise<SiyuanData> {
    const params = {
      notebook: notebook,
      path: path,
    }
    return await this.siyuanRequest("/api/filetree/removeDoc", params)
  }

  public async uploadAsset(formData: any): Promise<SiyuanData> {
    return await this.siyuanRequestForm("/api/asset/upload", formData)
  }

  /**
   * 以id获取所有图片块
   *
   * @param blockId - 块ID
   */
  public async getImageBlocksByID(blockId: string): Promise<any[]> {
    const stmt = `select *
                from blocks
                where root_id = '${blockId}' and markdown like '%![%'`
    const data = await this.sql(stmt)
    if (!data) {
      throw new Error("通过ID查询图片块信息失败")
    }
    return data as any[]
  }

  /**
   * 读取文件
   *
   * @param path - 文件路径，例如：/data/20210808180117-6v0mkxr/20200923234011-ieuun1p.sy
   * @param type - 类型
   */
  public async getFile(path: string, type: "text" | "json"): Promise<any> {
    const response = await fetch(`${this.siyuanConfig.apiUrl}/api/file/getFile`, {
      method: "POST",
      headers: {
        Cookie: this.siyuanConfig.cookie,
        Authorization: `Token ${this.siyuanConfig.password}`,
      },
      body: JSON.stringify({
        path: path,
      }),
    })
    if (response.status === 200) {
      if (type === "text") {
        const text = await response.text()
        const resData = JsonUtil.safeParse<SiyuanData>(text, {} as SiyuanData)
        if (resData?.code === 404) {
          return ""
        }
        return text
      }
      if (type === "json") {
        return await response.json()
      }
    }
    return null
  }

  /**
   * 文件是否存在
   *
   * @param path - 路径
   * @param type - 类型
   */
  public async isFileExists(path: string, type: "text" | "json"): Promise<boolean> {
    try {
      const res = await this.getFile(path, type)
      const data = JsonUtil.safeParse<SiyuanData>(res, {} as SiyuanData)
      return data.code == 200
    } catch {
      return false
    }
  }

  /**
   * 获取公开文件
   *
   * @param path - 完整路径
   */
  public async getPublicFile(path: string): Promise<any> {
    const response = await fetch(`${this.siyuanConfig.apiUrl}${path}`, { method: "GET" })
    if (response.status === 200) {
      const text = await response.text()
      const resData = JsonUtil.safeParse<SiyuanData>(text, {} as SiyuanData)
      if (resData?.code === 404) {
        return ""
      }
      return text
    }
    return null
  }

  /**
   * 删除文件
   *
   * @param path - 路径
   */
  public async removeFile(path: string): Promise<SiyuanData> {
    const params = {
      path: path,
    }
    return await this.siyuanRequest("/api/file/removeFile", params)
  }

  /**
   * 写入文件
   *
   * @param path - 文件路径，例如：/data/20210808180117-6v0mkxr/20200923234011-ieuun1p.sy
   * @param file - 上传的文件
   */
  public async putFile(path: string, file: any): Promise<SiyuanData> {
    // import FormData from "form-data"
    const formData = new FormData()
    formData.append("path", path)
    formData.append("isDir", "false")
    formData.append("modTime", Math.floor(Date.now() / 1000).toString())
    formData.append("file", file)
    return await this.siyuanRequestForm("/api/file/putFile", formData)
  }

  /**
   * 将文本数据保存到指定路径
   *
   * @param path - 保存文件的路径
   * @param text - 要保存的文本数据
   * @returns - Promise 对象，表示保存操作是否成功
   */
  public async saveTextData(path: string, text: string): Promise<SiyuanData> {
    // 创建一个包含文本数据的 Blob 对象，并将其放入 File 中
    const file = new File([new Blob([text])], path.split("/").pop())
    // 调用 putFile 方法将文件保存到指定路径
    return await this.putFile(path, file)
  }

  /**
   * 正向代理
   *
   * @param url - 转发的 URL
   * @param headers - HTTP 请求标头
   * @param payload - HTTP 请求体，对象或者是字符串
   * @param method - HTTP 方法，默认为 GET
   * @param contentType - HTTP Content-Type，默认为 application/json
   * @param timeout - 超时时间，单位为毫秒，默认为 7000 毫秒
   */
  public async forwardProxy(
    url: string,
    headers: any[],
    payload?: any,
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    contentType?: string,
    timeout?: number
  ): Promise<SiyuanData["data"]> {
    const params = {
      url: url,
      headers: headers,
      payload: payload,
      method: method,
      contentType: contentType,
      timeout: timeout,
    }
    return await this.siyuanRequest("/api/network/forwardProxy", params)
  }

  /**
   * 获取块属性
   * @param blockId
   */
  public async getBlockAttrs(blockId: string): Promise<any> {
    const data = {
      id: blockId,
    }
    const url = "/api/attr/getBlockAttrs"
    return await this.siyuanRequest(url, data)
  }

  /**
   * 设置块属性
   * @param blockId
   * @param attrs
   */
  public async setBlockAttrs(blockId: string, attrs: any): Promise<any> {
    const url = "/api/attr/setBlockAttrs"
    return await this.siyuanRequest(url, {
      id: blockId,
      attrs,
    })
  }

  public async getBlockKramdown(id: string): Promise<SiyuanData["data"]> {
    const params = {
      id: id,
    }
    return await this.siyuanRequest("/api/block/getBlockKramdown", params)
  }

  public async updateBlock(id: string, data: string, dataType?: "markdown" | "dom"): Promise<SiyuanData["data"]> {
    const params = {
      dataType: dataType ?? "markdown",
      data: data,
      id: id,
    }
    return await this.siyuanRequest("/api/block/updateBlock", params)
  }
}

export default SiyuanKernelApi
