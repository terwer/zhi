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
// import localConfig from "@/main/common/initLocalConfig"
import { WINDOW_HEIGHT, WINDOW_MIN_HEIGHT, WINDOW_WIDTH } from "../common/constants/common"
import SiyuanUtils from "../siyuan/siyuanUtils"

const mainWin = SiyuanUtils.mainWindow()
// const path = mainWin.require("path")
const { app, BrowserWindow, getCurrentWindow, nativeTheme, ipcMain } = mainWin.require("@electron/remote")
const remote = mainWin.require("@electron/remote")
const remoteMain = remote.require("@electron/remote/main")
// @electron/remote has already been initialized
// remoteMain.initialize()

export default () => {
  let win: any

  const init = () => {
    createWindow()
    console.log("init main", getWindow())
  }

  const createWindow = async () => {
    const mainWindow = getCurrentWindow()
    win = new BrowserWindow({
      parent: mainWindow,
      height: WINDOW_HEIGHT,
      minHeight: WINDOW_MIN_HEIGHT,
      useContentSize: true,
      resizable: true,
      width: WINDOW_WIDTH,
      frame: false,
      title: "拉比克",
      show: true,
      modal: false,
      skipTaskbar: true,
      backgroundColor: nativeTheme.shouldUseDarkColors ? "#1c1c28" : "#fff",
      webPreferences: {
        webSecurity: false,
        backgroundThrottling: false,
        contextIsolation: false,
        webviewTag: true,
        nodeIntegration: true,
        preload: __dirname + "/preload.js",
        spellcheck: false,
      },
    })

    remoteMain.enable(win.webContents)
    win.webContents.userAgent = `rubick/${app.getVersion()} https://github.com/rubickCenter/rubick Electron`
    win.webContents.executeJavaScript(`window.rc={test:1111}`)

    const appUrl = `${SiyuanUtils.appBase()}/index.html`
    win.loadURL(appUrl)

    win.on("show", () => {
      win.webContents.executeJavaScript(
        `window.rubick && window.rubick.hooks && typeof window.rubick.hooks.onShow === "function" && window.rubick.hooks.onShow()`
      )
      // versionHandler.checkUpdate();
      win.webContents.openDevTools()
    })

    win.on("hide", () => {
      win.webContents.executeJavaScript(
        `window.rubick && window.rubick.hooks && typeof window.rubick.hooks.onHide === "function" && window.rubick.hooks.onHide()`
      )
    })

    win.on("closed", () => {
      win = undefined
    })

    // 判断失焦是否隐藏
    win.on("blur", async () => {
      // const config = await localConfig.getConfig()
      // if (config.perf.common.hideOnBlur) {
      //   win.hide()
      // }
    })

    // ipc
    ipcMain.on("rubick-msg-trigger", (event: any, arg: any) => {
      // 渲染进程发送的消息
      console.log(`接收到渲染进程发送的消息, event:${event}, arg =>`, arg)
      // 在这里进行处理，并将处理结果发送回渲染进程
      switch (arg.type) {
        default:
          event.returnValue = undefined
          console.log("消息依成功处理，准备返回结果给渲染进程 =>", event.returnValue)
          console.warn("msg type is not supported")
          break
      }
    })
  }

  const getWindow = () => win

  return {
    init,
    getWindow,
  }
}
