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

import { describe, it } from "vitest"
import fetch from "cross-fetch"
import { Base64 } from "js-base64"
import { CommonFetchClient } from "../index"

describe("test commonFetchClient", async () => {
  // appInstance
  const appInstance: any = {}
  appInstance.fetch = fetch

  it("test fetchCall", async () => {
    const requestUrl = "http://127.0.0.1:9564/kms16_release"
    const endpointUrl = "/api/kms-multidoc/kmsMultidocKnowledgeRestService/queryDoc"

    // fetchOptions
    const kmsUsername = "terwer"
    const kmsPassword = "123456"
    const basicToken = Base64.toBase64(`${kmsUsername}:${kmsPassword}`)
    const bodyJson = {
      fdId: "186a05544e8981e71d8e28c408e9ab42",
    }
    const fetchOptions = {
      body: JSON.stringify(bodyJson),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicToken}`,
      },
      method: "POST",
    }

    const commonFetchClient = new CommonFetchClient(appInstance, requestUrl)
    const result = await commonFetchClient.fetchCall(endpointUrl, fetchOptions)
    console.log("test fetchCall result =>", result)
  })
})
