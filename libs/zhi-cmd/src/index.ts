import { CustomCmd } from "./lib/customCmd"
import { SiyuanDevice } from "zhi-device"
import { MainFunction, simpleLogger } from "zhi-lib-base"

/**
 * 命令类库入口
 *
 * @param args 参数，可选
 */
const main: MainFunction = async (args: any[]) => {
  const logger = simpleLogger("zhi-cmd", "zhi", true)
  const win = SiyuanDevice.siyuanWindow()
  if (!win.zhiCmdInited) {
    const customCmd = new CustomCmd()
    win.zhiCmd = customCmd
    logger.info("zhiCmd mounted")
    win.zhiCmdInited = true
    logger.info("zhi cmd inited")
  } else {
    logger.info("zhi cmd is already inited.skip")
  }
  return win.zhiCmd
}

export default main
