/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2023-2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { simpleLogger, MainFunction } from "zhi-lib-base"
import fixPath from "fix-path"
/**
 * 初始化入口
 *
 * @param args
 */
const main: MainFunction = async (args: any[]) => {
  const logger = simpleLogger("main", "zhi", false)
  fixPath()
  logger.info("fixPath done")
  return "ok"
}

export default main
