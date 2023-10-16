import ZhiInfra from "./zhiInfra"
import "./lib/requireHacker"
import { SiyuanDevice } from "zhi-device"
import { simpleLogger } from "zhi-lib-base"

/**
 * 基础设施初始化入口
 *
 * @param params
 *   zhiNpmPath - 内置的 NPM 目录
 *   isFixPath - 是否修复路径
 */
async function init(...params: any[]) {
  const logger = simpleLogger("init-infra", "zhi", false)
  const win = SiyuanDevice.siyuanWindow()
  const zhiNpmPath: string = params.length > 0 ? params[0] : undefined
  const isFixPath: boolean = params.length > 1 ? params[1] : undefined
  if (!win.zhiInfraInited) {
    const zhiInfra = new ZhiInfra(zhiNpmPath)
    if (isFixPath) {
      zhiInfra.fixPathEnv()
    }
    await zhiInfra.hackRequire()
    zhiInfra.mountNpmCmd()
    win.zhiInfraInited = true
    logger.info("zhi infra inited")
  } else {
    logger.info("zhi infra is already inited.skip")
  }
  return win.npmManager
}

export default init
