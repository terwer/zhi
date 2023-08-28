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

import { Gitlab } from "@gitbeaker/rest"
import { simpleLogger } from "zhi-lib-base"
import { Base64 } from "js-base64"

class CommonGitlabClient {
  private readonly logger: any
  private readonly gitlabApi: any

  constructor(host: string, token: string) {
    this.logger = simpleLogger("common-gitlab-client", "zhi-gitlab-middleware")
    this.gitlabApi = new Gitlab({
      host: host,
      token: token,
    })
  }

  /**
   * 从存储库中检索文件内容
   *
   * @param projectId - 项目ID
   * @param filePath - 文件路径
   * @param ref - 分支、标签或提交哈希
   * @returns 文件内容
   */
  public async getFileContent(projectId: string, filePath: string, ref: string): Promise<string> {
    const file = await this.gitlabApi.RepositoryFiles.show(projectId, filePath, ref)
    this.logger.debug(`get file form ${filePath} on branch ${ref}`)
    return Base64.fromBase64(file.content)
  }
}

export default CommonGitlabClient
