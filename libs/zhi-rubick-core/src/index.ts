import { simpleLogger, MainFunction } from "zhi-lib-base"

const logger = simpleLogger("zi-rubick-core", "zhi", false)

/**
 * 初始化入口
 *
 * @param args
 */
const main: MainFunction = async (args: any[]) => {
  return "ok"
}

;(async () => {
  const result = await main([])
  console.log(result)
})()
