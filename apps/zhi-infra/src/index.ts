import ZhiInfra from "./zhiInfra"
import "./lib/requireHacker"
import { SiyuanDevice } from "zhi-device"
import { MainFunction, simpleLogger } from "zhi-lib-base"
import { CustomCmd } from "zhi-cmd"

/**
 * 基础设施初始化入口
 *
 * @param args
 *   zhiNpmPath - 内置的 NPM 目录
 *   isFixPath - 是否修复路径
 */
const main: MainFunction = async (args: any[]) => {
  const logger = simpleLogger("init-infra", "zhi", false)

  // win
  const win = SiyuanDevice.siyuanWindow()
  win.zhi = win.zhi ?? {}

  // mountCmd
  if (!win.zhi.cmdInited) {
    const cmd = new CustomCmd()
    win.zhi.cmd = cmd
    logger.info("zhi cmd inited")
  } else {
    logger.info("zhi cmd is already inited.skip")
  }

  // mountNpmManager
  const zhiNpmPath: string = args.length > 0 ? args[0] : undefined
  const isFixPath: boolean = args.length > 1 ? args[1] : undefined
  if (!win.zhi.infraInited) {
    const infra = new ZhiInfra(zhiNpmPath)
    if (isFixPath) {
      infra.fixPathEnv()
    }
    await infra.hackRequire()
    infra.mountNpmManager()
    win.zhi.infraInited = true
    logger.info("zhi infra inited")
  } else {
    logger.info("zhi infra is already inited.skip")
  }
}

export default main
