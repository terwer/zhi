import ZhiInfra from "./zhiInfra"
import "./lib/requireHacker"
import { SiyuanDevice } from "zhi-device"
import { simpleLogger } from "zhi-lib-base"

/**
 * 基础设施初始化入口
 *
 * @param zhiNpmPath - 内置的 NPM 目录
 * @param isFixPath - 是否修复路径
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function init(zhiNpmPath?: string, isFixPath?: boolean) {
  const logger = simpleLogger("init-infra", "zhi", false)
  const win = SiyuanDevice.siyuanWindow()
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
