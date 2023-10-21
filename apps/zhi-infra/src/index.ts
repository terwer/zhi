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
  win.zhi.status = win.zhi.status ?? {}

  // mountDevice
  if (!win.zhi.status.deviceInited) {
    win.zhi.device = SiyuanDevice
    win.zhi.status.deviceInited = true
    logger.info("zhi device inited")
  } else {
    logger.info("zhi device is already inited.skip")
  }

  // mountCmd
  if (!win.zhi.status.cmdInited) {
    const cmd = new CustomCmd()
    win.zhi.cmd = cmd
    win.zhi.status.cmdInited = true
    logger.info("zhi cmd inited")
  } else {
    logger.info("zhi cmd is already inited.skip")
  }

  // mountNpmManager
  const depsJsonPath: string = args.length > 0 ? args[0] : undefined
  const isFixPath: boolean = args.length > 1 ? args[1] : undefined
  if (!win.zhi.status.infraInited) {
    const infra = new ZhiInfra(depsJsonPath)
    if (isFixPath) {
      infra.fixPathEnv()
    }
    await infra.hackRequire()
    win.zhi.npm = infra.getNpmManager()
    win.zhi.status.infraInited = true
    logger.info("zhi infra inited")
  } else {
    logger.info("zhi infra is already inited.skip")
  }
}

export default main
