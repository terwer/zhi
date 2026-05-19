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

import { describe, expect, it } from "vitest"
import BlogAdaptor from "./blogAdaptor"
import BlogApi from "./blogApi"
import WebAdaptor from "./webAdaptor"
import WebApi from "./webApi"

describe("zhiBlogApi", () => {
  it("blogApi", () => {
    console.log("blogApi should be implemented as a specific BlogApi, it cannot be used directly")
  })

  it("validatePublish defaults to allowing publish", async () => {
    const api = new BlogApi()

    await expect(api.validatePublish()).resolves.toEqual({ canPublish: true })
  })

  it("BlogAdaptor forwards validatePublish result", async () => {
    class BlockingBlogApi extends BlogApi {
      public async validatePublish() {
        return { canPublish: false, reason: "missing category" }
      }
    }

    const adaptor = new BlogAdaptor(new BlockingBlogApi())

    await expect(adaptor.validatePublish()).resolves.toEqual({ canPublish: false, reason: "missing category" })
  })

  it("WebAdaptor forwards validatePublish through the shared blog contract", async () => {
    class BlockingWebApi extends WebApi {
      public async validatePublish() {
        return { canPublish: false, reason: "missing web publish config" }
      }
    }

    const adaptor = new WebAdaptor(new BlockingWebApi())

    await expect(adaptor.validatePublish()).resolves.toEqual({ canPublish: false, reason: "missing web publish config" })
  })

  it("WebApi defaults logoutWebAuth to a fail-fast not implemented error", async () => {
    const api = new WebApi()

    await expect(api.logoutWebAuth()).rejects.toThrow("You must implement logoutWebAuth in sub class")
  })

  it("WebAdaptor forwards logoutWebAuth through the shared web contract", async () => {
    class LogoutTrackingWebApi extends WebApi {
      public called = false

      public async logoutWebAuth() {
        this.called = true
        return true
      }
    }

    const api = new LogoutTrackingWebApi()
    const adaptor = new WebAdaptor(api)

    await expect(adaptor.logoutWebAuth()).resolves.toBe(true)
    expect(api.called).toBe(true)
  })
})
