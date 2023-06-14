import { ipcRenderer } from "electron"
import { getRawData, isSiyuanNewWin } from "../utils/common"
import { ipcMain } from "@electron/remote"

/**
 * 发送事件的统一入口
 *
 * @param channel 频道
 * @param args 参数
 */
export function sendToMain(channel: string, args?: object) {
  console.log("ipcRenderer send args=>", args)
  let data = {}
  data = { ...data, type: channel, isSiyuanNewWin: isSiyuanNewWin() }
  if (args) {
    const rawArgs = getRawData(args)
    data = { ...data, rawArgs }
  }
  console.log("ipcRenderer send channel=>", channel)
  console.log("ipcRenderer send data=>", data)
  ipcRenderer.send(channel, data)
}

/**
 * 处理事件统一入口封装
 *
 * @param eventId 事件ID
 * @param eventCallback 事件回调
 */
export const handleFromMain = (eventId, eventCallback) => {
  ipcMain.on(eventId, (event, msg) => {
    if (!msg || msg?.type !== eventId) {
      // console.warn("消息类型不匹配，忽略")
      return
    }

    const currentIsSiyuanNewWin = isSiyuanNewWin()
    if (msg.isSiyuanNewWin !== currentIsSiyuanNewWin) {
      // console.log("msg.isSiyuanNewWin=>", msg.isSiyuanNewWin)
      // console.log("currentIsSiyuanNewWin=>", currentIsSiyuanNewWin)
      // console.warn("消息来源不一致，忽略")
      return
    }

    console.log("接收到事件" + eventId + "，msg=>", msg)
    eventCallback(event, msg)
  })
}

/**
 * 移除事件监听
 *
 * @param channel 频道
 */
export const removeEventListeners = (channel) => {
  ipcRenderer.removeAllListeners(channel)
}
