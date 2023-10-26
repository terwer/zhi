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

const { ipcRenderer } = require("electron")
const path = require("path")

// window.rc
// window.ipc
// window.cfg
window.rc = window.rc ?? {}
window.rc.device = window.rc.device ?? {}
window.ipc = window.ipc ?? {}
window.cfg = window.cfg ?? {}

/**
 * Rubick应用的全局对象
 *
 * @namespace window.rubick
 */
window.rubick = {
  /**
   * 钩子函数集合，包含在Rubick窗口显示时触发的函数
   *
   * @memberof window.rubick
   */
  hooks: {
    /**
     * 在Rubick窗口显示时触发的函数
     *
     * @function
     * @memberof window.rubick.hooks
     */
    onShow: () => {
      console.log("preload window.rc", window.rc)

      // constants
      const { constants } = require(`${window.rc.cwd}/constants`)
      console.log("constants => ", constants)

      /**
       * 发送同步IPC消息给主进程
       *
       * @function
       * @param {string} type - 消息类型
       * @param {any} data - 消息数据
       * @returns {any} - 同步消息的返回值
       */
      const ipcSendSync = (type, data) => {
        console.log(
          `从 rubick 发送给主进程的同步消息,event:${constants.RUBICK_MSG_TRIGGER_KEY}, type:${type}, data =>`,
          data
        )
        const returnValue = ipcRenderer.sendSync(constants.RUBICK_MSG_TRIGGER_KEY, {
          type,
          data,
        })
        if (returnValue instanceof Error) throw returnValue
        console.log("从 rubick 成功接收到主进程同步消息的结果 =>", returnValue)
        return returnValue
      }

      /**
       * 发送异步IPC消息给主进程
       *
       * @function
       * @param {string} type - 消息类型
       * @param {any} data - 消息数据
       */
      const ipcSend = (type, data) => {
        console.log(
          `从 rubick 发送给主进程的异步消息,event:${constants.RUBICK_MSG_TRIGGER_KEY}, type:${type}, data =>`,
          data
        )
        ipcRenderer.send(constants.RUBICK_MSG_TRIGGER_KEY, {
          type,
          data,
        })
      }

      // 将IPC发送函数绑定到全局对象
      window.ipc.ipcSendSync = ipcSendSync
      window.ipc.ipcSend = ipcSend

      // 获取Rubick插件基本目录
      const baseDir = window.rc.device.appServiceFolder ?? path.join(app.getPath("userData") ?? process.cwd(), "apps")
      console.log("rubick plugins baseDir=>", baseDir)
      window.rc.device.baseDir = baseDir
    },
  },
  __event__: {},
}
