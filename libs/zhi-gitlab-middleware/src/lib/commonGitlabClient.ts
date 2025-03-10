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

import { simpleLogger } from "zhi-lib-base"
import { CommonFetchClient, ICommonFetchClient } from "zhi-fetch-middleware"

/**
 * 通用的Gitlab客户端
 */
class CommonGitlabClient {
  private readonly logger: any
  private readonly token: string
  private readonly user: string
  private readonly repo: string
  private readonly branch: string
  private readonly commitMessage: string
  private readonly authorEmail: string
  private readonly authorName: string
  private readonly commonFetchClient: ICommonFetchClient

  /**
   * 初始化 Gitlab API
   *
   * @param appInstance - appInstance
   * @param host - 地址
   * @param token - token
   * @param user - user
   * @param repo - 项目名称或者encodeURIComponent后的项目名称
   * @param branch - 分支、标签或提交哈希
   * @param commitMessage - 提交信息
   * @param authorEmail - 邮箱
   * @param authorName - 提交人
   * @param commonFetchClient - 请求客户端
   * @param middlewareUrl - 代理地址
   * @param isDev - 是否调试模式
   */
  constructor(
    appInstance: any,
    host: string,
    token: string,
    user: string,
    repo: string,
    branch: string,
    commitMessage: string,
    authorEmail: string,
    authorName: string,
    commonFetchClient?: ICommonFetchClient,
    middlewareUrl?: string,
    isDev?: boolean
  ) {
    this.logger = simpleLogger("common-gitlab-client", "zhi-gitlab-middleware")
    this.token = token
    this.user = user
    this.repo = repo
    this.branch = branch
    this.commitMessage = commitMessage
    this.authorEmail = authorEmail
    this.authorName = authorName
    this.commonFetchClient = commonFetchClient ?? new CommonFetchClient(appInstance, host, middlewareUrl, isDev)
  }

  /**
   * 从存储库中检索文件内容
   *
   * @param filePath - 文件路径
   * @returns 文件内容
   */
  public async getRepositoryFile(filePath: string): Promise<any> {
    const id = `${this.user}/${this.repo}`
    const endpointUrl =
      `/api/v4/projects/${encodeURIComponent(id)}/repository/files/` +
      `${encodeURIComponent(filePath)}?ref=${this.branch}`
    const fetchOptions: RequestInit = {
      headers: {
        "PRIVATE-TOKEN": this.token,
      },
    }
    const resJson = await this.commonFetchClient.fetchCall(endpointUrl, fetchOptions)
    this.logger.debug("get resJson from fetchCall", resJson)
    this.logger.debug(`get file form ${filePath} on branch ${this.branch}`)
    return resJson
  }

  /**
   * 在存储库中创建文件
   *
   * @param filePath - 文件路径
   * @param content - 文件内容
   * @param encoding - base64 或者 text
   * @returns 创建文件的响应
   */
  public async createRepositoryFile(filePath: string, content: string, encoding?: string): Promise<any> {
    const id = `${this.user}/${this.repo}`
    const endpointUrl =
      `/api/v4/projects/${encodeURIComponent(id)}/repository/files/` + `${encodeURIComponent(filePath)}`
    const requestData = {
      branch: this.branch,
      author_email: this.authorEmail,
      author_name: this.authorName,
      content: content,
      commit_message: this.commitMessage,
    } as any
    if (encoding) {
      requestData.encoding = encoding
    }
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "PRIVATE-TOKEN": this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }
    const resJson = await this.commonFetchClient.fetchCall(endpointUrl, fetchOptions)
    this.logger.debug("get resJson from fetchCall", resJson)
    this.logger.debug(`created file at ${filePath} on branch ${this.branch}`)
    return resJson
  }

  /**
   * 更新存储库中的文件
   *
   * @param filePath - 文件路径
   * @param content - 文件内容
   * @returns 更新文件的响应
   */
  public async updateRepositoryFile(filePath: string, content: string): Promise<any> {
    const id = `${this.user}/${this.repo}`
    const endpointUrl =
      `/api/v4/projects/${encodeURIComponent(id)}/repository/files/` + `${encodeURIComponent(filePath)}`
    const requestData = {
      branch: this.branch,
      author_email: this.authorEmail,
      author_name: this.authorName,
      content: content,
      commit_message: this.commitMessage,
    }
    const fetchOptions: RequestInit = {
      method: "PUT",
      headers: {
        "PRIVATE-TOKEN": this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }
    const resJson = await this.commonFetchClient.fetchCall(endpointUrl, fetchOptions)
    this.logger.debug("get resJson from fetchCall", resJson)
    this.logger.debug(`updated file at ${filePath} on branch ${requestData.branch}`)
    return resJson
  }

  /**
   * 从存储库中删除文件
   *
   * @param filePath - 文件路径
   * @returns 删除文件的响应
   */
  public async deleteRepositoryFile(filePath: string): Promise<any> {
    const id = `${this.user}/${this.repo}`
    const endpointUrl =
      `/api/v4/projects/${encodeURIComponent(id)}/repository/files/` + `${encodeURIComponent(filePath)}`
    const requestData = {
      branch: this.branch,
      author_email: this.authorEmail,
      author_name: this.authorName,
      commit_message: this.commitMessage,
    }
    const fetchOptions: RequestInit = {
      method: "DELETE",
      headers: {
        "PRIVATE-TOKEN": this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }
    const resJson = await this.commonFetchClient.fetchCall(endpointUrl, fetchOptions)
    return resJson
  }

  /**
   * 获取仓库文件树
   * https://docs.gitlab.com/ee/api/repositories.html#list-repository-tree
   *
   * @param path - 路径
   * @param pageToken - 翻页的ID
   */
  public async getRepositoryTree(path: string, pageToken?: string): Promise<any[]> {
    const id = `${this.user}/${this.repo}`
    let endpointUrl =
      `/api/v4/projects/${encodeURIComponent(id)}/repository/tree?path=${encodeURIComponent(path)}` +
      `&pagination=keyset&per_page=100`
    if (pageToken) {
      this.logger.debug("using page token to get next page")
      endpointUrl = endpointUrl + `&page_token=${pageToken}`
    }
    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        "PRIVATE-TOKEN": this.token,
      },
    }
    const resJson = await this.commonFetchClient.fetchCall(endpointUrl, fetchOptions)
    this.logger.debug("get resJson from fetchCall", resJson)
    this.logger.debug(`read repository tree on branch ${this.branch}`)

    const treeNode = [] as any[]
    const data = resJson
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const node = {
          value: item.path,
          label: item.name,
          isLeaf: item.name.indexOf(".md") > -1,
        }
        treeNode.push(node)
      }
      this.logger.debug("getPageTreeNode,data=>", data)
    }

    return treeNode
  }
}

export default CommonGitlabClient
