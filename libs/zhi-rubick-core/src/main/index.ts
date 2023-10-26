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
import { BrowserWindow } from "electron"
import { main } from "../browsers"
import { simpleLogger } from "zhi-lib-base"

/**
 * 应用程序类，用于管理窗口创建和日志记录
 *
 * @author terwer
 * @since 0.1.0
 */
class App {
  /**
   * 窗口创建器对象，包含初始化和获取窗口的方法
   */
  public windowCreator: {
    init: () => void

    getWindow: () => BrowserWindow
  }

  /**
   * 日志记录器对象
   */
  private readonly logger = simpleLogger("zi-rubick-core", "zhi", false)

  /**
   * 创建一个新的应用程序实例
   */
  constructor() {
    this.windowCreator = main()
  }
}

export default new App()
