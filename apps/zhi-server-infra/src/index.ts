import ZhiInfra from "./zhiInfra"
import "./lib/requireHacker"

/**
 * 基础设施初始化入口
 */
function init(): string {
  const zhiInfra = new ZhiInfra()
  // zhiInfra.fixPathEnv()
  zhiInfra.hackRequire()
  zhiInfra.mountNpmCmd()
  return "zhi server modules infra inited"
}

export default init
