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

describe("test SiyuanDevice", () => {
  const {
    BasePathTypeEnum,
    BrowserUtil,
    DeviceDetection,
    DeviceTypeEnum,
    SiyuanDevice,
  } = require("/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-device/dist/index.cjs")

  // const {
  //   BasePathTypeEnum,
  //   BrowserUtil,
  //   DeviceDetection,
  //   DeviceTypeEnum,
  //   SiyuanDevice,
  // } = require("C:\\Users\\terwer\\Downloads\\zhi-device\\index.cjs")

  it("test isInSiyuanWidget", () => {
    const result = SiyuanDevice.isInSiyuanWidget()
    console.log(result)
  })

  it("test isInSiyuanRendererWin", () => {
    const result = SiyuanDevice.isInSiyuanRendererWin()
    console.log(result)
  })

  it("test isInSiyuanBrowser", () => {
    const result = SiyuanDevice.isInSiyuanBrowser()
    console.log(result)
  })

  it("test isInSiyuanBrowser", () => {
    const result = SiyuanDevice.siyuanWindow()
    console.log(result)
  })

  it("test requireNpm", () => {
    const result = SiyuanDevice.requireNpm("path")
    console.log(result)
  })

  it("test joinPath", () => {
    const result = SiyuanDevice.joinPath("/path1/", "/path2/")
    console.log(result)
  })

  it("test browserJoinPath", () => {
    const result = SiyuanDevice.browserJoinPath("/path1", "path2/")
    console.log(result)
  })

  it("test siyuanWorkspaceName", () => {
    const result = SiyuanDevice.siyuanWorkspaceName()
    console.log(result)
  })

  it("test siyuanConfPath", () => {
    const result = SiyuanDevice.siyuanConfPath()
    console.log(result)
  })

  it("test siyuanDataPath", () => {
    const result = SiyuanDevice.siyuanDataPath()
    console.log(result)
  })

  it("test siyuanDataRelativePath", () => {
    const result = SiyuanDevice.siyuanDataRelativePath()
    console.log(result)
  })

  it("test siyuanAppearancePath", () => {
    const result = SiyuanDevice.siyuanAppearancePath()
    console.log(result)
  })

  it("test siyuanAppearanceRelativePath", () => {
    const result = SiyuanDevice.siyuanAppearanceRelativePath()
    console.log(result)
  })

  it("test siyuanThemePath", () => {
    const result = SiyuanDevice.siyuanThemePath()
    console.log(result)
    // /Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes
  })

  it("test siyuanThemeRelativePath", () => {
    const result = SiyuanDevice.siyuanThemeRelativePath()
    console.log(result)
    // /appearance/themes
  })

  it("test appDataFolder", () => {
    const result = SiyuanDevice.appDataFolder()
    console.log(result)
    // Mac
    // /Users/terwer/Library/Application Support
    //
    // Windows
    // C:\Users\terwer\AppData\Roaming
    //
    // Linux
    // /home/terwer
  })

  it("test appNpmFolder", () => {
    const result = SiyuanDevice.appNpmFolder()
    console.log(result)
    // Mac
    // /Users/terwer/Library/Application Support/siyuancommunity/[工作空间]
    //
    // Windows
    // C:\Users\terwer\AppData\Roaming\siyuancommunity\[工作空间]
    //
    // Linux
    // /home/terwer/siyuancommunity/[工作空间]
  })

  it("test appServiceFolder", () => {
    const result = SiyuanDevice.appServiceFolder()
    console.log(result)
    // Mac
    // /Users/terwer/Library/Application Support/siyuancommunity/[工作空间]/apps
    //
    // Windows
    // C:\Users\terwer\AppData\Roaming\siyuancommunity\[工作空间]\apps
    //
    // Linux
    // /home/terwer/siyuancommunity/[工作空间]/apps
  })
})
