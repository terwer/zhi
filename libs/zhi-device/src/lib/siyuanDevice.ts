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

import BrowserUtil from "./browserUtil"
import BasePathTypeEnum from "./basePathTypeEnum"

/**
 * 思源笔记设备相关
 *
 * @public
 * @author terwer
 * @version 0.1.0
 * @since 0.1.0
 */
class SiyuanDevice {
  /**
   * 思源笔记iframe挂件环境
   */
  public static isInSiyuanWidget = () => {
    if (!BrowserUtil.isInBrowser) {
      return false
    }
    return (
      typeof (window as any).siyuan === "undefined" &&
      typeof (window as any).parent.process !== "undefined" &&
      (window as any).parent.process.versions != null &&
      (window as any).parent.process.versions.electron != null
    )
  }

  /**
   * 思源笔记渲染窗口
   *
   * @author terwer
   * @version 0.1.0
   * @since 0.0.1
   */
  public static isInSiyuanRendererWin = () => {
    return typeof window !== "undefined" && (window as any).process && (window as any).process.type === "renderer"
  }

  /**
   * 检测是否运行在思源打开的浏览器中
   */
  public static isInSiyuanBrowser() {
    if (!BrowserUtil.isInBrowser) {
      return false
    }
    return typeof (window as any).siyuan !== "undefined" && typeof (window as any).Lute !== "undefined"
  }

  /**
   * 思源笔记 window 对象
   */
  public static siyuanWindow() {
    let win
    if (this.isInSiyuanWidget()) {
      win = parent.window
    } else {
      if (this.isInSiyuanRendererWin()) {
        win = window
      } else if (this.isInSiyuanBrowser()) {
        win = window
      } else if (typeof window !== "undefined") {
        win = window
      } else {
        win = undefined
      }
    }
    return win as any
  }

  // =========================
  // require start
  // =========================

  /**
   * 获取 require 路径
   *
   * @param libpath - 依赖全路径
   * @param type - 可选，以谁的基本路径为准
   * @param pluginName - 可选，当前插件目录
   */
  public static getRequirePath(libpath: string, type?: BasePathTypeEnum, pluginName?: string) {
    if (!BrowserUtil.hasNodeEnv()) {
      throw new Error("require ony works on node env")
    }

    let absLibpath = libpath
    switch (type) {
      case BasePathTypeEnum.BasePathType_Appearance:
        absLibpath = this.joinPath(this.siyuanAppearancePath(), libpath)
        break
      case BasePathTypeEnum.BasePathType_Data:
        absLibpath = this.joinPath(this.siyuanDataPath(), libpath)
        break
      case BasePathTypeEnum.BasePathType_Themes:
        absLibpath = this.joinPath(this.siyuanAppearancePath(), "themes", libpath)
        break
      case BasePathTypeEnum.BasePathType_ZhiTheme:
        absLibpath = this.joinPath(this.siyuanAppearancePath(), "themes", "zhi", libpath)
        break
      case BasePathTypeEnum.BasePathType_ThisPlugin:
        if (!pluginName) {
          throw new Error("pluginName must be provided when use plugin path")
        }
        absLibpath = this.joinPath(this.siyuanDataPath(), "plugins", pluginName, libpath)
        break
      case BasePathTypeEnum.BasePathType_AppData:
        absLibpath = this.joinPath(this.appDataFolder(), libpath)
        break
      case BasePathTypeEnum.BasePathType_AppNpm:
        absLibpath = this.joinPath(this.appNpmFolder(), libpath)
        break
      case BasePathTypeEnum.BasePathType_AppService:
        absLibpath = this.joinPath(this.appServiceFolder(), libpath)
        break
      case BasePathTypeEnum.BasePathType_Absolute:
        break
      default:
        break
    }

    return absLibpath
  }

  /**
   * 依赖 npm
   *
   * @param libpath
   * @param win - 可选，执行窗口
   */
  public static requireNpm = (libpath: string, win?: any) => {
    return SiyuanDevice.requireLib(libpath, BasePathTypeEnum.BasePathType_Absolute, "", win)
  }

  /**
   * 引入依赖
   *
   * @param libpath - 依赖全路径
   * @param type - 可选，以谁的基本路径为准
   * @param pluginName - 可选，当前插件目录
   * @param win - 可选，执行窗口
   */
  public static requireLib = (libpath: string, type?: BasePathTypeEnum, pluginName?: string, win?: any) => {
    const absLibpath = this.getRequirePath(libpath, type, pluginName)

    const syWin = win ?? this.siyuanWindow()
    if (!syWin) {
      return require(absLibpath)
    }
    if (typeof syWin.require !== "undefined") {
      return syWin.require(absLibpath)
    }

    return undefined
  }

  /**
   * 引入依赖，以 data 的基本路径为准
   *
   * @param libpath - 相对于 appearance 的相对路径
   */
  public static requireAppearanceLib = (libpath: string) => {
    return this.requireLib(libpath, BasePathTypeEnum.BasePathType_Appearance)
  }

  /**
   * 引入依赖，以 data 的基本路径为准
   *
   * @param libpath - 相对于 data 的相对路径
   */
  public static requireDataLib = (libpath: string) => {
    return this.requireLib(libpath, BasePathTypeEnum.BasePathType_Data)
  }

  /**
   * 引入依赖，以 theme 的基本路径为准
   *
   * @param libpath - 相对于 theme 的相对路径
   */
  public static requireThemesLib = (libpath: string) => {
    return this.requireLib(libpath, BasePathTypeEnum.BasePathType_Themes)
  }

  /**
   * 引入依赖，以 ZhiTheme 的基本路径为准
   *
   * @param libpath - 相对于 ZhiTheme 的相对路径
   */
  public static requireZhiThemeLib = (libpath: string) => {
    return this.requireLib(libpath, BasePathTypeEnum.BasePathType_ZhiTheme)
  }

  /**
   * 引入依赖，以 AppService 的基本路径为准
   *
   * @param libpath - 相对于 AppService 的相对路径
   */
  public static requireAppServiceLib = (libpath: string) => {
    return this.requireLib(libpath, BasePathTypeEnum.BasePathType_AppService)
  }

  // =========================
  // require end
  // =========================

  // =========================
  // import start
  // =========================
  /**
   * 获取 import 路径
   *
   * @param jsPath - js相对路径全路径
   * @param type - 类型
   * @param pluginName - 可选，当前插件目录
   */
  public static getImportPath(jsPath: string, type: BasePathTypeEnum, pluginName?: string) {
    let fullJsPath = jsPath
    switch (type) {
      case BasePathTypeEnum.BasePathType_Appearance:
        fullJsPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsPath)
        break
      case BasePathTypeEnum.BasePathType_Data:
        fullJsPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsPath)
        break
      case BasePathTypeEnum.BasePathType_Themes:
        fullJsPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsPath)
        break
      case BasePathTypeEnum.BasePathType_ZhiTheme:
        fullJsPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsPath)
        break
      case BasePathTypeEnum.BasePathType_ThisPlugin:
        if (!pluginName) {
          throw new Error("pluginName must be provided when use plugin path")
        }
        fullJsPath = this.browserJoinPath(this.siyuanDataRelativePath(), "plugins", pluginName, jsPath)
        break
      case BasePathTypeEnum.BasePathType_Absolute:
        break
      default:
        throw new Error("type not provided or not supported")
    }

    return fullJsPath
  }

  /**
   * 引入json
   *
   * @param jsPath - js相对路径全路径
   * @param type - 类型
   * @param pluginName - 可选，当前插件目录
   */
  public static async importJs(jsPath: string, type: BasePathTypeEnum, pluginName?: string) {
    const fullJsPath = this.getImportPath(jsPath, type, pluginName)
    const { default: data } = await import(/* @vite-ignore */ fullJsPath)
    return data
  }

  /**
   * 引入 zhi 主题的 js - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsPath - 相对于 zhi 主题根路径的相对路径
   */
  public static async importZhiThemeJs(jsPath: string) {
    return await this.importJs(jsPath, BasePathTypeEnum.BasePathType_ZhiTheme)
  }

  // =========================
  // import start
  // =========================

  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  public static joinPath(...paths: string[]): string {
    if (BrowserUtil.hasNodeEnv()) {
      const path = this.requireNpm("path")
      if (path) {
        return path.join(...paths)
      }
    }

    return this.browserJoinPath(...paths)
  }

  public static browserJoinPath(...paths: string[]): string {
    return paths.join(BrowserUtil.BrowserSeparator)
  }

  /**
   * 思源笔记 workspace 目录
   */
  public static siyuanWorkspacePath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return syWin.siyuan.config.system.workspaceDir
  }

  public static siyuanConfPath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return syWin.siyuan.config.system.confDir
  }

  /**
   * 思源笔记 data 目录
   */
  public static siyuanDataPath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return syWin.siyuan.config.system.dataDir
  }

  /**
   * 思源笔记 data 目录-相对路径
   */
  public static siyuanDataRelativePath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return ""
  }

  /**
   * 思源笔记 appearance 目录
   */
  public static siyuanAppearancePath() {
    return this.joinPath(this.siyuanConfPath(), "appearance")
  }

  /**
   * 思源笔记 appearance 目录-相对路径
   */
  public static siyuanAppearanceRelativePath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return this.browserJoinPath("", "appearance")
  }

  /**
   * 思源笔记 themes 目录-绝对路径
   *
   * 注意: 如果是非 electron 和 Node 环境，这里返回的是浏览器的路径，不是物理路径
   * 如果使用物理路径，请调用 siyuanAppearancePath 或者 siyuanDataPath
   *
   * @author terwer
   * @since 0.1.0
   */
  public static siyuanThemePath() {
    if (BrowserUtil.hasNodeEnv()) {
      return this.joinPath(this.siyuanAppearancePath(), "themes")
    } else {
      const syWin = this.siyuanWindow()
      if (!syWin) {
        throw new Error("Not in siyuan env")
      }
      return this.joinPath(syWin.location.origin, "appearance", "themes")
    }
  }

  /**
   * 思源笔记 themes 目录-相对路径
   */
  public static siyuanThemeRelativePath() {
    const syWin = this.siyuanWindow()
    if (!syWin) {
      throw new Error("Not in siyuan env")
    }
    return this.browserJoinPath("", "appearance", "themes")
  }

  /**
   * zhi 主题目录 - 绝对路径
   */
  public static zhiThemePath() {
    return this.joinPath(this.siyuanThemePath(), "zhi")
  }

  /**
   * zhi 主题目录 - 相对路径
   */
  public static zhiThemeRelativePath() {
    return this.browserJoinPath(this.siyuanThemeRelativePath(), "zhi")
  }

  /**
   * 用户目录
   */
  public static homeFolder() {
    const process = SiyuanDevice.siyuanWindow().process
    const path = SiyuanDevice.requireNpm("path")
    const configFilePath = process.env.HOME
    return path.join(configFilePath ?? process.cwd())
  }

  /**
   * 用户数据目录
   */
  public static appDataFolder() {
    const process = SiyuanDevice.siyuanWindow().process
    const path = SiyuanDevice.requireNpm("path")

    let configFilePath
    if (process.platform === "darwin") {
      configFilePath = path.join(process.env.HOME ?? "/Users/terwer", "/Library/Application Support")
    } else if (process.platform === "win32") {
      // Roaming包含在APPDATA中了
      configFilePath = process.env.APPDATA
    } else if (process.platform === "linux") {
      configFilePath = process.env.HOME
    } else {
      throw new Error("OS not supported")
    }

    return path.join(configFilePath ?? process.cwd())
  }

  /**
   * 工作空间名称
   */
  public static siyuanWorkspaceName() {
    const path = this.requireNpm("path")
    return path.basename(this.siyuanWorkspacePath())
  }

  /**
   * 思源社区目录
   */
  public static appSiyuancommunityFolder() {
    return this.joinPath(this.appDataFolder(), "siyuancommunity")
  }

  /**
   * Node包安装目录
   */
  public static nodeFolder() {
    return this.joinPath(this.appSiyuancommunityFolder(), "node")
  }

  /**
   * Node包当前目录
   */
  public static nodeCurrentFolder() {
    return this.joinPath(this.nodeFolder(), "current")
  }

  /**
   * Node包当前bin目录
   */
  public static nodeCurrentBinFolder() {
    return this.joinPath(this.nodeCurrentFolder(), "bin")
  }

  /**
   * 思源社区工作空间目录
   */
  public static appWorkspaceFolder() {
    return this.joinPath(this.appSiyuancommunityFolder(), "workspace")
  }

  /**
   * 当前用户NPM包目录
   */
  public static appNpmFolder() {
    return this.joinPath(this.appWorkspaceFolder(), this.siyuanWorkspaceName())
  }

  /**
   * 当前用户服务目录
   */
  public static appServiceFolder() {
    return this.joinPath(this.appNpmFolder(), "apps")
  }
}

export default SiyuanDevice
