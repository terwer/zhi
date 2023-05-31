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
import { fetchNode } from "./nodeXmlrpc"
import path from "path"
import fetch from "cross-fetch"
import xmlbuilder2 from "xmlbuilder2"

describe("test nodeXmlrpc", async () => {
  // appInstance
  const appInstance: any = {}
  // const projectBase = path.resolve(__dirname, "../../..")
  const moduleBase = path.resolve(__dirname, "../../../../../../..")
  appInstance.fetch = fetch
  appInstance.xmlbuilder2 = xmlbuilder2
  const simpleXmlrpc = (await import(path.join(moduleBase, "simple-xmlrpc/dist/index.js"))) as any
  appInstance.simpleXmlrpc = {
    SimpleXmlRpcClient: simpleXmlrpc["SimpleXmlRpcClient"],
  }

  it("test fetchNode", async () => {
    console.log(appInstance)
    console.log(typeof appInstance.simpleXmlrpc.SimpleXmlRpcClient)
    const result = await fetchNode(appInstance, "http://127.0.0.1:8000/xmlrpc.php", "metaWeblog.getUsersBlogs", [
      "",
      "terwer",
      "123456",
    ])
    console.log("test fetchNode result =>", result)
  })
})
