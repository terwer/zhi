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

import SiyuanApi from "./zhi-siyuan-api"
import { describe, expect, it } from "vitest"
import path from "path"
import SiyuanConfig from "./config/siyuanConfig"

describe("zhiSiyuanApi", async () => {
  // appInstance
  const appInstance: any = {}
  const projectBase = path.resolve(__dirname, "../../..")
  const moduleBase = path.resolve(__dirname, "../../../../..")
  // lute
  require(path.join(moduleBase, "libs/zhi-common/public/libs/lute/lute-1.7.5-20230410.min.cjs"))

  it("siyuanApi", () => {
    const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
    const siyuanApi = new SiyuanApi(appInstance, siyuanConfig)
    expect(siyuanApi).toBeTruthy()
  })
})