import syPicgoIpc from "~/src/events/syPicgoIpc"

/**
 * 公共的Ipc事件入口
 */
export default {
  listen() {
    syPicgoIpc.listen()
  },
}
