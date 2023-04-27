/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

import { createCoreLogger, win } from "../../utils/index.js"

/**
 * This snippet is copied from https://github.com/leolee9086/snippets/blob/3764e58f1f98286b9e2d14451ddcf53c6a63bedb/noobApi/util/requireHacker.js
 *
 * This code can only run in siyuan-note internal electron environment, DO NOT use in other space
 * To make work, I changed a little code
 * Thanks for leolee9086 and his hard work
 *
 * @author leolee9086
 */

const logger = createCoreLogger("require-hacker")
const workspaceDir = win.siyuan ? win.siyuan.config.system.workspaceDir : win.workspaceDir
logger.info("requireHacker loaded")

let re = null
let realRequire: any = null
if (win.require) {
  const fs = win.require("fs")
  if (win.require.cache) {
    realRequire = win.require
  }
  if (realRequire) {
    const path = win.require("path")
    re = function (moduleName: any, base: any) {
      if (module) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const _load = module.__proto__.load
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!module.__proto__.load.hacked) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          module.__proto__.load = function (filename: any) {
            const realfilename = filename
            try {
              _load.bind(this)(filename)
            } catch (e: any) {
              if (e.message.indexOf("Cannot find module") >= 0 && e.message.indexOf(filename) >= 0) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (global.ExternalDepPathes) {
                  let flag: any
                  let modulePath: any
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  global.ExternalDepPathes.forEach((depPath: any) => {
                    if (fs.existsSync(path.join(depPath, moduleName))) {
                      if (!flag) {
                        logger.info(`Module ${moduleName} not found, redirect to ${path.join(depPath, moduleName)}`)
                        filename = path.join(depPath, filename)
                        try {
                          _load.bind(this)(filename)

                          flag = true
                        } catch (e: any) {
                          logger.error(e)
                        }
                      } else {
                        logger.info(
                          `Found module ${moduleName} at ${modulePath}, please check if it is already installed ${path.join(
                            depPath,
                            moduleName
                          )}`
                        )
                      }
                    }
                  })
                  if (!flag) {
                    logger.error(`Cannot load module${realfilename}`, e)
                    throw new Error(`Cannot load module${realfilename}`)
                  }
                } else {
                  logger.error(`Cannot load module${realfilename}`, e)
                  throw new Error(`Cannot load module${realfilename}`)
                }
              } else {
                throw e
              }
            }
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          module.__proto__.load.hacked = true
        }
      }
      if (!win.realRequire) {
        win.realRequire = realRequire
      }
      let that = win
      if (base) {
        moduleName = path.resolve(base, moduleName)
      }

      if (workspaceDir) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (this) {
          // eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          that = this
        }
        try {
          if (that.realRequire) {
            return that.realRequire(moduleName)
          } else {
            return win.realRequire(moduleName)
          }
        } catch (e: any) {
          if (e.message.indexOf("Cannot find module") >= 0) {
            if (!(moduleName.startsWith("/") || moduleName.startsWith("./") || moduleName.startsWith("../"))) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              if (global.ExternalDepPathes) {
                let flag: any
                let modulePath: any
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                global.ExternalDepPathes.forEach((depPath) => {
                  if (fs.existsSync(path.join(depPath, moduleName))) {
                    if (!flag) {
                      logger.info(`Module ${moduleName} not found, redirect to ${path.join(depPath, moduleName)}`)
                      moduleName = path.join(depPath, moduleName)
                      modulePath = path.join(depPath, moduleName)
                      flag = true
                    } else {
                      logger.info(
                        `Found module ${moduleName} at ${modulePath}, please check if it is already installed ${path.join(
                          depPath,
                          moduleName
                        )}`
                      )
                    }
                  }
                })
              }
            } else {
              moduleName = path.resolve(module.path, moduleName)
            }
            return that.realRequire(moduleName)
          } else {
            throw e
          }
        }
      } else return win.require(moduleName)
    }
  }
}
if (win.require && re) {
  win.require = re
  win.realRequire = realRequire
  if (win.realRequire && win.realRequire.cache) {
    win.realRequire.cache.electron.__proto__.realRequire = realRequire?.cache.electron.__proto__.require
    win.realRequire.cache.electron.__proto__.require = re
  }
  win.require.setExternalDeps = (path: any) => {
    if (!win.ExternalDepPathes) {
      win.ExternalDepPathes = []
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (path && !win.ExternalDepPathes.indexOf(path) >= 0) {
      win.ExternalDepPathes.push(path)
      win.ExternalDepPathes = Array.from(new Set(win.ExternalDepPathes))
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  re.setExternalDeps(`${workspaceDir}`)
  win.require.setExternalBase = (path: any) => {
    if (!win.ExternalDepPathes) {
      win.ExternalDepPathes = []
    }
    if (!win.ExternalBase) {
      win.ExternalBase = path
    } else {
      logger.error("Cannot set dependency path twice")
    }
  }
}

export {}
