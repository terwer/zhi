import ZhiInfra from "./zhiInfra"
import "./lib/requireHacker"

/**
 * 基础设施初始化入口
 */
async function init() {
  const zhiInfra = new ZhiInfra()
  zhiInfra.fixPathEnv()
  await zhiInfra.hackRequire()
  zhiInfra.mountNpmCmd()
  return "zhi server modules infra inited"
}

export default init
