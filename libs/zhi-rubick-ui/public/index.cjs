"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  rubick: () => main_default2
});
module.exports = __toCommonJS(src_exports);

// src/common/constants/common.ts
var WINDOW_WIDTH = 1280;
var WINDOW_HEIGHT = 768;
var WINDOW_MIN_HEIGHT = 60;

// ../zhi-device/dist/index.js
var b = Object.defineProperty;
var g = (r, e, t) => e in r ? b(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
var o = (r, e, t) => (g(r, typeof e != "symbol" ? e + "" : e, t), t);
var s = class s2 {
  /**
   * 检测是否运行在Chrome插件中
   */
  static isInChromeExtension() {
    return s2.isInBrowser ? window.location.href.indexOf("chrome-extension://") > -1 : false;
  }
  /**
   * 复制网页内容到剪贴板
   *
   * @param text - 待复制的文本
   */
  static async copyToClipboardInBrowser(e) {
    if (navigator && navigator.clipboard)
      await navigator.clipboard.writeText(e);
    else {
      const t = document.createElement("input");
      t.style.position = "fixed", t.style.opacity = "0", t.value = e, document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t);
    }
  }
};
o(s, "isNode", typeof process < "u" && process.versions != null && process.versions.node != null), /**
* 是否在浏览器环境
*/
o(s, "isInBrowser", typeof window < "u" && typeof document < "u"), /**
* 浏览器路径分隔符
*/
o(s, "BrowserSeparator", "/"), /**
* 是否是Electron环境
*/
o(s, "isElectron", () => typeof process < "u" && process.versions != null && process.versions.electron != null), /**
* 是否有Node环境，目前包括 Electron 和 Node
*/
o(s, "hasNodeEnv", () => s.isElectron() || s.isNode), /**
* 通用的从 url 中获取获取参数的方法，优先获取查询参数，然后获取 hash 参数与
*
* @param key - 参数
* @author terwer
* @version 0.9.0
* @since 0.0.1
*/
o(s, "getQueryParam", (e) => {
  if (!s.isInBrowser)
    return "";
  const t = window.location.href, i = t.indexOf("?");
  if (i !== -1) {
    const c = t.indexOf("#", i), p = c !== -1 ? t.substring(i + 1, c) : t.substring(i + 1), y = new URLSearchParams(p).get(e);
    if (y)
      return y;
  }
  const a = t.indexOf("#");
  if (a !== -1) {
    const c = t.substring(a + 1), l = new URLSearchParams(c).get(e);
    if (l)
      return l;
  }
  return "";
}), /**
* 替换 URL 的参数
* 思路：
* 1. 使用了 URLSearchParams 对象来解析和构建 URL 查询参数。
*
* 2. 在处理包含 hash 片段的 URL 时使用了 split 函数将 URL 分成两部分：基本 URL 和 hash 片段。
*
* 3. 然后，再次使用 split 函数将基本 URL 分成两部分：路径和查询参数。
*
* 4. 将查询参数转换为 URLSearchParams 对象，然后设置指定的参数名和值。
*
* 5. 最后，使用 toString 函数将查询参数转换为字符串，并将其与路径组合成新的基本 URL。如果 URL 包含 hash 片段，则将其添加到新的基本 URL 中。
*
* @param url - 链接地址
* @param paramName - 参数名
* @param paramValue - 参数值
*/
o(s, "replaceUrlParam", (e, t, i) => {
  i == null && (i = "");
  const a = new RegExp("\\b(" + t + "=).*?(&|#|$)");
  if (e.search(a) >= 0)
    return e.replace(a, "$1" + i + "$2");
  const [c, p] = e.split("#"), [l, y] = c.split("?"), m = new URLSearchParams(y);
  m.set(t, i);
  const f = m.toString(), P = l + (f ? "?" + f : "");
  return p ? P + "#" + p : P;
}), /**
* 设置url参数
*
* @param urlstring - url
* @param key - key
* @param value - value
*/
o(s, "setUrlParameter", (e, t, i) => {
  if (e.includes(t))
    return s.replaceUrlParam(e, t, i);
  const a = e.split("#");
  let c = a[0];
  const p = a[1];
  return c.includes("?") ? c += `&${t}=${i}` : c += `?${t}=${i}`, p && (c += "#" + p), c;
}), /**
* 重新加载指定tab
*
* @param tabname - tabname
* @param t - 延迟时间
*/
o(s, "reloadTabPage", (e, t) => {
  setTimeout(function() {
    if (s.isInBrowser) {
      const i = window.location.href;
      window.location.href = s.setUrlParameter(i, "tab", e);
    }
  }, t ?? 200);
}), /**
* 刷新当前tab页面
*
* @param t - 延迟时间
*/
o(s, "reloadPage", (e) => {
  setTimeout(function() {
    s.isInBrowser && window.location.reload();
  }, e ?? 200);
}), /**
* 刷新当前tab页面
*
* @param msg - 消息提示
* @param cb - 回调
* @param t - 延迟时间
*/
o(s, "reloadPageWithMessageCallback", (e, t, i) => {
  t && t(e), setTimeout(function() {
    s.isInBrowser && window.location.reload();
  }, i ?? 200);
});
var u = s;
var n = /* @__PURE__ */ ((r) => (r.BasePathType_Appearance = "Appearance", r.BasePathType_Data = "Data", r.BasePathType_Themes = "Themes", r.BasePathType_ZhiTheme = "ZhiTheme", r.BasePathType_ThisPlugin = "ThisPlugin", r.BasePathType_AppData = "AppData", r.BasePathType_AppNpm = "AppNpm", r.BasePathType_AppService = "AppService", r.BasePathType_Absolute = "Absolute", r.BasePathType_None = "None", r))(n || {});
var h = class h2 {
  /**
   * 检测是否运行在思源打开的浏览器中
   */
  static isInSiyuanBrowser() {
    return u.isInBrowser ? typeof window.siyuan < "u" && typeof window.Lute < "u" : false;
  }
  /**
   * 思源笔记 window 对象
   */
  static siyuanWindow() {
    let e;
    return this.isInSiyuanWidget() ? e = parent.window : this.isInSiyuanRendererWin() || this.isInSiyuanBrowser() || typeof window < "u" ? e = window : e = void 0, e;
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
  static getRequirePath(e, t, i) {
    if (!u.hasNodeEnv())
      throw new Error("require ony works on node env");
    let a = e;
    switch (t) {
      case n.BasePathType_Appearance:
        a = this.joinPath(this.siyuanAppearancePath(), e);
        break;
      case n.BasePathType_Data:
        a = this.joinPath(this.siyuanDataPath(), e);
        break;
      case n.BasePathType_Themes:
        a = this.joinPath(this.siyuanAppearancePath(), "themes", e);
        break;
      case n.BasePathType_ZhiTheme:
        a = this.joinPath(this.siyuanAppearancePath(), "themes", "zhi", e);
        break;
      case n.BasePathType_ThisPlugin:
        if (!i)
          throw new Error("pluginName must be provided when use plugin path");
        a = this.joinPath(this.siyuanDataPath(), "plugins", i, e);
        break;
      case n.BasePathType_AppData:
        a = this.joinPath(this.appDataFolder(), e);
        break;
      case n.BasePathType_AppNpm:
        a = this.joinPath(this.appNpmFolder(), e);
        break;
      case n.BasePathType_AppService:
        a = this.joinPath(this.appServiceFolder(), e);
        break;
      case n.BasePathType_Absolute:
        break;
    }
    return a;
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
  static getImportPath(e, t, i) {
    let a = e;
    switch (t) {
      case n.BasePathType_Appearance:
        a = this.browserJoinPath(this.siyuanAppearanceRelativePath(), e);
        break;
      case n.BasePathType_Data:
        a = this.browserJoinPath(this.siyuanDataRelativePath(), e);
        break;
      case n.BasePathType_Themes:
        a = this.browserJoinPath(this.siyuanThemeRelativePath(), e);
        break;
      case n.BasePathType_ZhiTheme:
        a = this.browserJoinPath(this.zhiThemeRelativePath(), e);
        break;
      case n.BasePathType_ThisPlugin:
        if (!i)
          throw new Error("pluginName must be provided when use plugin path");
        a = this.browserJoinPath(this.siyuanDataRelativePath(), "plugins", i, e);
        break;
      case n.BasePathType_Absolute:
        break;
      default:
        throw new Error("type not provided or not supported");
    }
    return a;
  }
  /**
   * 引入json
   *
   * @param jsPath - js相对路径全路径
   * @param type - 类型
   * @param pluginName - 可选，当前插件目录
   */
  static async importJs(e, t, i) {
    const a = this.getImportPath(e, t, i), { default: c } = await import(
      /* @vite-ignore */
      a
    );
    return c;
  }
  /**
   * 引入 zhi 主题的 js - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsPath - 相对于 zhi 主题根路径的相对路径
   */
  static async importZhiThemeJs(e) {
    return await this.importJs(e, n.BasePathType_ZhiTheme);
  }
  // =========================
  // import start
  // =========================
  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  static joinPath(...e) {
    if (u.hasNodeEnv()) {
      const t = this.requireNpm("path");
      if (t)
        return t.join(...e);
    }
    return this.browserJoinPath(...e);
  }
  static browserJoinPath(...e) {
    return e.join(u.BrowserSeparator);
  }
  /**
   * 思源笔记 workspace 目录
   */
  static siyuanWorkspacePath() {
    const e = this.siyuanWindow();
    if (!e)
      throw new Error("Not in siyuan env");
    return e.siyuan.config.system.workspaceDir;
  }
  static siyuanConfPath() {
    const e = this.siyuanWindow();
    if (!e)
      throw new Error("Not in siyuan env");
    return e.siyuan.config.system.confDir;
  }
  /**
   * 思源笔记 data 目录
   */
  static siyuanDataPath() {
    const e = this.siyuanWindow();
    if (!e)
      throw new Error("Not in siyuan env");
    return e.siyuan.config.system.dataDir;
  }
  /**
   * 思源笔记 data 目录-相对路径
   */
  static siyuanDataRelativePath() {
    if (!this.siyuanWindow())
      throw new Error("Not in siyuan env");
    return "";
  }
  /**
   * 思源笔记 appearance 目录
   */
  static siyuanAppearancePath() {
    return this.joinPath(this.siyuanConfPath(), "appearance");
  }
  /**
   * 思源笔记 appearance 目录-相对路径
   */
  static siyuanAppearanceRelativePath() {
    if (!this.siyuanWindow())
      throw new Error("Not in siyuan env");
    return this.browserJoinPath("", "appearance");
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
  static siyuanThemePath() {
    if (u.hasNodeEnv())
      return this.joinPath(this.siyuanAppearancePath(), "themes");
    {
      const e = this.siyuanWindow();
      if (!e)
        throw new Error("Not in siyuan env");
      return this.joinPath(e.location.origin, "appearance", "themes");
    }
  }
  /**
   * 思源笔记 themes 目录-相对路径
   */
  static siyuanThemeRelativePath() {
    if (!this.siyuanWindow())
      throw new Error("Not in siyuan env");
    return this.browserJoinPath("", "appearance", "themes");
  }
  /**
   * zhi 主题目录 - 绝对路径
   */
  static zhiThemePath() {
    return this.joinPath(this.siyuanThemePath(), "zhi");
  }
  /**
   * zhi 主题目录 - 相对路径
   */
  static zhiThemeRelativePath() {
    return this.browserJoinPath(this.siyuanThemeRelativePath(), "zhi");
  }
  /**
   * 用户数据目录
   */
  static appDataFolder() {
    const e = h2.siyuanWindow().process, t = h2.requireNpm("path");
    let i;
    if (e.platform === "darwin")
      i = t.join(e.env.HOME ?? "/Users/terwer", "/Library/Application Support");
    else if (e.platform === "win32")
      i = e.env.APPDATA;
    else if (e.platform === "linux")
      i = e.env.HOME;
    else
      throw new Error("OS not supported");
    return t.join(i ?? e.cwd());
  }
  /**
   * 工作空间名称
   */
  static siyuanWorkspaceName() {
    return this.requireNpm("path").basename(this.siyuanWorkspacePath());
  }
  /**
   * 思源社区目录
   */
  static appSiyuancommunityFolder() {
    return this.joinPath(this.appDataFolder(), "siyuancommunity");
  }
  /**
   * Node包安装目录
   */
  static nodeFolder() {
    return this.joinPath(this.appSiyuancommunityFolder(), "node");
  }
  /**
   * Node包当前目录
   */
  static nodeCurrentFolder() {
    return this.joinPath(this.nodeFolder(), "current");
  }
  /**
   * Node包当前bin目录
   */
  static nodeCurrentBinFolder() {
    return this.joinPath(this.nodeCurrentFolder(), "bin");
  }
  /**
   * 思源社区工作空间目录
   */
  static appWorkspaceFolder() {
    return this.joinPath(this.appSiyuancommunityFolder(), "workspace");
  }
  /**
   * 当前用户NPM包目录
   */
  static appNpmFolder() {
    return this.joinPath(this.appWorkspaceFolder(), this.siyuanWorkspaceName());
  }
  /**
   * 当前用户服务目录
   */
  static appServiceFolder() {
    return this.joinPath(this.appNpmFolder(), "apps");
  }
};
o(h, "isInSiyuanWidget", () => u.isInBrowser ? typeof window.siyuan > "u" && typeof window.parent.process < "u" && window.parent.process.versions != null && window.parent.process.versions.electron != null : false), /**
* 思源笔记渲染窗口
*
* @author terwer
* @version 0.1.0
* @since 0.0.1
*/
o(h, "isInSiyuanRendererWin", () => typeof window < "u" && window.process && window.process.type === "renderer"), /**
* 依赖 npm
*
* @param libpath
* @param win - 可选，执行窗口
*/
o(h, "requireNpm", (e, t) => h.requireLib(e, n.BasePathType_Absolute, "", t)), /**
* 引入依赖
*
* @param libpath - 依赖全路径
* @param type - 可选，以谁的基本路径为准
* @param pluginName - 可选，当前插件目录
* @param win - 可选，执行窗口
*/
o(h, "requireLib", (e, t, i, a) => {
  const c = h.getRequirePath(e, t, i), p = a ?? h.siyuanWindow();
  if (!p)
    return require(c);
  if (typeof p.require < "u")
    return p.require(c);
}), /**
* 引入依赖，以 data 的基本路径为准
*
* @param libpath - 相对于 appearance 的相对路径
*/
o(h, "requireAppearanceLib", (e) => h.requireLib(e, n.BasePathType_Appearance)), /**
* 引入依赖，以 data 的基本路径为准
*
* @param libpath - 相对于 data 的相对路径
*/
o(h, "requireDataLib", (e) => h.requireLib(e, n.BasePathType_Data)), /**
* 引入依赖，以 theme 的基本路径为准
*
* @param libpath - 相对于 theme 的相对路径
*/
o(h, "requireThemesLib", (e) => h.requireLib(e, n.BasePathType_Themes)), /**
* 引入依赖，以 ZhiTheme 的基本路径为准
*
* @param libpath - 相对于 ZhiTheme 的相对路径
*/
o(h, "requireZhiThemeLib", (e) => h.requireLib(e, n.BasePathType_ZhiTheme)), /**
* 引入依赖，以 AppService 的基本路径为准
*
* @param libpath - 相对于 AppService 的相对路径
*/
o(h, "requireAppServiceLib", (e) => h.requireLib(e, n.BasePathType_AppService));
var w = h;

// src/siyuan/siyuanUtils.ts
var SiyuanUtils = class {
  static appBase() {
    return this.mainWindow().location.origin + "/plugins/siyuan-plugin-local-service/libs/zhi-rubick-ui";
  }
  static mainWindow() {
    return w.siyuanWindow();
  }
  static appServiceFolder() {
    return w.appServiceFolder();
  }
};
var siyuanUtils_default = SiyuanUtils;

// src/browsers/main.ts
var mainWin = siyuanUtils_default.mainWindow();
var { app, BrowserWindow, getCurrentWindow, nativeTheme, ipcMain } = mainWin.require("@electron/remote");
var remote = mainWin.require("@electron/remote");
var remoteMain = remote.require("@electron/remote/main");
var { constants } = mainWin.require(__dirname + "/constants.js");
var main_default = () => {
  let win;
  const init = () => {
    createWindow();
    console.log("init main", getWindow());
  };
  const createWindow = async () => {
    const mainWindow = getCurrentWindow();
    win = new BrowserWindow({
      parent: mainWindow,
      height: WINDOW_HEIGHT,
      minHeight: WINDOW_MIN_HEIGHT,
      useContentSize: true,
      resizable: true,
      width: WINDOW_WIDTH,
      frame: constants.DEBUG_MODE,
      title: "\u62C9\u6BD4\u514B",
      show: true,
      modal: false,
      skipTaskbar: true,
      backgroundColor: nativeTheme.shouldUseDarkColors ? "#1c1c28" : "#fff",
      webPreferences: {
        webSecurity: false,
        backgroundThrottling: false,
        contextIsolation: false,
        webviewTag: true,
        nodeIntegration: true,
        preload: __dirname + "/preload.js",
        spellcheck: false
      }
    });
    remoteMain.enable(win.webContents);
    win.webContents.userAgent = `rubick/${app.getVersion()} https://github.com/rubickCenter/rubick Electron`;
    const appUrl = `${siyuanUtils_default.appBase()}/index.html`;
    win.loadURL(appUrl);
    win.on("show", () => {
      win.webContents.executeJavaScript(`window.rc = {
        cwd: "${__dirname}",
        device: {
          appServiceFolder: "${siyuanUtils_default.appServiceFolder()}"
        }
      }`);
      win.webContents.executeJavaScript(
        `window.rubick && window.rubick.hooks && typeof window.rubick.hooks.onShow === "function" && window.rubick.hooks.onShow()`
      );
      win.webContents.openDevTools();
    });
    win.on("hide", () => {
      win.webContents.executeJavaScript(
        `window.rubick && window.rubick.hooks && typeof window.rubick.hooks.onHide === "function" && window.rubick.hooks.onHide()`
      );
    });
    win.on("closed", () => {
      win = void 0;
    });
    win.on("blur", async () => {
    });
    ipcMain.on(constants.RUBICK_MSG_TRIGGER_KEY, (event, arg) => {
      console.log(`\u63A5\u6536\u5230\u6E32\u67D3\u8FDB\u7A0B\u53D1\u9001\u7684\u6D88\u606F, event:${event}, arg =>`, arg);
      switch (arg.type) {
        default:
          event.returnValue = void 0;
          console.log("\u6D88\u606F\u4F9D\u6210\u529F\u5904\u7406\uFF0C\u51C6\u5907\u8FD4\u56DE\u7ED3\u679C\u7ED9\u6E32\u67D3\u8FDB\u7A0B =>", event.returnValue);
          console.warn("msg type is not supported");
          break;
      }
    });
  };
  const getWindow = () => win;
  return {
    init,
    getWindow
  };
};

// ../zhi-lib-base/dist/index.js
var w2 = (n2, $, p) => {
  const s3 = $ ?? "zhi", i = (t) => {
    const e = t.getFullYear(), o2 = String(t.getMonth() + 1).padStart(2, "0"), r = String(t.getDate()).padStart(2, "0"), S = String(t.getHours()).padStart(2, "0"), u2 = String(t.getMinutes()).padStart(2, "0"), d = String(t.getSeconds()).padStart(2, "0");
    return `${e}-${o2}-${r} ${S}:${u2}:${d}`;
  }, c = (t, e) => {
    const o2 = i(/* @__PURE__ */ new Date()), r = typeof e == "boolean" ? String(e) : e;
    r ? console.log(`[${s3}] [${o2}] [DEBUG] [${n2}] ${t}`, r) : console.log(`[${s3}] [${o2}] [DEBUG] [${n2}] ${t}`);
  }, l = (t, e) => {
    const o2 = i(/* @__PURE__ */ new Date()), r = typeof e == "boolean" ? String(e) : e;
    r ? console.info(`[${s3}] [${o2}] [INFO] [${n2}] ${t}`, r) : console.info(`[${s3}] [${o2}] [INFO] [${n2}] ${t}`);
  }, f = (t, e) => {
    const o2 = i(/* @__PURE__ */ new Date()), r = typeof e == "boolean" ? String(e) : e;
    r ? console.warn(`[${s3}] [${o2}] [WARN] [${n2}] ${t}`, r) : console.warn(`[${s3}] [${o2}] [WARN] [${n2}] ${t}`);
  }, g2 = (t, e) => {
    const o2 = i(/* @__PURE__ */ new Date());
    e ? console.error(`[${s3}] [${o2}] [ERROR] [${n2}] ${t.toString()}`, e) : console.error(`[${s3}] [${o2}] [ERROR] [${n2}] ${t.toString()}`);
  };
  return {
    debug: (t, e) => {
      p && (e ? c(t, e) : c(t));
    },
    info: (t, e) => {
      e ? l(t, e) : l(t);
    },
    warn: (t, e) => {
      e ? f(t, e) : f(t);
    },
    error: (t, e) => {
      e ? g2(t, e) : g2(t);
    }
  };
};

// src/main/index.ts
var App = class {
  /**
   * 窗口创建器对象，包含初始化和获取窗口的方法
   */
  windowCreator;
  /**
   * 日志记录器对象
   */
  logger = w2("zi-rubick-core", "zhi", false);
  /**
   * 创建一个新的应用程序实例
   */
  constructor() {
    this.windowCreator = main_default();
  }
  /**
   * 启动 rubick
   */
  bootstrap() {
    this.windowCreator.init();
  }
  /**
   * 获取商店的 window
   */
  getWindow() {
    return this.windowCreator.getWindow();
  }
};
var main_default2 = new App();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rubick
});
