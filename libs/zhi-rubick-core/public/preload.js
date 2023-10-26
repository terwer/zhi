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

const { ipcRenderer, shell } = require("electron")
// const { BrowserWindow, nativeTheme, screen, app } = require("@electron/remote")
// const os = require("os")
// const path = require("path")

console.log("preload window.rc", window.rc)

// console.log(path.dirname())

// // constants
// const { rubickConstants } = require("./rubick-constants")
//
// // ipc sender
// const ipcSendSync = (type, data) => {
//   console.log(
//     `从 rubick 发送给主进程的同步消息,event:${rubickConstants.RUBICK_MSG_TRIGGER}, type:${type}, data =>`,
//     data
//   )
//   const returnValue = ipcRenderer.sendSync(rubickConstants.RUBICK_MSG_TRIGGER, {
//     type,
//     data,
//   })
//   if (returnValue instanceof Error) throw returnValue
//   console.log("从 rubick 成功接收到主进程同步消息的结果 =>", returnValue)
//   return returnValue
// }
//
// const ipcSend = (type, data) => {
//   console.log(
//     `从 rubick 发送给主进程的异步消息,event:${rubickConstants.RUBICK_MSG_TRIGGER}, type:${type}, data =>`,
//     data
//   )
//   ipcRenderer.send(rubickConstants.RUBICK_MSG_TRIGGER, {
//     type,
//     data,
//   })
// }
//
// const appPath = ipcSendSync(rubickConstants.GET_FOLDER, rubickConstants.FOLDER_APP_SERVICE) ?? app.getPath("userData")
// const baseDir = path.join(appPath, rubickConstants.RUBICK_PLUGIN_FOLDER)
// console.log("rubick plugins baseDir=>", baseDir)

window.rubick = {}
