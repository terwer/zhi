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

import { afterEach, beforeEach, describe, expect, it } from "vitest"
import xmlbuilder2 from "xmlbuilder2"
import { Deserializer, Serializer, SimpleXmlRpcClient, XmlrpcUtil } from "simple-xmlrpc"
import WordpressApiAdaptor from "./wordpressApiAdaptor"
import WordpressConfig from "../config/wordpressConfig"

describe("test WordpressApiAdaptor", async () => {
  // appInstance
  const appInstance: any = {}
  appInstance.fetch = fetch
  appInstance.xmlbuilder2 = xmlbuilder2
  appInstance.simpleXmlrpc = {
    SimpleXmlRpcClient: SimpleXmlRpcClient,
    Serializer: Serializer,
    Deserializer: Deserializer,
    XmlrpcUtil: XmlrpcUtil,
  }

  beforeEach(async () => {
    console.log("======test is starting...======")
  })

  afterEach(() => {
    console.log("======test is finished.========")
  })

  it("test apiAdaptor", async () => {
    const wordpressConfig = new WordpressConfig("http://127.0.0.1:8000/xmlrpc.php", "terwer", "123456")
    const apiAdaptor = new WordpressApiAdaptor(appInstance, wordpressConfig)

    expect(apiAdaptor).toBeTruthy()
  })

  it("test getUsersBlogs", async () => {
    // const wordpressConfig = new WordpressConfig("http://127.0.0.1:8000/xmlrpc.php", "terwer", "123456")
    // const wordpressConfig = new WordpressConfig("http://127.0.0.1:8000/", "terwer", "123456")
    const wordpressConfig = new WordpressConfig("http://127.0.0.1:8000", "terwer", "123456")
    // console.log(wordpressConfig)
    const apiAdaptor = new WordpressApiAdaptor(appInstance, wordpressConfig)

    const usersBlogs = await apiAdaptor.getUsersBlogs()
    console.log(usersBlogs)
  })
})
