import ZhiInfra from "./zhiInfra"

/**
 * 基础设施初始化入口
 */
function init(): string {
  const zhiInfra = new ZhiInfra()
  zhiInfra.fixPathEnv()
  return "zhi server modules infra inited"
}

export default init
