var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// <define:import.meta.env>
var define_import_meta_env_default = { NODE_ENV: "production", NODE: "/usr/local/bin/node", NODE_HOME: "/usr/local/n/versions/node/18.14.0", VITE_LOG_LEVEL: "INFO", VITE_DEBUG_MODE: "false" };

// ../zhi-device/dist/index.js
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require2 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
}) : x)(function(x) {
  if (typeof __require !== "undefined")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __publicField2 = (obj, key, value) => {
  __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _BrowserUtil = class {
  /**
   * 检测是否运行在Chrome插件中
   */
  static isInChromeExtension() {
    if (!_BrowserUtil.isInBrowser) {
      return false;
    }
    return window.location.href.indexOf("chrome-extension://") > -1;
  }
};
var BrowserUtil = _BrowserUtil;
__publicField2(BrowserUtil, "isNode", typeof process !== "undefined");
__publicField2(BrowserUtil, "isInBrowser", typeof window !== "undefined");
__publicField2(BrowserUtil, "BrowserSeperator", "/");
__publicField2(BrowserUtil, "isElectron", () => {
  if (!_BrowserUtil.isInBrowser || !window.navigator || !window.navigator.userAgent) {
    return false;
  }
  return /Electron/.test(window.navigator.userAgent);
});
__publicField2(BrowserUtil, "hasNodeEnv", () => {
  return _BrowserUtil.isElectron() || _BrowserUtil.isNode;
});
__publicField2(BrowserUtil, "getQueryString", (sParam) => {
  if (!_BrowserUtil.isInBrowser) {
    return "";
  }
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split("&");
  for (let i = 0; i < sURLVariables.length; i++) {
    const sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
  return "";
});
__publicField2(BrowserUtil, "replaceUrlParam", (url, paramName, paramValue) => {
  if (paramValue == null) {
    paramValue = "";
  }
  const pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)");
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, "$1" + paramValue + "$2");
  }
  const [baseUrl, hash] = url.split("#");
  const [path, query] = baseUrl.split("?");
  const params = new URLSearchParams(query);
  params.set(paramName, paramValue);
  const newQuery = params.toString();
  const newBaseUrl = path + (newQuery ? "?" + newQuery : "");
  return hash ? newBaseUrl + "#" + hash : newBaseUrl;
});
__publicField2(BrowserUtil, "setUrlParameter", (urlstring, key, value) => {
  if (urlstring.includes(key)) {
    return _BrowserUtil.replaceUrlParam(urlstring, key, value);
  }
  const hasharr = urlstring.split("#");
  let url = hasharr[0];
  const hash = hasharr[1];
  if (url.includes("?")) {
    url += `&${key}=${value}`;
  } else {
    url += `?${key}=${value}`;
  }
  if (hash) {
    url += "#" + hash;
  }
  return url;
});
__publicField2(BrowserUtil, "reloadTabPage", (tabname, t = 200) => {
  setTimeout(function() {
    if (_BrowserUtil.isInBrowser) {
      const url = window.location.href;
      window.location.href = _BrowserUtil.setUrlParameter(url, "tab", tabname);
    }
  }, t);
});
__publicField2(BrowserUtil, "reloadPage", () => {
  setTimeout(function() {
    if (_BrowserUtil.isInBrowser) {
      window.location.reload();
    }
  }, 200);
});
__publicField2(BrowserUtil, "reloadPageWithMessageCallback", (msg, cb) => {
  if (cb) {
    cb();
  }
  setTimeout(function() {
    if (_BrowserUtil.isInBrowser) {
      window.location.reload();
    }
  }, 200);
});
var browserUtil_default = BrowserUtil;
var BasePathTypeEnum = /* @__PURE__ */ ((BasePathTypeEnum22) => {
  BasePathTypeEnum22["BasePathType_Appearance"] = "Appearance";
  BasePathTypeEnum22["BasePathType_Data"] = "Data";
  BasePathTypeEnum22["BasePathType_Themes"] = "Themes";
  BasePathTypeEnum22["BasePathType_ZhiTheme"] = "ZhiTheme";
  BasePathTypeEnum22["BasePathType_None"] = "None";
  return BasePathTypeEnum22;
})(BasePathTypeEnum || {});
var basePathTypeEnum_default = BasePathTypeEnum;
var _SiyuanDevice = class {
  /**
   * 检测是否运行在思源打开的浏览器中
   */
  static isInSiyuanBrowser() {
    if (!browserUtil_default.isInBrowser) {
      return false;
    }
    return typeof window.siyuan !== "undefined" && typeof window.Lute !== "undefined";
  }
  /**
   * 思源笔记 window 对象
   */
  static siyuanWindow() {
    let win;
    if (this.isInSiyuanWidget()) {
      win = parent.window;
    } else {
      if (this.isInSiyuanNewWin()) {
        win = window;
      } else if (this.isInSiyuanBrowser()) {
        win = window;
      } else if (typeof window !== "undefined") {
        win = window;
      } else {
        win = void 0;
      }
    }
    return win;
  }
  // =========================
  // require end
  // =========================
  // =========================
  // import start
  // =========================
  /**
   * 引入json
   *
   * @param jsPath - js相对路径全路径
   * @param type - 类型
   */
  static async importJs(jsPath, type) {
    let fullJsonPath = jsPath;
    switch (type) {
      case basePathTypeEnum_default.BasePathType_Appearance:
        fullJsonPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsPath);
        break;
      case basePathTypeEnum_default.BasePathType_Data:
        fullJsonPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsPath);
        break;
      case basePathTypeEnum_default.BasePathType_Themes:
        fullJsonPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsPath);
        break;
      case basePathTypeEnum_default.BasePathType_ZhiTheme:
        fullJsonPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsPath);
        break;
      default:
        throw new Error("type must be provided");
    }
    const { default: data } = await import(
      /* @vite-ignore */
      fullJsonPath
    );
    return data;
  }
  /**
   * 引入json
   *
   * @param jsonPath - json相对路径全路径
   * @param type - 类型
   */
  static async importJson(jsonPath, type) {
    let fullJsonPath = jsonPath;
    switch (type) {
      case basePathTypeEnum_default.BasePathType_Appearance:
        fullJsonPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsonPath);
        break;
      case basePathTypeEnum_default.BasePathType_Data:
        fullJsonPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsonPath);
        break;
      case basePathTypeEnum_default.BasePathType_Themes:
        fullJsonPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsonPath);
        break;
      case basePathTypeEnum_default.BasePathType_ZhiTheme:
        fullJsonPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsonPath);
        break;
      default:
        throw new Error("type must be provided");
    }
    const { default: data } = await import(
      /* @vite-ignore */
      fullJsonPath,
      { assert: { type: "json" } }
    );
    return data;
  }
  /**
   * 引入 json - 以 data 为基本路径
   *
   * @param jsonPath - 相对于 data 的相对路径
   */
  static async importDataJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default.BasePathType_Data);
  }
  /**
   * 引入 json - 以 appearance 为基本路径
   *
   * @param jsonPath - 相对于 appearance 的相对路径
   */
  static async importAppearanceJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default.BasePathType_Appearance);
  }
  /**
   * 引入 json - 以 themes 为基本路径
   *
   * @param jsonPath - 相对于 themes 的相对路径
   */
  static async importThemesJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default.BasePathType_Themes);
  }
  /**
   * 引入 zhi 主题的 json - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsonPath - 相对于 zhi 主题根路径的相对路径
   */
  static async importZhiThemeJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default.BasePathType_ZhiTheme);
  }
  /**
   * 引入 zhi 主题的 js - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsPath - 相对于 zhi 主题根路径的相对路径
   */
  static async importZhiThemeJs(jsPath) {
    return await this.importJs(jsPath, basePathTypeEnum_default.BasePathType_ZhiTheme);
  }
  // =========================
  // import start
  // =========================
  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  static joinPath(...paths) {
    if (browserUtil_default.hasNodeEnv()) {
      const path = this.requireLib("path");
      if (path) {
        return path.join(...paths);
      }
    }
    return this.browserJoinPath(...paths);
  }
  static browserJoinPath(...paths) {
    return paths.join(browserUtil_default.BrowserSeperator);
  }
  /**
   * 思源笔记 conf 目录
   */
  static siyuanConfPath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
    return syWin.siyuan.config.system.confDir;
  }
  /**
   * 思源笔记 data 目录
   */
  static siyuanDataPath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
    return syWin.siyuan.config.system.dataDir;
  }
  /**
   * 思源笔记 data 目录-相对路径
   */
  static siyuanDataRelativePath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
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
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
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
    if (browserUtil_default.hasNodeEnv()) {
      return this.joinPath(this.siyuanAppearancePath(), "themes");
    } else {
      const syWin = this.siyuanWindow();
      if (!syWin) {
        throw new Error("Not in siyuan env");
      }
      return this.joinPath(syWin.location.origin, "appearance", "themes");
    }
  }
  /**
   * 思源笔记 themes 目录-相对路径
   */
  static siyuanThemeRelativePath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
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
};
var SiyuanDevice = _SiyuanDevice;
__publicField2(SiyuanDevice, "isInSiyuanWidget", () => {
  if (!browserUtil_default.isInBrowser) {
    return false;
  }
  return window.frameElement != null && window.frameElement.parentElement != null && window.frameElement.parentElement.parentElement != null && window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== "";
});
__publicField2(SiyuanDevice, "isInSiyuanNewWin", () => {
  if (!browserUtil_default.isInBrowser) {
    return false;
  }
  if (!browserUtil_default.isElectron()) {
    return false;
  }
  return typeof window.terwer !== "undefined" || typeof window.siyuanNewWin !== "undefined";
});
__publicField2(SiyuanDevice, "requireLib", (libpath, abs = true, type = basePathTypeEnum_default.BasePathType_None) => {
  if (!browserUtil_default.hasNodeEnv()) {
    throw new Error("require ony works on node env");
  }
  let absLibpath = libpath;
  if (!abs) {
    switch (type) {
      case basePathTypeEnum_default.BasePathType_Appearance:
        absLibpath = _SiyuanDevice.joinPath(_SiyuanDevice.siyuanAppearancePath(), libpath);
        break;
      case basePathTypeEnum_default.BasePathType_Data:
        absLibpath = _SiyuanDevice.joinPath(_SiyuanDevice.siyuanDataPath(), libpath);
        break;
      case basePathTypeEnum_default.BasePathType_Themes:
        absLibpath = _SiyuanDevice.joinPath(_SiyuanDevice.siyuanAppearancePath(), "themes", libpath);
        break;
      case basePathTypeEnum_default.BasePathType_ZhiTheme:
        absLibpath = _SiyuanDevice.joinPath(_SiyuanDevice.siyuanAppearancePath(), "themes", "zhi", libpath);
        break;
      default:
        throw new Error("type must be provided when not use absolute path");
    }
  }
  const syWin = _SiyuanDevice.siyuanWindow();
  if (!syWin) {
    return __require2(absLibpath);
  }
  if (typeof syWin.require !== "undefined") {
    return syWin.require(absLibpath);
  }
  return void 0;
});
__publicField2(SiyuanDevice, "requireAppearanceLib", (libpath) => {
  return _SiyuanDevice.requireLib(libpath, false, basePathTypeEnum_default.BasePathType_Appearance);
});
__publicField2(SiyuanDevice, "requireDataLib", (libpath) => {
  return _SiyuanDevice.requireLib(libpath, false, basePathTypeEnum_default.BasePathType_Data);
});
__publicField2(SiyuanDevice, "requireThemesLib", (libpath) => {
  return _SiyuanDevice.requireLib(libpath, false, basePathTypeEnum_default.BasePathType_Themes);
});
__publicField2(SiyuanDevice, "requireZhiThemeLib", (libpath) => {
  return _SiyuanDevice.requireLib(libpath, false, basePathTypeEnum_default.BasePathType_ZhiTheme);
});
var siyuanDevice_default = SiyuanDevice;
var DeviceTypeEnum = /* @__PURE__ */ ((DeviceTypeEnum2) => {
  DeviceTypeEnum2["DeviceType_Mobile_Device"] = "Mobile";
  DeviceTypeEnum2["DeviceType_Siyuan_Widget"] = "Siyuan_Widget";
  DeviceTypeEnum2["DeviceType_Siyuan_NewWin"] = "Siyuan_NewWindow";
  DeviceTypeEnum2["DeviceType_Siyuan_MainWin"] = "Siyuan_MainWindow";
  DeviceTypeEnum2["DeviceType_Siyuan_Browser"] = "Siyuan_Browser";
  DeviceTypeEnum2["DeviceType_Chrome_Extension"] = "Chrome_Extension";
  DeviceTypeEnum2["DeviceType_Chrome_Browser"] = "Chrome_Browser";
  DeviceTypeEnum2["DeviceType_Node"] = "Node";
  return DeviceTypeEnum2;
})(DeviceTypeEnum || {});
var deviceTypeEnum_default = DeviceTypeEnum;
var DeviceDetection = class {
  /**
   * 获取当前设备
   */
  static getDevice() {
    if (this.detectMobileDevice()) {
      return deviceTypeEnum_default.DeviceType_Mobile_Device;
    }
    if (siyuanDevice_default.isInSiyuanWidget()) {
      return deviceTypeEnum_default.DeviceType_Siyuan_Widget;
    }
    if (siyuanDevice_default.isInSiyuanNewWin()) {
      return deviceTypeEnum_default.DeviceType_Siyuan_NewWin;
    }
    if (browserUtil_default.isElectron()) {
      return deviceTypeEnum_default.DeviceType_Siyuan_MainWin;
    }
    if (siyuanDevice_default.isInSiyuanBrowser()) {
      return deviceTypeEnum_default.DeviceType_Siyuan_Browser;
    }
    if (browserUtil_default.isInChromeExtension()) {
      return deviceTypeEnum_default.DeviceType_Chrome_Extension;
    }
    if (browserUtil_default.isNode) {
      return deviceTypeEnum_default.DeviceType_Node;
    }
    return deviceTypeEnum_default.DeviceType_Chrome_Browser;
  }
  /**
   * 检测移动端
   * @private
   */
  static detectMobileDevice() {
    let check = false;
    if (browserUtil_default.isInBrowser) {
      ;
      (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
          a.substr(0, 4)
        ))
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
    }
    return check;
  }
};
var deviceDetection_default = DeviceDetection;
var src_default = deviceDetection_default;

// ../zhi-common/dist/index.js
var __create = Object.create;
var __defProp3 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require3 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
}) : x)(function(x) {
  if (typeof __require !== "undefined")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require32() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp3(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp3(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField3 = (obj, key, value) => {
  __defNormalProp3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var require_code = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/codegen/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    var _CodeOrName = class {
    };
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    };
    exports.Name = Name;
    var _Code = class extends _CodeOrName {
      constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
          if (c instanceof Name)
            names[c.str] = (names[c.str] || 0) + 1;
          return names;
        }, {});
      }
    };
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      const code = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
      }
      return new _Code(code);
    }
    exports._ = _;
    var plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports.str = str;
    function addCodeArg(code, arg) {
      if (arg instanceof _Code)
        code.push(...arg._items);
      else if (arg instanceof Name)
        code.push(arg);
      else
        code.push(interpolate(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  }
});
var require_scope = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/codegen/scope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    var code_1 = require_code();
    var ValueError = class extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    };
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
    exports.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    var Scope = class {
      constructor({ prefixes, parent: parent2 } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent2;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    };
    exports.Scope = Scope;
    var ValueScopeName = class extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    };
    exports.ValueScopeName = ValueScopeName;
    var line = (0, code_1._)`\n`;
    var ValueScope = class extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_1._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code = (0, code_1._)`${code}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code;
      }
    };
    exports.ValueScope = ValueScope;
  }
});
var require_codegen = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/codegen/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    var code_1 = require_code();
    var scope_1 = require_scope();
    var code_2 = require_code();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = require_scope();
    Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    var Node = class {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    };
    var Def = class extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (!names[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    };
    var Assign = class extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
      }
    };
    var AssignOp = class extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    };
    var Label = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    };
    var Break = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    };
    var Throw = class extends Node {
      constructor(error) {
        super();
        this.error = error;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    };
    var AnyCode = class extends Node {
      constructor(code) {
        super();
        this.code = code;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    };
    var ParentNode = class extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names, constants))
            continue;
          subtractNames(names, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
      }
    };
    var BlockNode = class extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    };
    var Root = class extends ParentNode {
    };
    var Else = class extends BlockNode {
    };
    Else.kind = "else";
    var If = class extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code += "else " + this.else.render(opts);
        return code;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new If(not(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
          addNames(names, this.else.names);
        return names;
      }
    };
    If.kind = "if";
    var For = class extends BlockNode {
    };
    For.kind = "for";
    var ForLoop = class extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    };
    var ForRange = class extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
      }
    };
    var ForIter = class extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    };
    var Func = class extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    };
    Func.kind = "func";
    var Return = class extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    };
    Return.kind = "return";
    var Try = class extends BlockNode {
      render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
          code += this.catch.render(opts);
        if (this.finally)
          code += this.finally.render(opts);
        return code;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        if (this.catch)
          addNames(names, this.catch.names);
        if (this.finally)
          addNames(names, this.finally.names);
        return names;
      }
    };
    var Catch = class extends BlockNode {
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    };
    Catch.kind = "catch";
    var Finally = class extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    };
    Finally.kind = "finally";
    var CodeGen = class {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_1.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
          if (code.length > 1)
            code.push(",");
          code.push(key);
          if (key !== value || this.opts.es5) {
            code.push(":");
            (0, code_1.addCodeArg)(code, value);
          }
        }
        code.push("}");
        return new code_1._Code(code);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name, (0, code_1._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
      }
      _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
      }
    };
    exports.CodeGen = CodeGen;
    function addNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
      return names;
    }
    function addExprNames(names, from) {
      return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
    }
    function optimizeExpr(expr, names, constants) {
      if (expr instanceof code_1.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
          c = replaceName(c);
        if (c instanceof code_1._Code)
          items.push(...c._items);
        else
          items.push(c);
        return items;
      }, []));
      function replaceName(n) {
        const c = constants[n.str];
        if (c === void 0 || names[n.str] !== 1)
          return n;
        delete names[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
      }
    }
    function subtractNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
    }
    function not(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
    }
    exports.not = not;
    var andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    var orCode = mappend(exports.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
    }
  }
});
var require_util = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
    var codegen_1 = require_codegen();
    var code_1 = require_code();
    function toHash(arr) {
      const hash = {};
      for (const item of arr)
        hash[item] = true;
      return hash;
    }
    exports.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      if (typeof schema == "boolean")
        return schema;
      if (Object.keys(schema).length === 0)
        return true;
      checkUnknownRules(it, schema);
      return !schemaHasRules(schema, it.self.RULES.all);
    }
    exports.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema = it.schema) {
      const { opts, self } = it;
      if (!opts.strictSchema)
        return;
      if (typeof schema === "boolean")
        return;
      const rules = self.RULES.keywords;
      for (const key in schema) {
        if (!rules[key])
          checkStrictMode(it, `unknown keyword: "${key}"`);
      }
    }
    exports.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (rules[key])
          return true;
      return false;
    }
    exports.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
          return true;
      return false;
    }
    exports.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
          return schema;
        if (typeof schema == "string")
          return (0, codegen_1._)`${schema}`;
      }
      return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
    }
    exports.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    exports.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    exports.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      if (typeof str == "number")
        return `${str}`;
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs)
          f(x);
      } else {
        f(xs);
      }
    }
    exports.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    exports.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
          gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
          if (from === true) {
            gen.assign(to, true);
          } else {
            gen.assign(to, (0, codegen_1._)`${to} || {}`);
            setEvaluated(gen, to, from);
          }
        }),
        mergeValues: (from, to) => from === true ? true : { ...from, ...to },
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === true ? true : Math.max(from, to),
        resultToName: (gen, items) => gen.var("items", items)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === true)
        return gen.var("props", true);
      const props = gen.var("props", (0, codegen_1._)`{}`);
      if (ps !== void 0)
        setEvaluated(gen, props, ps);
      return props;
    }
    exports.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
    }
    exports.setEvaluated = setEvaluated;
    var snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
      });
    }
    exports.useFunc = useFunc;
    var Type;
    (function(Type2) {
      Type2[Type2["Num"] = 0] = "Num";
      Type2[Type2["Str"] = 1] = "Str";
    })(Type = exports.Type || (exports.Type = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    exports.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (!mode)
        return;
      msg = `strict mode: ${msg}`;
      if (mode === true)
        throw new Error(msg);
      it.self.logger.warn(msg);
    }
    exports.checkStrictMode = checkStrictMode;
  }
});
var require_names = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/names.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var names = {
      // validation function arguments
      data: new codegen_1.Name("data"),
      // args passed from referencing schema
      valCxt: new codegen_1.Name("valCxt"),
      instancePath: new codegen_1.Name("instancePath"),
      parentData: new codegen_1.Name("parentData"),
      parentDataProperty: new codegen_1.Name("parentDataProperty"),
      rootData: new codegen_1.Name("rootData"),
      dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
      // function scoped variables
      vErrors: new codegen_1.Name("vErrors"),
      errors: new codegen_1.Name("errors"),
      this: new codegen_1.Name("this"),
      // "globals"
      self: new codegen_1.Name("self"),
      scope: new codegen_1.Name("scope"),
      // JTD serialize/parse name for JSON string and position
      json: new codegen_1.Name("json"),
      jsonPos: new codegen_1.Name("jsonPos"),
      jsonLen: new codegen_1.Name("jsonLen"),
      jsonPart: new codegen_1.Name("jsonPart")
    };
    exports.default = names;
  }
});
var require_errors = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    exports.keywordError = {
      message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_1._)`${err}.data`, data);
        }
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
      gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    var E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error, errorPaths) {
      const { createErrors } = cxt.it;
      if (createErrors === false)
        return (0, codegen_1._)`{}`;
      return errorObject(cxt, error, errorPaths);
    }
    function errorObject(cxt, error, errorPaths = {}) {
      const { gen, it } = cxt;
      const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      extraErrorProps(cxt, error, keyValues);
      return gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
      const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
      if (schemaPath) {
        schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params, message }, keyValues) {
      const { keyword, data, schemaValue, it } = cxt;
      const { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
    }
  }
});
var require_boolSchema = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/validate/boolSchema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var boolError = {
      message: "boolean schema is false"
    };
    function topBoolOrEmptySchema(it) {
      const { gen, schema, validateName } = it;
      if (schema === false) {
        falseSchemaError(it, false);
      } else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, null);
        gen.return(true);
      }
    }
    exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      const { gen, schema } = it;
      if (schema === false) {
        gen.var(valid, false);
        falseSchemaError(it);
      } else {
        gen.var(valid, true);
      }
    }
    exports.boolOrEmptySchema = boolOrEmptySchema;
    function falseSchemaError(it, overrideAllErrors) {
      const { gen, data } = it;
      const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it
      };
      (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
    }
  }
});
var require_rules = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/rules.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRules = exports.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    var jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
      return typeof x == "string" && jsonTypes.has(x);
    }
    exports.isJSONType = isJSONType;
    function getRules() {
      const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] }
      };
      return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {}
      };
    }
    exports.getRules = getRules;
  }
});
var require_applicability = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/validate/applicability.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({ schema, self }, type) {
      const group = self.RULES.types[type];
      return group && group !== true && shouldUseGroup(schema, group);
    }
    exports.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema, group) {
      return group.rules.some((rule) => shouldUseRule(schema, rule));
    }
    exports.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema, rule) {
      var _a;
      return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
    }
    exports.shouldUseRule = shouldUseRule;
  }
});
var require_dataType = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/validate/dataType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
    var rules_1 = require_rules();
    var applicability_1 = require_applicability();
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType = exports.DataType || (exports.DataType = {}));
    function getSchemaTypes(schema) {
      const types = getJSONTypes(schema.type);
      const hasNull = types.includes("null");
      if (hasNull) {
        if (schema.nullable === false)
          throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types.length && schema.nullable !== void 0) {
          throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
          types.push("null");
      }
      return types;
    }
    exports.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types.every(rules_1.isJSONType))
        return types;
      throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    exports.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types) {
      const { gen, data, opts } = it;
      const coerceTo = coerceToTypes(types, opts.coerceTypes);
      const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
      if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
          if (coerceTo.length)
            coerceData(it, types, coerceTo);
          else
            reportTypeError(it);
        });
      }
      return checkTypes;
    }
    exports.coerceAndCheckDataType = coerceAndCheckDataType;
    var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types, coerceTypes) {
      return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
    }
    function coerceData(it, types, coerceTo) {
      const { gen, data, opts } = it;
      const dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
      const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
      if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
      }
      gen.if((0, codegen_1._)`${coerced} !== undefined`);
      for (const t of coerceTo) {
        if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
          coerceSpecificType(t);
        }
      }
      gen.else();
      reportTypeError(it);
      gen.endIf();
      gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
      });
      function coerceSpecificType(t) {
        switch (t) {
          case "string":
            gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
            return;
          case "number":
            gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "integer":
            gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "boolean":
            gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
            return;
          case "null":
            gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
            gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
        }
      }
    }
    function assignParentData({ gen, parentData, parentDataProperty }, expr) {
      gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
    }
    function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
      const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
      let cond;
      switch (dataType) {
        case "null":
          return (0, codegen_1._)`${data} ${EQ} null`;
        case "array":
          cond = (0, codegen_1._)`Array.isArray(${data})`;
          break;
        case "object":
          cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
          break;
        case "integer":
          cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
      }
      return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
      function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
      }
    }
    exports.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data, strictNums, correct) {
      if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
      }
      let cond;
      const types = (0, util_1.toHash)(dataTypes);
      if (types.array && types.object) {
        const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
      } else {
        cond = codegen_1.nil;
      }
      if (types.number)
        delete types.integer;
      for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
      return cond;
    }
    exports.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({ schema }) => `must be ${schema}`,
      params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      (0, errors_1.reportError)(cxt, typeError);
    }
    exports.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      const { gen, data, schema } = it;
      const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
      return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
      };
    }
  }
});
var require_defaults = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/validate/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assignDefaults = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function assignDefaults(it, ty) {
      const { properties, items } = it.schema;
      if (ty === "object" && properties) {
        for (const key in properties) {
          assignDefault(it, key, properties[key].default);
        }
      } else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
      }
    }
    exports.assignDefaults = assignDefaults;
    function assignDefault(it, prop, defaultValue) {
      const { gen, compositeRule, data, opts } = it;
      if (defaultValue === void 0)
        return;
      const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
      if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
      }
      let condition = (0, codegen_1._)`${childData} === undefined`;
      if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
      }
      gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
    }
  }
});
var require_code2 = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    var util_2 = require_util();
    function checkReportMissingProp(cxt, prop) {
      const { gen, data, it } = cxt;
      gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
        cxt.error();
      });
    }
    exports.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
      return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
    }
    exports.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({ missingProperty: missing }, true);
      cxt.error();
    }
    exports.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
      });
    }
    exports.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data, property) {
      return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    exports.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
      return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    exports.propertyInData = propertyInData;
    function noPropertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
      return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
    }
    exports.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap) {
      return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    exports.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap) {
      return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
    }
    exports.schemaProperties = schemaProperties;
    function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
      const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
      const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData]
      ];
      if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
      const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
      return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
    }
    exports.callValidateCode = callValidateCode;
    var newRegExp = (0, codegen_1._)`new RegExp`;
    function usePattern({ gen, it: { opts } }, pattern) {
      const u = opts.unicodeRegExp ? "u" : "";
      const { regExp } = opts.code;
      const rx = regExp(pattern, u);
      return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
      });
    }
    exports.usePattern = usePattern;
    function validateArray(cxt) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
      }
      gen.var(valid, true);
      validateItems(() => gen.break());
      return valid;
      function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: util_1.Type.Num
          }, valid);
          gen.if((0, codegen_1.not)(valid), notValid);
        });
      }
    }
    exports.validateArray = validateArray;
    function validateUnion(cxt) {
      const { gen, schema, keyword, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
      if (alwaysValid && !it.opts.unevaluated)
        return;
      const valid = gen.let("valid", false);
      const schValid = gen.name("_valid");
      gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
          keyword,
          schemaProp: i,
          compositeRule: true
        }, schValid);
        gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        if (!merged)
          gen.if((0, codegen_1.not)(valid));
      }));
      cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
    }
    exports.validateUnion = validateUnion;
  }
});
var require_keyword = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/validate/keyword.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var code_1 = require_code2();
    var errors_1 = require_errors();
    function macroKeywordCode(cxt, def) {
      const { gen, keyword, schema, parentSchema, it } = cxt;
      const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
      const schemaRef = useKeyword(gen, keyword, macroSchema);
      if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
      const valid = gen.name("valid");
      cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true
      }, valid);
      cxt.pass(valid, () => cxt.error(true));
    }
    exports.macroKeywordCode = macroKeywordCode;
    function funcKeywordCode(cxt, def) {
      var _a;
      const { gen, keyword, schema, parentSchema, $data, it } = cxt;
      checkAsyncKeyword(it, def);
      const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
      const validateRef = useKeyword(gen, keyword, validate);
      const valid = gen.let("valid");
      cxt.block$data(valid, validateKeyword);
      cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
      function validateKeyword() {
        if (def.errors === false) {
          assignValid();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => cxt.error());
        } else {
          const ruleErrs = def.async ? validateAsync() : validateSync();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => addErrs(cxt, ruleErrs));
        }
      }
      function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
      }
      function validateSync() {
        const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
      }
      function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !("compile" in def && !$data || def.schema === false);
        gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
      }
      function reportErrs(errors) {
        var _a2;
        gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors);
      }
    }
    exports.funcKeywordCode = funcKeywordCode;
    function modifyData(cxt) {
      const { gen, data, it } = cxt;
      gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
    }
    function addErrs(cxt, errs) {
      const { gen } = cxt;
      gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
      }, () => cxt.error());
    }
    function checkAsyncKeyword({ schemaEnv }, def) {
      if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
    }
    function useKeyword(gen, keyword, result) {
      if (result === void 0)
        throw new Error(`keyword "${keyword}" failed to compile`);
      return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
    }
    function validSchemaType(schema, schemaType, allowUndefined = false) {
      return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
    }
    exports.validSchemaType = validSchemaType;
    function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
      if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
      }
      const deps = def.dependencies;
      if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
      }
      if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
          const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self.errorsText(def.validateSchema.errors);
          if (opts.validateSchema === "log")
            self.logger.error(msg);
          else
            throw new Error(msg);
        }
      }
    }
    exports.validateKeywordUsage = validateKeywordUsage;
  }
});
var require_subschema = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/validate/subschema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
      if (keyword !== void 0 && schema !== void 0) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
      }
      if (keyword !== void 0) {
        const sch = it.schema[keyword];
        return schemaProp === void 0 ? {
          schema: sch,
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`
        } : {
          schema: sch[schemaProp],
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
        };
      }
      if (schema !== void 0) {
        if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
          throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
          schema,
          schemaPath,
          topSchemaRef,
          errSchemaPath
        };
      }
      throw new Error('either "keyword" or "schema" must be passed');
    }
    exports.getSubschema = getSubschema;
    function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
      if (data !== void 0 && dataProp !== void 0) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
      }
      const { gen } = it;
      if (dataProp !== void 0) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
      }
      if (data !== void 0) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
        dataContextProps(nextData);
        if (propertyName !== void 0)
          subschema.propertyName = propertyName;
      }
      if (dataTypes)
        subschema.dataTypes = dataTypes;
      function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = /* @__PURE__ */ new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
      }
    }
    exports.extendSubschemaData = extendSubschemaData;
    function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
      if (compositeRule !== void 0)
        subschema.compositeRule = compositeRule;
      if (createErrors !== void 0)
        subschema.createErrors = createErrors;
      if (allErrors !== void 0)
        subschema.allErrors = allErrors;
      subschema.jtdDiscriminator = jtdDiscriminator;
      subschema.jtdMetadata = jtdMetadata;
    }
    exports.extendSubschemaMode = extendSubschemaMode;
  }
});
var require_fast_deep_equal = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});
var require_json_schema_traverse = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+json-schema-traverse@1.0.0/node_modules/json-schema-traverse/index.js"(exports, module) {
    "use strict";
    var traverse = module.exports = function(schema, opts, cb) {
      if (typeof opts == "function") {
        cb = opts;
        opts = {};
      }
      cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      };
      var post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema, "", schema);
    };
    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };
    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    traverse.propsKeywords = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };
    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == "object" && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i = 0; i < sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == "object") {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
            _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    function escapeJsonPtr(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});
var require_resolve = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/resolve.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
    var util_1 = require_util();
    var equal = require_fast_deep_equal();
    var traverse = require_json_schema_traverse();
    var SIMPLE_INLINED = /* @__PURE__ */ new Set([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum",
      "const"
    ]);
    function inlineRef(schema, limit = true) {
      if (typeof schema == "boolean")
        return true;
      if (limit === true)
        return !hasRef(schema);
      if (!limit)
        return false;
      return countKeys(schema) <= limit;
    }
    exports.inlineRef = inlineRef;
    var REF_KEYWORDS = /* @__PURE__ */ new Set([
      "$ref",
      "$recursiveRef",
      "$recursiveAnchor",
      "$dynamicRef",
      "$dynamicAnchor"
    ]);
    function hasRef(schema) {
      for (const key in schema) {
        if (REF_KEYWORDS.has(key))
          return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
          return true;
        if (typeof sch == "object" && hasRef(sch))
          return true;
      }
      return false;
    }
    function countKeys(schema) {
      let count = 0;
      for (const key in schema) {
        if (key === "$ref")
          return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
          continue;
        if (typeof schema[key] == "object") {
          (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
        }
        if (count === Infinity)
          return Infinity;
      }
      return count;
    }
    function getFullPath(resolver, id = "", normalize) {
      if (normalize !== false)
        id = normalizeId(id);
      const p = resolver.parse(id);
      return _getFullPath(resolver, p);
    }
    exports.getFullPath = getFullPath;
    function _getFullPath(resolver, p) {
      const serialized = resolver.serialize(p);
      return serialized.split("#")[0] + "#";
    }
    exports._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    exports.normalizeId = normalizeId;
    function resolveUrl(resolver, baseId, id) {
      id = normalizeId(id);
      return resolver.resolve(baseId, id);
    }
    exports.resolveUrl = resolveUrl;
    var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema, baseId) {
      if (typeof schema == "boolean")
        return {};
      const { schemaId, uriResolver } = this.opts;
      const schId = normalizeId(schema[schemaId] || baseId);
      const baseIds = { "": schId };
      const pathPrefix = getFullPath(uriResolver, schId, false);
      const localRefs = {};
      const schemaRefs = /* @__PURE__ */ new Set();
      traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === void 0)
          return;
        const fullPath = pathPrefix + jsonPtr;
        let baseId2 = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
          baseId2 = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = baseId2;
        function addRef(ref) {
          const _resolve = this.opts.uriResolver.resolve;
          ref = normalizeId(baseId2 ? _resolve(baseId2, ref) : ref);
          if (schemaRefs.has(ref))
            throw ambiguos(ref);
          schemaRefs.add(ref);
          let schOrRef = this.refs[ref];
          if (typeof schOrRef == "string")
            schOrRef = this.refs[schOrRef];
          if (typeof schOrRef == "object") {
            checkAmbiguosRef(sch, schOrRef.schema, ref);
          } else if (ref !== normalizeId(fullPath)) {
            if (ref[0] === "#") {
              checkAmbiguosRef(sch, localRefs[ref], ref);
              localRefs[ref] = sch;
            } else {
              this.refs[ref] = fullPath;
            }
          }
          return ref;
        }
        function addAnchor(anchor) {
          if (typeof anchor == "string") {
            if (!ANCHOR.test(anchor))
              throw new Error(`invalid anchor "${anchor}"`);
            addRef.call(this, `#${anchor}`);
          }
        }
      });
      return localRefs;
      function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== void 0 && !equal(sch1, sch2))
          throw ambiguos(ref);
      }
      function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
      }
    }
    exports.getSchemaRefs = getSchemaRefs;
  }
});
var require_validate = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/validate/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
    var boolSchema_1 = require_boolSchema();
    var dataType_1 = require_dataType();
    var applicability_1 = require_applicability();
    var dataType_2 = require_dataType();
    var defaults_1 = require_defaults();
    var keyword_1 = require_keyword();
    var subschema_1 = require_subschema();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var errors_1 = require_errors();
    function validateFunctionCode(it) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          topSchemaObjCode(it);
          return;
        }
      }
      validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
    }
    exports.validateFunctionCode = validateFunctionCode;
    function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
      if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
          gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
          destructureValCxtES5(gen, opts);
          gen.code(body);
        });
      } else {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
      }
    }
    function destructureValCxt(opts) {
      return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
    }
    function destructureValCxtES5(gen, opts) {
      gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
      }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
      });
    }
    function topSchemaObjCode(it) {
      const { schema, opts, gen } = it;
      validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
          commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
          resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
      });
      return;
    }
    function resetEvaluated(it) {
      const { gen, validateName } = it;
      it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
    }
    function funcSourceUrl(schema, opts) {
      const schId = typeof schema == "object" && schema[opts.schemaId];
      return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
    }
    function subschemaCode(it, valid) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          subSchemaObjCode(it, valid);
          return;
        }
      }
      (0, boolSchema_1.boolOrEmptySchema)(it, valid);
    }
    function schemaCxtHasRules({ schema, self }) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (self.RULES.all[key])
          return true;
      return false;
    }
    function isSchemaObj(it) {
      return typeof it.schema != "boolean";
    }
    function subSchemaObjCode(it, valid) {
      const { schema, gen, opts } = it;
      if (opts.$comment && schema.$comment)
        commentKeyword(it);
      updateContext(it);
      checkAsyncSchema(it);
      const errsCount = gen.const("_errs", names_1.default.errors);
      typeAndKeywords(it, errsCount);
      gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
    }
    function checkKeywords(it) {
      (0, util_1.checkUnknownRules)(it);
      checkRefsAndKeywords(it);
    }
    function typeAndKeywords(it, errsCount) {
      if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
      const types = (0, dataType_1.getSchemaTypes)(it.schema);
      const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
      schemaKeywords(it, types, !checkedTypes, errsCount);
    }
    function checkRefsAndKeywords(it) {
      const { schema, errSchemaPath, opts, self } = it;
      if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
      }
    }
    function checkNoDefault(it) {
      const { schema, opts } = it;
      if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
      }
    }
    function updateContext(it) {
      const schId = it.schema[it.opts.schemaId];
      if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
    }
    function checkAsyncSchema(it) {
      if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
    }
    function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
      const msg = schema.$comment;
      if (opts.$comment === true) {
        gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
      } else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
      }
    }
    function returnResults(it) {
      const { gen, schemaEnv, validateName, ValidationError, opts } = it;
      if (schemaEnv.$async) {
        gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
          assignEvaluated(it);
        gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
      }
    }
    function assignEvaluated({ gen, evaluated, props, items }) {
      if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.props`, props);
      if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.items`, items);
    }
    function schemaKeywords(it, types, typeErrors, errsCount) {
      const { gen, schema, data, allErrors, opts, self } = it;
      const { RULES } = self;
      if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
        return;
      }
      if (!opts.jtd)
        checkStrictTypes(it, types);
      gen.block(() => {
        for (const group of RULES.rules)
          groupKeywords(group);
        groupKeywords(RULES.post);
      });
      function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
          return;
        if (group.type) {
          gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
          iterateKeywords(it, group);
          if (types.length === 1 && types[0] === group.type && typeErrors) {
            gen.else();
            (0, dataType_2.reportTypeError)(it);
          }
          gen.endIf();
        } else {
          iterateKeywords(it, group);
        }
        if (!allErrors)
          gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
      }
    }
    function iterateKeywords(it, group) {
      const { gen, schema, opts: { useDefaults } } = it;
      if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
      gen.block(() => {
        for (const rule of group.rules) {
          if ((0, applicability_1.shouldUseRule)(schema, rule)) {
            keywordCode(it, rule.keyword, rule.definition, group.type);
          }
        }
      });
    }
    function checkStrictTypes(it, types) {
      if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
      checkContextTypes(it, types);
      if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
      checkKeywordTypes(it, it.dataTypes);
    }
    function checkContextTypes(it, types) {
      if (!types.length)
        return;
      if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
      }
      types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
          strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
      });
      narrowSchemaTypes(it, types);
    }
    function checkMultipleTypes(it, ts) {
      if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
      }
    }
    function checkKeywordTypes(it, ts) {
      const rules = it.self.RULES.all;
      for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
          const { type } = rule.definition;
          if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
            strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
          }
        }
      }
    }
    function hasApplicableType(schTs, kwdT) {
      return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
    }
    function includesType(ts, t) {
      return ts.includes(t) || t === "integer" && ts.includes("number");
    }
    function narrowSchemaTypes(it, withTypes) {
      const ts = [];
      for (const t of it.dataTypes) {
        if (includesType(withTypes, t))
          ts.push(t);
        else if (withTypes.includes("integer") && t === "number")
          ts.push("integer");
      }
      it.dataTypes = ts;
    }
    function strictTypesError(it, msg) {
      const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
      msg += ` at "${schemaPath}" (strictTypes)`;
      (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
    }
    var KeywordCxt = class {
      constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
          this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        } else {
          this.schemaCode = this.schemaValue;
          if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
            throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
          }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
          this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
      }
      result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
      }
      failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
          failAction();
        else
          this.error();
        if (successAction) {
          this.gen.else();
          successAction();
          if (this.allErrors)
            this.gen.endIf();
        } else {
          if (this.allErrors)
            this.gen.endIf();
          else
            this.gen.else();
        }
      }
      pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), void 0, failAction);
      }
      fail(condition) {
        if (condition === void 0) {
          this.error();
          if (!this.allErrors)
            this.gen.if(false);
          return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
      fail$data(condition) {
        if (!this.$data)
          return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
      }
      error(append, errorParams, errorPaths) {
        if (errorParams) {
          this.setParams(errorParams);
          this._error(append, errorPaths);
          this.setParams({});
          return;
        }
        this._error(append, errorPaths);
      }
      _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
      }
      $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
      }
      reset() {
        if (this.errsCount === void 0)
          throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
      }
      ok(cond) {
        if (!this.allErrors)
          this.gen.if(cond);
      }
      setParams(obj, assign) {
        if (assign)
          Object.assign(this.params, obj);
        else
          this.params = obj;
      }
      block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
          this.check$data(valid, $dataValid);
          codeBlock();
        });
      }
      check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
          return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
          gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
          gen.elseIf(this.invalid$data());
          this.$dataError();
          if (valid !== codegen_1.nil)
            gen.assign(valid, false);
        }
        gen.else();
      }
      invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
          if (schemaType.length) {
            if (!(schemaCode instanceof codegen_1.Name))
              throw new Error("ajv implementation error");
            const st = Array.isArray(schemaType) ? schemaType : [schemaType];
            return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
          }
          return codegen_1.nil;
        }
        function invalid$DataSchema() {
          if (def.validateSchema) {
            const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
            return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
          }
          return codegen_1.nil;
        }
      }
      subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: void 0, props: void 0 };
        subschemaCode(nextContext, valid);
        return nextContext;
      }
      mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
          return;
        if (it.props !== true && schemaCxt.props !== void 0) {
          it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== void 0) {
          it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
      }
      mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
          gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
          return true;
        }
      }
    };
    exports.KeywordCxt = KeywordCxt;
    function keywordCode(it, keyword, def, ruleType) {
      const cxt = new KeywordCxt(it, def, keyword);
      if ("code" in def) {
        def.code(cxt, ruleType);
      } else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      } else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
      } else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      }
    }
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, { dataLevel, dataNames, dataPathArr }) {
      let jsonPointer;
      let data;
      if ($data === "")
        return names_1.default.rootData;
      if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
      } else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
          if (up >= dataLevel)
            throw new Error(errorMsg("property/index", up));
          return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
          throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
          return data;
      }
      let expr = data;
      const segments = jsonPointer.split("/");
      for (const segment of segments) {
        if (segment) {
          data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
          expr = (0, codegen_1._)`${expr} && ${data}`;
        }
      }
      return expr;
      function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
      }
    }
    exports.getData = getData;
  }
});
var require_validation_error = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/runtime/validation_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationError = class extends Error {
      constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
      }
    };
    exports.default = ValidationError;
  }
});
var require_ref_error = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/ref_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var resolve_1 = require_resolve();
    var MissingRefError = class extends Error {
      constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
      }
    };
    exports.default = MissingRefError;
  }
});
var require_compile = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/compile/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
    var codegen_1 = require_codegen();
    var validation_error_1 = require_validation_error();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var SchemaEnv = class {
      constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
          schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
      }
    };
    exports.SchemaEnv = SchemaEnv;
    function compileSchema(sch) {
      const _sch = getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
      const { es5, lines } = this.opts.code;
      const { ownProperties } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
      let _ValidationError;
      if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
          ref: validation_error_1.default,
          code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
        });
      }
      const validateName = gen.scopeName("validate");
      sch.validateName = validateName;
      const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: /* @__PURE__ */ new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._)`""`,
        opts: this.opts,
        self: this
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        if (this.opts.code.process)
          sourceCode = this.opts.code.process(sourceCode, sch);
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
          validate.$async = true;
        if (this.opts.code.source === true) {
          validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
          const { props, items } = schemaCxt;
          validate.evaluated = {
            props: props instanceof codegen_1.Name ? void 0 : props,
            items: items instanceof codegen_1.Name ? void 0 : items,
            dynamicProps: props instanceof codegen_1.Name,
            dynamicItems: items instanceof codegen_1.Name
          };
          if (validate.source)
            validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
      } catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
          this.logger.error("Error compiling schema, function code:", sourceCode);
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
    }
    exports.compileSchema = compileSchema;
    function resolveRef(root, baseId, ref) {
      var _a;
      ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
      const schOrFunc = root.refs[ref];
      if (schOrFunc)
        return schOrFunc;
      let _sch = resolve.call(this, root, ref);
      if (_sch === void 0) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref];
        const { schemaId } = this.opts;
        if (schema)
          _sch = new SchemaEnv({ schema, schemaId, root, baseId });
      }
      if (_sch === void 0)
        return;
      return root.refs[ref] = inlineOrCompile.call(this, _sch);
    }
    exports.resolveRef = resolveRef;
    function inlineOrCompile(sch) {
      if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
      return sch.validate ? sch : compileSchema.call(this, sch);
    }
    function getCompilingSchema(schEnv) {
      for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
          return sch;
      }
    }
    exports.getCompilingSchema = getCompilingSchema;
    function sameSchemaEnv(s1, s2) {
      return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    function resolve(root, ref) {
      let sch;
      while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
      return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
    }
    function resolveSchema(root, ref) {
      const p = this.opts.uriResolver.parse(ref);
      const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
      let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
      if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
      }
      const id = (0, resolve_1.normalizeId)(refPath);
      const schOrRef = this.refs[id] || this.schemas[id];
      if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
          return;
        return getJsonPointer.call(this, p, sch);
      }
      if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
      if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
      if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
      }
      return getJsonPointer.call(this, p, schOrRef);
    }
    exports.resolveSchema = resolveSchema;
    var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
      "properties",
      "patternProperties",
      "enum",
      "dependencies",
      "definitions"
    ]);
    function getJsonPointer(parsedRef, { baseId, schema, root }) {
      var _a;
      if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
      for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
          return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === void 0)
          return;
        schema = partSchema;
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
      }
      let env;
      if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
      }
      const { schemaId } = this.opts;
      env = env || new SchemaEnv({ schema, schemaId, root, baseId });
      if (env.schema !== env.root.schema)
        return env;
      return void 0;
    }
  }
});
var require_data = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/refs/data.json"(exports, module) {
    module.exports = {
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
        }
      },
      additionalProperties: false
    };
  }
});
var require_uri_all = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+uri-js@4.4.1/node_modules/uri-js/dist/es5/uri.all.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.URI = global.URI || {});
    })(exports, function(exports2) {
      "use strict";
      function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
          sets[_key] = arguments[_key];
        }
        if (sets.length > 1) {
          sets[0] = sets[0].slice(0, -1);
          var xl = sets.length - 1;
          for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
          }
          sets[xl] = sets[xl].slice(1);
          return sets.join("");
        } else {
          return sets[0];
        }
      }
      function subexp(str) {
        return "(?:" + str + ")";
      }
      function typeOf(o) {
        return o === void 0 ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
      }
      function toUpperCase(str) {
        return str.toUpperCase();
      }
      function toArray(obj) {
        return obj !== void 0 && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
      }
      function assign(target, source) {
        var obj = target;
        if (source) {
          for (var key in source) {
            obj[key] = source[key];
          }
        }
        return obj;
      }
      function buildExps(isIRI2) {
        var ALPHA$$ = "[A-Za-z]", CR$ = "[\\x0D]", DIGIT$$ = "[0-9]", DQUOTE$$ = "[\\x22]", HEXDIG$$2 = merge(DIGIT$$, "[A-Fa-f]"), LF$$ = "[\\x0A]", SP$$ = "[\\x20]", PCT_ENCODED$2 = subexp(subexp("%[EFef]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%" + HEXDIG$$2 + HEXDIG$$2)), GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI2 ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", IPRIVATE$$ = isIRI2 ? "[\\uE000-\\uF8FF]" : "[]", UNRESERVED$$2 = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$), SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"), USERINFO$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]")) + "*"), DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$), DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$), IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$), H16$ = subexp(HEXDIG$$2 + "{1,4}"), LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$), IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$), IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$), IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$), IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$), IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), ZONEID$ = subexp(subexp(UNRESERVED$$2 + "|" + PCT_ENCODED$2) + "+"), IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$), IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + ZONEID$), IPVFUTURE$ = subexp("[vV]" + HEXDIG$$2 + "+\\." + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]") + "+"), IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"), REG_NAME$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$)) + "*"), HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")|" + REG_NAME$), PORT$ = subexp(DIGIT$$ + "*"), AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"), PCHAR$ = subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@]")), SEGMENT$ = subexp(PCHAR$ + "*"), SEGMENT_NZ$ = subexp(PCHAR$ + "+"), SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\@]")) + "+"), PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"), PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"), PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$), PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$), PATH_EMPTY$ = "(?!" + PCHAR$ + ")", PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"), FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"), HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$), RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$), ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"), GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$", SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
        return {
          NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
          NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
          NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
          ESCAPE: new RegExp(merge("[^]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          UNRESERVED: new RegExp(UNRESERVED$$2, "g"),
          OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$2, RESERVED$$), "g"),
          PCT_ENCODED: new RegExp(PCT_ENCODED$2, "g"),
          IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
          IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$")
          //RFC 6874, with relaxed parsing rules
        };
      }
      var URI_PROTOCOL = buildExps(false);
      var IRI_PROTOCOL = buildExps(true);
      var slicedToArray = function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"])
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();
      var toConsumableArray = function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
            arr2[i] = arr[i];
          return arr2;
        } else {
          return Array.from(arr);
        }
      };
      var maxInt = 2147483647;
      var base = 36;
      var tMin = 1;
      var tMax = 26;
      var skew = 38;
      var damp = 700;
      var initialBias = 72;
      var initialN = 128;
      var delimiter = "-";
      var regexPunycode = /^xn--/;
      var regexNonASCII = /[^\0-\x7E]/;
      var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
      var errors = {
        "overflow": "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      };
      var baseMinusTMin = base - tMin;
      var floor = Math.floor;
      var stringFromCharCode = String.fromCharCode;
      function error$1(type) {
        throw new RangeError(errors[type]);
      }
      function map(array, fn) {
        var result = [];
        var length = array.length;
        while (length--) {
          result[length] = fn(array[length]);
        }
        return result;
      }
      function mapDomain(string, fn) {
        var parts = string.split("@");
        var result = "";
        if (parts.length > 1) {
          result = parts[0] + "@";
          string = parts[1];
        }
        string = string.replace(regexSeparators, ".");
        var labels = string.split(".");
        var encoded = map(labels, fn).join(".");
        return result + encoded;
      }
      function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        while (counter < length) {
          var value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }
      var ucs2encode = function ucs2encode2(array) {
        return String.fromCodePoint.apply(String, toConsumableArray(array));
      };
      var basicToDigit = function basicToDigit2(codePoint) {
        if (codePoint - 48 < 10) {
          return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
          return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
          return codePoint - 97;
        }
        return base;
      };
      var digitToBasic = function digitToBasic2(digit, flag) {
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      };
      var adapt = function adapt2(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (
          ;
          /* no initialization */
          delta > baseMinusTMin * tMax >> 1;
          k += base
        ) {
          delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
      };
      var decode = function decode2(input) {
        var output = [];
        var inputLength = input.length;
        var i = 0;
        var n = initialN;
        var bias = initialBias;
        var basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }
        for (var j = 0; j < basic; ++j) {
          if (input.charCodeAt(j) >= 128) {
            error$1("not-basic");
          }
          output.push(input.charCodeAt(j));
        }
        for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
          var oldi = i;
          for (
            var w = 1, k = base;
            ;
            /* no condition */
            k += base
          ) {
            if (index >= inputLength) {
              error$1("invalid-input");
            }
            var digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base || digit > floor((maxInt - i) / w)) {
              error$1("overflow");
            }
            i += digit * w;
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t) {
              break;
            }
            var baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
              error$1("overflow");
            }
            w *= baseMinusT;
          }
          var out = output.length + 1;
          bias = adapt(i - oldi, out, oldi == 0);
          if (floor(i / out) > maxInt - n) {
            error$1("overflow");
          }
          n += floor(i / out);
          i %= out;
          output.splice(i++, 0, n);
        }
        return String.fromCodePoint.apply(String, output);
      };
      var encode = function encode2(input) {
        var output = [];
        input = ucs2decode(input);
        var inputLength = input.length;
        var n = initialN;
        var delta = 0;
        var bias = initialBias;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _currentValue2 = _step.value;
            if (_currentValue2 < 128) {
              output.push(stringFromCharCode(_currentValue2));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        var basicLength = output.length;
        var handledCPCount = basicLength;
        if (basicLength) {
          output.push(delimiter);
        }
        while (handledCPCount < inputLength) {
          var m = maxInt;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var currentValue = _step2.value;
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
          var handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error$1("overflow");
          }
          delta += (m - n) * handledCPCountPlusOne;
          n = m;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = void 0;
          try {
            for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _currentValue = _step3.value;
              if (_currentValue < n && ++delta > maxInt) {
                error$1("overflow");
              }
              if (_currentValue == n) {
                var q = delta;
                for (
                  var k = base;
                  ;
                  /* no condition */
                  k += base
                ) {
                  var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  var qMinusT = q - t;
                  var baseMinusT = base - t;
                  output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
          ++delta;
          ++n;
        }
        return output.join("");
      };
      var toUnicode = function toUnicode2(input) {
        return mapDomain(input, function(string) {
          return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
      };
      var toASCII = function toASCII2(input) {
        return mapDomain(input, function(string) {
          return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
        });
      };
      var punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        "version": "2.1.0",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        "ucs2": {
          "decode": ucs2decode,
          "encode": ucs2encode
        },
        "decode": decode,
        "encode": encode,
        "toASCII": toASCII,
        "toUnicode": toUnicode
      };
      var SCHEMES = {};
      function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16)
          e = "%0" + c.toString(16).toUpperCase();
        else if (c < 128)
          e = "%" + c.toString(16).toUpperCase();
        else if (c < 2048)
          e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        else
          e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
      }
      function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
          var c = parseInt(str.substr(i + 1, 2), 16);
          if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
          } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
              var c2 = parseInt(str.substr(i + 4, 2), 16);
              newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
              newStr += str.substr(i, 6);
            }
            i += 6;
          } else if (c >= 224) {
            if (il - i >= 9) {
              var _c = parseInt(str.substr(i + 4, 2), 16);
              var c3 = parseInt(str.substr(i + 7, 2), 16);
              newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
              newStr += str.substr(i, 9);
            }
            i += 9;
          } else {
            newStr += str.substr(i, 3);
            i += 3;
          }
        }
        return newStr;
      }
      function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved2(str) {
          var decStr = pctDecChars(str);
          return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        if (components.scheme)
          components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== void 0)
          components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== void 0)
          components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== void 0)
          components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== void 0)
          components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== void 0)
          components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
      }
      function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
      }
      function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];
        var _matches = slicedToArray(matches, 2), address = _matches[1];
        if (address) {
          return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
          return host;
        }
      }
      function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];
        var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
        if (address) {
          var _address$toLowerCase$ = address.toLowerCase().split("::").reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
          var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
          var lastFields = last.split(":").map(_stripLeadingZeros);
          var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
          var fieldCount = isLastFieldIPv4Address ? 7 : 8;
          var lastFieldsStart = lastFields.length - fieldCount;
          var fields = Array(fieldCount);
          for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || "";
          }
          if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
          }
          var allZeroFields = fields.reduce(function(acc, field, index) {
            if (!field || field === "0") {
              var lastLongest = acc[acc.length - 1];
              if (lastLongest && lastLongest.index + lastLongest.length === index) {
                lastLongest.length++;
              } else {
                acc.push({ index, length: 1 });
              }
            }
            return acc;
          }, []);
          var longestZeroFields = allZeroFields.sort(function(a, b) {
            return b.length - a.length;
          })[0];
          var newHost = void 0;
          if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
          } else {
            newHost = fields.join(":");
          }
          if (zone) {
            newHost += "%" + zone;
          }
          return newHost;
        } else {
          return host;
        }
      }
      var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
      var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === void 0;
      function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix")
          uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
          if (NO_MATCH_IS_UNDEFINED) {
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            if (isNaN(components.port)) {
              components.port = matches[5];
            }
          } else {
            components.scheme = matches[1] || void 0;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : void 0;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : void 0;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : void 0;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : void 0;
            if (isNaN(components.port)) {
              components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : void 0;
            }
          }
          if (components.host) {
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
          }
          if (components.scheme === void 0 && components.userinfo === void 0 && components.host === void 0 && components.port === void 0 && !components.path && components.query === void 0) {
            components.reference = "same-document";
          } else if (components.scheme === void 0) {
            components.reference = "relative";
          } else if (components.fragment === void 0) {
            components.reference = "absolute";
          } else {
            components.reference = "uri";
          }
          if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
          }
          var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
          if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
              try {
                components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
              } catch (e) {
                components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
              }
            }
            _normalizeComponentEncoding(components, URI_PROTOCOL);
          } else {
            _normalizeComponentEncoding(components, protocol);
          }
          if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
          }
        } else {
          components.error = components.error || "URI can not be parsed.";
        }
        return components;
      }
      function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== void 0) {
          uriTokens.push(components.userinfo);
          uriTokens.push("@");
        }
        if (components.host !== void 0) {
          uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function(_, $1, $22) {
            return "[" + $1 + ($22 ? "%25" + $22 : "") + "]";
          }));
        }
        if (typeof components.port === "number" || typeof components.port === "string") {
          uriTokens.push(":");
          uriTokens.push(String(components.port));
        }
        return uriTokens.length ? uriTokens.join("") : void 0;
      }
      var RDS1 = /^\.\.?\//;
      var RDS2 = /^\/\.(\/|$)/;
      var RDS3 = /^\/\.\.(\/|$)/;
      var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
      function removeDotSegments(input) {
        var output = [];
        while (input.length) {
          if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
          } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
          } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
          } else if (input === "." || input === "..") {
            input = "";
          } else {
            var im = input.match(RDS5);
            if (im) {
              var s = im[0];
              input = input.slice(s.length);
              output.push(s);
            } else {
              throw new Error("Unexpected dot segment condition");
            }
          }
        }
        return output.join("");
      }
      function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        if (schemeHandler && schemeHandler.serialize)
          schemeHandler.serialize(components, options);
        if (components.host) {
          if (protocol.IPV6ADDRESS.test(components.host)) {
          } else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
            try {
              components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
            } catch (e) {
              components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
          }
        }
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
          uriTokens.push(components.scheme);
          uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== void 0) {
          if (options.reference !== "suffix") {
            uriTokens.push("//");
          }
          uriTokens.push(authority);
          if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
          }
        }
        if (components.path !== void 0) {
          var s = components.path;
          if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
          }
          if (authority === void 0) {
            s = s.replace(/^\/\//, "/%2F");
          }
          uriTokens.push(s);
        }
        if (components.query !== void 0) {
          uriTokens.push("?");
          uriTokens.push(components.query);
        }
        if (components.fragment !== void 0) {
          uriTokens.push("#");
          uriTokens.push(components.fragment);
        }
        return uriTokens.join("");
      }
      function resolveComponents(base2, relative) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var skipNormalization = arguments[3];
        var target = {};
        if (!skipNormalization) {
          base2 = parse(serialize(base2, options), options);
          relative = parse(serialize(relative, options), options);
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
          target.scheme = relative.scheme;
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
          } else {
            if (!relative.path) {
              target.path = base2.path;
              if (relative.query !== void 0) {
                target.query = relative.query;
              } else {
                target.query = base2.query;
              }
            } else {
              if (relative.path.charAt(0) === "/") {
                target.path = removeDotSegments(relative.path);
              } else {
                if ((base2.userinfo !== void 0 || base2.host !== void 0 || base2.port !== void 0) && !base2.path) {
                  target.path = "/" + relative.path;
                } else if (!base2.path) {
                  target.path = relative.path;
                } else {
                  target.path = base2.path.slice(0, base2.path.lastIndexOf("/") + 1) + relative.path;
                }
                target.path = removeDotSegments(target.path);
              }
              target.query = relative.query;
            }
            target.userinfo = base2.userinfo;
            target.host = base2.host;
            target.port = base2.port;
          }
          target.scheme = base2.scheme;
        }
        target.fragment = relative.fragment;
        return target;
      }
      function resolve(baseURI, relativeURI, options) {
        var schemelessOptions = assign({ scheme: "null" }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
      }
      function normalize(uri, options) {
        if (typeof uri === "string") {
          uri = serialize(parse(uri, options), options);
        } else if (typeOf(uri) === "object") {
          uri = parse(serialize(uri, options), options);
        }
        return uri;
      }
      function equal(uriA, uriB, options) {
        if (typeof uriA === "string") {
          uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
          uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
          uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
          uriB = serialize(uriB, options);
        }
        return uriA === uriB;
      }
      function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
      }
      function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
      }
      var handler = {
        scheme: "http",
        domainHost: true,
        parse: function parse2(components, options) {
          if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
          }
          return components;
        },
        serialize: function serialize2(components, options) {
          var secure = String(components.scheme).toLowerCase() === "https";
          if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = void 0;
          }
          if (!components.path) {
            components.path = "/";
          }
          return components;
        }
      };
      var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
      };
      function isSecure(wsComponents) {
        return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
      }
      var handler$2 = {
        scheme: "ws",
        domainHost: true,
        parse: function parse2(components, options) {
          var wsComponents = components;
          wsComponents.secure = isSecure(wsComponents);
          wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
          wsComponents.path = void 0;
          wsComponents.query = void 0;
          return wsComponents;
        },
        serialize: function serialize2(wsComponents, options) {
          if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = void 0;
          }
          if (typeof wsComponents.secure === "boolean") {
            wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
            wsComponents.secure = void 0;
          }
          if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split("?"), _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2), path = _wsComponents$resourc2[0], query = _wsComponents$resourc2[1];
            wsComponents.path = path && path !== "/" ? path : void 0;
            wsComponents.query = query;
            wsComponents.resourceName = void 0;
          }
          wsComponents.fragment = void 0;
          return wsComponents;
        }
      };
      var handler$3 = {
        scheme: "wss",
        domainHost: handler$2.domainHost,
        parse: handler$2.parse,
        serialize: handler$2.serialize
      };
      var O = {};
      var isIRI = true;
      var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
      var HEXDIG$$ = "[0-9A-Fa-f]";
      var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$));
      var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
      var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
      var VCHAR$$ = merge(QTEXT$$, '[\\"\\\\]');
      var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
      var UNRESERVED = new RegExp(UNRESERVED$$, "g");
      var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
      var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
      var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
      var NOT_HFVALUE = NOT_HFNAME;
      function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
      }
      var handler$4 = {
        scheme: "mailto",
        parse: function parse$$1(components, options) {
          var mailtoComponents = components;
          var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
          mailtoComponents.path = void 0;
          if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
              var hfield = hfields[x].split("=");
              switch (hfield[0]) {
                case "to":
                  var toAddrs = hfield[1].split(",");
                  for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                    to.push(toAddrs[_x]);
                  }
                  break;
                case "subject":
                  mailtoComponents.subject = unescapeComponent(hfield[1], options);
                  break;
                case "body":
                  mailtoComponents.body = unescapeComponent(hfield[1], options);
                  break;
                default:
                  unknownHeaders = true;
                  headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                  break;
              }
            }
            if (unknownHeaders)
              mailtoComponents.headers = headers;
          }
          mailtoComponents.query = void 0;
          for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
              try {
                addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
              } catch (e) {
                mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
              }
            } else {
              addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
          }
          return mailtoComponents;
        },
        serialize: function serialize$$1(mailtoComponents, options) {
          var components = mailtoComponents;
          var to = toArray(mailtoComponents.to);
          if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
              var toAddr = String(to[x]);
              var atIdx = toAddr.lastIndexOf("@");
              var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
              var domain = toAddr.slice(atIdx + 1);
              try {
                domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
              } catch (e) {
                components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
              }
              to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
          }
          var headers = mailtoComponents.headers = mailtoComponents.headers || {};
          if (mailtoComponents.subject)
            headers["subject"] = mailtoComponents.subject;
          if (mailtoComponents.body)
            headers["body"] = mailtoComponents.body;
          var fields = [];
          for (var name in headers) {
            if (headers[name] !== O[name]) {
              fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
          }
          if (fields.length) {
            components.query = fields.join("&");
          }
          return components;
        }
      };
      var URN_PARSE = /^([^\:]+)\:(.*)/;
      var handler$5 = {
        scheme: "urn",
        parse: function parse$$1(components, options) {
          var matches = components.path && components.path.match(URN_PARSE);
          var urnComponents = components;
          if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = void 0;
            if (schemeHandler) {
              urnComponents = schemeHandler.parse(urnComponents, options);
            }
          } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
          }
          return urnComponents;
        },
        serialize: function serialize$$1(urnComponents, options) {
          var scheme = options.scheme || urnComponents.scheme || "urn";
          var nid = urnComponents.nid;
          var urnScheme = scheme + ":" + (options.nid || nid);
          var schemeHandler = SCHEMES[urnScheme];
          if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
          }
          var uriComponents = urnComponents;
          var nss = urnComponents.nss;
          uriComponents.path = (nid || options.nid) + ":" + nss;
          return uriComponents;
        }
      };
      var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
      var handler$6 = {
        scheme: "urn:uuid",
        parse: function parse2(urnComponents, options) {
          var uuidComponents = urnComponents;
          uuidComponents.uuid = uuidComponents.nss;
          uuidComponents.nss = void 0;
          if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
          }
          return uuidComponents;
        },
        serialize: function serialize2(uuidComponents, options) {
          var urnComponents = uuidComponents;
          urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
          return urnComponents;
        }
      };
      SCHEMES[handler.scheme] = handler;
      SCHEMES[handler$1.scheme] = handler$1;
      SCHEMES[handler$2.scheme] = handler$2;
      SCHEMES[handler$3.scheme] = handler$3;
      SCHEMES[handler$4.scheme] = handler$4;
      SCHEMES[handler$5.scheme] = handler$5;
      SCHEMES[handler$6.scheme] = handler$6;
      exports2.SCHEMES = SCHEMES;
      exports2.pctEncChar = pctEncChar;
      exports2.pctDecChars = pctDecChars;
      exports2.parse = parse;
      exports2.removeDotSegments = removeDotSegments;
      exports2.serialize = serialize;
      exports2.resolveComponents = resolveComponents;
      exports2.resolve = resolve;
      exports2.normalize = normalize;
      exports2.equal = equal;
      exports2.escapeComponent = escapeComponent;
      exports2.unescapeComponent = unescapeComponent;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});
var require_uri = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/runtime/uri.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uri = require_uri_all();
    uri.code = 'require("ajv/dist/runtime/uri").default';
    exports.default = uri;
  }
});
var require_core = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    var ref_error_1 = require_ref_error();
    var rules_1 = require_rules();
    var compile_1 = require_compile();
    var codegen_2 = require_codegen();
    var resolve_1 = require_resolve();
    var dataType_1 = require_dataType();
    var util_1 = require_util();
    var $dataRefSchema = require_data();
    var uri_1 = require_uri();
    var defaultRegExp = (str, flags) => new RegExp(str, flags);
    defaultRegExp.code = "new RegExp";
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    var removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    var deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    var MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    var Ajv2 = class {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = { ...$dataRefSchema };
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data)
          this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_1.default))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
          if (this.refs[ref]) {
            throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        async function loadMissingSchema(ref) {
          const _schema = await _loadSchema.call(this, ref);
          if (!this.refs[ref])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref])
            this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
          const p = this._loading[ref];
          if (p)
            return p;
          try {
            return await (this._loading[ref] = loadSchema(ref));
          } finally {
            delete this._loading[ref];
          }
        }
      }
      // Adds schema to the instance
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id;
        if (typeof schema === "object") {
          const { schemaId } = this.opts;
          id = schema[schemaId];
          if (id !== void 0 && typeof id != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== void 0 && typeof $schema != "string") {
          throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const { schemaId } = this.opts;
          const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id = schemaKeyRef[this.opts.schemaId];
            if (id) {
              id = (0, resolve_1.normalizeId)(id);
              delete this.schemas[id];
              delete this.refs[id];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions) {
        for (const def of definitions)
          this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword;
        if (typeof kwdOrDef == "string") {
          keyword = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword = def.keyword;
          if (Array.isArray(keyword) && !keyword.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
          (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
          ...def,
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword) {
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format) {
        if (typeof format == "string")
          format = new RegExp(format);
        this.formats[name] = format;
        return this;
      }
      errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors || errors.length === 0)
          return "No errors";
        return errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules) {
            const rule = rules[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema = keywords[key];
            if ($data && schema)
              keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
          id = schema[schemaId];
        } else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId)
            this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
          throw new Error(`schema with key or id "${id}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_1.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    };
    exports.default = Ajv2;
    Ajv2.ValidationError = validation_error_1.default;
    Ajv2.MissingRefError = ref_error_1.default;
    function checkOptions(checkOpts, options, msg, log = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_1.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
          this.addFormat(name, format);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
          def.keyword = keyword;
        this.addKeyword(def);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = { ...this.opts };
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    var noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def) {
      const { RULES } = this;
      (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def)
        return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword, definition, dataType) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
      if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword] = true;
      if (!definition)
        return;
      const rule = {
        keyword,
        definition: {
          ...definition,
          type: (0, dataType_1.getJSONTypes)(definition.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        }
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def) {
      let { metaSchema } = def;
      if (metaSchema === void 0)
        return;
      if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    var $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
  }
});
var require_id = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/core/id.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var def = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports.default = def;
  }
});
var require_ref = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/core/ref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callRef = exports.getValidate = void 0;
    var ref_error_1 = require_ref_error();
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var def = {
      keyword: "$ref",
      schemaType: "string",
      code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
          return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === void 0)
          throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
          return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
          if (env === root)
            return callRef(cxt, validateName, env, env.$async);
          const rootName = gen.scopeValue("root", { ref: root });
          return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
          const v = getValidate(cxt, sch);
          callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
          const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
          const valid = gen.name("valid");
          const schCxt = cxt.subschema({
            schema: sch,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: $ref
          }, valid);
          cxt.mergeEvaluated(schCxt);
          cxt.ok(valid);
        }
      }
    };
    function getValidate(cxt, sch) {
      const { gen } = cxt;
      return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
    }
    exports.getValidate = getValidate;
    function callRef(cxt, v, sch, $async) {
      const { gen, it } = cxt;
      const { allErrors, schemaEnv: env, opts } = it;
      const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
      if ($async)
        callAsyncRef();
      else
        callSyncRef();
      function callAsyncRef() {
        if (!env.$async)
          throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
          gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
          addEvaluatedFrom(v);
          if (!allErrors)
            gen.assign(valid, true);
        }, (e) => {
          gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
          addErrorsFrom(e);
          if (!allErrors)
            gen.assign(valid, false);
        });
        cxt.ok(valid);
      }
      function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
      }
      function addErrorsFrom(source) {
        const errs = (0, codegen_1._)`${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
        gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      }
      function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
          return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        if (it.props !== true) {
          if (schEvaluated && !schEvaluated.dynamicProps) {
            if (schEvaluated.props !== void 0) {
              it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
            }
          } else {
            const props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
          }
        }
        if (it.items !== true) {
          if (schEvaluated && !schEvaluated.dynamicItems) {
            if (schEvaluated.items !== void 0) {
              it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
            }
          } else {
            const items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
          }
        }
      }
    }
    exports.callRef = callRef;
    exports.default = def;
  }
});
var require_core2 = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/core/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var id_1 = require_id();
    var ref_1 = require_ref();
    var core = [
      "$schema",
      "$id",
      "$defs",
      "$vocabulary",
      { keyword: "$comment" },
      "definitions",
      id_1.default,
      ref_1.default
    ];
    exports.default = core;
  }
});
var require_limitNumber = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var ops = codegen_1.operators;
    var KWDs = {
      maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
      minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
      exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
      exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
    };
    var error = {
      message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    var def = {
      keyword: Object.keys(KWDs),
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
      }
    };
    exports.default = def;
  }
});
var require_multipleOf = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
      params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
    };
    var def = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
      }
    };
    exports.default = def;
  }
});
var require_ucs2length = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});
var require_limitLength = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var ucs2length_1 = require_ucs2length();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});
var require_pattern = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
    };
    var def = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? (0, codegen_1._)`(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
        cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
      }
    };
    exports.default = def;
  }
});
var require_limitProperties = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});
var require_required = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/required.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
      params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
    };
    var def = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
          return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
          allErrorsMode();
        else
          exitOnErrorMode();
        if (opts.strictRequired) {
          const props = cxt.parentSchema.properties;
          const { definedProperties } = cxt.it;
          for (const requiredKey of schema) {
            if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
              const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
              const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
              (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
            }
          }
        }
        function allErrorsMode() {
          if (useLoop || $data) {
            cxt.block$data(codegen_1.nil, loopAllRequired);
          } else {
            for (const prop of schema) {
              (0, code_1.checkReportMissingProp)(cxt, prop);
            }
          }
        }
        function exitOnErrorMode() {
          const missing = gen.let("missing");
          if (useLoop || $data) {
            const valid = gen.let("valid", true);
            cxt.block$data(valid, () => loopUntilMissing(missing, valid));
            cxt.ok(valid);
          } else {
            gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
          }
        }
        function loopAllRequired() {
          gen.forOf("prop", schemaCode, (prop) => {
            cxt.setParams({ missingProperty: prop });
            gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
          });
        }
        function loopUntilMissing(missing, valid) {
          cxt.setParams({ missingProperty: missing });
          gen.forOf(missing, schemaCode, () => {
            gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
            gen.if((0, codegen_1.not)(valid), () => {
              cxt.error();
              gen.break();
            });
          }, codegen_1.nil);
        }
      }
    };
    exports.default = def;
  }
});
var require_limitItems = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});
var require_equal = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal;
  }
});
var require_uniqueItems = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dataType_1 = require_dataType();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
      params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
    };
    var def = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
          return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
          const i = gen.let("i", (0, codegen_1._)`${data}.length`);
          const j = gen.let("j");
          cxt.setParams({ i, j });
          gen.assign(valid, true);
          gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
          return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
          const item = gen.name("item");
          const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
          const indices = gen.const("indices", (0, codegen_1._)`{}`);
          gen.for((0, codegen_1._)`;${i}--;`, () => {
            gen.let(item, (0, codegen_1._)`${data}[${i}]`);
            gen.if(wrongType, (0, codegen_1._)`continue`);
            if (itemTypes.length > 1)
              gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
            gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
              gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
              cxt.error();
              gen.assign(valid, false).break();
            }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
          });
        }
        function loopN2(i, j) {
          const eql = (0, util_1.useFunc)(gen, equal_1.default);
          const outer = gen.name("outer");
          gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
            cxt.error();
            gen.assign(valid, false).break(outer);
          })));
        }
      }
    };
    exports.default = def;
  }
});
var require_const = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/const.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to constant",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
    };
    var def = {
      keyword: "const",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || schema && typeof schema == "object") {
          cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        } else {
          cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
        }
      }
    };
    exports.default = def;
  }
});
var require_enum = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
    };
    var def = {
      keyword: "enum",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
          throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
          valid = gen.let("valid");
          cxt.block$data(valid, loopEnum);
        } else {
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          const vSchema = gen.const("vSchema", schemaCode);
          valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.assign(valid, false);
          gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
          const sch = schema[i];
          return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
        }
      }
    };
    exports.default = def;
  }
});
var require_validation = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/validation/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var limitNumber_1 = require_limitNumber();
    var multipleOf_1 = require_multipleOf();
    var limitLength_1 = require_limitLength();
    var pattern_1 = require_pattern();
    var limitProperties_1 = require_limitProperties();
    var required_1 = require_required();
    var limitItems_1 = require_limitItems();
    var uniqueItems_1 = require_uniqueItems();
    var const_1 = require_const();
    var enum_1 = require_enum();
    var validation = [
      // number
      limitNumber_1.default,
      multipleOf_1.default,
      // string
      limitLength_1.default,
      pattern_1.default,
      // object
      limitProperties_1.default,
      required_1.default,
      // array
      limitItems_1.default,
      uniqueItems_1.default,
      // any
      { keyword: "type", schemaType: ["string", "array"] },
      { keyword: "nullable", schemaType: "boolean" },
      const_1.default,
      enum_1.default
    ];
    exports.default = validation;
  }
});
var require_additionalItems = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateAdditionalItems = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
          (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        validateAdditionalItems(cxt, items);
      }
    };
    function validateAdditionalItems(cxt, items) {
      const { gen, schema, data, keyword, it } = cxt;
      it.items = true;
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
      } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
      }
      function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
          cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
          if (!it.allErrors)
            gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
      }
    }
    exports.validateAdditionalItems = validateAdditionalItems;
    exports.default = def;
  }
});
var require_items = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/items.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateTuple = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
          return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    function validateTuple(cxt, extraItems, schArr = cxt.schema) {
      const { gen, parentSchema, data, keyword, it } = cxt;
      checkStrictTuple(parentSchema);
      if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
      }
      const valid = gen.name("valid");
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
          return;
        gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
          keyword,
          schemaProp: i,
          dataProp: i
        }, valid));
        cxt.ok(valid);
      });
      function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
          const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
          (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
      }
    }
    exports.validateTuple = validateTuple;
    exports.default = def;
  }
});
var require_prefixItems = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var items_1 = require_items();
    var def = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
    };
    exports.default = def;
  }
});
var require_items2020 = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var additionalItems_1 = require_additionalItems();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        if (prefixItems)
          (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
          cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    exports.default = def;
  }
});
var require_contains = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
      params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
    };
    var def = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
          min = minContains === void 0 ? 1 : minContains;
          max = maxContains;
        } else {
          min = 1;
        }
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        cxt.setParams({ min, max });
        if (max === void 0 && min === 0) {
          (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
          return;
        }
        if (max !== void 0 && min > max) {
          (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
          cxt.fail();
          return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          let cond = (0, codegen_1._)`${len} >= ${min}`;
          if (max !== void 0)
            cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
          cxt.pass(cond);
          return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === void 0 && min === 1) {
          validateItems(valid, () => gen.if(valid, () => gen.break()));
        } else if (min === 0) {
          gen.let(valid, true);
          if (max !== void 0)
            gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
        } else {
          gen.let(valid, false);
          validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
          const schValid = gen.name("_valid");
          const count = gen.let("count", 0);
          validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword: "contains",
              dataProp: i,
              dataPropType: util_1.Type.Num,
              compositeRule: true
            }, _valid);
            block();
          });
        }
        function checkLimits(count) {
          gen.code((0, codegen_1._)`${count}++`);
          if (max === void 0) {
            gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
          } else {
            gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, false).break());
            if (min === 1)
              gen.assign(valid, true);
            else
              gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true));
          }
        }
      }
    };
    exports.default = def;
  }
});
var require_dependencies = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    exports.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    var def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_1.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
          continue;
        gen.if(
          (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
          },
          () => gen.var(valid, true)
          // TODO var
        );
        cxt.ok(valid);
      }
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def;
  }
});
var require_propertyNames = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "property name must be valid",
      params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
    };
    var def = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error,
      code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
          cxt.setParams({ propertyName: key });
          cxt.subschema({
            keyword: "propertyNames",
            data: key,
            dataTypes: ["string"],
            propertyName: key,
            compositeRule: true
          }, valid);
          gen.if((0, codegen_1.not)(valid), () => {
            cxt.error(true);
            if (!it.allErrors)
              gen.break();
          });
        });
        cxt.ok(valid);
      }
    };
    exports.default = def;
  }
});
var require_additionalProperties = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var util_1 = require_util();
    var error = {
      message: "must NOT have additional properties",
      params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
    };
    var def = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: true,
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        if (!errsCount)
          throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
          return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
          gen.forIn("key", data, (key) => {
            if (!props.length && !patProps.length)
              additionalPropertyCode(key);
            else
              gen.if(isAdditional(key), () => additionalPropertyCode(key));
          });
        }
        function isAdditional(key) {
          let definedProp;
          if (props.length > 8) {
            const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
            definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
          } else if (props.length) {
            definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
          } else {
            definedProp = codegen_1.nil;
          }
          if (patProps.length) {
            definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
          }
          return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
          gen.code((0, codegen_1._)`delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
          if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
            deleteAdditional(key);
            return;
          }
          if (schema === false) {
            cxt.setParams({ additionalProperty: key });
            cxt.error();
            if (!allErrors)
              gen.break();
            return;
          }
          if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            const valid = gen.name("valid");
            if (opts.removeAdditional === "failing") {
              applyAdditionalSchema(key, valid, false);
              gen.if((0, codegen_1.not)(valid), () => {
                cxt.reset();
                deleteAdditional(key);
              });
            } else {
              applyAdditionalSchema(key, valid);
              if (!allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
          }
        }
        function applyAdditionalSchema(key, valid, errors) {
          const subschema = {
            keyword: "additionalProperties",
            dataProp: key,
            dataPropType: util_1.Type.Str
          };
          if (errors === false) {
            Object.assign(subschema, {
              compositeRule: true,
              createErrors: false,
              allErrors: false
            });
          }
          cxt.subschema(subschema, valid);
        }
      }
    };
    exports.default = def;
  }
});
var require_properties = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var validate_1 = require_validate();
    var code_1 = require_code2();
    var util_1 = require_util();
    var additionalProperties_1 = require_additionalProperties();
    var def = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
          additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
          it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
          it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
          return;
        const valid = gen.name("valid");
        for (const prop of properties) {
          if (hasDefault(prop)) {
            applyPropertySchema(prop);
          } else {
            gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
            applyPropertySchema(prop);
            if (!it.allErrors)
              gen.else().var(valid, true);
            gen.endIf();
          }
          cxt.it.definedProperties.add(prop);
          cxt.ok(valid);
        }
        function hasDefault(prop) {
          return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
        }
        function applyPropertySchema(prop) {
          cxt.subschema({
            keyword: "properties",
            schemaProp: prop,
            dataProp: prop
          }, valid);
        }
      }
    };
    exports.default = def;
  }
});
var require_patternProperties = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var util_2 = require_util();
    var def = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
          return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
          it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
          for (const pat of patterns) {
            if (checkProperties)
              checkMatchingProperties(pat);
            if (it.allErrors) {
              validateProperties(pat);
            } else {
              gen.var(valid, true);
              validateProperties(pat);
              gen.if(valid);
            }
          }
        }
        function checkMatchingProperties(pat) {
          for (const prop in checkProperties) {
            if (new RegExp(pat).test(prop)) {
              (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
            }
          }
        }
        function validateProperties(pat) {
          gen.forIn("key", data, (key) => {
            gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
              const alwaysValid = alwaysValidPatterns.includes(pat);
              if (!alwaysValid) {
                cxt.subschema({
                  keyword: "patternProperties",
                  schemaProp: pat,
                  dataProp: key,
                  dataPropType: util_2.Type.Str
                }, valid);
              }
              if (it.opts.unevaluated && props !== true) {
                gen.assign((0, codegen_1._)`${props}[${key}]`, true);
              } else if (!alwaysValid && !it.allErrors) {
                gen.if((0, codegen_1.not)(valid), () => gen.break());
              }
            });
          });
        }
      }
    };
    exports.default = def;
  }
});
var require_not = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/not.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          cxt.fail();
          return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
          keyword: "not",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
      },
      error: { message: "must NOT be valid" }
    };
    exports.default = def;
  }
});
var require_anyOf = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var def = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: { message: "must match a schema in anyOf" }
    };
    exports.default = def;
  }
});
var require_oneOf = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "must match exactly one schema in oneOf",
      params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
    };
    var def = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
          return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
          schArr.forEach((sch, i) => {
            let schCxt;
            if ((0, util_1.alwaysValidSchema)(it, sch)) {
              gen.var(schValid, true);
            } else {
              schCxt = cxt.subschema({
                keyword: "oneOf",
                schemaProp: i,
                compositeRule: true
              }, schValid);
            }
            if (i > 0) {
              gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
            }
            gen.if(schValid, () => {
              gen.assign(valid, true);
              gen.assign(passing, i);
              if (schCxt)
                cxt.mergeEvaluated(schCxt, codegen_1.Name);
            });
          });
        }
      }
    };
    exports.default = def;
  }
});
var require_allOf = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "allOf",
      schemaType: "array",
      code(cxt) {
        const { gen, schema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
          const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
          cxt.ok(valid);
          cxt.mergeEvaluated(schCxt);
        });
      }
    };
    exports.default = def;
  }
});
var require_if = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/if.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
      params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
    };
    var def = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === void 0 && parentSchema.else === void 0) {
          (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
          return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
          const ifClause = gen.let("ifClause");
          cxt.setParams({ ifClause });
          gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else if (hasThen) {
          gen.if(schValid, validateClause("then"));
        } else {
          gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
          const schCxt = cxt.subschema({
            keyword: "if",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, schValid);
          cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
          return () => {
            const schCxt = cxt.subschema({ keyword }, schValid);
            gen.assign(valid, schValid);
            cxt.mergeValidEvaluated(schCxt, valid);
            if (ifClause)
              gen.assign(ifClause, (0, codegen_1._)`${keyword}`);
            else
              cxt.setParams({ ifClause: keyword });
          };
        }
      }
    };
    function hasSchema(it, keyword) {
      const schema = it.schema[keyword];
      return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
    }
    exports.default = def;
  }
});
var require_thenElse = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword, parentSchema, it }) {
        if (parentSchema.if === void 0)
          (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports.default = def;
  }
});
var require_applicator = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/applicator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var additionalItems_1 = require_additionalItems();
    var prefixItems_1 = require_prefixItems();
    var items_1 = require_items();
    var items2020_1 = require_items2020();
    var contains_1 = require_contains();
    var dependencies_1 = require_dependencies();
    var propertyNames_1 = require_propertyNames();
    var additionalProperties_1 = require_additionalProperties();
    var properties_1 = require_properties();
    var patternProperties_1 = require_patternProperties();
    var not_1 = require_not();
    var anyOf_1 = require_anyOf();
    var oneOf_1 = require_oneOf();
    var allOf_1 = require_allOf();
    var if_1 = require_if();
    var thenElse_1 = require_thenElse();
    function getApplicator(draft2020 = false) {
      const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default
      ];
      if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
      else
        applicator.push(additionalItems_1.default, items_1.default);
      applicator.push(contains_1.default);
      return applicator;
    }
    exports.default = getApplicator;
  }
});
var require_format = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/format/format.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
    };
    var def = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: true,
      error,
      code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
          return;
        if ($data)
          validate$DataFormat();
        else
          validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self.formats,
            code: opts.code.formats
          });
          const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
          const fType = gen.let("fType");
          const format = gen.let("format");
          gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef));
          cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
          function unknownFmt() {
            if (opts.strictSchema === false)
              return codegen_1.nil;
            return (0, codegen_1._)`${schemaCode} && !${format}`;
          }
          function invalidFmt() {
            const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`;
            const validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
            return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
          }
        }
        function validateFormat() {
          const formatDef = self.formats[schema];
          if (!formatDef) {
            unknownFormat();
            return;
          }
          if (formatDef === true)
            return;
          const [fmtType, format, fmtRef] = getFormat(formatDef);
          if (fmtType === ruleType)
            cxt.pass(validCondition());
          function unknownFormat() {
            if (opts.strictSchema === false) {
              self.logger.warn(unknownMsg());
              return;
            }
            throw new Error(unknownMsg());
            function unknownMsg() {
              return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
            }
          }
          function getFormat(fmtDef) {
            const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
            const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
            if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
              return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
            }
            return ["string", fmtDef, fmt];
          }
          function validCondition() {
            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
              if (!schemaEnv.$async)
                throw new Error("async format in sync schema");
              return (0, codegen_1._)`await ${fmtRef}(${data})`;
            }
            return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
          }
        }
      }
    };
    exports.default = def;
  }
});
var require_format2 = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/format/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var format_1 = require_format();
    var format = [format_1.default];
    exports.default = format;
  }
});
var require_metadata = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contentVocabulary = exports.metadataVocabulary = void 0;
    exports.metadataVocabulary = [
      "title",
      "description",
      "default",
      "deprecated",
      "readOnly",
      "writeOnly",
      "examples"
    ];
    exports.contentVocabulary = [
      "contentMediaType",
      "contentEncoding",
      "contentSchema"
    ];
  }
});
var require_draft7 = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/draft7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require_core2();
    var validation_1 = require_validation();
    var applicator_1 = require_applicator();
    var format_1 = require_format2();
    var metadata_1 = require_metadata();
    var draft7Vocabularies = [
      core_1.default,
      validation_1.default,
      (0, applicator_1.default)(),
      format_1.default,
      metadata_1.metadataVocabulary,
      metadata_1.contentVocabulary
    ];
    exports.default = draft7Vocabularies;
  }
});
var require_types = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiscrError = void 0;
    var DiscrError;
    (function(DiscrError2) {
      DiscrError2["Tag"] = "tag";
      DiscrError2["Mapping"] = "mapping";
    })(DiscrError = exports.DiscrError || (exports.DiscrError = {}));
  }
});
var require_discriminator = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var types_1 = require_types();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var error = {
      message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
      params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
    };
    var def = {
      keyword: "discriminator",
      type: "object",
      schemaType: "object",
      error,
      code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
          throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
          throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
          throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
          throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
          const mapping = getMapping();
          gen.if(false);
          for (const tagValue in mapping) {
            gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
            gen.assign(valid, applyTagSchema(mapping[tagValue]));
          }
          gen.else();
          cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
          gen.endIf();
        }
        function applyTagSchema(schemaProp) {
          const _valid = gen.name("valid");
          const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
          cxt.mergeEvaluated(schCxt, codegen_1.Name);
          return _valid;
        }
        function getMapping() {
          var _a;
          const oneOfMapping = {};
          const topRequired = hasRequired(parentSchema);
          let tagRequired = true;
          for (let i = 0; i < oneOf.length; i++) {
            let sch = oneOf[i];
            if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
              sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, sch === null || sch === void 0 ? void 0 : sch.$ref);
              if (sch instanceof compile_1.SchemaEnv)
                sch = sch.schema;
            }
            const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
            if (typeof propSch != "object") {
              throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
            }
            tagRequired = tagRequired && (topRequired || hasRequired(sch));
            addMappings(propSch, i);
          }
          if (!tagRequired)
            throw new Error(`discriminator: "${tagName}" must be required`);
          return oneOfMapping;
          function hasRequired({ required }) {
            return Array.isArray(required) && required.includes(tagName);
          }
          function addMappings(sch, i) {
            if (sch.const) {
              addMapping(sch.const, i);
            } else if (sch.enum) {
              for (const tagValue of sch.enum) {
                addMapping(tagValue, i);
              }
            } else {
              throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
            }
          }
          function addMapping(tagValue, i) {
            if (typeof tagValue != "string" || tagValue in oneOfMapping) {
              throw new Error(`discriminator: "${tagName}" values must be unique strings`);
            }
            oneOfMapping[tagValue] = i;
          }
        }
      }
    };
    exports.default = def;
  }
});
var require_json_schema_draft_07 = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports, module) {
    module.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
        },
        simpleTypes: {
          enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: true,
        readOnly: {
          type: "boolean",
          default: false
        },
        examples: {
          type: "array",
          items: true
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
          default: true
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
          }
        },
        propertyNames: { $ref: "#" },
        const: true,
        enum: {
          type: "array",
          items: true,
          minItems: 1,
          uniqueItems: true
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: true
    };
  }
});
var require_ajv = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+ajv@8.12.0/node_modules/ajv/dist/ajv.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var core_1 = require_core();
    var draft7_1 = require_draft7();
    var discriminator_1 = require_discriminator();
    var draft7MetaSchema = require_json_schema_draft_07();
    var META_SUPPORT_DATA = ["/properties"];
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var Ajv2 = class extends core_1.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
          this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    };
    module.exports = exports = Ajv2;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ajv2;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  }
});
var require_showdown = __commonJS({
  "../../node_modules/.pnpm/registry.npmjs.org+showdown@2.1.0/node_modules/showdown/dist/showdown.js"(exports, module) {
    (function() {
      function getDefaultOpts(simple) {
        "use strict";
        var defaultOptions = {
          omitExtraWLInCodeBlocks: {
            defaultValue: false,
            describe: "Omit the default extra whiteline added to code blocks",
            type: "boolean"
          },
          noHeaderId: {
            defaultValue: false,
            describe: "Turn on/off generated header id",
            type: "boolean"
          },
          prefixHeaderId: {
            defaultValue: false,
            describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
            type: "string"
          },
          rawPrefixHeaderId: {
            defaultValue: false,
            describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
            type: "boolean"
          },
          ghCompatibleHeaderId: {
            defaultValue: false,
            describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
            type: "boolean"
          },
          rawHeaderId: {
            defaultValue: false,
            describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`,
            type: "boolean"
          },
          headerLevelStart: {
            defaultValue: false,
            describe: "The header blocks level start",
            type: "integer"
          },
          parseImgDimensions: {
            defaultValue: false,
            describe: "Turn on/off image dimension parsing",
            type: "boolean"
          },
          simplifiedAutoLink: {
            defaultValue: false,
            describe: "Turn on/off GFM autolink style",
            type: "boolean"
          },
          excludeTrailingPunctuationFromURLs: {
            defaultValue: false,
            describe: "Excludes trailing punctuation from links generated with autoLinking",
            type: "boolean"
          },
          literalMidWordUnderscores: {
            defaultValue: false,
            describe: "Parse midword underscores as literal underscores",
            type: "boolean"
          },
          literalMidWordAsterisks: {
            defaultValue: false,
            describe: "Parse midword asterisks as literal asterisks",
            type: "boolean"
          },
          strikethrough: {
            defaultValue: false,
            describe: "Turn on/off strikethrough support",
            type: "boolean"
          },
          tables: {
            defaultValue: false,
            describe: "Turn on/off tables support",
            type: "boolean"
          },
          tablesHeaderId: {
            defaultValue: false,
            describe: "Add an id to table headers",
            type: "boolean"
          },
          ghCodeBlocks: {
            defaultValue: true,
            describe: "Turn on/off GFM fenced code blocks support",
            type: "boolean"
          },
          tasklists: {
            defaultValue: false,
            describe: "Turn on/off GFM tasklist support",
            type: "boolean"
          },
          smoothLivePreview: {
            defaultValue: false,
            describe: "Prevents weird effects in live previews due to incomplete input",
            type: "boolean"
          },
          smartIndentationFix: {
            defaultValue: false,
            describe: "Tries to smartly fix indentation in es6 strings",
            type: "boolean"
          },
          disableForced4SpacesIndentedSublists: {
            defaultValue: false,
            describe: "Disables the requirement of indenting nested sublists by 4 spaces",
            type: "boolean"
          },
          simpleLineBreaks: {
            defaultValue: false,
            describe: "Parses simple line breaks as <br> (GFM Style)",
            type: "boolean"
          },
          requireSpaceBeforeHeadingText: {
            defaultValue: false,
            describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
            type: "boolean"
          },
          ghMentions: {
            defaultValue: false,
            describe: "Enables github @mentions",
            type: "boolean"
          },
          ghMentionsLink: {
            defaultValue: "https://github.com/{u}",
            describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
            type: "string"
          },
          encodeEmails: {
            defaultValue: true,
            describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
            type: "boolean"
          },
          openLinksInNewWindow: {
            defaultValue: false,
            describe: "Open all links in new windows",
            type: "boolean"
          },
          backslashEscapesHTMLTags: {
            defaultValue: false,
            describe: "Support for HTML Tag escaping. ex: <div>foo</div>",
            type: "boolean"
          },
          emoji: {
            defaultValue: false,
            describe: "Enable emoji support. Ex: `this is a :smile: emoji`",
            type: "boolean"
          },
          underline: {
            defaultValue: false,
            describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
            type: "boolean"
          },
          ellipsis: {
            defaultValue: true,
            describe: "Replaces three dots with the ellipsis unicode character",
            type: "boolean"
          },
          completeHTMLDocument: {
            defaultValue: false,
            describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
            type: "boolean"
          },
          metadata: {
            defaultValue: false,
            describe: "Enable support for document metadata (defined at the top of the document between `\xAB\xAB\xAB` and `\xBB\xBB\xBB` or between `---` and `---`).",
            type: "boolean"
          },
          splitAdjacentBlockquotes: {
            defaultValue: false,
            describe: "Split adjacent blockquote blocks",
            type: "boolean"
          }
        };
        if (simple === false) {
          return JSON.parse(JSON.stringify(defaultOptions));
        }
        var ret = {};
        for (var opt in defaultOptions) {
          if (defaultOptions.hasOwnProperty(opt)) {
            ret[opt] = defaultOptions[opt].defaultValue;
          }
        }
        return ret;
      }
      function allOptionsOn() {
        "use strict";
        var options = getDefaultOpts(true), ret = {};
        for (var opt in options) {
          if (options.hasOwnProperty(opt)) {
            ret[opt] = true;
          }
        }
        return ret;
      }
      var showdown2 = {}, parsers = {}, extensions = {}, globalOptions = getDefaultOpts(true), setFlavor = "vanilla", flavor = {
        github: {
          omitExtraWLInCodeBlocks: true,
          simplifiedAutoLink: true,
          excludeTrailingPunctuationFromURLs: true,
          literalMidWordUnderscores: true,
          strikethrough: true,
          tables: true,
          tablesHeaderId: true,
          ghCodeBlocks: true,
          tasklists: true,
          disableForced4SpacesIndentedSublists: true,
          simpleLineBreaks: true,
          requireSpaceBeforeHeadingText: true,
          ghCompatibleHeaderId: true,
          ghMentions: true,
          backslashEscapesHTMLTags: true,
          emoji: true,
          splitAdjacentBlockquotes: true
        },
        original: {
          noHeaderId: true,
          ghCodeBlocks: false
        },
        ghost: {
          omitExtraWLInCodeBlocks: true,
          parseImgDimensions: true,
          simplifiedAutoLink: true,
          excludeTrailingPunctuationFromURLs: true,
          literalMidWordUnderscores: true,
          strikethrough: true,
          tables: true,
          tablesHeaderId: true,
          ghCodeBlocks: true,
          tasklists: true,
          smoothLivePreview: true,
          simpleLineBreaks: true,
          requireSpaceBeforeHeadingText: true,
          ghMentions: false,
          encodeEmails: true
        },
        vanilla: getDefaultOpts(true),
        allOn: allOptionsOn()
      };
      showdown2.helper = {};
      showdown2.extensions = {};
      showdown2.setOption = function(key, value) {
        "use strict";
        globalOptions[key] = value;
        return this;
      };
      showdown2.getOption = function(key) {
        "use strict";
        return globalOptions[key];
      };
      showdown2.getOptions = function() {
        "use strict";
        return globalOptions;
      };
      showdown2.resetOptions = function() {
        "use strict";
        globalOptions = getDefaultOpts(true);
      };
      showdown2.setFlavor = function(name) {
        "use strict";
        if (!flavor.hasOwnProperty(name)) {
          throw Error(name + " flavor was not found");
        }
        showdown2.resetOptions();
        var preset = flavor[name];
        setFlavor = name;
        for (var option in preset) {
          if (preset.hasOwnProperty(option)) {
            globalOptions[option] = preset[option];
          }
        }
      };
      showdown2.getFlavor = function() {
        "use strict";
        return setFlavor;
      };
      showdown2.getFlavorOptions = function(name) {
        "use strict";
        if (flavor.hasOwnProperty(name)) {
          return flavor[name];
        }
      };
      showdown2.getDefaultOptions = function(simple) {
        "use strict";
        return getDefaultOpts(simple);
      };
      showdown2.subParser = function(name, func) {
        "use strict";
        if (showdown2.helper.isString(name)) {
          if (typeof func !== "undefined") {
            parsers[name] = func;
          } else {
            if (parsers.hasOwnProperty(name)) {
              return parsers[name];
            } else {
              throw Error("SubParser named " + name + " not registered!");
            }
          }
        }
      };
      showdown2.extension = function(name, ext) {
        "use strict";
        if (!showdown2.helper.isString(name)) {
          throw Error("Extension 'name' must be a string");
        }
        name = showdown2.helper.stdExtName(name);
        if (showdown2.helper.isUndefined(ext)) {
          if (!extensions.hasOwnProperty(name)) {
            throw Error("Extension named " + name + " is not registered!");
          }
          return extensions[name];
        } else {
          if (typeof ext === "function") {
            ext = ext();
          }
          if (!showdown2.helper.isArray(ext)) {
            ext = [ext];
          }
          var validExtension = validate(ext, name);
          if (validExtension.valid) {
            extensions[name] = ext;
          } else {
            throw Error(validExtension.error);
          }
        }
      };
      showdown2.getAllExtensions = function() {
        "use strict";
        return extensions;
      };
      showdown2.removeExtension = function(name) {
        "use strict";
        delete extensions[name];
      };
      showdown2.resetExtensions = function() {
        "use strict";
        extensions = {};
      };
      function validate(extension, name) {
        "use strict";
        var errMsg = name ? "Error in " + name + " extension->" : "Error in unnamed extension", ret = {
          valid: true,
          error: ""
        };
        if (!showdown2.helper.isArray(extension)) {
          extension = [extension];
        }
        for (var i = 0; i < extension.length; ++i) {
          var baseMsg = errMsg + " sub-extension " + i + ": ", ext = extension[i];
          if (typeof ext !== "object") {
            ret.valid = false;
            ret.error = baseMsg + "must be an object, but " + typeof ext + " given";
            return ret;
          }
          if (!showdown2.helper.isString(ext.type)) {
            ret.valid = false;
            ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + " given";
            return ret;
          }
          var type = ext.type = ext.type.toLowerCase();
          if (type === "language") {
            type = ext.type = "lang";
          }
          if (type === "html") {
            type = ext.type = "output";
          }
          if (type !== "lang" && type !== "output" && type !== "listener") {
            ret.valid = false;
            ret.error = baseMsg + "type " + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
            return ret;
          }
          if (type === "listener") {
            if (showdown2.helper.isUndefined(ext.listeners)) {
              ret.valid = false;
              ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
              return ret;
            }
          } else {
            if (showdown2.helper.isUndefined(ext.filter) && showdown2.helper.isUndefined(ext.regex)) {
              ret.valid = false;
              ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
              return ret;
            }
          }
          if (ext.listeners) {
            if (typeof ext.listeners !== "object") {
              ret.valid = false;
              ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + " given";
              return ret;
            }
            for (var ln in ext.listeners) {
              if (ext.listeners.hasOwnProperty(ln)) {
                if (typeof ext.listeners[ln] !== "function") {
                  ret.valid = false;
                  ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + " must be a function but " + typeof ext.listeners[ln] + " given";
                  return ret;
                }
              }
            }
          }
          if (ext.filter) {
            if (typeof ext.filter !== "function") {
              ret.valid = false;
              ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + " given";
              return ret;
            }
          } else if (ext.regex) {
            if (showdown2.helper.isString(ext.regex)) {
              ext.regex = new RegExp(ext.regex, "g");
            }
            if (!(ext.regex instanceof RegExp)) {
              ret.valid = false;
              ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + " given";
              return ret;
            }
            if (showdown2.helper.isUndefined(ext.replace)) {
              ret.valid = false;
              ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
              return ret;
            }
          }
        }
        return ret;
      }
      showdown2.validateExtension = function(ext) {
        "use strict";
        var validateExtension = validate(ext, null);
        if (!validateExtension.valid) {
          console.warn(validateExtension.error);
          return false;
        }
        return true;
      };
      if (!showdown2.hasOwnProperty("helper")) {
        showdown2.helper = {};
      }
      showdown2.helper.isString = function(a) {
        "use strict";
        return typeof a === "string" || a instanceof String;
      };
      showdown2.helper.isFunction = function(a) {
        "use strict";
        var getType = {};
        return a && getType.toString.call(a) === "[object Function]";
      };
      showdown2.helper.isArray = function(a) {
        "use strict";
        return Array.isArray(a);
      };
      showdown2.helper.isUndefined = function(value) {
        "use strict";
        return typeof value === "undefined";
      };
      showdown2.helper.forEach = function(obj, callback) {
        "use strict";
        if (showdown2.helper.isUndefined(obj)) {
          throw new Error("obj param is required");
        }
        if (showdown2.helper.isUndefined(callback)) {
          throw new Error("callback param is required");
        }
        if (!showdown2.helper.isFunction(callback)) {
          throw new Error("callback param must be a function/closure");
        }
        if (typeof obj.forEach === "function") {
          obj.forEach(callback);
        } else if (showdown2.helper.isArray(obj)) {
          for (var i = 0; i < obj.length; i++) {
            callback(obj[i], i, obj);
          }
        } else if (typeof obj === "object") {
          for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              callback(obj[prop], prop, obj);
            }
          }
        } else {
          throw new Error("obj does not seem to be an array or an iterable object");
        }
      };
      showdown2.helper.stdExtName = function(s) {
        "use strict";
        return s.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
      };
      function escapeCharactersCallback(wholeMatch, m1) {
        "use strict";
        var charCodeToEscape = m1.charCodeAt(0);
        return "\xA8E" + charCodeToEscape + "E";
      }
      showdown2.helper.escapeCharactersCallback = escapeCharactersCallback;
      showdown2.helper.escapeCharacters = function(text, charsToEscape, afterBackslash) {
        "use strict";
        var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
        if (afterBackslash) {
          regexString = "\\\\" + regexString;
        }
        var regex = new RegExp(regexString, "g");
        text = text.replace(regex, escapeCharactersCallback);
        return text;
      };
      showdown2.helper.unescapeHTMLEntities = function(txt) {
        "use strict";
        return txt.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
      };
      var rgxFindMatchPos = function(str, left, right, flags) {
        "use strict";
        var f = flags || "", g = f.indexOf("g") > -1, x = new RegExp(left + "|" + right, "g" + f.replace(/g/g, "")), l = new RegExp(left, f.replace(/g/g, "")), pos = [], t, s, m, start, end;
        do {
          t = 0;
          while (m = x.exec(str)) {
            if (l.test(m[0])) {
              if (!t++) {
                s = x.lastIndex;
                start = s - m[0].length;
              }
            } else if (t) {
              if (!--t) {
                end = m.index + m[0].length;
                var obj = {
                  left: { start, end: s },
                  match: { start: s, end: m.index },
                  right: { start: m.index, end },
                  wholeMatch: { start, end }
                };
                pos.push(obj);
                if (!g) {
                  return pos;
                }
              }
            }
          }
        } while (t && (x.lastIndex = s));
        return pos;
      };
      showdown2.helper.matchRecursiveRegExp = function(str, left, right, flags) {
        "use strict";
        var matchPos = rgxFindMatchPos(str, left, right, flags), results = [];
        for (var i = 0; i < matchPos.length; ++i) {
          results.push([
            str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
            str.slice(matchPos[i].match.start, matchPos[i].match.end),
            str.slice(matchPos[i].left.start, matchPos[i].left.end),
            str.slice(matchPos[i].right.start, matchPos[i].right.end)
          ]);
        }
        return results;
      };
      showdown2.helper.replaceRecursiveRegExp = function(str, replacement, left, right, flags) {
        "use strict";
        if (!showdown2.helper.isFunction(replacement)) {
          var repStr = replacement;
          replacement = function() {
            return repStr;
          };
        }
        var matchPos = rgxFindMatchPos(str, left, right, flags), finalStr = str, lng = matchPos.length;
        if (lng > 0) {
          var bits = [];
          if (matchPos[0].wholeMatch.start !== 0) {
            bits.push(str.slice(0, matchPos[0].wholeMatch.start));
          }
          for (var i = 0; i < lng; ++i) {
            bits.push(
              replacement(
                str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
                str.slice(matchPos[i].match.start, matchPos[i].match.end),
                str.slice(matchPos[i].left.start, matchPos[i].left.end),
                str.slice(matchPos[i].right.start, matchPos[i].right.end)
              )
            );
            if (i < lng - 1) {
              bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
            }
          }
          if (matchPos[lng - 1].wholeMatch.end < str.length) {
            bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
          }
          finalStr = bits.join("");
        }
        return finalStr;
      };
      showdown2.helper.regexIndexOf = function(str, regex, fromIndex) {
        "use strict";
        if (!showdown2.helper.isString(str)) {
          throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
        }
        if (regex instanceof RegExp === false) {
          throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
        }
        var indexOf = str.substring(fromIndex || 0).search(regex);
        return indexOf >= 0 ? indexOf + (fromIndex || 0) : indexOf;
      };
      showdown2.helper.splitAtIndex = function(str, index) {
        "use strict";
        if (!showdown2.helper.isString(str)) {
          throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
        }
        return [str.substring(0, index), str.substring(index)];
      };
      showdown2.helper.encodeEmailAddress = function(mail) {
        "use strict";
        var encode = [
          function(ch) {
            return "&#" + ch.charCodeAt(0) + ";";
          },
          function(ch) {
            return "&#x" + ch.charCodeAt(0).toString(16) + ";";
          },
          function(ch) {
            return ch;
          }
        ];
        mail = mail.replace(/./g, function(ch) {
          if (ch === "@") {
            ch = encode[Math.floor(Math.random() * 2)](ch);
          } else {
            var r = Math.random();
            ch = r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch);
          }
          return ch;
        });
        return mail;
      };
      showdown2.helper.padEnd = function padEnd(str, targetLength, padString) {
        "use strict";
        targetLength = targetLength >> 0;
        padString = String(padString || " ");
        if (str.length > targetLength) {
          return String(str);
        } else {
          targetLength = targetLength - str.length;
          if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
          }
          return String(str) + padString.slice(0, targetLength);
        }
      };
      if (typeof console === "undefined") {
        console = {
          warn: function(msg) {
            "use strict";
            alert(msg);
          },
          log: function(msg) {
            "use strict";
            alert(msg);
          },
          error: function(msg) {
            "use strict";
            throw msg;
          }
        };
      }
      showdown2.helper.regexes = {
        asteriskDashAndColon: /([*_:~])/g
      };
      showdown2.helper.emojis = {
        "+1": "\u{1F44D}",
        "-1": "\u{1F44E}",
        "100": "\u{1F4AF}",
        "1234": "\u{1F522}",
        "1st_place_medal": "\u{1F947}",
        "2nd_place_medal": "\u{1F948}",
        "3rd_place_medal": "\u{1F949}",
        "8ball": "\u{1F3B1}",
        "a": "\u{1F170}\uFE0F",
        "ab": "\u{1F18E}",
        "abc": "\u{1F524}",
        "abcd": "\u{1F521}",
        "accept": "\u{1F251}",
        "aerial_tramway": "\u{1F6A1}",
        "airplane": "\u2708\uFE0F",
        "alarm_clock": "\u23F0",
        "alembic": "\u2697\uFE0F",
        "alien": "\u{1F47D}",
        "ambulance": "\u{1F691}",
        "amphora": "\u{1F3FA}",
        "anchor": "\u2693\uFE0F",
        "angel": "\u{1F47C}",
        "anger": "\u{1F4A2}",
        "angry": "\u{1F620}",
        "anguished": "\u{1F627}",
        "ant": "\u{1F41C}",
        "apple": "\u{1F34E}",
        "aquarius": "\u2652\uFE0F",
        "aries": "\u2648\uFE0F",
        "arrow_backward": "\u25C0\uFE0F",
        "arrow_double_down": "\u23EC",
        "arrow_double_up": "\u23EB",
        "arrow_down": "\u2B07\uFE0F",
        "arrow_down_small": "\u{1F53D}",
        "arrow_forward": "\u25B6\uFE0F",
        "arrow_heading_down": "\u2935\uFE0F",
        "arrow_heading_up": "\u2934\uFE0F",
        "arrow_left": "\u2B05\uFE0F",
        "arrow_lower_left": "\u2199\uFE0F",
        "arrow_lower_right": "\u2198\uFE0F",
        "arrow_right": "\u27A1\uFE0F",
        "arrow_right_hook": "\u21AA\uFE0F",
        "arrow_up": "\u2B06\uFE0F",
        "arrow_up_down": "\u2195\uFE0F",
        "arrow_up_small": "\u{1F53C}",
        "arrow_upper_left": "\u2196\uFE0F",
        "arrow_upper_right": "\u2197\uFE0F",
        "arrows_clockwise": "\u{1F503}",
        "arrows_counterclockwise": "\u{1F504}",
        "art": "\u{1F3A8}",
        "articulated_lorry": "\u{1F69B}",
        "artificial_satellite": "\u{1F6F0}",
        "astonished": "\u{1F632}",
        "athletic_shoe": "\u{1F45F}",
        "atm": "\u{1F3E7}",
        "atom_symbol": "\u269B\uFE0F",
        "avocado": "\u{1F951}",
        "b": "\u{1F171}\uFE0F",
        "baby": "\u{1F476}",
        "baby_bottle": "\u{1F37C}",
        "baby_chick": "\u{1F424}",
        "baby_symbol": "\u{1F6BC}",
        "back": "\u{1F519}",
        "bacon": "\u{1F953}",
        "badminton": "\u{1F3F8}",
        "baggage_claim": "\u{1F6C4}",
        "baguette_bread": "\u{1F956}",
        "balance_scale": "\u2696\uFE0F",
        "balloon": "\u{1F388}",
        "ballot_box": "\u{1F5F3}",
        "ballot_box_with_check": "\u2611\uFE0F",
        "bamboo": "\u{1F38D}",
        "banana": "\u{1F34C}",
        "bangbang": "\u203C\uFE0F",
        "bank": "\u{1F3E6}",
        "bar_chart": "\u{1F4CA}",
        "barber": "\u{1F488}",
        "baseball": "\u26BE\uFE0F",
        "basketball": "\u{1F3C0}",
        "basketball_man": "\u26F9\uFE0F",
        "basketball_woman": "\u26F9\uFE0F&zwj;\u2640\uFE0F",
        "bat": "\u{1F987}",
        "bath": "\u{1F6C0}",
        "bathtub": "\u{1F6C1}",
        "battery": "\u{1F50B}",
        "beach_umbrella": "\u{1F3D6}",
        "bear": "\u{1F43B}",
        "bed": "\u{1F6CF}",
        "bee": "\u{1F41D}",
        "beer": "\u{1F37A}",
        "beers": "\u{1F37B}",
        "beetle": "\u{1F41E}",
        "beginner": "\u{1F530}",
        "bell": "\u{1F514}",
        "bellhop_bell": "\u{1F6CE}",
        "bento": "\u{1F371}",
        "biking_man": "\u{1F6B4}",
        "bike": "\u{1F6B2}",
        "biking_woman": "\u{1F6B4}&zwj;\u2640\uFE0F",
        "bikini": "\u{1F459}",
        "biohazard": "\u2623\uFE0F",
        "bird": "\u{1F426}",
        "birthday": "\u{1F382}",
        "black_circle": "\u26AB\uFE0F",
        "black_flag": "\u{1F3F4}",
        "black_heart": "\u{1F5A4}",
        "black_joker": "\u{1F0CF}",
        "black_large_square": "\u2B1B\uFE0F",
        "black_medium_small_square": "\u25FE\uFE0F",
        "black_medium_square": "\u25FC\uFE0F",
        "black_nib": "\u2712\uFE0F",
        "black_small_square": "\u25AA\uFE0F",
        "black_square_button": "\u{1F532}",
        "blonde_man": "\u{1F471}",
        "blonde_woman": "\u{1F471}&zwj;\u2640\uFE0F",
        "blossom": "\u{1F33C}",
        "blowfish": "\u{1F421}",
        "blue_book": "\u{1F4D8}",
        "blue_car": "\u{1F699}",
        "blue_heart": "\u{1F499}",
        "blush": "\u{1F60A}",
        "boar": "\u{1F417}",
        "boat": "\u26F5\uFE0F",
        "bomb": "\u{1F4A3}",
        "book": "\u{1F4D6}",
        "bookmark": "\u{1F516}",
        "bookmark_tabs": "\u{1F4D1}",
        "books": "\u{1F4DA}",
        "boom": "\u{1F4A5}",
        "boot": "\u{1F462}",
        "bouquet": "\u{1F490}",
        "bowing_man": "\u{1F647}",
        "bow_and_arrow": "\u{1F3F9}",
        "bowing_woman": "\u{1F647}&zwj;\u2640\uFE0F",
        "bowling": "\u{1F3B3}",
        "boxing_glove": "\u{1F94A}",
        "boy": "\u{1F466}",
        "bread": "\u{1F35E}",
        "bride_with_veil": "\u{1F470}",
        "bridge_at_night": "\u{1F309}",
        "briefcase": "\u{1F4BC}",
        "broken_heart": "\u{1F494}",
        "bug": "\u{1F41B}",
        "building_construction": "\u{1F3D7}",
        "bulb": "\u{1F4A1}",
        "bullettrain_front": "\u{1F685}",
        "bullettrain_side": "\u{1F684}",
        "burrito": "\u{1F32F}",
        "bus": "\u{1F68C}",
        "business_suit_levitating": "\u{1F574}",
        "busstop": "\u{1F68F}",
        "bust_in_silhouette": "\u{1F464}",
        "busts_in_silhouette": "\u{1F465}",
        "butterfly": "\u{1F98B}",
        "cactus": "\u{1F335}",
        "cake": "\u{1F370}",
        "calendar": "\u{1F4C6}",
        "call_me_hand": "\u{1F919}",
        "calling": "\u{1F4F2}",
        "camel": "\u{1F42B}",
        "camera": "\u{1F4F7}",
        "camera_flash": "\u{1F4F8}",
        "camping": "\u{1F3D5}",
        "cancer": "\u264B\uFE0F",
        "candle": "\u{1F56F}",
        "candy": "\u{1F36C}",
        "canoe": "\u{1F6F6}",
        "capital_abcd": "\u{1F520}",
        "capricorn": "\u2651\uFE0F",
        "car": "\u{1F697}",
        "card_file_box": "\u{1F5C3}",
        "card_index": "\u{1F4C7}",
        "card_index_dividers": "\u{1F5C2}",
        "carousel_horse": "\u{1F3A0}",
        "carrot": "\u{1F955}",
        "cat": "\u{1F431}",
        "cat2": "\u{1F408}",
        "cd": "\u{1F4BF}",
        "chains": "\u26D3",
        "champagne": "\u{1F37E}",
        "chart": "\u{1F4B9}",
        "chart_with_downwards_trend": "\u{1F4C9}",
        "chart_with_upwards_trend": "\u{1F4C8}",
        "checkered_flag": "\u{1F3C1}",
        "cheese": "\u{1F9C0}",
        "cherries": "\u{1F352}",
        "cherry_blossom": "\u{1F338}",
        "chestnut": "\u{1F330}",
        "chicken": "\u{1F414}",
        "children_crossing": "\u{1F6B8}",
        "chipmunk": "\u{1F43F}",
        "chocolate_bar": "\u{1F36B}",
        "christmas_tree": "\u{1F384}",
        "church": "\u26EA\uFE0F",
        "cinema": "\u{1F3A6}",
        "circus_tent": "\u{1F3AA}",
        "city_sunrise": "\u{1F307}",
        "city_sunset": "\u{1F306}",
        "cityscape": "\u{1F3D9}",
        "cl": "\u{1F191}",
        "clamp": "\u{1F5DC}",
        "clap": "\u{1F44F}",
        "clapper": "\u{1F3AC}",
        "classical_building": "\u{1F3DB}",
        "clinking_glasses": "\u{1F942}",
        "clipboard": "\u{1F4CB}",
        "clock1": "\u{1F550}",
        "clock10": "\u{1F559}",
        "clock1030": "\u{1F565}",
        "clock11": "\u{1F55A}",
        "clock1130": "\u{1F566}",
        "clock12": "\u{1F55B}",
        "clock1230": "\u{1F567}",
        "clock130": "\u{1F55C}",
        "clock2": "\u{1F551}",
        "clock230": "\u{1F55D}",
        "clock3": "\u{1F552}",
        "clock330": "\u{1F55E}",
        "clock4": "\u{1F553}",
        "clock430": "\u{1F55F}",
        "clock5": "\u{1F554}",
        "clock530": "\u{1F560}",
        "clock6": "\u{1F555}",
        "clock630": "\u{1F561}",
        "clock7": "\u{1F556}",
        "clock730": "\u{1F562}",
        "clock8": "\u{1F557}",
        "clock830": "\u{1F563}",
        "clock9": "\u{1F558}",
        "clock930": "\u{1F564}",
        "closed_book": "\u{1F4D5}",
        "closed_lock_with_key": "\u{1F510}",
        "closed_umbrella": "\u{1F302}",
        "cloud": "\u2601\uFE0F",
        "cloud_with_lightning": "\u{1F329}",
        "cloud_with_lightning_and_rain": "\u26C8",
        "cloud_with_rain": "\u{1F327}",
        "cloud_with_snow": "\u{1F328}",
        "clown_face": "\u{1F921}",
        "clubs": "\u2663\uFE0F",
        "cocktail": "\u{1F378}",
        "coffee": "\u2615\uFE0F",
        "coffin": "\u26B0\uFE0F",
        "cold_sweat": "\u{1F630}",
        "comet": "\u2604\uFE0F",
        "computer": "\u{1F4BB}",
        "computer_mouse": "\u{1F5B1}",
        "confetti_ball": "\u{1F38A}",
        "confounded": "\u{1F616}",
        "confused": "\u{1F615}",
        "congratulations": "\u3297\uFE0F",
        "construction": "\u{1F6A7}",
        "construction_worker_man": "\u{1F477}",
        "construction_worker_woman": "\u{1F477}&zwj;\u2640\uFE0F",
        "control_knobs": "\u{1F39B}",
        "convenience_store": "\u{1F3EA}",
        "cookie": "\u{1F36A}",
        "cool": "\u{1F192}",
        "policeman": "\u{1F46E}",
        "copyright": "\xA9\uFE0F",
        "corn": "\u{1F33D}",
        "couch_and_lamp": "\u{1F6CB}",
        "couple": "\u{1F46B}",
        "couple_with_heart_woman_man": "\u{1F491}",
        "couple_with_heart_man_man": "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F468}",
        "couple_with_heart_woman_woman": "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F469}",
        "couplekiss_man_man": "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F468}",
        "couplekiss_man_woman": "\u{1F48F}",
        "couplekiss_woman_woman": "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F469}",
        "cow": "\u{1F42E}",
        "cow2": "\u{1F404}",
        "cowboy_hat_face": "\u{1F920}",
        "crab": "\u{1F980}",
        "crayon": "\u{1F58D}",
        "credit_card": "\u{1F4B3}",
        "crescent_moon": "\u{1F319}",
        "cricket": "\u{1F3CF}",
        "crocodile": "\u{1F40A}",
        "croissant": "\u{1F950}",
        "crossed_fingers": "\u{1F91E}",
        "crossed_flags": "\u{1F38C}",
        "crossed_swords": "\u2694\uFE0F",
        "crown": "\u{1F451}",
        "cry": "\u{1F622}",
        "crying_cat_face": "\u{1F63F}",
        "crystal_ball": "\u{1F52E}",
        "cucumber": "\u{1F952}",
        "cupid": "\u{1F498}",
        "curly_loop": "\u27B0",
        "currency_exchange": "\u{1F4B1}",
        "curry": "\u{1F35B}",
        "custard": "\u{1F36E}",
        "customs": "\u{1F6C3}",
        "cyclone": "\u{1F300}",
        "dagger": "\u{1F5E1}",
        "dancer": "\u{1F483}",
        "dancing_women": "\u{1F46F}",
        "dancing_men": "\u{1F46F}&zwj;\u2642\uFE0F",
        "dango": "\u{1F361}",
        "dark_sunglasses": "\u{1F576}",
        "dart": "\u{1F3AF}",
        "dash": "\u{1F4A8}",
        "date": "\u{1F4C5}",
        "deciduous_tree": "\u{1F333}",
        "deer": "\u{1F98C}",
        "department_store": "\u{1F3EC}",
        "derelict_house": "\u{1F3DA}",
        "desert": "\u{1F3DC}",
        "desert_island": "\u{1F3DD}",
        "desktop_computer": "\u{1F5A5}",
        "male_detective": "\u{1F575}\uFE0F",
        "diamond_shape_with_a_dot_inside": "\u{1F4A0}",
        "diamonds": "\u2666\uFE0F",
        "disappointed": "\u{1F61E}",
        "disappointed_relieved": "\u{1F625}",
        "dizzy": "\u{1F4AB}",
        "dizzy_face": "\u{1F635}",
        "do_not_litter": "\u{1F6AF}",
        "dog": "\u{1F436}",
        "dog2": "\u{1F415}",
        "dollar": "\u{1F4B5}",
        "dolls": "\u{1F38E}",
        "dolphin": "\u{1F42C}",
        "door": "\u{1F6AA}",
        "doughnut": "\u{1F369}",
        "dove": "\u{1F54A}",
        "dragon": "\u{1F409}",
        "dragon_face": "\u{1F432}",
        "dress": "\u{1F457}",
        "dromedary_camel": "\u{1F42A}",
        "drooling_face": "\u{1F924}",
        "droplet": "\u{1F4A7}",
        "drum": "\u{1F941}",
        "duck": "\u{1F986}",
        "dvd": "\u{1F4C0}",
        "e-mail": "\u{1F4E7}",
        "eagle": "\u{1F985}",
        "ear": "\u{1F442}",
        "ear_of_rice": "\u{1F33E}",
        "earth_africa": "\u{1F30D}",
        "earth_americas": "\u{1F30E}",
        "earth_asia": "\u{1F30F}",
        "egg": "\u{1F95A}",
        "eggplant": "\u{1F346}",
        "eight_pointed_black_star": "\u2734\uFE0F",
        "eight_spoked_asterisk": "\u2733\uFE0F",
        "electric_plug": "\u{1F50C}",
        "elephant": "\u{1F418}",
        "email": "\u2709\uFE0F",
        "end": "\u{1F51A}",
        "envelope_with_arrow": "\u{1F4E9}",
        "euro": "\u{1F4B6}",
        "european_castle": "\u{1F3F0}",
        "european_post_office": "\u{1F3E4}",
        "evergreen_tree": "\u{1F332}",
        "exclamation": "\u2757\uFE0F",
        "expressionless": "\u{1F611}",
        "eye": "\u{1F441}",
        "eye_speech_bubble": "\u{1F441}&zwj;\u{1F5E8}",
        "eyeglasses": "\u{1F453}",
        "eyes": "\u{1F440}",
        "face_with_head_bandage": "\u{1F915}",
        "face_with_thermometer": "\u{1F912}",
        "fist_oncoming": "\u{1F44A}",
        "factory": "\u{1F3ED}",
        "fallen_leaf": "\u{1F342}",
        "family_man_woman_boy": "\u{1F46A}",
        "family_man_boy": "\u{1F468}&zwj;\u{1F466}",
        "family_man_boy_boy": "\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
        "family_man_girl": "\u{1F468}&zwj;\u{1F467}",
        "family_man_girl_boy": "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
        "family_man_girl_girl": "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
        "family_man_man_boy": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}",
        "family_man_man_boy_boy": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
        "family_man_man_girl": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}",
        "family_man_man_girl_boy": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
        "family_man_man_girl_girl": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
        "family_man_woman_boy_boy": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
        "family_man_woman_girl": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}",
        "family_man_woman_girl_boy": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
        "family_man_woman_girl_girl": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
        "family_woman_boy": "\u{1F469}&zwj;\u{1F466}",
        "family_woman_boy_boy": "\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
        "family_woman_girl": "\u{1F469}&zwj;\u{1F467}",
        "family_woman_girl_boy": "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
        "family_woman_girl_girl": "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
        "family_woman_woman_boy": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}",
        "family_woman_woman_boy_boy": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
        "family_woman_woman_girl": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}",
        "family_woman_woman_girl_boy": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
        "family_woman_woman_girl_girl": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
        "fast_forward": "\u23E9",
        "fax": "\u{1F4E0}",
        "fearful": "\u{1F628}",
        "feet": "\u{1F43E}",
        "female_detective": "\u{1F575}\uFE0F&zwj;\u2640\uFE0F",
        "ferris_wheel": "\u{1F3A1}",
        "ferry": "\u26F4",
        "field_hockey": "\u{1F3D1}",
        "file_cabinet": "\u{1F5C4}",
        "file_folder": "\u{1F4C1}",
        "film_projector": "\u{1F4FD}",
        "film_strip": "\u{1F39E}",
        "fire": "\u{1F525}",
        "fire_engine": "\u{1F692}",
        "fireworks": "\u{1F386}",
        "first_quarter_moon": "\u{1F313}",
        "first_quarter_moon_with_face": "\u{1F31B}",
        "fish": "\u{1F41F}",
        "fish_cake": "\u{1F365}",
        "fishing_pole_and_fish": "\u{1F3A3}",
        "fist_raised": "\u270A",
        "fist_left": "\u{1F91B}",
        "fist_right": "\u{1F91C}",
        "flags": "\u{1F38F}",
        "flashlight": "\u{1F526}",
        "fleur_de_lis": "\u269C\uFE0F",
        "flight_arrival": "\u{1F6EC}",
        "flight_departure": "\u{1F6EB}",
        "floppy_disk": "\u{1F4BE}",
        "flower_playing_cards": "\u{1F3B4}",
        "flushed": "\u{1F633}",
        "fog": "\u{1F32B}",
        "foggy": "\u{1F301}",
        "football": "\u{1F3C8}",
        "footprints": "\u{1F463}",
        "fork_and_knife": "\u{1F374}",
        "fountain": "\u26F2\uFE0F",
        "fountain_pen": "\u{1F58B}",
        "four_leaf_clover": "\u{1F340}",
        "fox_face": "\u{1F98A}",
        "framed_picture": "\u{1F5BC}",
        "free": "\u{1F193}",
        "fried_egg": "\u{1F373}",
        "fried_shrimp": "\u{1F364}",
        "fries": "\u{1F35F}",
        "frog": "\u{1F438}",
        "frowning": "\u{1F626}",
        "frowning_face": "\u2639\uFE0F",
        "frowning_man": "\u{1F64D}&zwj;\u2642\uFE0F",
        "frowning_woman": "\u{1F64D}",
        "middle_finger": "\u{1F595}",
        "fuelpump": "\u26FD\uFE0F",
        "full_moon": "\u{1F315}",
        "full_moon_with_face": "\u{1F31D}",
        "funeral_urn": "\u26B1\uFE0F",
        "game_die": "\u{1F3B2}",
        "gear": "\u2699\uFE0F",
        "gem": "\u{1F48E}",
        "gemini": "\u264A\uFE0F",
        "ghost": "\u{1F47B}",
        "gift": "\u{1F381}",
        "gift_heart": "\u{1F49D}",
        "girl": "\u{1F467}",
        "globe_with_meridians": "\u{1F310}",
        "goal_net": "\u{1F945}",
        "goat": "\u{1F410}",
        "golf": "\u26F3\uFE0F",
        "golfing_man": "\u{1F3CC}\uFE0F",
        "golfing_woman": "\u{1F3CC}\uFE0F&zwj;\u2640\uFE0F",
        "gorilla": "\u{1F98D}",
        "grapes": "\u{1F347}",
        "green_apple": "\u{1F34F}",
        "green_book": "\u{1F4D7}",
        "green_heart": "\u{1F49A}",
        "green_salad": "\u{1F957}",
        "grey_exclamation": "\u2755",
        "grey_question": "\u2754",
        "grimacing": "\u{1F62C}",
        "grin": "\u{1F601}",
        "grinning": "\u{1F600}",
        "guardsman": "\u{1F482}",
        "guardswoman": "\u{1F482}&zwj;\u2640\uFE0F",
        "guitar": "\u{1F3B8}",
        "gun": "\u{1F52B}",
        "haircut_woman": "\u{1F487}",
        "haircut_man": "\u{1F487}&zwj;\u2642\uFE0F",
        "hamburger": "\u{1F354}",
        "hammer": "\u{1F528}",
        "hammer_and_pick": "\u2692",
        "hammer_and_wrench": "\u{1F6E0}",
        "hamster": "\u{1F439}",
        "hand": "\u270B",
        "handbag": "\u{1F45C}",
        "handshake": "\u{1F91D}",
        "hankey": "\u{1F4A9}",
        "hatched_chick": "\u{1F425}",
        "hatching_chick": "\u{1F423}",
        "headphones": "\u{1F3A7}",
        "hear_no_evil": "\u{1F649}",
        "heart": "\u2764\uFE0F",
        "heart_decoration": "\u{1F49F}",
        "heart_eyes": "\u{1F60D}",
        "heart_eyes_cat": "\u{1F63B}",
        "heartbeat": "\u{1F493}",
        "heartpulse": "\u{1F497}",
        "hearts": "\u2665\uFE0F",
        "heavy_check_mark": "\u2714\uFE0F",
        "heavy_division_sign": "\u2797",
        "heavy_dollar_sign": "\u{1F4B2}",
        "heavy_heart_exclamation": "\u2763\uFE0F",
        "heavy_minus_sign": "\u2796",
        "heavy_multiplication_x": "\u2716\uFE0F",
        "heavy_plus_sign": "\u2795",
        "helicopter": "\u{1F681}",
        "herb": "\u{1F33F}",
        "hibiscus": "\u{1F33A}",
        "high_brightness": "\u{1F506}",
        "high_heel": "\u{1F460}",
        "hocho": "\u{1F52A}",
        "hole": "\u{1F573}",
        "honey_pot": "\u{1F36F}",
        "horse": "\u{1F434}",
        "horse_racing": "\u{1F3C7}",
        "hospital": "\u{1F3E5}",
        "hot_pepper": "\u{1F336}",
        "hotdog": "\u{1F32D}",
        "hotel": "\u{1F3E8}",
        "hotsprings": "\u2668\uFE0F",
        "hourglass": "\u231B\uFE0F",
        "hourglass_flowing_sand": "\u23F3",
        "house": "\u{1F3E0}",
        "house_with_garden": "\u{1F3E1}",
        "houses": "\u{1F3D8}",
        "hugs": "\u{1F917}",
        "hushed": "\u{1F62F}",
        "ice_cream": "\u{1F368}",
        "ice_hockey": "\u{1F3D2}",
        "ice_skate": "\u26F8",
        "icecream": "\u{1F366}",
        "id": "\u{1F194}",
        "ideograph_advantage": "\u{1F250}",
        "imp": "\u{1F47F}",
        "inbox_tray": "\u{1F4E5}",
        "incoming_envelope": "\u{1F4E8}",
        "tipping_hand_woman": "\u{1F481}",
        "information_source": "\u2139\uFE0F",
        "innocent": "\u{1F607}",
        "interrobang": "\u2049\uFE0F",
        "iphone": "\u{1F4F1}",
        "izakaya_lantern": "\u{1F3EE}",
        "jack_o_lantern": "\u{1F383}",
        "japan": "\u{1F5FE}",
        "japanese_castle": "\u{1F3EF}",
        "japanese_goblin": "\u{1F47A}",
        "japanese_ogre": "\u{1F479}",
        "jeans": "\u{1F456}",
        "joy": "\u{1F602}",
        "joy_cat": "\u{1F639}",
        "joystick": "\u{1F579}",
        "kaaba": "\u{1F54B}",
        "key": "\u{1F511}",
        "keyboard": "\u2328\uFE0F",
        "keycap_ten": "\u{1F51F}",
        "kick_scooter": "\u{1F6F4}",
        "kimono": "\u{1F458}",
        "kiss": "\u{1F48B}",
        "kissing": "\u{1F617}",
        "kissing_cat": "\u{1F63D}",
        "kissing_closed_eyes": "\u{1F61A}",
        "kissing_heart": "\u{1F618}",
        "kissing_smiling_eyes": "\u{1F619}",
        "kiwi_fruit": "\u{1F95D}",
        "koala": "\u{1F428}",
        "koko": "\u{1F201}",
        "label": "\u{1F3F7}",
        "large_blue_circle": "\u{1F535}",
        "large_blue_diamond": "\u{1F537}",
        "large_orange_diamond": "\u{1F536}",
        "last_quarter_moon": "\u{1F317}",
        "last_quarter_moon_with_face": "\u{1F31C}",
        "latin_cross": "\u271D\uFE0F",
        "laughing": "\u{1F606}",
        "leaves": "\u{1F343}",
        "ledger": "\u{1F4D2}",
        "left_luggage": "\u{1F6C5}",
        "left_right_arrow": "\u2194\uFE0F",
        "leftwards_arrow_with_hook": "\u21A9\uFE0F",
        "lemon": "\u{1F34B}",
        "leo": "\u264C\uFE0F",
        "leopard": "\u{1F406}",
        "level_slider": "\u{1F39A}",
        "libra": "\u264E\uFE0F",
        "light_rail": "\u{1F688}",
        "link": "\u{1F517}",
        "lion": "\u{1F981}",
        "lips": "\u{1F444}",
        "lipstick": "\u{1F484}",
        "lizard": "\u{1F98E}",
        "lock": "\u{1F512}",
        "lock_with_ink_pen": "\u{1F50F}",
        "lollipop": "\u{1F36D}",
        "loop": "\u27BF",
        "loud_sound": "\u{1F50A}",
        "loudspeaker": "\u{1F4E2}",
        "love_hotel": "\u{1F3E9}",
        "love_letter": "\u{1F48C}",
        "low_brightness": "\u{1F505}",
        "lying_face": "\u{1F925}",
        "m": "\u24C2\uFE0F",
        "mag": "\u{1F50D}",
        "mag_right": "\u{1F50E}",
        "mahjong": "\u{1F004}\uFE0F",
        "mailbox": "\u{1F4EB}",
        "mailbox_closed": "\u{1F4EA}",
        "mailbox_with_mail": "\u{1F4EC}",
        "mailbox_with_no_mail": "\u{1F4ED}",
        "man": "\u{1F468}",
        "man_artist": "\u{1F468}&zwj;\u{1F3A8}",
        "man_astronaut": "\u{1F468}&zwj;\u{1F680}",
        "man_cartwheeling": "\u{1F938}&zwj;\u2642\uFE0F",
        "man_cook": "\u{1F468}&zwj;\u{1F373}",
        "man_dancing": "\u{1F57A}",
        "man_facepalming": "\u{1F926}&zwj;\u2642\uFE0F",
        "man_factory_worker": "\u{1F468}&zwj;\u{1F3ED}",
        "man_farmer": "\u{1F468}&zwj;\u{1F33E}",
        "man_firefighter": "\u{1F468}&zwj;\u{1F692}",
        "man_health_worker": "\u{1F468}&zwj;\u2695\uFE0F",
        "man_in_tuxedo": "\u{1F935}",
        "man_judge": "\u{1F468}&zwj;\u2696\uFE0F",
        "man_juggling": "\u{1F939}&zwj;\u2642\uFE0F",
        "man_mechanic": "\u{1F468}&zwj;\u{1F527}",
        "man_office_worker": "\u{1F468}&zwj;\u{1F4BC}",
        "man_pilot": "\u{1F468}&zwj;\u2708\uFE0F",
        "man_playing_handball": "\u{1F93E}&zwj;\u2642\uFE0F",
        "man_playing_water_polo": "\u{1F93D}&zwj;\u2642\uFE0F",
        "man_scientist": "\u{1F468}&zwj;\u{1F52C}",
        "man_shrugging": "\u{1F937}&zwj;\u2642\uFE0F",
        "man_singer": "\u{1F468}&zwj;\u{1F3A4}",
        "man_student": "\u{1F468}&zwj;\u{1F393}",
        "man_teacher": "\u{1F468}&zwj;\u{1F3EB}",
        "man_technologist": "\u{1F468}&zwj;\u{1F4BB}",
        "man_with_gua_pi_mao": "\u{1F472}",
        "man_with_turban": "\u{1F473}",
        "tangerine": "\u{1F34A}",
        "mans_shoe": "\u{1F45E}",
        "mantelpiece_clock": "\u{1F570}",
        "maple_leaf": "\u{1F341}",
        "martial_arts_uniform": "\u{1F94B}",
        "mask": "\u{1F637}",
        "massage_woman": "\u{1F486}",
        "massage_man": "\u{1F486}&zwj;\u2642\uFE0F",
        "meat_on_bone": "\u{1F356}",
        "medal_military": "\u{1F396}",
        "medal_sports": "\u{1F3C5}",
        "mega": "\u{1F4E3}",
        "melon": "\u{1F348}",
        "memo": "\u{1F4DD}",
        "men_wrestling": "\u{1F93C}&zwj;\u2642\uFE0F",
        "menorah": "\u{1F54E}",
        "mens": "\u{1F6B9}",
        "metal": "\u{1F918}",
        "metro": "\u{1F687}",
        "microphone": "\u{1F3A4}",
        "microscope": "\u{1F52C}",
        "milk_glass": "\u{1F95B}",
        "milky_way": "\u{1F30C}",
        "minibus": "\u{1F690}",
        "minidisc": "\u{1F4BD}",
        "mobile_phone_off": "\u{1F4F4}",
        "money_mouth_face": "\u{1F911}",
        "money_with_wings": "\u{1F4B8}",
        "moneybag": "\u{1F4B0}",
        "monkey": "\u{1F412}",
        "monkey_face": "\u{1F435}",
        "monorail": "\u{1F69D}",
        "moon": "\u{1F314}",
        "mortar_board": "\u{1F393}",
        "mosque": "\u{1F54C}",
        "motor_boat": "\u{1F6E5}",
        "motor_scooter": "\u{1F6F5}",
        "motorcycle": "\u{1F3CD}",
        "motorway": "\u{1F6E3}",
        "mount_fuji": "\u{1F5FB}",
        "mountain": "\u26F0",
        "mountain_biking_man": "\u{1F6B5}",
        "mountain_biking_woman": "\u{1F6B5}&zwj;\u2640\uFE0F",
        "mountain_cableway": "\u{1F6A0}",
        "mountain_railway": "\u{1F69E}",
        "mountain_snow": "\u{1F3D4}",
        "mouse": "\u{1F42D}",
        "mouse2": "\u{1F401}",
        "movie_camera": "\u{1F3A5}",
        "moyai": "\u{1F5FF}",
        "mrs_claus": "\u{1F936}",
        "muscle": "\u{1F4AA}",
        "mushroom": "\u{1F344}",
        "musical_keyboard": "\u{1F3B9}",
        "musical_note": "\u{1F3B5}",
        "musical_score": "\u{1F3BC}",
        "mute": "\u{1F507}",
        "nail_care": "\u{1F485}",
        "name_badge": "\u{1F4DB}",
        "national_park": "\u{1F3DE}",
        "nauseated_face": "\u{1F922}",
        "necktie": "\u{1F454}",
        "negative_squared_cross_mark": "\u274E",
        "nerd_face": "\u{1F913}",
        "neutral_face": "\u{1F610}",
        "new": "\u{1F195}",
        "new_moon": "\u{1F311}",
        "new_moon_with_face": "\u{1F31A}",
        "newspaper": "\u{1F4F0}",
        "newspaper_roll": "\u{1F5DE}",
        "next_track_button": "\u23ED",
        "ng": "\u{1F196}",
        "no_good_man": "\u{1F645}&zwj;\u2642\uFE0F",
        "no_good_woman": "\u{1F645}",
        "night_with_stars": "\u{1F303}",
        "no_bell": "\u{1F515}",
        "no_bicycles": "\u{1F6B3}",
        "no_entry": "\u26D4\uFE0F",
        "no_entry_sign": "\u{1F6AB}",
        "no_mobile_phones": "\u{1F4F5}",
        "no_mouth": "\u{1F636}",
        "no_pedestrians": "\u{1F6B7}",
        "no_smoking": "\u{1F6AD}",
        "non-potable_water": "\u{1F6B1}",
        "nose": "\u{1F443}",
        "notebook": "\u{1F4D3}",
        "notebook_with_decorative_cover": "\u{1F4D4}",
        "notes": "\u{1F3B6}",
        "nut_and_bolt": "\u{1F529}",
        "o": "\u2B55\uFE0F",
        "o2": "\u{1F17E}\uFE0F",
        "ocean": "\u{1F30A}",
        "octopus": "\u{1F419}",
        "oden": "\u{1F362}",
        "office": "\u{1F3E2}",
        "oil_drum": "\u{1F6E2}",
        "ok": "\u{1F197}",
        "ok_hand": "\u{1F44C}",
        "ok_man": "\u{1F646}&zwj;\u2642\uFE0F",
        "ok_woman": "\u{1F646}",
        "old_key": "\u{1F5DD}",
        "older_man": "\u{1F474}",
        "older_woman": "\u{1F475}",
        "om": "\u{1F549}",
        "on": "\u{1F51B}",
        "oncoming_automobile": "\u{1F698}",
        "oncoming_bus": "\u{1F68D}",
        "oncoming_police_car": "\u{1F694}",
        "oncoming_taxi": "\u{1F696}",
        "open_file_folder": "\u{1F4C2}",
        "open_hands": "\u{1F450}",
        "open_mouth": "\u{1F62E}",
        "open_umbrella": "\u2602\uFE0F",
        "ophiuchus": "\u26CE",
        "orange_book": "\u{1F4D9}",
        "orthodox_cross": "\u2626\uFE0F",
        "outbox_tray": "\u{1F4E4}",
        "owl": "\u{1F989}",
        "ox": "\u{1F402}",
        "package": "\u{1F4E6}",
        "page_facing_up": "\u{1F4C4}",
        "page_with_curl": "\u{1F4C3}",
        "pager": "\u{1F4DF}",
        "paintbrush": "\u{1F58C}",
        "palm_tree": "\u{1F334}",
        "pancakes": "\u{1F95E}",
        "panda_face": "\u{1F43C}",
        "paperclip": "\u{1F4CE}",
        "paperclips": "\u{1F587}",
        "parasol_on_ground": "\u26F1",
        "parking": "\u{1F17F}\uFE0F",
        "part_alternation_mark": "\u303D\uFE0F",
        "partly_sunny": "\u26C5\uFE0F",
        "passenger_ship": "\u{1F6F3}",
        "passport_control": "\u{1F6C2}",
        "pause_button": "\u23F8",
        "peace_symbol": "\u262E\uFE0F",
        "peach": "\u{1F351}",
        "peanuts": "\u{1F95C}",
        "pear": "\u{1F350}",
        "pen": "\u{1F58A}",
        "pencil2": "\u270F\uFE0F",
        "penguin": "\u{1F427}",
        "pensive": "\u{1F614}",
        "performing_arts": "\u{1F3AD}",
        "persevere": "\u{1F623}",
        "person_fencing": "\u{1F93A}",
        "pouting_woman": "\u{1F64E}",
        "phone": "\u260E\uFE0F",
        "pick": "\u26CF",
        "pig": "\u{1F437}",
        "pig2": "\u{1F416}",
        "pig_nose": "\u{1F43D}",
        "pill": "\u{1F48A}",
        "pineapple": "\u{1F34D}",
        "ping_pong": "\u{1F3D3}",
        "pisces": "\u2653\uFE0F",
        "pizza": "\u{1F355}",
        "place_of_worship": "\u{1F6D0}",
        "plate_with_cutlery": "\u{1F37D}",
        "play_or_pause_button": "\u23EF",
        "point_down": "\u{1F447}",
        "point_left": "\u{1F448}",
        "point_right": "\u{1F449}",
        "point_up": "\u261D\uFE0F",
        "point_up_2": "\u{1F446}",
        "police_car": "\u{1F693}",
        "policewoman": "\u{1F46E}&zwj;\u2640\uFE0F",
        "poodle": "\u{1F429}",
        "popcorn": "\u{1F37F}",
        "post_office": "\u{1F3E3}",
        "postal_horn": "\u{1F4EF}",
        "postbox": "\u{1F4EE}",
        "potable_water": "\u{1F6B0}",
        "potato": "\u{1F954}",
        "pouch": "\u{1F45D}",
        "poultry_leg": "\u{1F357}",
        "pound": "\u{1F4B7}",
        "rage": "\u{1F621}",
        "pouting_cat": "\u{1F63E}",
        "pouting_man": "\u{1F64E}&zwj;\u2642\uFE0F",
        "pray": "\u{1F64F}",
        "prayer_beads": "\u{1F4FF}",
        "pregnant_woman": "\u{1F930}",
        "previous_track_button": "\u23EE",
        "prince": "\u{1F934}",
        "princess": "\u{1F478}",
        "printer": "\u{1F5A8}",
        "purple_heart": "\u{1F49C}",
        "purse": "\u{1F45B}",
        "pushpin": "\u{1F4CC}",
        "put_litter_in_its_place": "\u{1F6AE}",
        "question": "\u2753",
        "rabbit": "\u{1F430}",
        "rabbit2": "\u{1F407}",
        "racehorse": "\u{1F40E}",
        "racing_car": "\u{1F3CE}",
        "radio": "\u{1F4FB}",
        "radio_button": "\u{1F518}",
        "radioactive": "\u2622\uFE0F",
        "railway_car": "\u{1F683}",
        "railway_track": "\u{1F6E4}",
        "rainbow": "\u{1F308}",
        "rainbow_flag": "\u{1F3F3}\uFE0F&zwj;\u{1F308}",
        "raised_back_of_hand": "\u{1F91A}",
        "raised_hand_with_fingers_splayed": "\u{1F590}",
        "raised_hands": "\u{1F64C}",
        "raising_hand_woman": "\u{1F64B}",
        "raising_hand_man": "\u{1F64B}&zwj;\u2642\uFE0F",
        "ram": "\u{1F40F}",
        "ramen": "\u{1F35C}",
        "rat": "\u{1F400}",
        "record_button": "\u23FA",
        "recycle": "\u267B\uFE0F",
        "red_circle": "\u{1F534}",
        "registered": "\xAE\uFE0F",
        "relaxed": "\u263A\uFE0F",
        "relieved": "\u{1F60C}",
        "reminder_ribbon": "\u{1F397}",
        "repeat": "\u{1F501}",
        "repeat_one": "\u{1F502}",
        "rescue_worker_helmet": "\u26D1",
        "restroom": "\u{1F6BB}",
        "revolving_hearts": "\u{1F49E}",
        "rewind": "\u23EA",
        "rhinoceros": "\u{1F98F}",
        "ribbon": "\u{1F380}",
        "rice": "\u{1F35A}",
        "rice_ball": "\u{1F359}",
        "rice_cracker": "\u{1F358}",
        "rice_scene": "\u{1F391}",
        "right_anger_bubble": "\u{1F5EF}",
        "ring": "\u{1F48D}",
        "robot": "\u{1F916}",
        "rocket": "\u{1F680}",
        "rofl": "\u{1F923}",
        "roll_eyes": "\u{1F644}",
        "roller_coaster": "\u{1F3A2}",
        "rooster": "\u{1F413}",
        "rose": "\u{1F339}",
        "rosette": "\u{1F3F5}",
        "rotating_light": "\u{1F6A8}",
        "round_pushpin": "\u{1F4CD}",
        "rowing_man": "\u{1F6A3}",
        "rowing_woman": "\u{1F6A3}&zwj;\u2640\uFE0F",
        "rugby_football": "\u{1F3C9}",
        "running_man": "\u{1F3C3}",
        "running_shirt_with_sash": "\u{1F3BD}",
        "running_woman": "\u{1F3C3}&zwj;\u2640\uFE0F",
        "sa": "\u{1F202}\uFE0F",
        "sagittarius": "\u2650\uFE0F",
        "sake": "\u{1F376}",
        "sandal": "\u{1F461}",
        "santa": "\u{1F385}",
        "satellite": "\u{1F4E1}",
        "saxophone": "\u{1F3B7}",
        "school": "\u{1F3EB}",
        "school_satchel": "\u{1F392}",
        "scissors": "\u2702\uFE0F",
        "scorpion": "\u{1F982}",
        "scorpius": "\u264F\uFE0F",
        "scream": "\u{1F631}",
        "scream_cat": "\u{1F640}",
        "scroll": "\u{1F4DC}",
        "seat": "\u{1F4BA}",
        "secret": "\u3299\uFE0F",
        "see_no_evil": "\u{1F648}",
        "seedling": "\u{1F331}",
        "selfie": "\u{1F933}",
        "shallow_pan_of_food": "\u{1F958}",
        "shamrock": "\u2618\uFE0F",
        "shark": "\u{1F988}",
        "shaved_ice": "\u{1F367}",
        "sheep": "\u{1F411}",
        "shell": "\u{1F41A}",
        "shield": "\u{1F6E1}",
        "shinto_shrine": "\u26E9",
        "ship": "\u{1F6A2}",
        "shirt": "\u{1F455}",
        "shopping": "\u{1F6CD}",
        "shopping_cart": "\u{1F6D2}",
        "shower": "\u{1F6BF}",
        "shrimp": "\u{1F990}",
        "signal_strength": "\u{1F4F6}",
        "six_pointed_star": "\u{1F52F}",
        "ski": "\u{1F3BF}",
        "skier": "\u26F7",
        "skull": "\u{1F480}",
        "skull_and_crossbones": "\u2620\uFE0F",
        "sleeping": "\u{1F634}",
        "sleeping_bed": "\u{1F6CC}",
        "sleepy": "\u{1F62A}",
        "slightly_frowning_face": "\u{1F641}",
        "slightly_smiling_face": "\u{1F642}",
        "slot_machine": "\u{1F3B0}",
        "small_airplane": "\u{1F6E9}",
        "small_blue_diamond": "\u{1F539}",
        "small_orange_diamond": "\u{1F538}",
        "small_red_triangle": "\u{1F53A}",
        "small_red_triangle_down": "\u{1F53B}",
        "smile": "\u{1F604}",
        "smile_cat": "\u{1F638}",
        "smiley": "\u{1F603}",
        "smiley_cat": "\u{1F63A}",
        "smiling_imp": "\u{1F608}",
        "smirk": "\u{1F60F}",
        "smirk_cat": "\u{1F63C}",
        "smoking": "\u{1F6AC}",
        "snail": "\u{1F40C}",
        "snake": "\u{1F40D}",
        "sneezing_face": "\u{1F927}",
        "snowboarder": "\u{1F3C2}",
        "snowflake": "\u2744\uFE0F",
        "snowman": "\u26C4\uFE0F",
        "snowman_with_snow": "\u2603\uFE0F",
        "sob": "\u{1F62D}",
        "soccer": "\u26BD\uFE0F",
        "soon": "\u{1F51C}",
        "sos": "\u{1F198}",
        "sound": "\u{1F509}",
        "space_invader": "\u{1F47E}",
        "spades": "\u2660\uFE0F",
        "spaghetti": "\u{1F35D}",
        "sparkle": "\u2747\uFE0F",
        "sparkler": "\u{1F387}",
        "sparkles": "\u2728",
        "sparkling_heart": "\u{1F496}",
        "speak_no_evil": "\u{1F64A}",
        "speaker": "\u{1F508}",
        "speaking_head": "\u{1F5E3}",
        "speech_balloon": "\u{1F4AC}",
        "speedboat": "\u{1F6A4}",
        "spider": "\u{1F577}",
        "spider_web": "\u{1F578}",
        "spiral_calendar": "\u{1F5D3}",
        "spiral_notepad": "\u{1F5D2}",
        "spoon": "\u{1F944}",
        "squid": "\u{1F991}",
        "stadium": "\u{1F3DF}",
        "star": "\u2B50\uFE0F",
        "star2": "\u{1F31F}",
        "star_and_crescent": "\u262A\uFE0F",
        "star_of_david": "\u2721\uFE0F",
        "stars": "\u{1F320}",
        "station": "\u{1F689}",
        "statue_of_liberty": "\u{1F5FD}",
        "steam_locomotive": "\u{1F682}",
        "stew": "\u{1F372}",
        "stop_button": "\u23F9",
        "stop_sign": "\u{1F6D1}",
        "stopwatch": "\u23F1",
        "straight_ruler": "\u{1F4CF}",
        "strawberry": "\u{1F353}",
        "stuck_out_tongue": "\u{1F61B}",
        "stuck_out_tongue_closed_eyes": "\u{1F61D}",
        "stuck_out_tongue_winking_eye": "\u{1F61C}",
        "studio_microphone": "\u{1F399}",
        "stuffed_flatbread": "\u{1F959}",
        "sun_behind_large_cloud": "\u{1F325}",
        "sun_behind_rain_cloud": "\u{1F326}",
        "sun_behind_small_cloud": "\u{1F324}",
        "sun_with_face": "\u{1F31E}",
        "sunflower": "\u{1F33B}",
        "sunglasses": "\u{1F60E}",
        "sunny": "\u2600\uFE0F",
        "sunrise": "\u{1F305}",
        "sunrise_over_mountains": "\u{1F304}",
        "surfing_man": "\u{1F3C4}",
        "surfing_woman": "\u{1F3C4}&zwj;\u2640\uFE0F",
        "sushi": "\u{1F363}",
        "suspension_railway": "\u{1F69F}",
        "sweat": "\u{1F613}",
        "sweat_drops": "\u{1F4A6}",
        "sweat_smile": "\u{1F605}",
        "sweet_potato": "\u{1F360}",
        "swimming_man": "\u{1F3CA}",
        "swimming_woman": "\u{1F3CA}&zwj;\u2640\uFE0F",
        "symbols": "\u{1F523}",
        "synagogue": "\u{1F54D}",
        "syringe": "\u{1F489}",
        "taco": "\u{1F32E}",
        "tada": "\u{1F389}",
        "tanabata_tree": "\u{1F38B}",
        "taurus": "\u2649\uFE0F",
        "taxi": "\u{1F695}",
        "tea": "\u{1F375}",
        "telephone_receiver": "\u{1F4DE}",
        "telescope": "\u{1F52D}",
        "tennis": "\u{1F3BE}",
        "tent": "\u26FA\uFE0F",
        "thermometer": "\u{1F321}",
        "thinking": "\u{1F914}",
        "thought_balloon": "\u{1F4AD}",
        "ticket": "\u{1F3AB}",
        "tickets": "\u{1F39F}",
        "tiger": "\u{1F42F}",
        "tiger2": "\u{1F405}",
        "timer_clock": "\u23F2",
        "tipping_hand_man": "\u{1F481}&zwj;\u2642\uFE0F",
        "tired_face": "\u{1F62B}",
        "tm": "\u2122\uFE0F",
        "toilet": "\u{1F6BD}",
        "tokyo_tower": "\u{1F5FC}",
        "tomato": "\u{1F345}",
        "tongue": "\u{1F445}",
        "top": "\u{1F51D}",
        "tophat": "\u{1F3A9}",
        "tornado": "\u{1F32A}",
        "trackball": "\u{1F5B2}",
        "tractor": "\u{1F69C}",
        "traffic_light": "\u{1F6A5}",
        "train": "\u{1F68B}",
        "train2": "\u{1F686}",
        "tram": "\u{1F68A}",
        "triangular_flag_on_post": "\u{1F6A9}",
        "triangular_ruler": "\u{1F4D0}",
        "trident": "\u{1F531}",
        "triumph": "\u{1F624}",
        "trolleybus": "\u{1F68E}",
        "trophy": "\u{1F3C6}",
        "tropical_drink": "\u{1F379}",
        "tropical_fish": "\u{1F420}",
        "truck": "\u{1F69A}",
        "trumpet": "\u{1F3BA}",
        "tulip": "\u{1F337}",
        "tumbler_glass": "\u{1F943}",
        "turkey": "\u{1F983}",
        "turtle": "\u{1F422}",
        "tv": "\u{1F4FA}",
        "twisted_rightwards_arrows": "\u{1F500}",
        "two_hearts": "\u{1F495}",
        "two_men_holding_hands": "\u{1F46C}",
        "two_women_holding_hands": "\u{1F46D}",
        "u5272": "\u{1F239}",
        "u5408": "\u{1F234}",
        "u55b6": "\u{1F23A}",
        "u6307": "\u{1F22F}\uFE0F",
        "u6708": "\u{1F237}\uFE0F",
        "u6709": "\u{1F236}",
        "u6e80": "\u{1F235}",
        "u7121": "\u{1F21A}\uFE0F",
        "u7533": "\u{1F238}",
        "u7981": "\u{1F232}",
        "u7a7a": "\u{1F233}",
        "umbrella": "\u2614\uFE0F",
        "unamused": "\u{1F612}",
        "underage": "\u{1F51E}",
        "unicorn": "\u{1F984}",
        "unlock": "\u{1F513}",
        "up": "\u{1F199}",
        "upside_down_face": "\u{1F643}",
        "v": "\u270C\uFE0F",
        "vertical_traffic_light": "\u{1F6A6}",
        "vhs": "\u{1F4FC}",
        "vibration_mode": "\u{1F4F3}",
        "video_camera": "\u{1F4F9}",
        "video_game": "\u{1F3AE}",
        "violin": "\u{1F3BB}",
        "virgo": "\u264D\uFE0F",
        "volcano": "\u{1F30B}",
        "volleyball": "\u{1F3D0}",
        "vs": "\u{1F19A}",
        "vulcan_salute": "\u{1F596}",
        "walking_man": "\u{1F6B6}",
        "walking_woman": "\u{1F6B6}&zwj;\u2640\uFE0F",
        "waning_crescent_moon": "\u{1F318}",
        "waning_gibbous_moon": "\u{1F316}",
        "warning": "\u26A0\uFE0F",
        "wastebasket": "\u{1F5D1}",
        "watch": "\u231A\uFE0F",
        "water_buffalo": "\u{1F403}",
        "watermelon": "\u{1F349}",
        "wave": "\u{1F44B}",
        "wavy_dash": "\u3030\uFE0F",
        "waxing_crescent_moon": "\u{1F312}",
        "wc": "\u{1F6BE}",
        "weary": "\u{1F629}",
        "wedding": "\u{1F492}",
        "weight_lifting_man": "\u{1F3CB}\uFE0F",
        "weight_lifting_woman": "\u{1F3CB}\uFE0F&zwj;\u2640\uFE0F",
        "whale": "\u{1F433}",
        "whale2": "\u{1F40B}",
        "wheel_of_dharma": "\u2638\uFE0F",
        "wheelchair": "\u267F\uFE0F",
        "white_check_mark": "\u2705",
        "white_circle": "\u26AA\uFE0F",
        "white_flag": "\u{1F3F3}\uFE0F",
        "white_flower": "\u{1F4AE}",
        "white_large_square": "\u2B1C\uFE0F",
        "white_medium_small_square": "\u25FD\uFE0F",
        "white_medium_square": "\u25FB\uFE0F",
        "white_small_square": "\u25AB\uFE0F",
        "white_square_button": "\u{1F533}",
        "wilted_flower": "\u{1F940}",
        "wind_chime": "\u{1F390}",
        "wind_face": "\u{1F32C}",
        "wine_glass": "\u{1F377}",
        "wink": "\u{1F609}",
        "wolf": "\u{1F43A}",
        "woman": "\u{1F469}",
        "woman_artist": "\u{1F469}&zwj;\u{1F3A8}",
        "woman_astronaut": "\u{1F469}&zwj;\u{1F680}",
        "woman_cartwheeling": "\u{1F938}&zwj;\u2640\uFE0F",
        "woman_cook": "\u{1F469}&zwj;\u{1F373}",
        "woman_facepalming": "\u{1F926}&zwj;\u2640\uFE0F",
        "woman_factory_worker": "\u{1F469}&zwj;\u{1F3ED}",
        "woman_farmer": "\u{1F469}&zwj;\u{1F33E}",
        "woman_firefighter": "\u{1F469}&zwj;\u{1F692}",
        "woman_health_worker": "\u{1F469}&zwj;\u2695\uFE0F",
        "woman_judge": "\u{1F469}&zwj;\u2696\uFE0F",
        "woman_juggling": "\u{1F939}&zwj;\u2640\uFE0F",
        "woman_mechanic": "\u{1F469}&zwj;\u{1F527}",
        "woman_office_worker": "\u{1F469}&zwj;\u{1F4BC}",
        "woman_pilot": "\u{1F469}&zwj;\u2708\uFE0F",
        "woman_playing_handball": "\u{1F93E}&zwj;\u2640\uFE0F",
        "woman_playing_water_polo": "\u{1F93D}&zwj;\u2640\uFE0F",
        "woman_scientist": "\u{1F469}&zwj;\u{1F52C}",
        "woman_shrugging": "\u{1F937}&zwj;\u2640\uFE0F",
        "woman_singer": "\u{1F469}&zwj;\u{1F3A4}",
        "woman_student": "\u{1F469}&zwj;\u{1F393}",
        "woman_teacher": "\u{1F469}&zwj;\u{1F3EB}",
        "woman_technologist": "\u{1F469}&zwj;\u{1F4BB}",
        "woman_with_turban": "\u{1F473}&zwj;\u2640\uFE0F",
        "womans_clothes": "\u{1F45A}",
        "womans_hat": "\u{1F452}",
        "women_wrestling": "\u{1F93C}&zwj;\u2640\uFE0F",
        "womens": "\u{1F6BA}",
        "world_map": "\u{1F5FA}",
        "worried": "\u{1F61F}",
        "wrench": "\u{1F527}",
        "writing_hand": "\u270D\uFE0F",
        "x": "\u274C",
        "yellow_heart": "\u{1F49B}",
        "yen": "\u{1F4B4}",
        "yin_yang": "\u262F\uFE0F",
        "yum": "\u{1F60B}",
        "zap": "\u26A1\uFE0F",
        "zipper_mouth_face": "\u{1F910}",
        "zzz": "\u{1F4A4}",
        /* special emojis :P */
        "octocat": '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
        "showdown": `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>`
      };
      showdown2.Converter = function(converterOptions) {
        "use strict";
        var options = {}, langExtensions = [], outputModifiers = [], listeners = {}, setConvFlavor = setFlavor, metadata = {
          parsed: {},
          raw: "",
          format: ""
        };
        _constructor();
        function _constructor() {
          converterOptions = converterOptions || {};
          for (var gOpt in globalOptions) {
            if (globalOptions.hasOwnProperty(gOpt)) {
              options[gOpt] = globalOptions[gOpt];
            }
          }
          if (typeof converterOptions === "object") {
            for (var opt in converterOptions) {
              if (converterOptions.hasOwnProperty(opt)) {
                options[opt] = converterOptions[opt];
              }
            }
          } else {
            throw Error("Converter expects the passed parameter to be an object, but " + typeof converterOptions + " was passed instead.");
          }
          if (options.extensions) {
            showdown2.helper.forEach(options.extensions, _parseExtension);
          }
        }
        function _parseExtension(ext, name) {
          name = name || null;
          if (showdown2.helper.isString(ext)) {
            ext = showdown2.helper.stdExtName(ext);
            name = ext;
            if (showdown2.extensions[ext]) {
              console.warn("DEPRECATION WARNING: " + ext + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!");
              legacyExtensionLoading(showdown2.extensions[ext], ext);
              return;
            } else if (!showdown2.helper.isUndefined(extensions[ext])) {
              ext = extensions[ext];
            } else {
              throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
            }
          }
          if (typeof ext === "function") {
            ext = ext();
          }
          if (!showdown2.helper.isArray(ext)) {
            ext = [ext];
          }
          var validExt = validate(ext, name);
          if (!validExt.valid) {
            throw Error(validExt.error);
          }
          for (var i = 0; i < ext.length; ++i) {
            switch (ext[i].type) {
              case "lang":
                langExtensions.push(ext[i]);
                break;
              case "output":
                outputModifiers.push(ext[i]);
                break;
            }
            if (ext[i].hasOwnProperty("listeners")) {
              for (var ln in ext[i].listeners) {
                if (ext[i].listeners.hasOwnProperty(ln)) {
                  listen(ln, ext[i].listeners[ln]);
                }
              }
            }
          }
        }
        function legacyExtensionLoading(ext, name) {
          if (typeof ext === "function") {
            ext = ext(new showdown2.Converter());
          }
          if (!showdown2.helper.isArray(ext)) {
            ext = [ext];
          }
          var valid = validate(ext, name);
          if (!valid.valid) {
            throw Error(valid.error);
          }
          for (var i = 0; i < ext.length; ++i) {
            switch (ext[i].type) {
              case "lang":
                langExtensions.push(ext[i]);
                break;
              case "output":
                outputModifiers.push(ext[i]);
                break;
              default:
                throw Error("Extension loader error: Type unrecognized!!!");
            }
          }
        }
        function listen(name, callback) {
          if (!showdown2.helper.isString(name)) {
            throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof name + " given");
          }
          if (typeof callback !== "function") {
            throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof callback + " given");
          }
          if (!listeners.hasOwnProperty(name)) {
            listeners[name] = [];
          }
          listeners[name].push(callback);
        }
        function rTrimInputText(text) {
          var rsp = text.match(/^\s*/)[0].length, rgx = new RegExp("^\\s{0," + rsp + "}", "gm");
          return text.replace(rgx, "");
        }
        this._dispatch = function dispatch(evtName, text, options2, globals) {
          if (listeners.hasOwnProperty(evtName)) {
            for (var ei = 0; ei < listeners[evtName].length; ++ei) {
              var nText = listeners[evtName][ei](evtName, text, this, options2, globals);
              if (nText && typeof nText !== "undefined") {
                text = nText;
              }
            }
          }
          return text;
        };
        this.listen = function(name, callback) {
          listen(name, callback);
          return this;
        };
        this.makeHtml = function(text) {
          if (!text) {
            return text;
          }
          var globals = {
            gHtmlBlocks: [],
            gHtmlMdBlocks: [],
            gHtmlSpans: [],
            gUrls: {},
            gTitles: {},
            gDimensions: {},
            gListLevel: 0,
            hashLinkCounts: {},
            langExtensions,
            outputModifiers,
            converter: this,
            ghCodeBlocks: [],
            metadata: {
              parsed: {},
              raw: "",
              format: ""
            }
          };
          text = text.replace(/¨/g, "\xA8T");
          text = text.replace(/\$/g, "\xA8D");
          text = text.replace(/\r\n/g, "\n");
          text = text.replace(/\r/g, "\n");
          text = text.replace(/\u00A0/g, "&nbsp;");
          if (options.smartIndentationFix) {
            text = rTrimInputText(text);
          }
          text = "\n\n" + text + "\n\n";
          text = showdown2.subParser("detab")(text, options, globals);
          text = text.replace(/^[ \t]+$/mg, "");
          showdown2.helper.forEach(langExtensions, function(ext) {
            text = showdown2.subParser("runExtension")(ext, text, options, globals);
          });
          text = showdown2.subParser("metadata")(text, options, globals);
          text = showdown2.subParser("hashPreCodeTags")(text, options, globals);
          text = showdown2.subParser("githubCodeBlocks")(text, options, globals);
          text = showdown2.subParser("hashHTMLBlocks")(text, options, globals);
          text = showdown2.subParser("hashCodeTags")(text, options, globals);
          text = showdown2.subParser("stripLinkDefinitions")(text, options, globals);
          text = showdown2.subParser("blockGamut")(text, options, globals);
          text = showdown2.subParser("unhashHTMLSpans")(text, options, globals);
          text = showdown2.subParser("unescapeSpecialChars")(text, options, globals);
          text = text.replace(/¨D/g, "$$");
          text = text.replace(/¨T/g, "\xA8");
          text = showdown2.subParser("completeHTMLDocument")(text, options, globals);
          showdown2.helper.forEach(outputModifiers, function(ext) {
            text = showdown2.subParser("runExtension")(ext, text, options, globals);
          });
          metadata = globals.metadata;
          return text;
        };
        this.makeMarkdown = this.makeMd = function(src, HTMLParser) {
          src = src.replace(/\r\n/g, "\n");
          src = src.replace(/\r/g, "\n");
          src = src.replace(/>[ \t]+</, ">\xA8NBSP;<");
          if (!HTMLParser) {
            if (window && window.document) {
              HTMLParser = window.document;
            } else {
              throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
            }
          }
          var doc = HTMLParser.createElement("div");
          doc.innerHTML = src;
          var globals = {
            preList: substitutePreCodeTags(doc)
          };
          clean(doc);
          var nodes = doc.childNodes, mdDoc = "";
          for (var i = 0; i < nodes.length; i++) {
            mdDoc += showdown2.subParser("makeMarkdown.node")(nodes[i], globals);
          }
          function clean(node) {
            for (var n = 0; n < node.childNodes.length; ++n) {
              var child = node.childNodes[n];
              if (child.nodeType === 3) {
                if (!/\S/.test(child.nodeValue) && !/^[ ]+$/.test(child.nodeValue)) {
                  node.removeChild(child);
                  --n;
                } else {
                  child.nodeValue = child.nodeValue.split("\n").join(" ");
                  child.nodeValue = child.nodeValue.replace(/(\s)+/g, "$1");
                }
              } else if (child.nodeType === 1) {
                clean(child);
              }
            }
          }
          function substitutePreCodeTags(doc2) {
            var pres = doc2.querySelectorAll("pre"), presPH = [];
            for (var i2 = 0; i2 < pres.length; ++i2) {
              if (pres[i2].childElementCount === 1 && pres[i2].firstChild.tagName.toLowerCase() === "code") {
                var content = pres[i2].firstChild.innerHTML.trim(), language = pres[i2].firstChild.getAttribute("data-language") || "";
                if (language === "") {
                  var classes = pres[i2].firstChild.className.split(" ");
                  for (var c = 0; c < classes.length; ++c) {
                    var matches = classes[c].match(/^language-(.+)$/);
                    if (matches !== null) {
                      language = matches[1];
                      break;
                    }
                  }
                }
                content = showdown2.helper.unescapeHTMLEntities(content);
                presPH.push(content);
                pres[i2].outerHTML = '<precode language="' + language + '" precodenum="' + i2.toString() + '"></precode>';
              } else {
                presPH.push(pres[i2].innerHTML);
                pres[i2].innerHTML = "";
                pres[i2].setAttribute("prenum", i2.toString());
              }
            }
            return presPH;
          }
          return mdDoc;
        };
        this.setOption = function(key, value) {
          options[key] = value;
        };
        this.getOption = function(key) {
          return options[key];
        };
        this.getOptions = function() {
          return options;
        };
        this.addExtension = function(extension, name) {
          name = name || null;
          _parseExtension(extension, name);
        };
        this.useExtension = function(extensionName) {
          _parseExtension(extensionName);
        };
        this.setFlavor = function(name) {
          if (!flavor.hasOwnProperty(name)) {
            throw Error(name + " flavor was not found");
          }
          var preset = flavor[name];
          setConvFlavor = name;
          for (var option in preset) {
            if (preset.hasOwnProperty(option)) {
              options[option] = preset[option];
            }
          }
        };
        this.getFlavor = function() {
          return setConvFlavor;
        };
        this.removeExtension = function(extension) {
          if (!showdown2.helper.isArray(extension)) {
            extension = [extension];
          }
          for (var a = 0; a < extension.length; ++a) {
            var ext = extension[a];
            for (var i = 0; i < langExtensions.length; ++i) {
              if (langExtensions[i] === ext) {
                langExtensions.splice(i, 1);
              }
            }
            for (var ii = 0; ii < outputModifiers.length; ++ii) {
              if (outputModifiers[ii] === ext) {
                outputModifiers.splice(ii, 1);
              }
            }
          }
        };
        this.getAllExtensions = function() {
          return {
            language: langExtensions,
            output: outputModifiers
          };
        };
        this.getMetadata = function(raw) {
          if (raw) {
            return metadata.raw;
          } else {
            return metadata.parsed;
          }
        };
        this.getMetadataFormat = function() {
          return metadata.format;
        };
        this._setMetadataPair = function(key, value) {
          metadata.parsed[key] = value;
        };
        this._setMetadataFormat = function(format) {
          metadata.format = format;
        };
        this._setMetadataRaw = function(raw) {
          metadata.raw = raw;
        };
      };
      showdown2.subParser("anchors", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("anchors.before", text, options, globals);
        var writeAnchorTag = function(wholeMatch, linkText, linkId, url, m5, m6, title) {
          if (showdown2.helper.isUndefined(title)) {
            title = "";
          }
          linkId = linkId.toLowerCase();
          if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
            url = "";
          } else if (!url) {
            if (!linkId) {
              linkId = linkText.toLowerCase().replace(/ ?\n/g, " ");
            }
            url = "#" + linkId;
            if (!showdown2.helper.isUndefined(globals.gUrls[linkId])) {
              url = globals.gUrls[linkId];
              if (!showdown2.helper.isUndefined(globals.gTitles[linkId])) {
                title = globals.gTitles[linkId];
              }
            } else {
              return wholeMatch;
            }
          }
          url = url.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
          var result = '<a href="' + url + '"';
          if (title !== "" && title !== null) {
            title = title.replace(/"/g, "&quot;");
            title = title.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
            result += ' title="' + title + '"';
          }
          if (options.openLinksInNewWindow && !/^#/.test(url)) {
            result += ' rel="noopener noreferrer" target="\xA8E95Eblank"';
          }
          result += ">" + linkText + "</a>";
          return result;
        };
        text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);
        text = text.replace(
          /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
          writeAnchorTag
        );
        text = text.replace(
          /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
          writeAnchorTag
        );
        text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);
        if (options.ghMentions) {
          text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(wm, st, escape, mentions, username) {
            if (escape === "\\") {
              return st + mentions;
            }
            if (!showdown2.helper.isString(options.ghMentionsLink)) {
              throw new Error("ghMentionsLink option must be a string");
            }
            var lnk = options.ghMentionsLink.replace(/\{u}/g, username), target = "";
            if (options.openLinksInNewWindow) {
              target = ' rel="noopener noreferrer" target="\xA8E95Eblank"';
            }
            return st + '<a href="' + lnk + '"' + target + ">" + mentions + "</a>";
          });
        }
        text = globals.converter._dispatch("anchors.after", text, options, globals);
        return text;
      });
      var simpleURLRegex = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, delimUrlRegex = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, replaceLink = function(options) {
        "use strict";
        return function(wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
          link = link.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
          var lnkTxt = link, append = "", target = "", lmc = leadingMagicChars || "", tmc = trailingMagicChars || "";
          if (/^www\./i.test(link)) {
            link = link.replace(/^www\./i, "http://www.");
          }
          if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
            append = trailingPunctuation;
          }
          if (options.openLinksInNewWindow) {
            target = ' rel="noopener noreferrer" target="\xA8E95Eblank"';
          }
          return lmc + '<a href="' + link + '"' + target + ">" + lnkTxt + "</a>" + append + tmc;
        };
      }, replaceMail = function(options, globals) {
        "use strict";
        return function(wholeMatch, b, mail) {
          var href = "mailto:";
          b = b || "";
          mail = showdown2.subParser("unescapeSpecialChars")(mail, options, globals);
          if (options.encodeEmails) {
            href = showdown2.helper.encodeEmailAddress(href + mail);
            mail = showdown2.helper.encodeEmailAddress(mail);
          } else {
            href = href + mail;
          }
          return b + '<a href="' + href + '">' + mail + "</a>";
        };
      };
      showdown2.subParser("autoLinks", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("autoLinks.before", text, options, globals);
        text = text.replace(delimUrlRegex, replaceLink(options));
        text = text.replace(delimMailRegex, replaceMail(options, globals));
        text = globals.converter._dispatch("autoLinks.after", text, options, globals);
        return text;
      });
      showdown2.subParser("simplifiedAutoLinks", function(text, options, globals) {
        "use strict";
        if (!options.simplifiedAutoLink) {
          return text;
        }
        text = globals.converter._dispatch("simplifiedAutoLinks.before", text, options, globals);
        if (options.excludeTrailingPunctuationFromURLs) {
          text = text.replace(simpleURLRegex2, replaceLink(options));
        } else {
          text = text.replace(simpleURLRegex, replaceLink(options));
        }
        text = text.replace(simpleMailRegex, replaceMail(options, globals));
        text = globals.converter._dispatch("simplifiedAutoLinks.after", text, options, globals);
        return text;
      });
      showdown2.subParser("blockGamut", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("blockGamut.before", text, options, globals);
        text = showdown2.subParser("blockQuotes")(text, options, globals);
        text = showdown2.subParser("headers")(text, options, globals);
        text = showdown2.subParser("horizontalRule")(text, options, globals);
        text = showdown2.subParser("lists")(text, options, globals);
        text = showdown2.subParser("codeBlocks")(text, options, globals);
        text = showdown2.subParser("tables")(text, options, globals);
        text = showdown2.subParser("hashHTMLBlocks")(text, options, globals);
        text = showdown2.subParser("paragraphs")(text, options, globals);
        text = globals.converter._dispatch("blockGamut.after", text, options, globals);
        return text;
      });
      showdown2.subParser("blockQuotes", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("blockQuotes.before", text, options, globals);
        text = text + "\n\n";
        var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
        if (options.splitAdjacentBlockquotes) {
          rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
        }
        text = text.replace(rgx, function(bq) {
          bq = bq.replace(/^[ \t]*>[ \t]?/gm, "");
          bq = bq.replace(/¨0/g, "");
          bq = bq.replace(/^[ \t]+$/gm, "");
          bq = showdown2.subParser("githubCodeBlocks")(bq, options, globals);
          bq = showdown2.subParser("blockGamut")(bq, options, globals);
          bq = bq.replace(/(^|\n)/g, "$1  ");
          bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
            var pre = m1;
            pre = pre.replace(/^  /mg, "\xA80");
            pre = pre.replace(/¨0/g, "");
            return pre;
          });
          return showdown2.subParser("hashBlock")("<blockquote>\n" + bq + "\n</blockquote>", options, globals);
        });
        text = globals.converter._dispatch("blockQuotes.after", text, options, globals);
        return text;
      });
      showdown2.subParser("codeBlocks", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("codeBlocks.before", text, options, globals);
        text += "\xA80";
        var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
        text = text.replace(pattern, function(wholeMatch, m1, m2) {
          var codeblock = m1, nextChar = m2, end = "\n";
          codeblock = showdown2.subParser("outdent")(codeblock, options, globals);
          codeblock = showdown2.subParser("encodeCode")(codeblock, options, globals);
          codeblock = showdown2.subParser("detab")(codeblock, options, globals);
          codeblock = codeblock.replace(/^\n+/g, "");
          codeblock = codeblock.replace(/\n+$/g, "");
          if (options.omitExtraWLInCodeBlocks) {
            end = "";
          }
          codeblock = "<pre><code>" + codeblock + end + "</code></pre>";
          return showdown2.subParser("hashBlock")(codeblock, options, globals) + nextChar;
        });
        text = text.replace(/¨0/, "");
        text = globals.converter._dispatch("codeBlocks.after", text, options, globals);
        return text;
      });
      showdown2.subParser("codeSpans", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("codeSpans.before", text, options, globals);
        if (typeof text === "undefined") {
          text = "";
        }
        text = text.replace(
          /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
          function(wholeMatch, m1, m2, m3) {
            var c = m3;
            c = c.replace(/^([ \t]*)/g, "");
            c = c.replace(/[ \t]*$/g, "");
            c = showdown2.subParser("encodeCode")(c, options, globals);
            c = m1 + "<code>" + c + "</code>";
            c = showdown2.subParser("hashHTMLSpans")(c, options, globals);
            return c;
          }
        );
        text = globals.converter._dispatch("codeSpans.after", text, options, globals);
        return text;
      });
      showdown2.subParser("completeHTMLDocument", function(text, options, globals) {
        "use strict";
        if (!options.completeHTMLDocument) {
          return text;
        }
        text = globals.converter._dispatch("completeHTMLDocument.before", text, options, globals);
        var doctype = "html", doctypeParsed = "<!DOCTYPE HTML>\n", title = "", charset = '<meta charset="utf-8">\n', lang = "", metadata = "";
        if (typeof globals.metadata.parsed.doctype !== "undefined") {
          doctypeParsed = "<!DOCTYPE " + globals.metadata.parsed.doctype + ">\n";
          doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
          if (doctype === "html" || doctype === "html5") {
            charset = '<meta charset="utf-8">';
          }
        }
        for (var meta in globals.metadata.parsed) {
          if (globals.metadata.parsed.hasOwnProperty(meta)) {
            switch (meta.toLowerCase()) {
              case "doctype":
                break;
              case "title":
                title = "<title>" + globals.metadata.parsed.title + "</title>\n";
                break;
              case "charset":
                if (doctype === "html" || doctype === "html5") {
                  charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
                } else {
                  charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
                }
                break;
              case "language":
              case "lang":
                lang = ' lang="' + globals.metadata.parsed[meta] + '"';
                metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
                break;
              default:
                metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
            }
          }
        }
        text = doctypeParsed + "<html" + lang + ">\n<head>\n" + title + charset + metadata + "</head>\n<body>\n" + text.trim() + "\n</body>\n</html>";
        text = globals.converter._dispatch("completeHTMLDocument.after", text, options, globals);
        return text;
      });
      showdown2.subParser("detab", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("detab.before", text, options, globals);
        text = text.replace(/\t(?=\t)/g, "    ");
        text = text.replace(/\t/g, "\xA8A\xA8B");
        text = text.replace(/¨B(.+?)¨A/g, function(wholeMatch, m1) {
          var leadingText = m1, numSpaces = 4 - leadingText.length % 4;
          for (var i = 0; i < numSpaces; i++) {
            leadingText += " ";
          }
          return leadingText;
        });
        text = text.replace(/¨A/g, "    ");
        text = text.replace(/¨B/g, "");
        text = globals.converter._dispatch("detab.after", text, options, globals);
        return text;
      });
      showdown2.subParser("ellipsis", function(text, options, globals) {
        "use strict";
        if (!options.ellipsis) {
          return text;
        }
        text = globals.converter._dispatch("ellipsis.before", text, options, globals);
        text = text.replace(/\.\.\./g, "\u2026");
        text = globals.converter._dispatch("ellipsis.after", text, options, globals);
        return text;
      });
      showdown2.subParser("emoji", function(text, options, globals) {
        "use strict";
        if (!options.emoji) {
          return text;
        }
        text = globals.converter._dispatch("emoji.before", text, options, globals);
        var emojiRgx = /:([\S]+?):/g;
        text = text.replace(emojiRgx, function(wm, emojiCode) {
          if (showdown2.helper.emojis.hasOwnProperty(emojiCode)) {
            return showdown2.helper.emojis[emojiCode];
          }
          return wm;
        });
        text = globals.converter._dispatch("emoji.after", text, options, globals);
        return text;
      });
      showdown2.subParser("encodeAmpsAndAngles", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("encodeAmpsAndAngles.before", text, options, globals);
        text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
        text = text.replace(/<(?![a-z\/?$!])/gi, "&lt;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");
        text = globals.converter._dispatch("encodeAmpsAndAngles.after", text, options, globals);
        return text;
      });
      showdown2.subParser("encodeBackslashEscapes", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("encodeBackslashEscapes.before", text, options, globals);
        text = text.replace(/\\(\\)/g, showdown2.helper.escapeCharactersCallback);
        text = text.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, showdown2.helper.escapeCharactersCallback);
        text = globals.converter._dispatch("encodeBackslashEscapes.after", text, options, globals);
        return text;
      });
      showdown2.subParser("encodeCode", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("encodeCode.before", text, options, globals);
        text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, showdown2.helper.escapeCharactersCallback);
        text = globals.converter._dispatch("encodeCode.after", text, options, globals);
        return text;
      });
      showdown2.subParser("escapeSpecialCharsWithinTagAttributes", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", text, options, globals);
        var tags = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
        text = text.replace(tags, function(wholeMatch) {
          return wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, showdown2.helper.escapeCharactersCallback);
        });
        text = text.replace(comments, function(wholeMatch) {
          return wholeMatch.replace(/([\\`*_~=|])/g, showdown2.helper.escapeCharactersCallback);
        });
        text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", text, options, globals);
        return text;
      });
      showdown2.subParser("githubCodeBlocks", function(text, options, globals) {
        "use strict";
        if (!options.ghCodeBlocks) {
          return text;
        }
        text = globals.converter._dispatch("githubCodeBlocks.before", text, options, globals);
        text += "\xA80";
        text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(wholeMatch, delim, language, codeblock) {
          var end = options.omitExtraWLInCodeBlocks ? "" : "\n";
          codeblock = showdown2.subParser("encodeCode")(codeblock, options, globals);
          codeblock = showdown2.subParser("detab")(codeblock, options, globals);
          codeblock = codeblock.replace(/^\n+/g, "");
          codeblock = codeblock.replace(/\n+$/g, "");
          codeblock = "<pre><code" + (language ? ' class="' + language + " language-" + language + '"' : "") + ">" + codeblock + end + "</code></pre>";
          codeblock = showdown2.subParser("hashBlock")(codeblock, options, globals);
          return "\n\n\xA8G" + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock }) - 1) + "G\n\n";
        });
        text = text.replace(/¨0/, "");
        return globals.converter._dispatch("githubCodeBlocks.after", text, options, globals);
      });
      showdown2.subParser("hashBlock", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("hashBlock.before", text, options, globals);
        text = text.replace(/(^\n+|\n+$)/g, "");
        text = "\n\n\xA8K" + (globals.gHtmlBlocks.push(text) - 1) + "K\n\n";
        text = globals.converter._dispatch("hashBlock.after", text, options, globals);
        return text;
      });
      showdown2.subParser("hashCodeTags", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("hashCodeTags.before", text, options, globals);
        var repFunc = function(wholeMatch, match, left, right) {
          var codeblock = left + showdown2.subParser("encodeCode")(match, options, globals) + right;
          return "\xA8C" + (globals.gHtmlSpans.push(codeblock) - 1) + "C";
        };
        text = showdown2.helper.replaceRecursiveRegExp(text, repFunc, "<code\\b[^>]*>", "</code>", "gim");
        text = globals.converter._dispatch("hashCodeTags.after", text, options, globals);
        return text;
      });
      showdown2.subParser("hashElement", function(text, options, globals) {
        "use strict";
        return function(wholeMatch, m1) {
          var blockText = m1;
          blockText = blockText.replace(/\n\n/g, "\n");
          blockText = blockText.replace(/^\n/, "");
          blockText = blockText.replace(/\n+$/g, "");
          blockText = "\n\n\xA8K" + (globals.gHtmlBlocks.push(blockText) - 1) + "K\n\n";
          return blockText;
        };
      });
      showdown2.subParser("hashHTMLBlocks", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("hashHTMLBlocks.before", text, options, globals);
        var blockTags = [
          "pre",
          "div",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "blockquote",
          "table",
          "dl",
          "ol",
          "ul",
          "script",
          "noscript",
          "form",
          "fieldset",
          "iframe",
          "math",
          "style",
          "section",
          "header",
          "footer",
          "nav",
          "article",
          "aside",
          "address",
          "audio",
          "canvas",
          "figure",
          "hgroup",
          "output",
          "video",
          "p"
        ], repFunc = function(wholeMatch, match, left, right) {
          var txt = wholeMatch;
          if (left.search(/\bmarkdown\b/) !== -1) {
            txt = left + globals.converter.makeHtml(match) + right;
          }
          return "\n\n\xA8K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
        };
        if (options.backslashEscapesHTMLTags) {
          text = text.replace(/\\<(\/?[^>]+?)>/g, function(wm, inside) {
            return "&lt;" + inside + "&gt;";
          });
        }
        for (var i = 0; i < blockTags.length; ++i) {
          var opTagPos, rgx1 = new RegExp("^ {0,3}(<" + blockTags[i] + "\\b[^>]*>)", "im"), patLeft = "<" + blockTags[i] + "\\b[^>]*>", patRight = "</" + blockTags[i] + ">";
          while ((opTagPos = showdown2.helper.regexIndexOf(text, rgx1)) !== -1) {
            var subTexts = showdown2.helper.splitAtIndex(text, opTagPos), newSubText1 = showdown2.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, "im");
            if (newSubText1 === subTexts[1]) {
              break;
            }
            text = subTexts[0].concat(newSubText1);
          }
        }
        text = text.replace(
          /(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
          showdown2.subParser("hashElement")(text, options, globals)
        );
        text = showdown2.helper.replaceRecursiveRegExp(text, function(txt) {
          return "\n\n\xA8K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
        }, "^ {0,3}<!--", "-->", "gm");
        text = text.replace(
          /(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
          showdown2.subParser("hashElement")(text, options, globals)
        );
        text = globals.converter._dispatch("hashHTMLBlocks.after", text, options, globals);
        return text;
      });
      showdown2.subParser("hashHTMLSpans", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("hashHTMLSpans.before", text, options, globals);
        function hashHTMLSpan(html) {
          return "\xA8C" + (globals.gHtmlSpans.push(html) - 1) + "C";
        }
        text = text.replace(/<[^>]+?\/>/gi, function(wm) {
          return hashHTMLSpan(wm);
        });
        text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(wm) {
          return hashHTMLSpan(wm);
        });
        text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(wm) {
          return hashHTMLSpan(wm);
        });
        text = text.replace(/<[^>]+?>/gi, function(wm) {
          return hashHTMLSpan(wm);
        });
        text = globals.converter._dispatch("hashHTMLSpans.after", text, options, globals);
        return text;
      });
      showdown2.subParser("unhashHTMLSpans", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("unhashHTMLSpans.before", text, options, globals);
        for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
          var repText = globals.gHtmlSpans[i], limit = 0;
          while (/¨C(\d+)C/.test(repText)) {
            var num = RegExp.$1;
            repText = repText.replace("\xA8C" + num + "C", globals.gHtmlSpans[num]);
            if (limit === 10) {
              console.error("maximum nesting of 10 spans reached!!!");
              break;
            }
            ++limit;
          }
          text = text.replace("\xA8C" + i + "C", repText);
        }
        text = globals.converter._dispatch("unhashHTMLSpans.after", text, options, globals);
        return text;
      });
      showdown2.subParser("hashPreCodeTags", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("hashPreCodeTags.before", text, options, globals);
        var repFunc = function(wholeMatch, match, left, right) {
          var codeblock = left + showdown2.subParser("encodeCode")(match, options, globals) + right;
          return "\n\n\xA8G" + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock }) - 1) + "G\n\n";
        };
        text = showdown2.helper.replaceRecursiveRegExp(text, repFunc, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim");
        text = globals.converter._dispatch("hashPreCodeTags.after", text, options, globals);
        return text;
      });
      showdown2.subParser("headers", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("headers.before", text, options, globals);
        var headerLevelStart = isNaN(parseInt(options.headerLevelStart)) ? 1 : parseInt(options.headerLevelStart), setextRegexH1 = options.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, setextRegexH2 = options.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
        text = text.replace(setextRegexH1, function(wholeMatch, m1) {
          var spanGamut = showdown2.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
          return showdown2.subParser("hashBlock")(hashBlock, options, globals);
        });
        text = text.replace(setextRegexH2, function(matchFound, m1) {
          var spanGamut = showdown2.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart + 1, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
          return showdown2.subParser("hashBlock")(hashBlock, options, globals);
        });
        var atxStyle = options.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
        text = text.replace(atxStyle, function(wholeMatch, m1, m2) {
          var hText = m2;
          if (options.customizedHeaderId) {
            hText = m2.replace(/\s?\{([^{]+?)}\s*$/, "");
          }
          var span = showdown2.subParser("spanGamut")(hText, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m2) + '"', hLevel = headerLevelStart - 1 + m1.length, header = "<h" + hLevel + hID + ">" + span + "</h" + hLevel + ">";
          return showdown2.subParser("hashBlock")(header, options, globals);
        });
        function headerId(m) {
          var title, prefix;
          if (options.customizedHeaderId) {
            var match = m.match(/\{([^{]+?)}\s*$/);
            if (match && match[1]) {
              m = match[1];
            }
          }
          title = m;
          if (showdown2.helper.isString(options.prefixHeaderId)) {
            prefix = options.prefixHeaderId;
          } else if (options.prefixHeaderId === true) {
            prefix = "section-";
          } else {
            prefix = "";
          }
          if (!options.rawPrefixHeaderId) {
            title = prefix + title;
          }
          if (options.ghCompatibleHeaderId) {
            title = title.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase();
          } else if (options.rawHeaderId) {
            title = title.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "\xA8").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase();
          } else {
            title = title.replace(/[^\w]/g, "").toLowerCase();
          }
          if (options.rawPrefixHeaderId) {
            title = prefix + title;
          }
          if (globals.hashLinkCounts[title]) {
            title = title + "-" + globals.hashLinkCounts[title]++;
          } else {
            globals.hashLinkCounts[title] = 1;
          }
          return title;
        }
        text = globals.converter._dispatch("headers.after", text, options, globals);
        return text;
      });
      showdown2.subParser("horizontalRule", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("horizontalRule.before", text, options, globals);
        var key = showdown2.subParser("hashBlock")("<hr />", options, globals);
        text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
        text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
        text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
        text = globals.converter._dispatch("horizontalRule.after", text, options, globals);
        return text;
      });
      showdown2.subParser("images", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("images.before", text, options, globals);
        var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;
        function writeImageTagBase64(wholeMatch, altText, linkId, url, width, height, m5, title) {
          url = url.replace(/\s/g, "");
          return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
        }
        function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {
          var gUrls = globals.gUrls, gTitles = globals.gTitles, gDims = globals.gDimensions;
          linkId = linkId.toLowerCase();
          if (!title) {
            title = "";
          }
          if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
            url = "";
          } else if (url === "" || url === null) {
            if (linkId === "" || linkId === null) {
              linkId = altText.toLowerCase().replace(/ ?\n/g, " ");
            }
            url = "#" + linkId;
            if (!showdown2.helper.isUndefined(gUrls[linkId])) {
              url = gUrls[linkId];
              if (!showdown2.helper.isUndefined(gTitles[linkId])) {
                title = gTitles[linkId];
              }
              if (!showdown2.helper.isUndefined(gDims[linkId])) {
                width = gDims[linkId].width;
                height = gDims[linkId].height;
              }
            } else {
              return wholeMatch;
            }
          }
          altText = altText.replace(/"/g, "&quot;").replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
          url = url.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
          var result = '<img src="' + url + '" alt="' + altText + '"';
          if (title && showdown2.helper.isString(title)) {
            title = title.replace(/"/g, "&quot;").replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
            result += ' title="' + title + '"';
          }
          if (width && height) {
            width = width === "*" ? "auto" : width;
            height = height === "*" ? "auto" : height;
            result += ' width="' + width + '"';
            result += ' height="' + height + '"';
          }
          result += " />";
          return result;
        }
        text = text.replace(referenceRegExp, writeImageTag);
        text = text.replace(base64RegExp, writeImageTagBase64);
        text = text.replace(crazyRegExp, writeImageTag);
        text = text.replace(inlineRegExp, writeImageTag);
        text = text.replace(refShortcutRegExp, writeImageTag);
        text = globals.converter._dispatch("images.after", text, options, globals);
        return text;
      });
      showdown2.subParser("italicsAndBold", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("italicsAndBold.before", text, options, globals);
        function parseInside(txt, left, right) {
          return left + txt + right;
        }
        if (options.literalMidWordUnderscores) {
          text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
            return parseInside(txt, "<strong><em>", "</em></strong>");
          });
          text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
            return parseInside(txt, "<strong>", "</strong>");
          });
          text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function(wm, txt) {
            return parseInside(txt, "<em>", "</em>");
          });
        } else {
          text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m) {
            return /\S$/.test(m) ? parseInside(m, "<strong><em>", "</em></strong>") : wm;
          });
          text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m) {
            return /\S$/.test(m) ? parseInside(m, "<strong>", "</strong>") : wm;
          });
          text = text.replace(/_([^\s_][\s\S]*?)_/g, function(wm, m) {
            return /\S$/.test(m) ? parseInside(m, "<em>", "</em>") : wm;
          });
        }
        if (options.literalMidWordAsterisks) {
          text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(wm, lead, txt) {
            return parseInside(txt, lead + "<strong><em>", "</em></strong>");
          });
          text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(wm, lead, txt) {
            return parseInside(txt, lead + "<strong>", "</strong>");
          });
          text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(wm, lead, txt) {
            return parseInside(txt, lead + "<em>", "</em>");
          });
        } else {
          text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(wm, m) {
            return /\S$/.test(m) ? parseInside(m, "<strong><em>", "</em></strong>") : wm;
          });
          text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(wm, m) {
            return /\S$/.test(m) ? parseInside(m, "<strong>", "</strong>") : wm;
          });
          text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function(wm, m) {
            return /\S$/.test(m) ? parseInside(m, "<em>", "</em>") : wm;
          });
        }
        text = globals.converter._dispatch("italicsAndBold.after", text, options, globals);
        return text;
      });
      showdown2.subParser("lists", function(text, options, globals) {
        "use strict";
        function processListItems(listStr, trimTrailing) {
          globals.gListLevel++;
          listStr = listStr.replace(/\n{2,}$/, "\n");
          listStr += "\xA80";
          var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, isParagraphed = /\n[ \t]*\n(?!¨0)/.test(listStr);
          if (options.disableForced4SpacesIndentedSublists) {
            rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
          }
          listStr = listStr.replace(rgx, function(wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
            checked = checked && checked.trim() !== "";
            var item = showdown2.subParser("outdent")(m4, options, globals), bulletStyle = "";
            if (taskbtn && options.tasklists) {
              bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
              item = item.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                if (checked) {
                  otp += " checked";
                }
                otp += ">";
                return otp;
              });
            }
            item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(wm2) {
              return "\xA8A" + wm2;
            });
            if (m1 || item.search(/\n{2,}/) > -1) {
              item = showdown2.subParser("githubCodeBlocks")(item, options, globals);
              item = showdown2.subParser("blockGamut")(item, options, globals);
            } else {
              item = showdown2.subParser("lists")(item, options, globals);
              item = item.replace(/\n$/, "");
              item = showdown2.subParser("hashHTMLBlocks")(item, options, globals);
              item = item.replace(/\n\n+/g, "\n\n");
              if (isParagraphed) {
                item = showdown2.subParser("paragraphs")(item, options, globals);
              } else {
                item = showdown2.subParser("spanGamut")(item, options, globals);
              }
            }
            item = item.replace("\xA8A", "");
            item = "<li" + bulletStyle + ">" + item + "</li>\n";
            return item;
          });
          listStr = listStr.replace(/¨0/g, "");
          globals.gListLevel--;
          if (trimTrailing) {
            listStr = listStr.replace(/\s+$/, "");
          }
          return listStr;
        }
        function styleStartNumber(list, listType) {
          if (listType === "ol") {
            var res = list.match(/^ *(\d+)\./);
            if (res && res[1] !== "1") {
              return ' start="' + res[1] + '"';
            }
          }
          return "";
        }
        function parseConsecutiveLists(list, listType, trimTrailing) {
          var olRgx = options.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, ulRgx = options.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, counterRxg = listType === "ul" ? olRgx : ulRgx, result = "";
          if (list.search(counterRxg) !== -1) {
            (function parseCL(txt) {
              var pos = txt.search(counterRxg), style2 = styleStartNumber(list, listType);
              if (pos !== -1) {
                result += "\n\n<" + listType + style2 + ">\n" + processListItems(txt.slice(0, pos), !!trimTrailing) + "</" + listType + ">\n";
                listType = listType === "ul" ? "ol" : "ul";
                counterRxg = listType === "ul" ? olRgx : ulRgx;
                parseCL(txt.slice(pos));
              } else {
                result += "\n\n<" + listType + style2 + ">\n" + processListItems(txt, !!trimTrailing) + "</" + listType + ">\n";
              }
            })(list);
          } else {
            var style = styleStartNumber(list, listType);
            result = "\n\n<" + listType + style + ">\n" + processListItems(list, !!trimTrailing) + "</" + listType + ">\n";
          }
          return result;
        }
        text = globals.converter._dispatch("lists.before", text, options, globals);
        text += "\xA80";
        if (globals.gListLevel) {
          text = text.replace(
            /^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
            function(wholeMatch, list, m2) {
              var listType = m2.search(/[*+-]/g) > -1 ? "ul" : "ol";
              return parseConsecutiveLists(list, listType, true);
            }
          );
        } else {
          text = text.replace(
            /(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
            function(wholeMatch, m1, list, m3) {
              var listType = m3.search(/[*+-]/g) > -1 ? "ul" : "ol";
              return parseConsecutiveLists(list, listType, false);
            }
          );
        }
        text = text.replace(/¨0/, "");
        text = globals.converter._dispatch("lists.after", text, options, globals);
        return text;
      });
      showdown2.subParser("metadata", function(text, options, globals) {
        "use strict";
        if (!options.metadata) {
          return text;
        }
        text = globals.converter._dispatch("metadata.before", text, options, globals);
        function parseMetadataContents(content) {
          globals.metadata.raw = content;
          content = content.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
          content = content.replace(/\n {4}/g, " ");
          content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(wm, key, value) {
            globals.metadata.parsed[key] = value;
            return "";
          });
        }
        text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(wholematch, format, content) {
          parseMetadataContents(content);
          return "\xA8M";
        });
        text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(wholematch, format, content) {
          if (format) {
            globals.metadata.format = format;
          }
          parseMetadataContents(content);
          return "\xA8M";
        });
        text = text.replace(/¨M/g, "");
        text = globals.converter._dispatch("metadata.after", text, options, globals);
        return text;
      });
      showdown2.subParser("outdent", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("outdent.before", text, options, globals);
        text = text.replace(/^(\t|[ ]{1,4})/gm, "\xA80");
        text = text.replace(/¨0/g, "");
        text = globals.converter._dispatch("outdent.after", text, options, globals);
        return text;
      });
      showdown2.subParser("paragraphs", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("paragraphs.before", text, options, globals);
        text = text.replace(/^\n+/g, "");
        text = text.replace(/\n+$/g, "");
        var grafs = text.split(/\n{2,}/g), grafsOut = [], end = grafs.length;
        for (var i = 0; i < end; i++) {
          var str = grafs[i];
          if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
            grafsOut.push(str);
          } else if (str.search(/\S/) >= 0) {
            str = showdown2.subParser("spanGamut")(str, options, globals);
            str = str.replace(/^([ \t]*)/g, "<p>");
            str += "</p>";
            grafsOut.push(str);
          }
        }
        end = grafsOut.length;
        for (i = 0; i < end; i++) {
          var blockText = "", grafsOutIt = grafsOut[i], codeFlag = false;
          while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
            var delim = RegExp.$1, num = RegExp.$2;
            if (delim === "K") {
              blockText = globals.gHtmlBlocks[num];
            } else {
              if (codeFlag) {
                blockText = showdown2.subParser("encodeCode")(globals.ghCodeBlocks[num].text, options, globals);
              } else {
                blockText = globals.ghCodeBlocks[num].codeblock;
              }
            }
            blockText = blockText.replace(/\$/g, "$$$$");
            grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
            if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
              codeFlag = true;
            }
          }
          grafsOut[i] = grafsOutIt;
        }
        text = grafsOut.join("\n");
        text = text.replace(/^\n+/g, "");
        text = text.replace(/\n+$/g, "");
        return globals.converter._dispatch("paragraphs.after", text, options, globals);
      });
      showdown2.subParser("runExtension", function(ext, text, options, globals) {
        "use strict";
        if (ext.filter) {
          text = ext.filter(text, globals.converter, options);
        } else if (ext.regex) {
          var re = ext.regex;
          if (!(re instanceof RegExp)) {
            re = new RegExp(re, "g");
          }
          text = text.replace(re, ext.replace);
        }
        return text;
      });
      showdown2.subParser("spanGamut", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("spanGamut.before", text, options, globals);
        text = showdown2.subParser("codeSpans")(text, options, globals);
        text = showdown2.subParser("escapeSpecialCharsWithinTagAttributes")(text, options, globals);
        text = showdown2.subParser("encodeBackslashEscapes")(text, options, globals);
        text = showdown2.subParser("images")(text, options, globals);
        text = showdown2.subParser("anchors")(text, options, globals);
        text = showdown2.subParser("autoLinks")(text, options, globals);
        text = showdown2.subParser("simplifiedAutoLinks")(text, options, globals);
        text = showdown2.subParser("emoji")(text, options, globals);
        text = showdown2.subParser("underline")(text, options, globals);
        text = showdown2.subParser("italicsAndBold")(text, options, globals);
        text = showdown2.subParser("strikethrough")(text, options, globals);
        text = showdown2.subParser("ellipsis")(text, options, globals);
        text = showdown2.subParser("hashHTMLSpans")(text, options, globals);
        text = showdown2.subParser("encodeAmpsAndAngles")(text, options, globals);
        if (options.simpleLineBreaks) {
          if (!/\n\n¨K/.test(text)) {
            text = text.replace(/\n+/g, "<br />\n");
          }
        } else {
          text = text.replace(/  +\n/g, "<br />\n");
        }
        text = globals.converter._dispatch("spanGamut.after", text, options, globals);
        return text;
      });
      showdown2.subParser("strikethrough", function(text, options, globals) {
        "use strict";
        function parseInside(txt) {
          if (options.simplifiedAutoLink) {
            txt = showdown2.subParser("simplifiedAutoLinks")(txt, options, globals);
          }
          return "<del>" + txt + "</del>";
        }
        if (options.strikethrough) {
          text = globals.converter._dispatch("strikethrough.before", text, options, globals);
          text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(wm, txt) {
            return parseInside(txt);
          });
          text = globals.converter._dispatch("strikethrough.after", text, options, globals);
        }
        return text;
      });
      showdown2.subParser("stripLinkDefinitions", function(text, options, globals) {
        "use strict";
        var regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, base64Regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
        text += "\xA80";
        var replaceFunc = function(wholeMatch, linkId, url, width, height, blankLines, title) {
          linkId = linkId.toLowerCase();
          if (text.toLowerCase().split(linkId).length - 1 < 2) {
            return wholeMatch;
          }
          if (url.match(/^data:.+?\/.+?;base64,/)) {
            globals.gUrls[linkId] = url.replace(/\s/g, "");
          } else {
            globals.gUrls[linkId] = showdown2.subParser("encodeAmpsAndAngles")(url, options, globals);
          }
          if (blankLines) {
            return blankLines + title;
          } else {
            if (title) {
              globals.gTitles[linkId] = title.replace(/"|'/g, "&quot;");
            }
            if (options.parseImgDimensions && width && height) {
              globals.gDimensions[linkId] = {
                width,
                height
              };
            }
          }
          return "";
        };
        text = text.replace(base64Regex, replaceFunc);
        text = text.replace(regex, replaceFunc);
        text = text.replace(/¨0/, "");
        return text;
      });
      showdown2.subParser("tables", function(text, options, globals) {
        "use strict";
        if (!options.tables) {
          return text;
        }
        var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
        function parseStyles(sLine) {
          if (/^:[ \t]*--*$/.test(sLine)) {
            return ' style="text-align:left;"';
          } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
            return ' style="text-align:right;"';
          } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
            return ' style="text-align:center;"';
          } else {
            return "";
          }
        }
        function parseHeaders(header, style) {
          var id = "";
          header = header.trim();
          if (options.tablesHeaderId || options.tableHeaderId) {
            id = ' id="' + header.replace(/ /g, "_").toLowerCase() + '"';
          }
          header = showdown2.subParser("spanGamut")(header, options, globals);
          return "<th" + id + style + ">" + header + "</th>\n";
        }
        function parseCells(cell, style) {
          var subText = showdown2.subParser("spanGamut")(cell, options, globals);
          return "<td" + style + ">" + subText + "</td>\n";
        }
        function buildTable(headers, cells) {
          var tb = "<table>\n<thead>\n<tr>\n", tblLgn = headers.length;
          for (var i = 0; i < tblLgn; ++i) {
            tb += headers[i];
          }
          tb += "</tr>\n</thead>\n<tbody>\n";
          for (i = 0; i < cells.length; ++i) {
            tb += "<tr>\n";
            for (var ii = 0; ii < tblLgn; ++ii) {
              tb += cells[i][ii];
            }
            tb += "</tr>\n";
          }
          tb += "</tbody>\n</table>\n";
          return tb;
        }
        function parseTable(rawTable) {
          var i, tableLines = rawTable.split("\n");
          for (i = 0; i < tableLines.length; ++i) {
            if (/^ {0,3}\|/.test(tableLines[i])) {
              tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, "");
            }
            if (/\|[ \t]*$/.test(tableLines[i])) {
              tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, "");
            }
            tableLines[i] = showdown2.subParser("codeSpans")(tableLines[i], options, globals);
          }
          var rawHeaders = tableLines[0].split("|").map(function(s) {
            return s.trim();
          }), rawStyles = tableLines[1].split("|").map(function(s) {
            return s.trim();
          }), rawCells = [], headers = [], styles = [], cells = [];
          tableLines.shift();
          tableLines.shift();
          for (i = 0; i < tableLines.length; ++i) {
            if (tableLines[i].trim() === "") {
              continue;
            }
            rawCells.push(
              tableLines[i].split("|").map(function(s) {
                return s.trim();
              })
            );
          }
          if (rawHeaders.length < rawStyles.length) {
            return rawTable;
          }
          for (i = 0; i < rawStyles.length; ++i) {
            styles.push(parseStyles(rawStyles[i]));
          }
          for (i = 0; i < rawHeaders.length; ++i) {
            if (showdown2.helper.isUndefined(styles[i])) {
              styles[i] = "";
            }
            headers.push(parseHeaders(rawHeaders[i], styles[i]));
          }
          for (i = 0; i < rawCells.length; ++i) {
            var row = [];
            for (var ii = 0; ii < headers.length; ++ii) {
              if (showdown2.helper.isUndefined(rawCells[i][ii])) {
              }
              row.push(parseCells(rawCells[i][ii], styles[ii]));
            }
            cells.push(row);
          }
          return buildTable(headers, cells);
        }
        text = globals.converter._dispatch("tables.before", text, options, globals);
        text = text.replace(/\\(\|)/g, showdown2.helper.escapeCharactersCallback);
        text = text.replace(tableRgx, parseTable);
        text = text.replace(singeColTblRgx, parseTable);
        text = globals.converter._dispatch("tables.after", text, options, globals);
        return text;
      });
      showdown2.subParser("underline", function(text, options, globals) {
        "use strict";
        if (!options.underline) {
          return text;
        }
        text = globals.converter._dispatch("underline.before", text, options, globals);
        if (options.literalMidWordUnderscores) {
          text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
            return "<u>" + txt + "</u>";
          });
          text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
            return "<u>" + txt + "</u>";
          });
        } else {
          text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m) {
            return /\S$/.test(m) ? "<u>" + m + "</u>" : wm;
          });
          text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m) {
            return /\S$/.test(m) ? "<u>" + m + "</u>" : wm;
          });
        }
        text = text.replace(/(_)/g, showdown2.helper.escapeCharactersCallback);
        text = globals.converter._dispatch("underline.after", text, options, globals);
        return text;
      });
      showdown2.subParser("unescapeSpecialChars", function(text, options, globals) {
        "use strict";
        text = globals.converter._dispatch("unescapeSpecialChars.before", text, options, globals);
        text = text.replace(/¨E(\d+)E/g, function(wholeMatch, m1) {
          var charCodeToReplace = parseInt(m1);
          return String.fromCharCode(charCodeToReplace);
        });
        text = globals.converter._dispatch("unescapeSpecialChars.after", text, options, globals);
        return text;
      });
      showdown2.subParser("makeMarkdown.blockquote", function(node, globals) {
        "use strict";
        var txt = "";
        if (node.hasChildNodes()) {
          var children = node.childNodes, childrenLength = children.length;
          for (var i = 0; i < childrenLength; ++i) {
            var innerTxt = showdown2.subParser("makeMarkdown.node")(children[i], globals);
            if (innerTxt === "") {
              continue;
            }
            txt += innerTxt;
          }
        }
        txt = txt.trim();
        txt = "> " + txt.split("\n").join("\n> ");
        return txt;
      });
      showdown2.subParser("makeMarkdown.codeBlock", function(node, globals) {
        "use strict";
        var lang = node.getAttribute("language"), num = node.getAttribute("precodenum");
        return "```" + lang + "\n" + globals.preList[num] + "\n```";
      });
      showdown2.subParser("makeMarkdown.codeSpan", function(node) {
        "use strict";
        return "`" + node.innerHTML + "`";
      });
      showdown2.subParser("makeMarkdown.emphasis", function(node, globals) {
        "use strict";
        var txt = "";
        if (node.hasChildNodes()) {
          txt += "*";
          var children = node.childNodes, childrenLength = children.length;
          for (var i = 0; i < childrenLength; ++i) {
            txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
          }
          txt += "*";
        }
        return txt;
      });
      showdown2.subParser("makeMarkdown.header", function(node, globals, headerLevel) {
        "use strict";
        var headerMark = new Array(headerLevel + 1).join("#"), txt = "";
        if (node.hasChildNodes()) {
          txt = headerMark + " ";
          var children = node.childNodes, childrenLength = children.length;
          for (var i = 0; i < childrenLength; ++i) {
            txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
          }
        }
        return txt;
      });
      showdown2.subParser("makeMarkdown.hr", function() {
        "use strict";
        return "---";
      });
      showdown2.subParser("makeMarkdown.image", function(node) {
        "use strict";
        var txt = "";
        if (node.hasAttribute("src")) {
          txt += "![" + node.getAttribute("alt") + "](";
          txt += "<" + node.getAttribute("src") + ">";
          if (node.hasAttribute("width") && node.hasAttribute("height")) {
            txt += " =" + node.getAttribute("width") + "x" + node.getAttribute("height");
          }
          if (node.hasAttribute("title")) {
            txt += ' "' + node.getAttribute("title") + '"';
          }
          txt += ")";
        }
        return txt;
      });
      showdown2.subParser("makeMarkdown.links", function(node, globals) {
        "use strict";
        var txt = "";
        if (node.hasChildNodes() && node.hasAttribute("href")) {
          var children = node.childNodes, childrenLength = children.length;
          txt = "[";
          for (var i = 0; i < childrenLength; ++i) {
            txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
          }
          txt += "](";
          txt += "<" + node.getAttribute("href") + ">";
          if (node.hasAttribute("title")) {
            txt += ' "' + node.getAttribute("title") + '"';
          }
          txt += ")";
        }
        return txt;
      });
      showdown2.subParser("makeMarkdown.list", function(node, globals, type) {
        "use strict";
        var txt = "";
        if (!node.hasChildNodes()) {
          return "";
        }
        var listItems = node.childNodes, listItemsLenght = listItems.length, listNum = node.getAttribute("start") || 1;
        for (var i = 0; i < listItemsLenght; ++i) {
          if (typeof listItems[i].tagName === "undefined" || listItems[i].tagName.toLowerCase() !== "li") {
            continue;
          }
          var bullet = "";
          if (type === "ol") {
            bullet = listNum.toString() + ". ";
          } else {
            bullet = "- ";
          }
          txt += bullet + showdown2.subParser("makeMarkdown.listItem")(listItems[i], globals);
          ++listNum;
        }
        txt += "\n<!-- -->\n";
        return txt.trim();
      });
      showdown2.subParser("makeMarkdown.listItem", function(node, globals) {
        "use strict";
        var listItemTxt = "";
        var children = node.childNodes, childrenLenght = children.length;
        for (var i = 0; i < childrenLenght; ++i) {
          listItemTxt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
        }
        if (!/\n$/.test(listItemTxt)) {
          listItemTxt += "\n";
        } else {
          listItemTxt = listItemTxt.split("\n").join("\n    ").replace(/^ {4}$/gm, "").replace(/\n\n+/g, "\n\n");
        }
        return listItemTxt;
      });
      showdown2.subParser("makeMarkdown.node", function(node, globals, spansOnly) {
        "use strict";
        spansOnly = spansOnly || false;
        var txt = "";
        if (node.nodeType === 3) {
          return showdown2.subParser("makeMarkdown.txt")(node, globals);
        }
        if (node.nodeType === 8) {
          return "<!--" + node.data + "-->\n\n";
        }
        if (node.nodeType !== 1) {
          return "";
        }
        var tagName = node.tagName.toLowerCase();
        switch (tagName) {
          case "h1":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.header")(node, globals, 1) + "\n\n";
            }
            break;
          case "h2":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.header")(node, globals, 2) + "\n\n";
            }
            break;
          case "h3":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.header")(node, globals, 3) + "\n\n";
            }
            break;
          case "h4":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.header")(node, globals, 4) + "\n\n";
            }
            break;
          case "h5":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.header")(node, globals, 5) + "\n\n";
            }
            break;
          case "h6":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.header")(node, globals, 6) + "\n\n";
            }
            break;
          case "p":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.paragraph")(node, globals) + "\n\n";
            }
            break;
          case "blockquote":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.blockquote")(node, globals) + "\n\n";
            }
            break;
          case "hr":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.hr")(node, globals) + "\n\n";
            }
            break;
          case "ol":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.list")(node, globals, "ol") + "\n\n";
            }
            break;
          case "ul":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.list")(node, globals, "ul") + "\n\n";
            }
            break;
          case "precode":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.codeBlock")(node, globals) + "\n\n";
            }
            break;
          case "pre":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.pre")(node, globals) + "\n\n";
            }
            break;
          case "table":
            if (!spansOnly) {
              txt = showdown2.subParser("makeMarkdown.table")(node, globals) + "\n\n";
            }
            break;
          case "code":
            txt = showdown2.subParser("makeMarkdown.codeSpan")(node, globals);
            break;
          case "em":
          case "i":
            txt = showdown2.subParser("makeMarkdown.emphasis")(node, globals);
            break;
          case "strong":
          case "b":
            txt = showdown2.subParser("makeMarkdown.strong")(node, globals);
            break;
          case "del":
            txt = showdown2.subParser("makeMarkdown.strikethrough")(node, globals);
            break;
          case "a":
            txt = showdown2.subParser("makeMarkdown.links")(node, globals);
            break;
          case "img":
            txt = showdown2.subParser("makeMarkdown.image")(node, globals);
            break;
          default:
            txt = node.outerHTML + "\n\n";
        }
        return txt;
      });
      showdown2.subParser("makeMarkdown.paragraph", function(node, globals) {
        "use strict";
        var txt = "";
        if (node.hasChildNodes()) {
          var children = node.childNodes, childrenLength = children.length;
          for (var i = 0; i < childrenLength; ++i) {
            txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
          }
        }
        txt = txt.trim();
        return txt;
      });
      showdown2.subParser("makeMarkdown.pre", function(node, globals) {
        "use strict";
        var num = node.getAttribute("prenum");
        return "<pre>" + globals.preList[num] + "</pre>";
      });
      showdown2.subParser("makeMarkdown.strikethrough", function(node, globals) {
        "use strict";
        var txt = "";
        if (node.hasChildNodes()) {
          txt += "~~";
          var children = node.childNodes, childrenLength = children.length;
          for (var i = 0; i < childrenLength; ++i) {
            txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
          }
          txt += "~~";
        }
        return txt;
      });
      showdown2.subParser("makeMarkdown.strong", function(node, globals) {
        "use strict";
        var txt = "";
        if (node.hasChildNodes()) {
          txt += "**";
          var children = node.childNodes, childrenLength = children.length;
          for (var i = 0; i < childrenLength; ++i) {
            txt += showdown2.subParser("makeMarkdown.node")(children[i], globals);
          }
          txt += "**";
        }
        return txt;
      });
      showdown2.subParser("makeMarkdown.table", function(node, globals) {
        "use strict";
        var txt = "", tableArray = [[], []], headings = node.querySelectorAll("thead>tr>th"), rows = node.querySelectorAll("tbody>tr"), i, ii;
        for (i = 0; i < headings.length; ++i) {
          var headContent = showdown2.subParser("makeMarkdown.tableCell")(headings[i], globals), allign = "---";
          if (headings[i].hasAttribute("style")) {
            var style = headings[i].getAttribute("style").toLowerCase().replace(/\s/g, "");
            switch (style) {
              case "text-align:left;":
                allign = ":---";
                break;
              case "text-align:right;":
                allign = "---:";
                break;
              case "text-align:center;":
                allign = ":---:";
                break;
            }
          }
          tableArray[0][i] = headContent.trim();
          tableArray[1][i] = allign;
        }
        for (i = 0; i < rows.length; ++i) {
          var r = tableArray.push([]) - 1, cols = rows[i].getElementsByTagName("td");
          for (ii = 0; ii < headings.length; ++ii) {
            var cellContent = " ";
            if (typeof cols[ii] !== "undefined") {
              cellContent = showdown2.subParser("makeMarkdown.tableCell")(cols[ii], globals);
            }
            tableArray[r].push(cellContent);
          }
        }
        var cellSpacesCount = 3;
        for (i = 0; i < tableArray.length; ++i) {
          for (ii = 0; ii < tableArray[i].length; ++ii) {
            var strLen = tableArray[i][ii].length;
            if (strLen > cellSpacesCount) {
              cellSpacesCount = strLen;
            }
          }
        }
        for (i = 0; i < tableArray.length; ++i) {
          for (ii = 0; ii < tableArray[i].length; ++ii) {
            if (i === 1) {
              if (tableArray[i][ii].slice(-1) === ":") {
                tableArray[i][ii] = showdown2.helper.padEnd(tableArray[i][ii].slice(-1), cellSpacesCount - 1, "-") + ":";
              } else {
                tableArray[i][ii] = showdown2.helper.padEnd(tableArray[i][ii], cellSpacesCount, "-");
              }
            } else {
              tableArray[i][ii] = showdown2.helper.padEnd(tableArray[i][ii], cellSpacesCount);
            }
          }
          txt += "| " + tableArray[i].join(" | ") + " |\n";
        }
        return txt.trim();
      });
      showdown2.subParser("makeMarkdown.tableCell", function(node, globals) {
        "use strict";
        var txt = "";
        if (!node.hasChildNodes()) {
          return "";
        }
        var children = node.childNodes, childrenLength = children.length;
        for (var i = 0; i < childrenLength; ++i) {
          txt += showdown2.subParser("makeMarkdown.node")(children[i], globals, true);
        }
        return txt.trim();
      });
      showdown2.subParser("makeMarkdown.txt", function(node) {
        "use strict";
        var txt = node.nodeValue;
        txt = txt.replace(/ +/g, " ");
        txt = txt.replace(/¨NBSP;/g, " ");
        txt = showdown2.helper.unescapeHTMLEntities(txt);
        txt = txt.replace(/([*_~|`])/g, "\\$1");
        txt = txt.replace(/^(\s*)>/g, "\\$1>");
        txt = txt.replace(/^#/gm, "\\#");
        txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3");
        txt = txt.replace(/^( {0,3}\d+)\./gm, "$1\\.");
        txt = txt.replace(/^( {0,3})([+-])/gm, "$1\\$2");
        txt = txt.replace(/]([\s]*)\(/g, "\\]$1\\(");
        txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:");
        return txt;
      });
      var root = this;
      if (typeof define === "function" && define.amd) {
        define(function() {
          "use strict";
          return showdown2;
        });
      } else if (typeof module !== "undefined" && module.exports) {
        module.exports = showdown2;
      } else {
        root.showdown = showdown2;
      }
    }).call(exports);
  }
});
var import_ajv = __toESM(require_ajv(), 1);
var JsonUtil = class {
  ajv;
  constructor() {
    this.ajv = new import_ajv.default();
  }
  validateJson(schema, data) {
    const valid = this.ajv.validate(schema, data);
    if (valid) {
      return { valid };
    } else {
      return { valid, error: this.ajv.errorsText() };
    }
  }
  validateObjectSchema(schemaObject, dataObject) {
    const valid = this.ajv.validate(schemaObject, dataObject);
    if (valid) {
      return { valid };
    } else {
      return { valid, error: this.ajv.errorsText() };
    }
  }
};
var jsonUtil_default = JsonUtil;
var DateUtil = class {
  TIME_SPLIT = " ";
  /**
   * 给日期添加小时
   *
   * @param date - Date
   * @param numOfHours - 数字
   * @author terwer
   * @since 1.0.0
   */
  addHoursToDate(date, numOfHours) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1e3);
    return date;
  }
  /**
   * 转换ISO日期为中文日期的通用转换方法
   *
   * @param str - '2022-07-18T06:25:48.000Z
   * @param isAddTimeZone - 是否增加时区（默认不增加）
   * @param isShort - 是否只返回日期
   * @author terwer
   * @since 1.0.0
   */
  formatIsoToZhDateFormat(str, isAddTimeZone, isShort) {
    if (!str) {
      return "";
    }
    let newstr = str;
    const isoDateRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.\d{3})Z$/gm;
    const matches = newstr.match(isoDateRegex);
    if (matches == null) {
      return str;
    }
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      let newmatch = match;
      if (isAddTimeZone) {
        newmatch = this.addHoursToDate(new Date(match), 8).toISOString();
      }
      const dts = newmatch.split("T");
      const d = dts[0];
      const t = dts[1].split(".")[0];
      let result = d + this.TIME_SPLIT + t;
      if (isShort) {
        result = d;
      }
      newstr = newstr.replace(match, result);
    }
    return newstr;
  }
  /**
   * 转换ISO日期为中文完整时间
   *
   * @param str - '2022-07-18T06:25:48.000Z
   */
  formatIsoToZh(str) {
    return this.formatIsoToZhDateFormat(str, false, false);
  }
  /**
   * 转换ISO日期为中文日期
   *
   * @param str - '2022-07-18T06:25:48.000Z
   */
  formatIsoToZhDate(str) {
    return this.formatIsoToZhDateFormat(str, false, true);
  }
  /**
   * 转换ISO日期为中文时间
   *
   * @param str - '2022-07-18T06:25:48.000Z
   */
  formatIsoToZhTime(str) {
    const dt = this.formatIsoToZhDateFormat(str, false);
    return dt.split(this.TIME_SPLIT)[1];
  }
  /**
   * 当前日期时间完整格式，格式：2023-03-10 02:03:43
   */
  nowZh() {
    return this.formatIsoToZhDateFormat((/* @__PURE__ */ new Date()).toISOString(), true);
  }
  /**
   * 当前日期，格式：2023-03-10
   */
  nowDateZh() {
    return this.formatIsoToZhDateFormat((/* @__PURE__ */ new Date()).toISOString(), true, true);
  }
  /**
   * 当前时间，格式：02:03:43
   */
  nowTimeZh() {
    const now = this.formatIsoToZhDateFormat((/* @__PURE__ */ new Date()).toISOString(), true);
    return now.split(this.TIME_SPLIT)[1];
  }
};
var dateUtil_default = DateUtil;
var StrUtil = class {
  /**
   * 格式化字符串
   *
   * @param str - 字符串，可用占位符，例如：test \{0\} str
   * @param args - 按占位符顺序排列的参数
   * @author terwer
   * @since 0.0.1
   */
  f(str, ...args) {
    let ret = str;
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (typeof arg === "string") {
        ret = ret.replace(`{${i}}`, arg);
      } else {
        ret = ret.replace(`{${i}}`, arg.toString());
      }
    }
    return ret;
  }
  /**
   * 字符串拼接
   *
   * @param str - 字符串数组
   */
  appendStr(...str) {
    return str.join("");
  }
  /**
   * 判断字符串中，是否包含数组中任何一个元素
   *
   * @param str - 字符串
   * @param arr - 字符串数组
   */
  includeInArray(str, arr) {
    let flag = false;
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (str.includes(item)) {
        flag = true;
      }
    }
    return flag;
  }
  /**
   * 截取指定长度的字符串
   *
   * @param str - str
   * @param length - 长度
   * @param ignore - 不要结尾省略号
   */
  getByLength(str, length, ignore) {
    const allText = str;
    if (allText.length < length) {
      return allText;
    }
    if (ignore) {
      return allText.substring(0, length);
    }
    return allText.substring(0, length) + "...";
  }
  /**
   * 字符串空值检测
   *
   * @param str - 待检测的字符串
   */
  isEmptyString(str) {
    if (!str) {
      return true;
    }
    if (!(typeof str === "string")) {
      return true;
    }
    return str.trim().length === 0;
  }
  /**
   * 路径组合，解决多出来/的问题
   *
   * @param path1 - 路径1
   * @param path2 - 路径2
   */
  pathJoin(path1, path2) {
    let path = path1;
    const path1LastIdx = path1.lastIndexOf("/");
    if (path1LastIdx + 1 === path1.length) {
      path = path1.substring(0, path1LastIdx);
    }
    const path2Idx = path2.indexOf("/");
    if (path2Idx > 0) {
      path = path + "/" + path2;
    } else {
      path = path + path2;
    }
    return path;
  }
  /**
   * 强转boolean
   *
   * @param val - val
   */
  parseBoolean(val) {
    if (!val) {
      val = "false";
    }
    return val.toString().toLowerCase() === "true";
  }
};
var strUtil_default = StrUtil;
var compareVersions = (v1, v2) => {
  const n1 = validateAndParse(v1);
  const n2 = validateAndParse(v2);
  const p1 = n1.pop();
  const p2 = n2.pop();
  const r = compareSegments(n1, n2);
  if (r !== 0)
    return r;
  if (p1 && p2) {
    return compareSegments(p1.split("."), p2.split("."));
  } else if (p1 || p2) {
    return p1 ? -1 : 1;
  }
  return 0;
};
var semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
var validateAndParse = (version) => {
  if (typeof version !== "string") {
    throw new TypeError("Invalid argument expected string");
  }
  const match = version.match(semver);
  if (!match) {
    throw new Error(`Invalid argument not valid semver ('${version}' received)`);
  }
  match.shift();
  return match;
};
var isWildcard = (s) => s === "*" || s === "x" || s === "X";
var tryParse = (v) => {
  const n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};
var forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
var compareStrings = (a, b) => {
  if (isWildcard(a) || isWildcard(b))
    return 0;
  const [ap, bp] = forceType(tryParse(a), tryParse(b));
  if (ap > bp)
    return 1;
  if (ap < bp)
    return -1;
  return 0;
};
var compareSegments = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const r = compareStrings(a[i] || "0", b[i] || "0");
    if (r !== 0)
      return r;
  }
  return 0;
};
var operatorResMap = {
  ">": [1],
  ">=": [0, 1],
  "=": [0],
  "<=": [-1, 0],
  "<": [-1]
};
var allowedOperators = Object.keys(operatorResMap);
var VersionUtil = class {
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is higher than v2
   */
  greater(v1, v2) {
    return compareVersions(v1, v2) > 0;
  }
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is equal to v2
   */
  equal(v1, v2) {
    return compareVersions(v1, v2) === 0;
  }
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is lesser than v2
   */
  lesser(v1, v2) {
    return compareVersions(v1, v2) < 0;
  }
};
var versionUtil_default = VersionUtil;
var __defProp22 = Object.defineProperty;
var __defNormalProp22 = (obj, key, value) => key in obj ? __defProp22(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField22 = (obj, key, value) => {
  __defNormalProp22(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var EnvConstants = class {
};
__publicField22(EnvConstants, "NODE_ENV_KEY", "NODE_ENV");
__publicField22(EnvConstants, "NODE_ENV_DEVELOPMENT", "development");
__publicField22(EnvConstants, "NODE_ENV_PRODUCTION", "production");
__publicField22(EnvConstants, "NODE_ENV_TEST", "test");
__publicField22(EnvConstants, "VITE_DEBUG_MODE_KEY", "VITE_DEBUG_MODE");
var EnvConstants_default = EnvConstants;
var Env = class {
  envMeta;
  /**
   * 是否是开发阶段调试
   */
  isNodeDev() {
    return this.getEnv(EnvConstants_default.NODE_ENV_KEY) === EnvConstants_default.NODE_ENV_DEVELOPMENT;
  }
  /**
   * 是否是调试阶段
   */
  isDev() {
    return this.isNodeDev() || this.getBooleanEnv(EnvConstants_default.VITE_DEBUG_MODE_KEY);
  }
  /**
   * 环境初始化
   *
   * @param envMeta - 需要传入 import.meta.env 。特别提醒：此参数是静态元数据，取决于最终使用的项目。因此仅仅在最终使用的地方显示传递此值，中间项目请保持参数传递
   * @see {@link https://vitejs.dev/guide/env-and-mode.html#production-replacement}
   */
  constructor(envMeta) {
    this.envMeta = envMeta;
  }
  /**
   * 获取环境变量，key不存在返回undefined
   * @param key - key
   */
  getEnv(key) {
    let env;
    try {
      if (this.envMeta[key]) {
        env = this.envMeta[key];
      }
    } catch (e) {
    }
    return env;
  }
  /**
   * 获取String类型的环境变量，key不存在直接返回空值
   * @param key - key
   */
  getStringEnv(key) {
    return this.getEnv(key) ?? "";
  }
  /**
   * 获取Boolean类型的环境变量，key不存在返回false
   * @param key - key
   */
  getBooleanEnv(key) {
    let env = false;
    if (this.getEnv(key)) {
      env = this.getStringEnv(key).toLowerCase() === "true";
    }
    return env;
  }
  /**
   * 获取环境变量，如果未定义或者为空值，用指定的默认值代替
   *
   * @param key - key
   * @param defaultValue - 默认值
   * @since 0.1.0
   * @author terwer
   */
  getEnvOrDefault(key, defaultValue) {
    const value = this.getStringEnv(key);
    if (value.trim().length == 0) {
      return defaultValue;
    }
    return value;
  }
};
var zhi_env_default = Env;
var src_default2 = zhi_env_default;
var __create2 = Object.create;
var __defProp32 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __defNormalProp32 = (obj, key, value) => key in obj ? __defProp32(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require22 = /* @__PURE__ */ ((x) => typeof __require3 !== "undefined" ? __require3 : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require3 !== "undefined" ? __require3 : a)[b]
}) : x)(function(x) {
  if (typeof __require3 !== "undefined")
    return __require3.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS2 = (cb, mod) => function __require32() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp32(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp32(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField32 = (obj, key, value) => {
  __defNormalProp32(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var require_loglevel = __commonJS2({
  "../../node_modules/.pnpm/registry.npmjs.org+loglevel@1.8.1/node_modules/loglevel/lib/loglevel.js"(exports, module) {
    (function(root, definition) {
      "use strict";
      if (typeof define === "function" && define.amd) {
        define(definition);
      } else if (typeof module === "object" && module.exports) {
        module.exports = definition();
      } else {
        root.log = definition();
      }
    })(exports, function() {
      "use strict";
      var noop = function() {
      };
      var undefinedType = "undefined";
      var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
      var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
      ];
      function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === "function") {
          return method.bind(obj);
        } else {
          try {
            return Function.prototype.bind.call(method, obj);
          } catch (e) {
            return function() {
              return Function.prototype.apply.apply(method, [obj, arguments]);
            };
          }
        }
      }
      function traceForIE() {
        if (console.log) {
          if (console.log.apply) {
            console.log.apply(console, arguments);
          } else {
            Function.prototype.apply.apply(console.log, [console, arguments]);
          }
        }
        if (console.trace)
          console.trace();
      }
      function realMethod(methodName) {
        if (methodName === "debug") {
          methodName = "log";
        }
        if (typeof console === undefinedType) {
          return false;
        } else if (methodName === "trace" && isIE) {
          return traceForIE;
        } else if (console[methodName] !== void 0) {
          return bindMethod(console, methodName);
        } else if (console.log !== void 0) {
          return bindMethod(console, "log");
        } else {
          return noop;
        }
      }
      function replaceLoggingMethods(level, loggerName) {
        for (var i = 0; i < logMethods.length; i++) {
          var methodName = logMethods[i];
          this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
        }
        this.log = this.debug;
      }
      function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function() {
          if (typeof console !== undefinedType) {
            replaceLoggingMethods.call(this, level, loggerName);
            this[methodName].apply(this, arguments);
          }
        };
      }
      function defaultMethodFactory(methodName, level, loggerName) {
        return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
      }
      function Logger2(name, defaultLevel, factory) {
        var self = this;
        var currentLevel;
        defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;
        var storageKey = "loglevel";
        if (typeof name === "string") {
          storageKey += ":" + name;
        } else if (typeof name === "symbol") {
          storageKey = void 0;
        }
        function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || "silent").toUpperCase();
          if (typeof window === undefinedType || !storageKey)
            return;
          try {
            window.localStorage[storageKey] = levelName;
            return;
          } catch (ignore) {
          }
          try {
            window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {
          }
        }
        function getPersistedLevel() {
          var storedLevel;
          if (typeof window === undefinedType || !storageKey)
            return;
          try {
            storedLevel = window.localStorage[storageKey];
          } catch (ignore) {
          }
          if (typeof storedLevel === undefinedType) {
            try {
              var cookie = window.document.cookie;
              var location = cookie.indexOf(
                encodeURIComponent(storageKey) + "="
              );
              if (location !== -1) {
                storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
              }
            } catch (ignore) {
            }
          }
          if (self.levels[storedLevel] === void 0) {
            storedLevel = void 0;
          }
          return storedLevel;
        }
        function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey)
            return;
          try {
            window.localStorage.removeItem(storageKey);
            return;
          } catch (ignore) {
          }
          try {
            window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {
          }
        }
        self.name = name;
        self.levels = {
          "TRACE": 0,
          "DEBUG": 1,
          "INFO": 2,
          "WARN": 3,
          "ERROR": 4,
          "SILENT": 5
        };
        self.methodFactory = factory || defaultMethodFactory;
        self.getLevel = function() {
          return currentLevel;
        };
        self.setLevel = function(level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== void 0) {
            level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
            currentLevel = level;
            if (persist !== false) {
              persistLevelIfPossible(level);
            }
            replaceLoggingMethods.call(self, level, name);
            if (typeof console === undefinedType && level < self.levels.SILENT) {
              return "No console available for logging";
            }
          } else {
            throw "log.setLevel() called with invalid level: " + level;
          }
        };
        self.setDefaultLevel = function(level) {
          defaultLevel = level;
          if (!getPersistedLevel()) {
            self.setLevel(level, false);
          }
        };
        self.resetLevel = function() {
          self.setLevel(defaultLevel, false);
          clearPersistedLevel();
        };
        self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
        };
        self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
        };
        var initialLevel = getPersistedLevel();
        if (initialLevel == null) {
          initialLevel = defaultLevel;
        }
        self.setLevel(initialLevel, false);
      }
      var defaultLogger = new Logger2();
      var _loggersByName = {};
      defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }
        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger2(
            name,
            defaultLogger.getLevel(),
            defaultLogger.methodFactory
          );
        }
        return logger;
      };
      var _log = typeof window !== undefinedType ? window.log : void 0;
      defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType && window.log === defaultLogger) {
          window.log = _log;
        }
        return defaultLogger;
      };
      defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
      };
      defaultLogger["default"] = defaultLogger;
      return defaultLogger;
    });
  }
});
var require_loglevel_plugin_prefix = __commonJS2({
  "../../node_modules/.pnpm/registry.npmjs.org+loglevel-plugin-prefix@0.8.4/node_modules/loglevel-plugin-prefix/lib/loglevel-plugin-prefix.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
      } else {
        root.prefix = factory(root);
      }
    })(exports, function(root) {
      "use strict";
      var merge = function(target) {
        var i = 1;
        var length = arguments.length;
        var key;
        for (; i < length; i++) {
          for (key in arguments[i]) {
            if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
              target[key] = arguments[i][key];
            }
          }
        }
        return target;
      };
      var defaults = {
        template: "[%t] %l:",
        levelFormatter: function(level) {
          return level.toUpperCase();
        },
        nameFormatter: function(name) {
          return name || "root";
        },
        timestampFormatter: function(date) {
          return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        },
        format: void 0
      };
      var loglevel2;
      var configs = {};
      var reg = function(rootLogger) {
        if (!rootLogger || !rootLogger.getLogger) {
          throw new TypeError("Argument is not a root logger");
        }
        loglevel2 = rootLogger;
      };
      var apply = function(logger, config) {
        if (!logger || !logger.setLevel) {
          throw new TypeError("Argument is not a logger");
        }
        var originalFactory = logger.methodFactory;
        var name = logger.name || "";
        var parent2 = configs[name] || configs[""] || defaults;
        function methodFactory(methodName, logLevel, loggerName) {
          var originalMethod = originalFactory(methodName, logLevel, loggerName);
          var options = configs[loggerName] || configs[""];
          var hasTimestamp = options.template.indexOf("%t") !== -1;
          var hasLevel = options.template.indexOf("%l") !== -1;
          var hasName = options.template.indexOf("%n") !== -1;
          return function() {
            var content = "";
            var length = arguments.length;
            var args = Array(length);
            var key = 0;
            for (; key < length; key++) {
              args[key] = arguments[key];
            }
            if (name || !configs[loggerName]) {
              var timestamp = options.timestampFormatter(/* @__PURE__ */ new Date());
              var level = options.levelFormatter(methodName);
              var lname = options.nameFormatter(loggerName);
              if (options.format) {
                content += options.format(level, lname, timestamp);
              } else {
                content += options.template;
                if (hasTimestamp) {
                  content = content.replace(/%t/, timestamp);
                }
                if (hasLevel)
                  content = content.replace(/%l/, level);
                if (hasName)
                  content = content.replace(/%n/, lname);
              }
              if (args.length && typeof args[0] === "string") {
                args[0] = content + " " + args[0];
              } else {
                args.unshift(content);
              }
            }
            originalMethod.apply(void 0, args);
          };
        }
        if (!configs[name]) {
          logger.methodFactory = methodFactory;
        }
        config = config || {};
        if (config.template)
          config.format = void 0;
        configs[name] = merge({}, parent2, config);
        logger.setLevel(logger.getLevel());
        if (!loglevel2) {
          logger.warn(
            "It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"
          );
        }
        return logger;
      };
      var api = {
        reg,
        apply
      };
      var save;
      if (root) {
        save = root.prefix;
        api.noConflict = function() {
          if (root.prefix === api) {
            root.prefix = save;
          }
          return api;
        };
      }
      return api;
    });
  }
});
var require_symbols = __commonJS2({
  "../../node_modules/.pnpm/registry.npmjs.org+ansi-colors@4.1.3/node_modules/ansi-colors/symbols.js"(exports, module) {
    "use strict";
    var isHyper = typeof process !== "undefined" && process.env.TERM_PROGRAM === "Hyper";
    var isWindows = typeof process !== "undefined" && process.platform === "win32";
    var isLinux = typeof process !== "undefined" && process.platform === "linux";
    var common = {
      ballotDisabled: "\u2612",
      ballotOff: "\u2610",
      ballotOn: "\u2611",
      bullet: "\u2022",
      bulletWhite: "\u25E6",
      fullBlock: "\u2588",
      heart: "\u2764",
      identicalTo: "\u2261",
      line: "\u2500",
      mark: "\u203B",
      middot: "\xB7",
      minus: "\uFF0D",
      multiplication: "\xD7",
      obelus: "\xF7",
      pencilDownRight: "\u270E",
      pencilRight: "\u270F",
      pencilUpRight: "\u2710",
      percent: "%",
      pilcrow2: "\u2761",
      pilcrow: "\xB6",
      plusMinus: "\xB1",
      question: "?",
      section: "\xA7",
      starsOff: "\u2606",
      starsOn: "\u2605",
      upDownArrow: "\u2195"
    };
    var windows = Object.assign({}, common, {
      check: "\u221A",
      cross: "\xD7",
      ellipsisLarge: "...",
      ellipsis: "...",
      info: "i",
      questionSmall: "?",
      pointer: ">",
      pointerSmall: "\xBB",
      radioOff: "( )",
      radioOn: "(*)",
      warning: "\u203C"
    });
    var other = Object.assign({}, common, {
      ballotCross: "\u2718",
      check: "\u2714",
      cross: "\u2716",
      ellipsisLarge: "\u22EF",
      ellipsis: "\u2026",
      info: "\u2139",
      questionFull: "\uFF1F",
      questionSmall: "\uFE56",
      pointer: isLinux ? "\u25B8" : "\u276F",
      pointerSmall: isLinux ? "\u2023" : "\u203A",
      radioOff: "\u25EF",
      radioOn: "\u25C9",
      warning: "\u26A0"
    });
    module.exports = isWindows && !isHyper ? windows : other;
    Reflect.defineProperty(module.exports, "common", { enumerable: false, value: common });
    Reflect.defineProperty(module.exports, "windows", { enumerable: false, value: windows });
    Reflect.defineProperty(module.exports, "other", { enumerable: false, value: other });
  }
});
var require_ansi_colors = __commonJS2({
  "../../node_modules/.pnpm/registry.npmjs.org+ansi-colors@4.1.3/node_modules/ansi-colors/index.js"(exports, module) {
    "use strict";
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;
    var hasColor = () => {
      if (typeof process !== "undefined") {
        return process.env.FORCE_COLOR !== "0";
      }
      return false;
    };
    var create = () => {
      const colors2 = {
        enabled: hasColor(),
        visible: true,
        styles: {},
        keys: {}
      };
      const ansi = (style2) => {
        let open = style2.open = `\x1B[${style2.codes[0]}m`;
        let close = style2.close = `\x1B[${style2.codes[1]}m`;
        let regex = style2.regex = new RegExp(`\\u001b\\[${style2.codes[1]}m`, "g");
        style2.wrap = (input, newline) => {
          if (input.includes(close))
            input = input.replace(regex, close + open);
          let output = open + input + close;
          return newline ? output.replace(/\r*\n/g, `${close}$&${open}`) : output;
        };
        return style2;
      };
      const wrap = (style2, input, newline) => {
        return typeof style2 === "function" ? style2(input) : style2.wrap(input, newline);
      };
      const style = (input, stack) => {
        if (input === "" || input == null)
          return "";
        if (colors2.enabled === false)
          return input;
        if (colors2.visible === false)
          return "";
        let str = "" + input;
        let nl = str.includes("\n");
        let n = stack.length;
        if (n > 0 && stack.includes("unstyle")) {
          stack = [.../* @__PURE__ */ new Set(["unstyle", ...stack])].reverse();
        }
        while (n-- > 0)
          str = wrap(colors2.styles[stack[n]], str, nl);
        return str;
      };
      const define2 = (name, codes, type) => {
        colors2.styles[name] = ansi({ name, codes });
        let keys = colors2.keys[type] || (colors2.keys[type] = []);
        keys.push(name);
        Reflect.defineProperty(colors2, name, {
          configurable: true,
          enumerable: true,
          set(value) {
            colors2.alias(name, value);
          },
          get() {
            let color = (input) => style(input, color.stack);
            Reflect.setPrototypeOf(color, colors2);
            color.stack = this.stack ? this.stack.concat(name) : [name];
            return color;
          }
        });
      };
      define2("reset", [0, 0], "modifier");
      define2("bold", [1, 22], "modifier");
      define2("dim", [2, 22], "modifier");
      define2("italic", [3, 23], "modifier");
      define2("underline", [4, 24], "modifier");
      define2("inverse", [7, 27], "modifier");
      define2("hidden", [8, 28], "modifier");
      define2("strikethrough", [9, 29], "modifier");
      define2("black", [30, 39], "color");
      define2("red", [31, 39], "color");
      define2("green", [32, 39], "color");
      define2("yellow", [33, 39], "color");
      define2("blue", [34, 39], "color");
      define2("magenta", [35, 39], "color");
      define2("cyan", [36, 39], "color");
      define2("white", [37, 39], "color");
      define2("gray", [90, 39], "color");
      define2("grey", [90, 39], "color");
      define2("bgBlack", [40, 49], "bg");
      define2("bgRed", [41, 49], "bg");
      define2("bgGreen", [42, 49], "bg");
      define2("bgYellow", [43, 49], "bg");
      define2("bgBlue", [44, 49], "bg");
      define2("bgMagenta", [45, 49], "bg");
      define2("bgCyan", [46, 49], "bg");
      define2("bgWhite", [47, 49], "bg");
      define2("blackBright", [90, 39], "bright");
      define2("redBright", [91, 39], "bright");
      define2("greenBright", [92, 39], "bright");
      define2("yellowBright", [93, 39], "bright");
      define2("blueBright", [94, 39], "bright");
      define2("magentaBright", [95, 39], "bright");
      define2("cyanBright", [96, 39], "bright");
      define2("whiteBright", [97, 39], "bright");
      define2("bgBlackBright", [100, 49], "bgBright");
      define2("bgRedBright", [101, 49], "bgBright");
      define2("bgGreenBright", [102, 49], "bgBright");
      define2("bgYellowBright", [103, 49], "bgBright");
      define2("bgBlueBright", [104, 49], "bgBright");
      define2("bgMagentaBright", [105, 49], "bgBright");
      define2("bgCyanBright", [106, 49], "bgBright");
      define2("bgWhiteBright", [107, 49], "bgBright");
      colors2.ansiRegex = ANSI_REGEX;
      colors2.hasColor = colors2.hasAnsi = (str) => {
        colors2.ansiRegex.lastIndex = 0;
        return typeof str === "string" && str !== "" && colors2.ansiRegex.test(str);
      };
      colors2.alias = (name, color) => {
        let fn = typeof color === "string" ? colors2[color] : color;
        if (typeof fn !== "function") {
          throw new TypeError("Expected alias to be the name of an existing color (string) or a function");
        }
        if (!fn.stack) {
          Reflect.defineProperty(fn, "name", { value: name });
          colors2.styles[name] = fn;
          fn.stack = [name];
        }
        Reflect.defineProperty(colors2, name, {
          configurable: true,
          enumerable: true,
          set(value) {
            colors2.alias(name, value);
          },
          get() {
            let color2 = (input) => style(input, color2.stack);
            Reflect.setPrototypeOf(color2, colors2);
            color2.stack = this.stack ? this.stack.concat(fn.stack) : fn.stack;
            return color2;
          }
        });
      };
      colors2.theme = (custom) => {
        if (!isObject(custom))
          throw new TypeError("Expected theme to be an object");
        for (let name of Object.keys(custom)) {
          colors2.alias(name, custom[name]);
        }
        return colors2;
      };
      colors2.alias("unstyle", (str) => {
        if (typeof str === "string" && str !== "") {
          colors2.ansiRegex.lastIndex = 0;
          return str.replace(colors2.ansiRegex, "");
        }
        return "";
      });
      colors2.alias("noop", (str) => str);
      colors2.none = colors2.clear = colors2.noop;
      colors2.stripColor = colors2.unstyle;
      colors2.symbols = require_symbols();
      colors2.define = define2;
      return colors2;
    };
    module.exports = create();
    module.exports.create = create;
  }
});
var LogConstants = class {
};
__publicField32(LogConstants, "LOG_LEVEL_KEY", "VITE_LOG_LEVEL");
__publicField32(LogConstants, "LOG_PREFIX_KEY", "VITE_LOG_PREFIX");
var LogLevelEnum = /* @__PURE__ */ ((LogLevelEnum2) => {
  LogLevelEnum2["LOG_LEVEL_TRACE"] = "TRACE";
  LogLevelEnum2["LOG_LEVEL_DEBUG"] = "DEBUG";
  LogLevelEnum2["LOG_LEVEL_INFO"] = "INFO";
  LogLevelEnum2["LOG_LEVEL_WARN"] = "WARN";
  LogLevelEnum2["LOG_LEVEL_ERROR"] = "ERROR";
  return LogLevelEnum2;
})(LogLevelEnum || {});
var logConstants_default = LogLevelEnum;
var import_loglevel = __toESM2(require_loglevel(), 1);
var import_loglevel_plugin_prefix = __toESM2(require_loglevel_plugin_prefix(), 1);
function callsites() {
  const _prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack2) => stack2;
  const stack = new Error().stack.slice(1);
  Error.prepareStackTrace = _prepareStackTrace;
  return stack;
}
var EnvHelper = class {
  /**
   * 解析日志级别为枚举
   *
   * @param enumObj - 枚举对象
   * @param value - 配置的值
   */
  static stringToEnumValue(enumObj, value) {
    return enumObj[Object.keys(enumObj).filter((k) => enumObj[k].toString() === value)[0]];
  }
  /**
   * 获取配置的日志级别
   */
  static getEnvLevel(env) {
    if (!env) {
      return void 0;
    }
    const envValue = env.getEnvOrDefault(LogConstants.LOG_LEVEL_KEY, logConstants_default.LOG_LEVEL_INFO);
    const envLevel = EnvHelper.stringToEnumValue(logConstants_default, envValue.toUpperCase());
    if (!envLevel) {
      console.warn(
        "[zhi-log] LOG_LEVEL is invalid in you .env file.It must be either debug, info, warn or error, fallback to default info level"
      );
    }
    return envLevel;
  }
  /**
   * 获取默认日志
   */
  static getEnvLogger(env) {
    return !env ? void 0 : env.getEnv(LogConstants.LOG_PREFIX_KEY);
  }
};
var envHelper_default = EnvHelper;
var import_ansi_colors = __toESM2(require_ansi_colors(), 1);
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY),
  // modifiers
  reset: init(0, 0),
  bold: init(1, 22),
  dim: init(2, 22),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  // colors
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  grey: init(90, 39),
  // background colors
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49)
};
function run(arr, str) {
  let i = 0, tmp, beg = "", end = "";
  for (; i < arr.length; i++) {
    tmp = arr[i];
    beg += tmp.open;
    end += tmp.close;
    if (!!~str.indexOf(tmp.close)) {
      str = str.replace(tmp.rgx, tmp.close + tmp.open);
    }
  }
  return beg + str + end;
}
function chain(has, keys) {
  let ctx = { has, keys };
  ctx.reset = $.reset.bind(ctx);
  ctx.bold = $.bold.bind(ctx);
  ctx.dim = $.dim.bind(ctx);
  ctx.italic = $.italic.bind(ctx);
  ctx.underline = $.underline.bind(ctx);
  ctx.inverse = $.inverse.bind(ctx);
  ctx.hidden = $.hidden.bind(ctx);
  ctx.strikethrough = $.strikethrough.bind(ctx);
  ctx.black = $.black.bind(ctx);
  ctx.red = $.red.bind(ctx);
  ctx.green = $.green.bind(ctx);
  ctx.yellow = $.yellow.bind(ctx);
  ctx.blue = $.blue.bind(ctx);
  ctx.magenta = $.magenta.bind(ctx);
  ctx.cyan = $.cyan.bind(ctx);
  ctx.white = $.white.bind(ctx);
  ctx.gray = $.gray.bind(ctx);
  ctx.grey = $.grey.bind(ctx);
  ctx.bgBlack = $.bgBlack.bind(ctx);
  ctx.bgRed = $.bgRed.bind(ctx);
  ctx.bgGreen = $.bgGreen.bind(ctx);
  ctx.bgYellow = $.bgYellow.bind(ctx);
  ctx.bgBlue = $.bgBlue.bind(ctx);
  ctx.bgMagenta = $.bgMagenta.bind(ctx);
  ctx.bgCyan = $.bgCyan.bind(ctx);
  ctx.bgWhite = $.bgWhite.bind(ctx);
  return ctx;
}
function init(open, close) {
  let blk = {
    open: `\x1B[${open}m`,
    close: `\x1B[${close}m`,
    rgx: new RegExp(`\\x1b\\[${close}m`, "g")
  };
  return function(txt) {
    if (this !== void 0 && this.has !== void 0) {
      !!~this.has.indexOf(open) || (this.has.push(open), this.keys.push(blk));
      return txt === void 0 ? this : $.enabled ? run(this.keys, txt + "") : txt + "";
    }
    return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt + "") : txt + "";
  };
}
var kleur_default = $;
var __defProp222 = Object.defineProperty;
var __defNormalProp222 = (obj, key, value) => key in obj ? __defProp222(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require222 = /* @__PURE__ */ ((x) => typeof __require22 !== "undefined" ? __require22 : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require22 !== "undefined" ? __require22 : a)[b]
}) : x)(function(x) {
  if (typeof __require22 !== "undefined")
    return __require22.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __publicField222 = (obj, key, value) => {
  __defNormalProp222(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _BrowserUtil2 = class {
  /**
   * 检测是否运行在Chrome插件中
   */
  static isInChromeExtension() {
    if (!_BrowserUtil2.isInBrowser) {
      return false;
    }
    return window.location.href.indexOf("chrome-extension://") > -1;
  }
};
var BrowserUtil2 = _BrowserUtil2;
__publicField222(BrowserUtil2, "isNode", typeof process !== "undefined");
__publicField222(BrowserUtil2, "isInBrowser", typeof window !== "undefined");
__publicField222(BrowserUtil2, "BrowserSeperator", "/");
__publicField222(BrowserUtil2, "isElectron", () => {
  if (!_BrowserUtil2.isInBrowser || !window.navigator || !window.navigator.userAgent) {
    return false;
  }
  return /Electron/.test(window.navigator.userAgent);
});
__publicField222(BrowserUtil2, "hasNodeEnv", () => {
  return _BrowserUtil2.isElectron() || _BrowserUtil2.isNode;
});
__publicField222(BrowserUtil2, "getQueryString", (sParam) => {
  if (!_BrowserUtil2.isInBrowser) {
    return "";
  }
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split("&");
  for (let i = 0; i < sURLVariables.length; i++) {
    const sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
  return "";
});
__publicField222(BrowserUtil2, "replaceUrlParam", (url, paramName, paramValue) => {
  if (paramValue == null) {
    paramValue = "";
  }
  const pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)");
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, "$1" + paramValue + "$2");
  }
  const [baseUrl, hash] = url.split("#");
  const [path, query] = baseUrl.split("?");
  const params = new URLSearchParams(query);
  params.set(paramName, paramValue);
  const newQuery = params.toString();
  const newBaseUrl = path + (newQuery ? "?" + newQuery : "");
  return hash ? newBaseUrl + "#" + hash : newBaseUrl;
});
__publicField222(BrowserUtil2, "setUrlParameter", (urlstring, key, value) => {
  if (urlstring.includes(key)) {
    return _BrowserUtil2.replaceUrlParam(urlstring, key, value);
  }
  const hasharr = urlstring.split("#");
  let url = hasharr[0];
  const hash = hasharr[1];
  if (url.includes("?")) {
    url += `&${key}=${value}`;
  } else {
    url += `?${key}=${value}`;
  }
  if (hash) {
    url += "#" + hash;
  }
  return url;
});
__publicField222(BrowserUtil2, "reloadTabPage", (tabname, t = 200) => {
  setTimeout(function() {
    if (_BrowserUtil2.isInBrowser) {
      const url = window.location.href;
      window.location.href = _BrowserUtil2.setUrlParameter(url, "tab", tabname);
    }
  }, t);
});
__publicField222(BrowserUtil2, "reloadPage", () => {
  setTimeout(function() {
    if (_BrowserUtil2.isInBrowser) {
      window.location.reload();
    }
  }, 200);
});
__publicField222(BrowserUtil2, "reloadPageWithMessageCallback", (msg, cb) => {
  if (cb) {
    cb();
  }
  setTimeout(function() {
    if (_BrowserUtil2.isInBrowser) {
      window.location.reload();
    }
  }, 200);
});
var browserUtil_default2 = BrowserUtil2;
var BasePathTypeEnum2 = /* @__PURE__ */ ((BasePathTypeEnum22) => {
  BasePathTypeEnum22["BasePathType_Appearance"] = "Appearance";
  BasePathTypeEnum22["BasePathType_Data"] = "Data";
  BasePathTypeEnum22["BasePathType_Themes"] = "Themes";
  BasePathTypeEnum22["BasePathType_ZhiTheme"] = "ZhiTheme";
  BasePathTypeEnum22["BasePathType_None"] = "None";
  return BasePathTypeEnum22;
})(BasePathTypeEnum2 || {});
var basePathTypeEnum_default2 = BasePathTypeEnum2;
var _SiyuanDevice2 = class {
  /**
   * 检测是否运行在思源打开的浏览器中
   */
  static isInSiyuanBrowser() {
    if (!browserUtil_default2.isInBrowser) {
      return false;
    }
    return typeof window.siyuan !== "undefined" && typeof window.Lute !== "undefined";
  }
  /**
   * 思源笔记 window 对象
   */
  static siyuanWindow() {
    let win;
    if (this.isInSiyuanWidget()) {
      win = parent.window;
    } else {
      if (this.isInSiyuanNewWin()) {
        win = window;
      } else if (this.isInSiyuanBrowser()) {
        win = window;
      } else if (typeof window !== "undefined") {
        win = window;
      } else {
        win = void 0;
      }
    }
    return win;
  }
  // =========================
  // require end
  // =========================
  // =========================
  // import start
  // =========================
  /**
   * 引入json
   *
   * @param jsPath - js相对路径全路径
   * @param type - 类型
   */
  static async importJs(jsPath, type) {
    let fullJsonPath = jsPath;
    switch (type) {
      case basePathTypeEnum_default2.BasePathType_Appearance:
        fullJsonPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsPath);
        break;
      case basePathTypeEnum_default2.BasePathType_Data:
        fullJsonPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsPath);
        break;
      case basePathTypeEnum_default2.BasePathType_Themes:
        fullJsonPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsPath);
        break;
      case basePathTypeEnum_default2.BasePathType_ZhiTheme:
        fullJsonPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsPath);
        break;
      default:
        throw new Error("type must be provided");
    }
    const { default: data } = await import(
      /* @vite-ignore */
      fullJsonPath
    );
    return data;
  }
  /**
   * 引入json
   *
   * @param jsonPath - json相对路径全路径
   * @param type - 类型
   */
  static async importJson(jsonPath, type) {
    let fullJsonPath = jsonPath;
    switch (type) {
      case basePathTypeEnum_default2.BasePathType_Appearance:
        fullJsonPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsonPath);
        break;
      case basePathTypeEnum_default2.BasePathType_Data:
        fullJsonPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsonPath);
        break;
      case basePathTypeEnum_default2.BasePathType_Themes:
        fullJsonPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsonPath);
        break;
      case basePathTypeEnum_default2.BasePathType_ZhiTheme:
        fullJsonPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsonPath);
        break;
      default:
        throw new Error("type must be provided");
    }
    const { default: data } = await import(
      /* @vite-ignore */
      fullJsonPath,
      { assert: { type: "json" } }
    );
    return data;
  }
  /**
   * 引入 json - 以 data 为基本路径
   *
   * @param jsonPath - 相对于 data 的相对路径
   */
  static async importDataJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default2.BasePathType_Data);
  }
  /**
   * 引入 json - 以 appearance 为基本路径
   *
   * @param jsonPath - 相对于 appearance 的相对路径
   */
  static async importAppearanceJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default2.BasePathType_Appearance);
  }
  /**
   * 引入 json - 以 themes 为基本路径
   *
   * @param jsonPath - 相对于 themes 的相对路径
   */
  static async importThemesJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default2.BasePathType_Themes);
  }
  /**
   * 引入 zhi 主题的 json - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsonPath - 相对于 zhi 主题根路径的相对路径
   */
  static async importZhiThemeJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default2.BasePathType_ZhiTheme);
  }
  /**
   * 引入 zhi 主题的 js - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsPath - 相对于 zhi 主题根路径的相对路径
   */
  static async importZhiThemeJs(jsPath) {
    return await this.importJs(jsPath, basePathTypeEnum_default2.BasePathType_ZhiTheme);
  }
  // =========================
  // import start
  // =========================
  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  static joinPath(...paths) {
    if (browserUtil_default2.hasNodeEnv()) {
      const path = this.requireLib("path");
      if (path) {
        return path.join(...paths);
      }
    }
    return this.browserJoinPath(...paths);
  }
  static browserJoinPath(...paths) {
    return paths.join(browserUtil_default2.BrowserSeperator);
  }
  /**
   * 思源笔记 conf 目录
   */
  static siyuanConfPath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
    return syWin.siyuan.config.system.confDir;
  }
  /**
   * 思源笔记 data 目录
   */
  static siyuanDataPath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
    return syWin.siyuan.config.system.dataDir;
  }
  /**
   * 思源笔记 data 目录-相对路径
   */
  static siyuanDataRelativePath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
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
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
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
    if (browserUtil_default2.hasNodeEnv()) {
      return this.joinPath(this.siyuanAppearancePath(), "themes");
    } else {
      const syWin = this.siyuanWindow();
      if (!syWin) {
        throw new Error("Not in siyuan env");
      }
      return this.joinPath(syWin.location.origin, "appearance", "themes");
    }
  }
  /**
   * 思源笔记 themes 目录-相对路径
   */
  static siyuanThemeRelativePath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
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
};
var SiyuanDevice2 = _SiyuanDevice2;
__publicField222(SiyuanDevice2, "isInSiyuanWidget", () => {
  if (!browserUtil_default2.isInBrowser) {
    return false;
  }
  return window.frameElement != null && window.frameElement.parentElement != null && window.frameElement.parentElement.parentElement != null && window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== "";
});
__publicField222(SiyuanDevice2, "isInSiyuanNewWin", () => {
  if (!browserUtil_default2.isInBrowser) {
    return false;
  }
  if (!browserUtil_default2.isElectron()) {
    return false;
  }
  return typeof window.terwer !== "undefined" || typeof window.siyuanNewWin !== "undefined";
});
__publicField222(SiyuanDevice2, "requireLib", (libpath, abs = true, type = basePathTypeEnum_default2.BasePathType_None) => {
  if (!browserUtil_default2.hasNodeEnv()) {
    throw new Error("require ony works on node env");
  }
  let absLibpath = libpath;
  if (!abs) {
    switch (type) {
      case basePathTypeEnum_default2.BasePathType_Appearance:
        absLibpath = _SiyuanDevice2.joinPath(_SiyuanDevice2.siyuanAppearancePath(), libpath);
        break;
      case basePathTypeEnum_default2.BasePathType_Data:
        absLibpath = _SiyuanDevice2.joinPath(_SiyuanDevice2.siyuanDataPath(), libpath);
        break;
      case basePathTypeEnum_default2.BasePathType_Themes:
        absLibpath = _SiyuanDevice2.joinPath(_SiyuanDevice2.siyuanAppearancePath(), "themes", libpath);
        break;
      case basePathTypeEnum_default2.BasePathType_ZhiTheme:
        absLibpath = _SiyuanDevice2.joinPath(_SiyuanDevice2.siyuanAppearancePath(), "themes", "zhi", libpath);
        break;
      default:
        throw new Error("type must be provided when not use absolute path");
    }
  }
  const syWin = _SiyuanDevice2.siyuanWindow();
  if (!syWin) {
    return __require222(absLibpath);
  }
  if (typeof syWin.require !== "undefined") {
    return syWin.require(absLibpath);
  }
  return void 0;
});
__publicField222(SiyuanDevice2, "requireAppearanceLib", (libpath) => {
  return _SiyuanDevice2.requireLib(libpath, false, basePathTypeEnum_default2.BasePathType_Appearance);
});
__publicField222(SiyuanDevice2, "requireDataLib", (libpath) => {
  return _SiyuanDevice2.requireLib(libpath, false, basePathTypeEnum_default2.BasePathType_Data);
});
__publicField222(SiyuanDevice2, "requireThemesLib", (libpath) => {
  return _SiyuanDevice2.requireLib(libpath, false, basePathTypeEnum_default2.BasePathType_Themes);
});
__publicField222(SiyuanDevice2, "requireZhiThemeLib", (libpath) => {
  return _SiyuanDevice2.requireLib(libpath, false, basePathTypeEnum_default2.BasePathType_ZhiTheme);
});
var crossChalk = {
  white: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.whiteBright(str) : kleur_default.white(str);
  },
  gray: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.gray(str) : kleur_default.gray(str);
  },
  blue: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.blue(str) : kleur_default.blue(str);
  },
  green: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.green(str) : kleur_default.green(str);
  },
  yellow: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.yellow(str) : kleur_default.yellow(str);
  },
  red: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.red(str) : kleur_default.red(str);
  },
  bgWhite: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.bgWhiteBright(str) : kleur_default.bgWhite(str);
  },
  bgGrey: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.bgCyanBright(str) : kleur_default.bgCyan(str);
  },
  bgBlue: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.bgBlueBright(str) : kleur_default.bgBlue(str);
  },
  bgGreen: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.bgGreenBright(str) : kleur_default.bgGreen(str);
  },
  bgYellow: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.bgYellowBright(str) : kleur_default.bgYellow(str);
  },
  bgRed: (str) => {
    return browserUtil_default2.isElectron() ? import_ansi_colors.default.bgRedBright(str) : kleur_default.bgRed(str);
  }
};
var crossChalk_default = crossChalk;
var Logger = class {
  consoleLogger = "console";
  stackSize = 1;
  /**
   * 设置输出栈的深度，默认1
   *
   * @param stackSize - 栈的深度
   */
  setStackSize(stackSize) {
    this.stackSize = stackSize ?? 1;
  }
  constructor(level, sign, env) {
    this.stackSize = 1;
    let customLevel = void 0;
    if (level) {
      customLevel = level;
    } else {
      customLevel = envHelper_default.getEnvLevel(env);
    }
    customLevel = customLevel ?? logConstants_default.LOG_LEVEL_INFO;
    import_loglevel.default.setLevel(customLevel);
    const fmtLog = (level2, name, timestamp, colorFn) => {
      const strarr = [];
      const logSign = sign ?? envHelper_default.getEnvLogger(env) ?? "zhi";
      strarr.push(crossChalk_default.gray("[") + colorFn(logSign) + crossChalk_default.gray("]"));
      strarr.push(crossChalk_default.gray("[") + crossChalk_default.gray(timestamp.toString()) + crossChalk_default.gray("]"));
      strarr.push(colorFn(level2.toUpperCase().toString()));
      strarr.push(colorFn(name));
      strarr.push(crossChalk_default.gray(":"));
      return strarr;
    };
    import_loglevel_plugin_prefix.default.reg(import_loglevel.default);
    import_loglevel_plugin_prefix.default.apply(import_loglevel.default, {
      format(level2, name, timestamp) {
        let strarr = [];
        const logName = name ?? "";
        switch (level2) {
          case logConstants_default.LOG_LEVEL_TRACE:
            strarr = fmtLog(level2, logName, timestamp, crossChalk_default.gray);
            break;
          case logConstants_default.LOG_LEVEL_DEBUG:
            strarr = fmtLog(level2, logName, timestamp, crossChalk_default.blue);
            break;
          case logConstants_default.LOG_LEVEL_INFO:
            strarr = fmtLog(level2, logName, timestamp, crossChalk_default.green);
            break;
          case logConstants_default.LOG_LEVEL_WARN:
            strarr = fmtLog(level2, logName, timestamp, crossChalk_default.yellow);
            break;
          case logConstants_default.LOG_LEVEL_ERROR:
            strarr = fmtLog(level2, logName, timestamp, crossChalk_default.red);
            break;
          default:
            strarr = fmtLog(logConstants_default.LOG_LEVEL_INFO, logName, timestamp, crossChalk_default.green);
            break;
        }
        return strarr.join(" ");
      }
    });
  }
  /**
   * 获取调用堆栈，若未获取到直接返回空数组
   *
   * @author terwer
   * @since 1.6.0
   */
  getCallStack() {
    let cs;
    try {
      cs = callsites();
    } catch (e) {
      cs = [];
    }
    return cs;
  }
  /**
   * 获取日志记录器
   *
   * @param loggerName - 日志记录器，默认为 console
   * @author terwer
   * @since 1.0.0
   */
  getLogger = (loggerName) => {
    let loggerFrom;
    if (loggerName) {
      loggerFrom = loggerName;
    } else {
      const allcs = this.getCallStack();
      const baseNames = [];
      const cs = [];
      for (let i = 0; i < allcs.length; i++) {
        const c = allcs[i];
        const fname = c.getFileName() ?? "none";
        if (i > this.stackSize - 1) {
          break;
        }
        const baseName = fname + "-" + c.getLineNumber() + ":" + c.getColumnNumber();
        baseNames.push(baseName);
      }
      if (cs.length > 0) {
        loggerFrom = baseNames.join(" -> ");
      }
    }
    if (!loggerFrom || loggerFrom.trim().length === 0) {
      loggerFrom = this.consoleLogger;
    }
    return import_loglevel.default.getLogger(loggerFrom);
  };
};
var logger_default = Logger;
var AbstractLogFactory = class {
  logger;
  /**
   * 默认日志级别
   *
   * @param level - 可选，未设置默认INFO
   * @param sign - 可选前缀，默认zhi
   * @param env - 可选环境变量实例
   */
  constructor(level, sign, env) {
    this.logger = new logger_default(level, sign, env);
  }
  /**
   * 获取日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   * @protected
   */
  getLogger(loggerName, stackSize) {
    this.logger.setStackSize(stackSize);
    return this.logger.getLogger(loggerName);
  }
};
var abstractLogFactory_default = AbstractLogFactory;
var CustomLogFactory = class extends abstractLogFactory_default {
  constructor(level, sign, env) {
    super(level, sign, env);
  }
  /**
   * 获取默认的日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   */
  getLogger(loggerName, stackSize) {
    return super.getLogger(loggerName, stackSize);
  }
};
var customLogFactory_default = CustomLogFactory;
var LogFactory = class {
  /**
   * 默认日志记录器
   *
   * @param stackSize - 栈的深度
   * @param env - 环境变量实例
   */
  static defaultLogger(env, stackSize) {
    return LogFactory.customLogFactory(void 0, void 0, env).getLogger(void 0, stackSize);
  }
  /**
   * 自定义日志工厂
   *
   * @param level - 级别
   * @param sign - 标志
   * @param env - 环境变量
   */
  static customLogFactory(level, sign, env) {
    return new customLogFactory_default(level, sign, env);
  }
  /**
   * 自定义日志工厂，自定义前缀
   *
   * @param sign - 标志
   * @param env - 环境变量
   */
  static customSignLogFactory(sign, env) {
    return new customLogFactory_default(void 0, sign, env);
  }
};
var src_default22 = LogFactory;
var DEFAULT_LOG_SIGN = "zhi";
var ZhiUtil = class {
  /**
   * 某些情况下，可能需要手动 init 之后才能用
   */
  static initEnv(env) {
    this.env = env;
  }
  /**
   * 获取 zhi-env 实例 - 必须在使用的时候重写此方法
   *
   * ```
   * if (!this.env) {
   *   this.env = new Env(import.meta.env)
   * }
   * return this.env
   * ```
   *
   * @see {@link https://github.com/terwer/zhi/tree/main/apps/zhi-env#usage docs for zhi-env usage}
   */
  static zhiEnv() {
    throw new Error("Method 'zhiEnv' must be implemented");
  }
  /**
   * 获取 zhi-log 实例
   *
   * @param sign - 标志
   * @param loggerName - 日志名称
   */
  static zhiLogWithSign(sign, loggerName) {
    if (this.loggerMap[loggerName]) {
      this.loggerMap[loggerName].debug("Zhi-log use cache");
      return this.loggerMap[loggerName];
    }
    const env = this.env;
    const logger = src_default22.customSignLogFactory(sign, env).getLogger(loggerName);
    this.loggerMap[loggerName] = logger;
    logger.debug("Zhi-log add new logger");
    return logger;
  }
  /**
   * 获取 zhi-log 实例
   *
   * @param loggerName - 日志名称
   */
  static zhiLog(loggerName) {
    return this.zhiLogWithSign(DEFAULT_LOG_SIGN, loggerName);
  }
  /**
   * 获取 zhi-common 实例
   */
  static zhiCommon() {
    if (!this.common) {
      this.common = new zhi_common_default();
    }
    return this.common;
  }
};
__publicField3(ZhiUtil, "env");
__publicField3(ZhiUtil, "loggerMap", {});
__publicField3(ZhiUtil, "common");
var ZhiUtil_default = ZhiUtil;
var ZhiCommonUtil = class extends ZhiUtil_default {
  static zhiEnv() {
    if (!this.env) {
      this.env = new src_default2(define_import_meta_env_default);
    }
    return this.env;
  }
};
var ZhiCommonUtil_default = ZhiCommonUtil;
var LuteAdaptor = class {
  logger;
  constructor() {
    this.logger = ZhiCommonUtil_default.zhiLog("lute-adaptor");
    if (Lute) {
      this.logger.debug("Detected Lute is bundled, will use!");
    } else {
      this.logger.debug("Lute is not available!");
    }
  }
  isAvailable() {
    return typeof Lute !== "undefined";
  }
  /**
   * 高亮关键字
   *
   * @param str - 字符串
   * @private
   */
  highlightWords(str) {
    const regex = /(?<=^|[\s\S])==([^\n]+?)==(?=($|[\s\S]))/g;
    return str.replace(regex, '<span class="mark">$1</span>');
  }
  /**
   * 渲染Markdown
   *
   * @param md - Markdown
   */
  async renderMarkdownStr(md) {
    if (!this.isAvailable()) {
      this.logger.error("Lute is not available, will return original md");
      return md;
    }
    const luteObj = Lute;
    const lute = luteObj.New();
    const renderers = {
      renderText: (node, entering) => {
        if (entering) {
          const renderedText = this.highlightWords(node.Text());
          return [renderedText, luteObj.WalkContinue];
        }
        return ["", luteObj.WalkContinue];
      }
      // renderStrong: (node: any, entering: any) => {
      //     return ["", luteObj.WalkContinue]
      // },
      // renderParagraph: (node: any, entering: any) => {
      //     return ["", luteObj.WalkContinue]
      // }
    };
    lute.SetJSRenderers({
      renderers: {
        Md2HTML: renderers
      }
    });
    this.logger.info("Lute is rendering md to HTML...");
    return lute.MarkdownStr("", md);
  }
};
var LuteAdaptor_default = LuteAdaptor;
var import_showdown = __toESM(require_showdown(), 1);
var ShowdownAdaptor = class {
  logger;
  converter;
  constructor() {
    this.logger = ZhiCommonUtil_default.zhiLog("showdown-adaptor");
    this.converter = new import_showdown.default.Converter();
  }
  isAvailable() {
    return typeof import_showdown.default !== "undefined";
  }
  renderMarkdownStr(md) {
    if (!this.isAvailable()) {
      throw new Error("Showdown is not available");
    }
    this.logger.info("Showdown is rendering md to HTML...");
    return Promise.resolve(this.converter.makeHtml(md));
  }
};
var ShowdownAdaptor_default = ShowdownAdaptor;
var MarkdownUtil = class {
  logger;
  mdAdaptor = new ShowdownAdaptor_default();
  constructor() {
    this.logger = ZhiCommonUtil_default.zhiLog("markdown-util");
  }
  /**
   * 获取当前 MD 解析器名称
   */
  getCurrentAdaptorName() {
    if (this.mdAdaptor instanceof LuteAdaptor_default) {
      return "Lute";
    } else if (this.mdAdaptor instanceof ShowdownAdaptor_default) {
      return "Showdown";
    }
    return "None";
  }
  /**
   * 渲染Markdown
   *
   * @param md - Markdown文本
   */
  async renderHTML(md) {
    const luteNew = new LuteAdaptor_default();
    this.logger.debug("Lute status =>", luteNew.isAvailable());
    if (luteNew.isAvailable()) {
      this.mdAdaptor = luteNew;
    }
    this.logger.info(`Using ${this.getCurrentAdaptorName()} as markdown renderer`);
    return await this.mdAdaptor.renderMarkdownStr(md);
  }
};
var markdownUtil_default = MarkdownUtil;
var HtmlUtil = class {
  mdUtil;
  constructor() {
    this.mdUtil = new markdownUtil_default();
  }
  /**
   * 移除标题数字
   *
   * @param str - 字符串
   */
  removeTitleNumber(str) {
    let newstr = str;
    const publisherRegex = /([0-9]*)\./;
    newstr = newstr.replace(publisherRegex, "");
    return newstr;
  }
  /**
   * 删除挂件的HTML
   *
   * @param str - 原字符
   */
  removeWidgetTag(str) {
    let newstr = str.toString();
    const publisherRegex = /<iframe.*src="\/widgets\/publisher.*<\/iframe>/g;
    newstr = newstr.replace(publisherRegex, "");
    const syPublisherRegex = /<iframe.*src="\/widgets\/sy-post-publisher.*<\/iframe>/g;
    newstr = newstr.replace(syPublisherRegex, "");
    const noteAttrRegex = /<iframe.*\/widgets\/Note*\sAttrs.*\/iframe>/g;
    newstr = newstr.replace(noteAttrRegex, "");
    return newstr;
  }
  /**
   * 删除Markdown文本的挂件的HTML
   *
   * @param str - 原字符
   */
  removeMdWidgetTag(str) {
    let newstr = str.toString();
    newstr = this.removeWidgetTag(newstr);
    return newstr;
  }
  /**
   * 去除html标签，残缺不全也可以
   *
   * @param str - 字符串
   */
  filterHtml(str) {
    str = str.replace(/<style((.|\n|\r)*?)<\/style>/g, "");
    str = str.replace(/<script((.|\n|\r)*?)<\/script>/g, "");
    str = str.replace(/<[^>]*>/g, "");
    str = str.replace(/&.*;/g, "");
    str = str.replace(/(^\s*)|(\s*$)/g, "");
    str = str.replace(/</g, "").replace(/>/g, "");
    str = str.replace(/"/g, "").replace(/'/g, "");
    str = str.replace(/\*/g, "");
    str = str.replace(/\$/g, "");
    str = str.replace(/\./g, "");
    str = str.replace(/\+/g, "");
    str = str.replace(/\s+/g, "");
    str = str.replace(/[:|：]/g, "_");
    str = str.replace(/[;|；]/g, "_");
    str = str.replace(/\^/g, "_");
    str = str.replace(/!/g, "_");
    str = str.replace(/@/g, "at_");
    const excludeWords = ["\\d*/\\d/\\d*", "[\u3001|\\\\]", "[\uFF0C|,]", "\\d", "/", "-"];
    for (let i = 0; i < excludeWords.length; i++) {
      const regex = new RegExp(excludeWords[i], "g");
      str = str.replace(regex, "");
    }
    str = str.toLowerCase();
    return str;
  }
  /**
   * 截取指定长度html
   *
   * @param html - html
   * @param length - 长度
   * @param ignore - 不要结尾省略号
   */
  parseHtml(html, length, ignore) {
    const allText = this.filterHtml(html);
    if (allText.length < length) {
      return allText;
    }
    if (ignore === true) {
      return allText.substring(0, length);
    }
    return allText.substring(0, length) + "...";
  }
  /**
   * 将Markdown转换为HTML
   *
   * @param md - Markdown
   */
  async mdToHtml(md) {
    const html = await this.mdUtil.renderHTML(md);
    return this.removeWidgetTag(html);
  }
  /**
   * 将Markdown转换为纯文本
   *
   * @param md - Markdown
   */
  async mdToPlainText(md) {
    const html = await this.mdToHtml(md);
    return this.filterHtml(html);
  }
  /**
   * 移除H1标签
   *
   * @param html - html
   */
  removeH1(html) {
    let newstr = html;
    const h1Regex = /<h1.*\/h1>/g;
    newstr = newstr.replace(h1Regex, "");
    return newstr;
  }
  /**
   * 移除Markdown里面的H1标签
   *
   * JavaScript 正则表达式可以用来删除所有 Markdown 中的 h1 标签。下面是一个示例代码：
   *
   * const str = "# This is an H1\n## This is an H2\n### This is an H3";
   *
   * const regex = /^# .*$/gm;
   * const result = str.replace(regex, '');
   *
   * console.log(result);
   * 在这个例子中，我们使用正则表达式 /^# .*$/gm 来匹配所有的 h1 标签。
   * 在 JavaScript 中，^ 匹配行首，# 匹配 # 字符，.* 匹配任意字符，$ 匹配行尾，m 标记表示多行模式。
   */
  removeMdH1(md) {
    let newstr = md;
    const mdH1Regex = /^# .*$/gm;
    newstr = newstr.replace(mdH1Regex, "");
    return newstr;
  }
};
var htmlUtil_default = HtmlUtil;
var ObjectUtil = class {
  /**
   * 检测是否是空对象
   *
   * @param obj - 对象
   */
  isEmptyObject(obj) {
    if (!obj) {
      return true;
    }
    return Object.getPrototypeOf(obj) === Object.prototype && Object.getOwnPropertyNames(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0;
  }
};
var objectUtil_default = ObjectUtil;
var ZhiCommon = class {
  dateUtil;
  strUtil;
  versionUtil;
  htmlUtil;
  markdownUtil;
  jsonUtil;
  objectUtil;
  constructor() {
    this.dateUtil = new dateUtil_default();
    this.strUtil = new strUtil_default();
    this.versionUtil = new versionUtil_default();
    this.htmlUtil = new htmlUtil_default();
    this.markdownUtil = new markdownUtil_default();
    this.jsonUtil = new jsonUtil_default();
    this.objectUtil = new objectUtil_default();
  }
};
var zhi_common_default = ZhiCommon;

// ../zhi-env/dist/index.js
var __defProp4 = Object.defineProperty;
var __defNormalProp4 = (obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField4 = (obj, key, value) => {
  __defNormalProp4(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var EnvConstants2 = class {
};
__publicField4(EnvConstants2, "NODE_ENV_KEY", "NODE_ENV");
__publicField4(EnvConstants2, "NODE_ENV_DEVELOPMENT", "development");
__publicField4(EnvConstants2, "NODE_ENV_PRODUCTION", "production");
__publicField4(EnvConstants2, "NODE_ENV_TEST", "test");
__publicField4(EnvConstants2, "VITE_DEBUG_MODE_KEY", "VITE_DEBUG_MODE");
var EnvConstants_default2 = EnvConstants2;
var Env2 = class {
  envMeta;
  /**
   * 是否是开发阶段调试
   */
  isNodeDev() {
    return this.getEnv(EnvConstants_default2.NODE_ENV_KEY) === EnvConstants_default2.NODE_ENV_DEVELOPMENT;
  }
  /**
   * 是否是调试阶段
   */
  isDev() {
    return this.isNodeDev() || this.getBooleanEnv(EnvConstants_default2.VITE_DEBUG_MODE_KEY);
  }
  /**
   * 环境初始化
   *
   * @param envMeta - 需要传入 import.meta.env 。特别提醒：此参数是静态元数据，取决于最终使用的项目。因此仅仅在最终使用的地方显示传递此值，中间项目请保持参数传递
   * @see {@link https://vitejs.dev/guide/env-and-mode.html#production-replacement}
   */
  constructor(envMeta) {
    this.envMeta = envMeta;
  }
  /**
   * 获取环境变量，key不存在返回undefined
   * @param key - key
   */
  getEnv(key) {
    let env;
    try {
      if (this.envMeta[key]) {
        env = this.envMeta[key];
      }
    } catch (e) {
    }
    return env;
  }
  /**
   * 获取String类型的环境变量，key不存在直接返回空值
   * @param key - key
   */
  getStringEnv(key) {
    return this.getEnv(key) ?? "";
  }
  /**
   * 获取Boolean类型的环境变量，key不存在返回false
   * @param key - key
   */
  getBooleanEnv(key) {
    let env = false;
    if (this.getEnv(key)) {
      env = this.getStringEnv(key).toLowerCase() === "true";
    }
    return env;
  }
  /**
   * 获取环境变量，如果未定义或者为空值，用指定的默认值代替
   *
   * @param key - key
   * @param defaultValue - 默认值
   * @since 0.1.0
   * @author terwer
   */
  getEnvOrDefault(key, defaultValue) {
    const value = this.getStringEnv(key);
    if (value.trim().length == 0) {
      return defaultValue;
    }
    return value;
  }
};
var zhi_env_default2 = Env2;
var src_default3 = zhi_env_default2;

// src/theme/core/util/ZhiCoreUtil.ts
var ZhiCoreUtil = class extends ZhiUtil_default {
  static zhiEnv() {
    if (!this.env) {
      this.env = new src_default3(define_import_meta_env_default);
    }
    return this.env;
  }
};
var ZhiCoreUtil_default = ZhiCoreUtil;

// src/theme/models/DependencyItem.ts
var DependencyItem = class {
  /**
   * 依赖库相对路径
   */
  libpath;
  baseType;
  /**
   * 格式
   */
  format;
  /**
   * 引入方式
   */
  importType;
  /**
   * 支持的设备列表
   */
  runAs;
  /**
   * 加载属性，数组越越靠前
   */
  order;
  constructor() {
    this.libpath = "";
    this.baseType = basePathTypeEnum_default.BasePathType_ZhiTheme;
    this.format = "cjs";
    this.importType = "require";
    this.runAs = [deviceTypeEnum_default.DeviceType_Siyuan_MainWin, deviceTypeEnum_default.DeviceType_Node];
    this.order = 0;
  }
  /**
   * 将 json 转换为 DependencyItem
   * @param jsonObj
   */
  fromJson(jsonObj) {
    this.libpath = jsonObj.libpath;
    if ("baseType" in jsonObj) {
      this.baseType = jsonObj.baseType;
    }
    if ("format" in jsonObj) {
      this.format = jsonObj.format;
    }
    if ("importType" in jsonObj) {
      this.importType = jsonObj.importType;
    }
    if ("runAs" in jsonObj) {
      if (Array.isArray(jsonObj.runAs)) {
        this.runAs = jsonObj.runAs.map((item) => {
          if (Object.values(deviceTypeEnum_default).includes(item)) {
            return item;
          } else {
            throw new Error(`fromJson: "${item}" is not a valid 'DeviceTypeEnum' value.`);
          }
        });
      } else {
        throw new Error(`fromJson: "runAs" is not an array.`);
      }
    }
    if ("order" in jsonObj) {
      this.order = jsonObj.order;
    }
  }
};
var DependencyItem_default = DependencyItem;

// src/theme/core/lifecycle.ts
var Lifecycle = class {
  logger;
  common;
  ZHI_JSON_SCHEMA = "zhi-schema.json";
  ZHI_JSON = "zhi.json";
  constructor() {
    this.logger = ZhiCoreUtil_default.zhiLog("lifecycle");
    this.common = ZhiCoreUtil_default.zhiCommon();
  }
  /**
   * 加载依赖，核心加载顺序按照下面描述的顺序加载，内部的加载顺序由 order 字段决定，
   * 所有依赖定义在主题根目录的 `zhi.json`
   *
   * ```
   * 加载顺序如下：
   * 1 核心模块-require-hacker、infra、browser-window、插件系统、内部插件
   * 2 后端模块
   * 3 前端模块
   * 4 第三方库
   * ```
   */
  async load() {
    const allImports = [];
    const zhiSchema = await siyuanDevice_default.importZhiThemeJson(this.ZHI_JSON_SCHEMA);
    const zhiJson = await siyuanDevice_default.importZhiThemeJson(this.ZHI_JSON);
    this.logger.debug("zhiSchema=>", zhiSchema);
    this.logger.debug("zhiJson=>", zhiJson);
    const valiResult = this.common.jsonUtil.validateObjectSchema(zhiSchema, zhiJson);
    if (!valiResult.valid) {
      throw new Error(
        `${this.ZHI_JSON} is not valid, error msg: ${valiResult.error ?? "None"}, please check ${this.ZHI_JSON_SCHEMA}`
      );
    } else {
      this.logger.info(`Success, ${this.ZHI_JSON} is ok`);
    }
    const cores = zhiJson.dependencies.core;
    const coreModuleImports = await this.loadCoreModules(cores);
    const servers = zhiJson.dependencies.server;
    const backendImports = await this.loadBackendModules(servers);
    const webs = zhiJson.dependencies.web;
    const frontendImports = await this.loadFrontendModules(webs);
    const vendors = zhiJson.dependencies.vendor;
    const vendorImports = await this.loadVendors(vendors);
    return allImports.concat(coreModuleImports).concat(backendImports).concat(frontendImports).concat(vendorImports);
  }
  /**
   * 加载核心模块
   *
   * @private
   */
  async loadCoreModules(deps) {
    const coreModulesImports = deps.map((dep) => {
      const dependency = new DependencyItem_default();
      dependency.fromJson(dep);
      return dependency;
    });
    this.logger.info(`Registered ${coreModulesImports.length} Core modules`);
    return coreModulesImports;
  }
  /**
   * 加载后端模块
   *
   * @private
   */
  async loadBackendModules(deps) {
    const backendModulesImports = deps.map((dep) => {
      const dependency = new DependencyItem_default();
      dependency.fromJson(dep);
      return dependency;
    });
    this.logger.info(`Registered ${backendModulesImports.length} Backend modules`);
    return backendModulesImports;
  }
  /**
   * 加载前端模块
   *
   * @private
   */
  async loadFrontendModules(deps) {
    const frontendModulesImports = deps.map((dep) => {
      const dependency = new DependencyItem_default();
      dependency.fromJson(dep);
      return dependency;
    });
    this.logger.info(`Registered ${frontendModulesImports.length} Frontend modules`);
    return frontendModulesImports;
  }
  /**
   * 加载第三方库
   *
   * @private
   */
  async loadVendors(deps) {
    const vendorImports = deps.map((dep) => {
      const dependency = new DependencyItem_default();
      dependency.fromJson(dep);
      return dependency;
    });
    this.logger.info(`Registered ${vendorImports.length} Vendors`);
    return vendorImports;
  }
};
var lifecycle_default = Lifecycle;

// src/theme/core/Bootstrap.ts
var Bootstrap = class {
  /**
   * 主题激活
   */
  static async start() {
    return await this.lifecycle.load();
  }
};
__publicField(Bootstrap, "lifecycle", new lifecycle_default());
var Bootstrap_default = Bootstrap;

// ../zhi-log/dist/index.js
var __create3 = Object.create;
var __defProp5 = Object.defineProperty;
var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames3 = Object.getOwnPropertyNames;
var __getProtoOf3 = Object.getPrototypeOf;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __defNormalProp5 = (obj, key, value) => key in obj ? __defProp5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require4 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
}) : x)(function(x) {
  if (typeof __require !== "undefined")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS3 = (cb, mod) => function __require32() {
  return mod || (0, cb[__getOwnPropNames3(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps3 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames3(from))
      if (!__hasOwnProp3.call(to, key) && key !== except)
        __defProp5(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc3(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM3 = (mod, isNodeMode, target) => (target = mod != null ? __create3(__getProtoOf3(mod)) : {}, __copyProps3(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp5(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField5 = (obj, key, value) => {
  __defNormalProp5(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var require_loglevel2 = __commonJS3({
  "../../node_modules/.pnpm/registry.npmjs.org+loglevel@1.8.1/node_modules/loglevel/lib/loglevel.js"(exports, module) {
    (function(root, definition) {
      "use strict";
      if (typeof define === "function" && define.amd) {
        define(definition);
      } else if (typeof module === "object" && module.exports) {
        module.exports = definition();
      } else {
        root.log = definition();
      }
    })(exports, function() {
      "use strict";
      var noop = function() {
      };
      var undefinedType = "undefined";
      var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
      var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
      ];
      function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === "function") {
          return method.bind(obj);
        } else {
          try {
            return Function.prototype.bind.call(method, obj);
          } catch (e) {
            return function() {
              return Function.prototype.apply.apply(method, [obj, arguments]);
            };
          }
        }
      }
      function traceForIE() {
        if (console.log) {
          if (console.log.apply) {
            console.log.apply(console, arguments);
          } else {
            Function.prototype.apply.apply(console.log, [console, arguments]);
          }
        }
        if (console.trace)
          console.trace();
      }
      function realMethod(methodName) {
        if (methodName === "debug") {
          methodName = "log";
        }
        if (typeof console === undefinedType) {
          return false;
        } else if (methodName === "trace" && isIE) {
          return traceForIE;
        } else if (console[methodName] !== void 0) {
          return bindMethod(console, methodName);
        } else if (console.log !== void 0) {
          return bindMethod(console, "log");
        } else {
          return noop;
        }
      }
      function replaceLoggingMethods(level, loggerName) {
        for (var i = 0; i < logMethods.length; i++) {
          var methodName = logMethods[i];
          this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
        }
        this.log = this.debug;
      }
      function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function() {
          if (typeof console !== undefinedType) {
            replaceLoggingMethods.call(this, level, loggerName);
            this[methodName].apply(this, arguments);
          }
        };
      }
      function defaultMethodFactory(methodName, level, loggerName) {
        return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
      }
      function Logger2(name, defaultLevel, factory) {
        var self = this;
        var currentLevel;
        defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;
        var storageKey = "loglevel";
        if (typeof name === "string") {
          storageKey += ":" + name;
        } else if (typeof name === "symbol") {
          storageKey = void 0;
        }
        function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || "silent").toUpperCase();
          if (typeof window === undefinedType || !storageKey)
            return;
          try {
            window.localStorage[storageKey] = levelName;
            return;
          } catch (ignore) {
          }
          try {
            window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {
          }
        }
        function getPersistedLevel() {
          var storedLevel;
          if (typeof window === undefinedType || !storageKey)
            return;
          try {
            storedLevel = window.localStorage[storageKey];
          } catch (ignore) {
          }
          if (typeof storedLevel === undefinedType) {
            try {
              var cookie = window.document.cookie;
              var location = cookie.indexOf(
                encodeURIComponent(storageKey) + "="
              );
              if (location !== -1) {
                storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
              }
            } catch (ignore) {
            }
          }
          if (self.levels[storedLevel] === void 0) {
            storedLevel = void 0;
          }
          return storedLevel;
        }
        function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey)
            return;
          try {
            window.localStorage.removeItem(storageKey);
            return;
          } catch (ignore) {
          }
          try {
            window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {
          }
        }
        self.name = name;
        self.levels = {
          "TRACE": 0,
          "DEBUG": 1,
          "INFO": 2,
          "WARN": 3,
          "ERROR": 4,
          "SILENT": 5
        };
        self.methodFactory = factory || defaultMethodFactory;
        self.getLevel = function() {
          return currentLevel;
        };
        self.setLevel = function(level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== void 0) {
            level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
            currentLevel = level;
            if (persist !== false) {
              persistLevelIfPossible(level);
            }
            replaceLoggingMethods.call(self, level, name);
            if (typeof console === undefinedType && level < self.levels.SILENT) {
              return "No console available for logging";
            }
          } else {
            throw "log.setLevel() called with invalid level: " + level;
          }
        };
        self.setDefaultLevel = function(level) {
          defaultLevel = level;
          if (!getPersistedLevel()) {
            self.setLevel(level, false);
          }
        };
        self.resetLevel = function() {
          self.setLevel(defaultLevel, false);
          clearPersistedLevel();
        };
        self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
        };
        self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
        };
        var initialLevel = getPersistedLevel();
        if (initialLevel == null) {
          initialLevel = defaultLevel;
        }
        self.setLevel(initialLevel, false);
      }
      var defaultLogger = new Logger2();
      var _loggersByName = {};
      defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }
        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger2(
            name,
            defaultLogger.getLevel(),
            defaultLogger.methodFactory
          );
        }
        return logger;
      };
      var _log = typeof window !== undefinedType ? window.log : void 0;
      defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType && window.log === defaultLogger) {
          window.log = _log;
        }
        return defaultLogger;
      };
      defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
      };
      defaultLogger["default"] = defaultLogger;
      return defaultLogger;
    });
  }
});
var require_loglevel_plugin_prefix2 = __commonJS3({
  "../../node_modules/.pnpm/registry.npmjs.org+loglevel-plugin-prefix@0.8.4/node_modules/loglevel-plugin-prefix/lib/loglevel-plugin-prefix.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
      } else {
        root.prefix = factory(root);
      }
    })(exports, function(root) {
      "use strict";
      var merge = function(target) {
        var i = 1;
        var length = arguments.length;
        var key;
        for (; i < length; i++) {
          for (key in arguments[i]) {
            if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
              target[key] = arguments[i][key];
            }
          }
        }
        return target;
      };
      var defaults = {
        template: "[%t] %l:",
        levelFormatter: function(level) {
          return level.toUpperCase();
        },
        nameFormatter: function(name) {
          return name || "root";
        },
        timestampFormatter: function(date) {
          return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        },
        format: void 0
      };
      var loglevel2;
      var configs = {};
      var reg = function(rootLogger) {
        if (!rootLogger || !rootLogger.getLogger) {
          throw new TypeError("Argument is not a root logger");
        }
        loglevel2 = rootLogger;
      };
      var apply = function(logger, config) {
        if (!logger || !logger.setLevel) {
          throw new TypeError("Argument is not a logger");
        }
        var originalFactory = logger.methodFactory;
        var name = logger.name || "";
        var parent2 = configs[name] || configs[""] || defaults;
        function methodFactory(methodName, logLevel, loggerName) {
          var originalMethod = originalFactory(methodName, logLevel, loggerName);
          var options = configs[loggerName] || configs[""];
          var hasTimestamp = options.template.indexOf("%t") !== -1;
          var hasLevel = options.template.indexOf("%l") !== -1;
          var hasName = options.template.indexOf("%n") !== -1;
          return function() {
            var content = "";
            var length = arguments.length;
            var args = Array(length);
            var key = 0;
            for (; key < length; key++) {
              args[key] = arguments[key];
            }
            if (name || !configs[loggerName]) {
              var timestamp = options.timestampFormatter(/* @__PURE__ */ new Date());
              var level = options.levelFormatter(methodName);
              var lname = options.nameFormatter(loggerName);
              if (options.format) {
                content += options.format(level, lname, timestamp);
              } else {
                content += options.template;
                if (hasTimestamp) {
                  content = content.replace(/%t/, timestamp);
                }
                if (hasLevel)
                  content = content.replace(/%l/, level);
                if (hasName)
                  content = content.replace(/%n/, lname);
              }
              if (args.length && typeof args[0] === "string") {
                args[0] = content + " " + args[0];
              } else {
                args.unshift(content);
              }
            }
            originalMethod.apply(void 0, args);
          };
        }
        if (!configs[name]) {
          logger.methodFactory = methodFactory;
        }
        config = config || {};
        if (config.template)
          config.format = void 0;
        configs[name] = merge({}, parent2, config);
        logger.setLevel(logger.getLevel());
        if (!loglevel2) {
          logger.warn(
            "It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"
          );
        }
        return logger;
      };
      var api = {
        reg,
        apply
      };
      var save;
      if (root) {
        save = root.prefix;
        api.noConflict = function() {
          if (root.prefix === api) {
            root.prefix = save;
          }
          return api;
        };
      }
      return api;
    });
  }
});
var require_symbols2 = __commonJS3({
  "../../node_modules/.pnpm/registry.npmjs.org+ansi-colors@4.1.3/node_modules/ansi-colors/symbols.js"(exports, module) {
    "use strict";
    var isHyper = typeof process !== "undefined" && process.env.TERM_PROGRAM === "Hyper";
    var isWindows = typeof process !== "undefined" && process.platform === "win32";
    var isLinux = typeof process !== "undefined" && process.platform === "linux";
    var common = {
      ballotDisabled: "\u2612",
      ballotOff: "\u2610",
      ballotOn: "\u2611",
      bullet: "\u2022",
      bulletWhite: "\u25E6",
      fullBlock: "\u2588",
      heart: "\u2764",
      identicalTo: "\u2261",
      line: "\u2500",
      mark: "\u203B",
      middot: "\xB7",
      minus: "\uFF0D",
      multiplication: "\xD7",
      obelus: "\xF7",
      pencilDownRight: "\u270E",
      pencilRight: "\u270F",
      pencilUpRight: "\u2710",
      percent: "%",
      pilcrow2: "\u2761",
      pilcrow: "\xB6",
      plusMinus: "\xB1",
      question: "?",
      section: "\xA7",
      starsOff: "\u2606",
      starsOn: "\u2605",
      upDownArrow: "\u2195"
    };
    var windows = Object.assign({}, common, {
      check: "\u221A",
      cross: "\xD7",
      ellipsisLarge: "...",
      ellipsis: "...",
      info: "i",
      questionSmall: "?",
      pointer: ">",
      pointerSmall: "\xBB",
      radioOff: "( )",
      radioOn: "(*)",
      warning: "\u203C"
    });
    var other = Object.assign({}, common, {
      ballotCross: "\u2718",
      check: "\u2714",
      cross: "\u2716",
      ellipsisLarge: "\u22EF",
      ellipsis: "\u2026",
      info: "\u2139",
      questionFull: "\uFF1F",
      questionSmall: "\uFE56",
      pointer: isLinux ? "\u25B8" : "\u276F",
      pointerSmall: isLinux ? "\u2023" : "\u203A",
      radioOff: "\u25EF",
      radioOn: "\u25C9",
      warning: "\u26A0"
    });
    module.exports = isWindows && !isHyper ? windows : other;
    Reflect.defineProperty(module.exports, "common", { enumerable: false, value: common });
    Reflect.defineProperty(module.exports, "windows", { enumerable: false, value: windows });
    Reflect.defineProperty(module.exports, "other", { enumerable: false, value: other });
  }
});
var require_ansi_colors2 = __commonJS3({
  "../../node_modules/.pnpm/registry.npmjs.org+ansi-colors@4.1.3/node_modules/ansi-colors/index.js"(exports, module) {
    "use strict";
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;
    var hasColor = () => {
      if (typeof process !== "undefined") {
        return process.env.FORCE_COLOR !== "0";
      }
      return false;
    };
    var create = () => {
      const colors2 = {
        enabled: hasColor(),
        visible: true,
        styles: {},
        keys: {}
      };
      const ansi = (style2) => {
        let open = style2.open = `\x1B[${style2.codes[0]}m`;
        let close = style2.close = `\x1B[${style2.codes[1]}m`;
        let regex = style2.regex = new RegExp(`\\u001b\\[${style2.codes[1]}m`, "g");
        style2.wrap = (input, newline) => {
          if (input.includes(close))
            input = input.replace(regex, close + open);
          let output = open + input + close;
          return newline ? output.replace(/\r*\n/g, `${close}$&${open}`) : output;
        };
        return style2;
      };
      const wrap = (style2, input, newline) => {
        return typeof style2 === "function" ? style2(input) : style2.wrap(input, newline);
      };
      const style = (input, stack) => {
        if (input === "" || input == null)
          return "";
        if (colors2.enabled === false)
          return input;
        if (colors2.visible === false)
          return "";
        let str = "" + input;
        let nl = str.includes("\n");
        let n = stack.length;
        if (n > 0 && stack.includes("unstyle")) {
          stack = [.../* @__PURE__ */ new Set(["unstyle", ...stack])].reverse();
        }
        while (n-- > 0)
          str = wrap(colors2.styles[stack[n]], str, nl);
        return str;
      };
      const define2 = (name, codes, type) => {
        colors2.styles[name] = ansi({ name, codes });
        let keys = colors2.keys[type] || (colors2.keys[type] = []);
        keys.push(name);
        Reflect.defineProperty(colors2, name, {
          configurable: true,
          enumerable: true,
          set(value) {
            colors2.alias(name, value);
          },
          get() {
            let color = (input) => style(input, color.stack);
            Reflect.setPrototypeOf(color, colors2);
            color.stack = this.stack ? this.stack.concat(name) : [name];
            return color;
          }
        });
      };
      define2("reset", [0, 0], "modifier");
      define2("bold", [1, 22], "modifier");
      define2("dim", [2, 22], "modifier");
      define2("italic", [3, 23], "modifier");
      define2("underline", [4, 24], "modifier");
      define2("inverse", [7, 27], "modifier");
      define2("hidden", [8, 28], "modifier");
      define2("strikethrough", [9, 29], "modifier");
      define2("black", [30, 39], "color");
      define2("red", [31, 39], "color");
      define2("green", [32, 39], "color");
      define2("yellow", [33, 39], "color");
      define2("blue", [34, 39], "color");
      define2("magenta", [35, 39], "color");
      define2("cyan", [36, 39], "color");
      define2("white", [37, 39], "color");
      define2("gray", [90, 39], "color");
      define2("grey", [90, 39], "color");
      define2("bgBlack", [40, 49], "bg");
      define2("bgRed", [41, 49], "bg");
      define2("bgGreen", [42, 49], "bg");
      define2("bgYellow", [43, 49], "bg");
      define2("bgBlue", [44, 49], "bg");
      define2("bgMagenta", [45, 49], "bg");
      define2("bgCyan", [46, 49], "bg");
      define2("bgWhite", [47, 49], "bg");
      define2("blackBright", [90, 39], "bright");
      define2("redBright", [91, 39], "bright");
      define2("greenBright", [92, 39], "bright");
      define2("yellowBright", [93, 39], "bright");
      define2("blueBright", [94, 39], "bright");
      define2("magentaBright", [95, 39], "bright");
      define2("cyanBright", [96, 39], "bright");
      define2("whiteBright", [97, 39], "bright");
      define2("bgBlackBright", [100, 49], "bgBright");
      define2("bgRedBright", [101, 49], "bgBright");
      define2("bgGreenBright", [102, 49], "bgBright");
      define2("bgYellowBright", [103, 49], "bgBright");
      define2("bgBlueBright", [104, 49], "bgBright");
      define2("bgMagentaBright", [105, 49], "bgBright");
      define2("bgCyanBright", [106, 49], "bgBright");
      define2("bgWhiteBright", [107, 49], "bgBright");
      colors2.ansiRegex = ANSI_REGEX;
      colors2.hasColor = colors2.hasAnsi = (str) => {
        colors2.ansiRegex.lastIndex = 0;
        return typeof str === "string" && str !== "" && colors2.ansiRegex.test(str);
      };
      colors2.alias = (name, color) => {
        let fn = typeof color === "string" ? colors2[color] : color;
        if (typeof fn !== "function") {
          throw new TypeError("Expected alias to be the name of an existing color (string) or a function");
        }
        if (!fn.stack) {
          Reflect.defineProperty(fn, "name", { value: name });
          colors2.styles[name] = fn;
          fn.stack = [name];
        }
        Reflect.defineProperty(colors2, name, {
          configurable: true,
          enumerable: true,
          set(value) {
            colors2.alias(name, value);
          },
          get() {
            let color2 = (input) => style(input, color2.stack);
            Reflect.setPrototypeOf(color2, colors2);
            color2.stack = this.stack ? this.stack.concat(fn.stack) : fn.stack;
            return color2;
          }
        });
      };
      colors2.theme = (custom) => {
        if (!isObject(custom))
          throw new TypeError("Expected theme to be an object");
        for (let name of Object.keys(custom)) {
          colors2.alias(name, custom[name]);
        }
        return colors2;
      };
      colors2.alias("unstyle", (str) => {
        if (typeof str === "string" && str !== "") {
          colors2.ansiRegex.lastIndex = 0;
          return str.replace(colors2.ansiRegex, "");
        }
        return "";
      });
      colors2.alias("noop", (str) => str);
      colors2.none = colors2.clear = colors2.noop;
      colors2.stripColor = colors2.unstyle;
      colors2.symbols = require_symbols2();
      colors2.define = define2;
      return colors2;
    };
    module.exports = create();
    module.exports.create = create;
  }
});
var LogConstants2 = class {
};
__publicField5(LogConstants2, "LOG_LEVEL_KEY", "VITE_LOG_LEVEL");
__publicField5(LogConstants2, "LOG_PREFIX_KEY", "VITE_LOG_PREFIX");
var import_loglevel2 = __toESM3(require_loglevel2(), 1);
var import_loglevel_plugin_prefix2 = __toESM3(require_loglevel_plugin_prefix2(), 1);
var import_ansi_colors2 = __toESM3(require_ansi_colors2(), 1);
var FORCE_COLOR2;
var NODE_DISABLE_COLORS2;
var NO_COLOR2;
var TERM2;
var isTTY2 = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR: FORCE_COLOR2, NODE_DISABLE_COLORS: NODE_DISABLE_COLORS2, NO_COLOR: NO_COLOR2, TERM: TERM2 } = process.env || {});
  isTTY2 = process.stdout && process.stdout.isTTY;
}
var $2 = {
  enabled: !NODE_DISABLE_COLORS2 && NO_COLOR2 == null && TERM2 !== "dumb" && (FORCE_COLOR2 != null && FORCE_COLOR2 !== "0" || isTTY2),
  // modifiers
  reset: init2(0, 0),
  bold: init2(1, 22),
  dim: init2(2, 22),
  italic: init2(3, 23),
  underline: init2(4, 24),
  inverse: init2(7, 27),
  hidden: init2(8, 28),
  strikethrough: init2(9, 29),
  // colors
  black: init2(30, 39),
  red: init2(31, 39),
  green: init2(32, 39),
  yellow: init2(33, 39),
  blue: init2(34, 39),
  magenta: init2(35, 39),
  cyan: init2(36, 39),
  white: init2(37, 39),
  gray: init2(90, 39),
  grey: init2(90, 39),
  // background colors
  bgBlack: init2(40, 49),
  bgRed: init2(41, 49),
  bgGreen: init2(42, 49),
  bgYellow: init2(43, 49),
  bgBlue: init2(44, 49),
  bgMagenta: init2(45, 49),
  bgCyan: init2(46, 49),
  bgWhite: init2(47, 49)
};
function run2(arr, str) {
  let i = 0, tmp, beg = "", end = "";
  for (; i < arr.length; i++) {
    tmp = arr[i];
    beg += tmp.open;
    end += tmp.close;
    if (!!~str.indexOf(tmp.close)) {
      str = str.replace(tmp.rgx, tmp.close + tmp.open);
    }
  }
  return beg + str + end;
}
function chain2(has, keys) {
  let ctx = { has, keys };
  ctx.reset = $2.reset.bind(ctx);
  ctx.bold = $2.bold.bind(ctx);
  ctx.dim = $2.dim.bind(ctx);
  ctx.italic = $2.italic.bind(ctx);
  ctx.underline = $2.underline.bind(ctx);
  ctx.inverse = $2.inverse.bind(ctx);
  ctx.hidden = $2.hidden.bind(ctx);
  ctx.strikethrough = $2.strikethrough.bind(ctx);
  ctx.black = $2.black.bind(ctx);
  ctx.red = $2.red.bind(ctx);
  ctx.green = $2.green.bind(ctx);
  ctx.yellow = $2.yellow.bind(ctx);
  ctx.blue = $2.blue.bind(ctx);
  ctx.magenta = $2.magenta.bind(ctx);
  ctx.cyan = $2.cyan.bind(ctx);
  ctx.white = $2.white.bind(ctx);
  ctx.gray = $2.gray.bind(ctx);
  ctx.grey = $2.grey.bind(ctx);
  ctx.bgBlack = $2.bgBlack.bind(ctx);
  ctx.bgRed = $2.bgRed.bind(ctx);
  ctx.bgGreen = $2.bgGreen.bind(ctx);
  ctx.bgYellow = $2.bgYellow.bind(ctx);
  ctx.bgBlue = $2.bgBlue.bind(ctx);
  ctx.bgMagenta = $2.bgMagenta.bind(ctx);
  ctx.bgCyan = $2.bgCyan.bind(ctx);
  ctx.bgWhite = $2.bgWhite.bind(ctx);
  return ctx;
}
function init2(open, close) {
  let blk = {
    open: `\x1B[${open}m`,
    close: `\x1B[${close}m`,
    rgx: new RegExp(`\\x1b\\[${close}m`, "g")
  };
  return function(txt) {
    if (this !== void 0 && this.has !== void 0) {
      !!~this.has.indexOf(open) || (this.has.push(open), this.keys.push(blk));
      return txt === void 0 ? this : $2.enabled ? run2(this.keys, txt + "") : txt + "";
    }
    return txt === void 0 ? chain2([open], [blk]) : $2.enabled ? run2([blk], txt + "") : txt + "";
  };
}
var kleur_default2 = $2;
var __defProp23 = Object.defineProperty;
var __defNormalProp23 = (obj, key, value) => key in obj ? __defProp23(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require23 = /* @__PURE__ */ ((x) => typeof __require4 !== "undefined" ? __require4 : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require4 !== "undefined" ? __require4 : a)[b]
}) : x)(function(x) {
  if (typeof __require4 !== "undefined")
    return __require4.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __publicField23 = (obj, key, value) => {
  __defNormalProp23(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _BrowserUtil3 = class {
  /**
   * 检测是否运行在Chrome插件中
   */
  static isInChromeExtension() {
    if (!_BrowserUtil3.isInBrowser) {
      return false;
    }
    return window.location.href.indexOf("chrome-extension://") > -1;
  }
};
var BrowserUtil3 = _BrowserUtil3;
__publicField23(BrowserUtil3, "isNode", typeof process !== "undefined");
__publicField23(BrowserUtil3, "isInBrowser", typeof window !== "undefined");
__publicField23(BrowserUtil3, "BrowserSeperator", "/");
__publicField23(BrowserUtil3, "isElectron", () => {
  if (!_BrowserUtil3.isInBrowser || !window.navigator || !window.navigator.userAgent) {
    return false;
  }
  return /Electron/.test(window.navigator.userAgent);
});
__publicField23(BrowserUtil3, "hasNodeEnv", () => {
  return _BrowserUtil3.isElectron() || _BrowserUtil3.isNode;
});
__publicField23(BrowserUtil3, "getQueryString", (sParam) => {
  if (!_BrowserUtil3.isInBrowser) {
    return "";
  }
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split("&");
  for (let i = 0; i < sURLVariables.length; i++) {
    const sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
  return "";
});
__publicField23(BrowserUtil3, "replaceUrlParam", (url, paramName, paramValue) => {
  if (paramValue == null) {
    paramValue = "";
  }
  const pattern = new RegExp("\\b(" + paramName + "=).*?(&|#|$)");
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, "$1" + paramValue + "$2");
  }
  const [baseUrl, hash] = url.split("#");
  const [path, query] = baseUrl.split("?");
  const params = new URLSearchParams(query);
  params.set(paramName, paramValue);
  const newQuery = params.toString();
  const newBaseUrl = path + (newQuery ? "?" + newQuery : "");
  return hash ? newBaseUrl + "#" + hash : newBaseUrl;
});
__publicField23(BrowserUtil3, "setUrlParameter", (urlstring, key, value) => {
  if (urlstring.includes(key)) {
    return _BrowserUtil3.replaceUrlParam(urlstring, key, value);
  }
  const hasharr = urlstring.split("#");
  let url = hasharr[0];
  const hash = hasharr[1];
  if (url.includes("?")) {
    url += `&${key}=${value}`;
  } else {
    url += `?${key}=${value}`;
  }
  if (hash) {
    url += "#" + hash;
  }
  return url;
});
__publicField23(BrowserUtil3, "reloadTabPage", (tabname, t = 200) => {
  setTimeout(function() {
    if (_BrowserUtil3.isInBrowser) {
      const url = window.location.href;
      window.location.href = _BrowserUtil3.setUrlParameter(url, "tab", tabname);
    }
  }, t);
});
__publicField23(BrowserUtil3, "reloadPage", () => {
  setTimeout(function() {
    if (_BrowserUtil3.isInBrowser) {
      window.location.reload();
    }
  }, 200);
});
__publicField23(BrowserUtil3, "reloadPageWithMessageCallback", (msg, cb) => {
  if (cb) {
    cb();
  }
  setTimeout(function() {
    if (_BrowserUtil3.isInBrowser) {
      window.location.reload();
    }
  }, 200);
});
var browserUtil_default3 = BrowserUtil3;
var BasePathTypeEnum3 = /* @__PURE__ */ ((BasePathTypeEnum22) => {
  BasePathTypeEnum22["BasePathType_Appearance"] = "Appearance";
  BasePathTypeEnum22["BasePathType_Data"] = "Data";
  BasePathTypeEnum22["BasePathType_Themes"] = "Themes";
  BasePathTypeEnum22["BasePathType_ZhiTheme"] = "ZhiTheme";
  BasePathTypeEnum22["BasePathType_None"] = "None";
  return BasePathTypeEnum22;
})(BasePathTypeEnum3 || {});
var basePathTypeEnum_default3 = BasePathTypeEnum3;
var _SiyuanDevice3 = class {
  /**
   * 检测是否运行在思源打开的浏览器中
   */
  static isInSiyuanBrowser() {
    if (!browserUtil_default3.isInBrowser) {
      return false;
    }
    return typeof window.siyuan !== "undefined" && typeof window.Lute !== "undefined";
  }
  /**
   * 思源笔记 window 对象
   */
  static siyuanWindow() {
    let win;
    if (this.isInSiyuanWidget()) {
      win = parent.window;
    } else {
      if (this.isInSiyuanNewWin()) {
        win = window;
      } else if (this.isInSiyuanBrowser()) {
        win = window;
      } else if (typeof window !== "undefined") {
        win = window;
      } else {
        win = void 0;
      }
    }
    return win;
  }
  // =========================
  // require end
  // =========================
  // =========================
  // import start
  // =========================
  /**
   * 引入json
   *
   * @param jsPath - js相对路径全路径
   * @param type - 类型
   */
  static async importJs(jsPath, type) {
    let fullJsonPath = jsPath;
    switch (type) {
      case basePathTypeEnum_default3.BasePathType_Appearance:
        fullJsonPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsPath);
        break;
      case basePathTypeEnum_default3.BasePathType_Data:
        fullJsonPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsPath);
        break;
      case basePathTypeEnum_default3.BasePathType_Themes:
        fullJsonPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsPath);
        break;
      case basePathTypeEnum_default3.BasePathType_ZhiTheme:
        fullJsonPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsPath);
        break;
      default:
        throw new Error("type must be provided");
    }
    const { default: data } = await import(
      /* @vite-ignore */
      fullJsonPath
    );
    return data;
  }
  /**
   * 引入json
   *
   * @param jsonPath - json相对路径全路径
   * @param type - 类型
   */
  static async importJson(jsonPath, type) {
    let fullJsonPath = jsonPath;
    switch (type) {
      case basePathTypeEnum_default3.BasePathType_Appearance:
        fullJsonPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsonPath);
        break;
      case basePathTypeEnum_default3.BasePathType_Data:
        fullJsonPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsonPath);
        break;
      case basePathTypeEnum_default3.BasePathType_Themes:
        fullJsonPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsonPath);
        break;
      case basePathTypeEnum_default3.BasePathType_ZhiTheme:
        fullJsonPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsonPath);
        break;
      default:
        throw new Error("type must be provided");
    }
    const { default: data } = await import(
      /* @vite-ignore */
      fullJsonPath,
      { assert: { type: "json" } }
    );
    return data;
  }
  /**
   * 引入 json - 以 data 为基本路径
   *
   * @param jsonPath - 相对于 data 的相对路径
   */
  static async importDataJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default3.BasePathType_Data);
  }
  /**
   * 引入 json - 以 appearance 为基本路径
   *
   * @param jsonPath - 相对于 appearance 的相对路径
   */
  static async importAppearanceJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default3.BasePathType_Appearance);
  }
  /**
   * 引入 json - 以 themes 为基本路径
   *
   * @param jsonPath - 相对于 themes 的相对路径
   */
  static async importThemesJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default3.BasePathType_Themes);
  }
  /**
   * 引入 zhi 主题的 json - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsonPath - 相对于 zhi 主题根路径的相对路径
   */
  static async importZhiThemeJson(jsonPath) {
    return await this.importJson(jsonPath, basePathTypeEnum_default3.BasePathType_ZhiTheme);
  }
  /**
   * 引入 zhi 主题的 js - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsPath - 相对于 zhi 主题根路径的相对路径
   */
  static async importZhiThemeJs(jsPath) {
    return await this.importJs(jsPath, basePathTypeEnum_default3.BasePathType_ZhiTheme);
  }
  // =========================
  // import start
  // =========================
  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  static joinPath(...paths) {
    if (browserUtil_default3.hasNodeEnv()) {
      const path = this.requireLib("path");
      if (path) {
        return path.join(...paths);
      }
    }
    return this.browserJoinPath(...paths);
  }
  static browserJoinPath(...paths) {
    return paths.join(browserUtil_default3.BrowserSeperator);
  }
  /**
   * 思源笔记 conf 目录
   */
  static siyuanConfPath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
    return syWin.siyuan.config.system.confDir;
  }
  /**
   * 思源笔记 data 目录
   */
  static siyuanDataPath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
    return syWin.siyuan.config.system.dataDir;
  }
  /**
   * 思源笔记 data 目录-相对路径
   */
  static siyuanDataRelativePath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
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
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
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
    if (browserUtil_default3.hasNodeEnv()) {
      return this.joinPath(this.siyuanAppearancePath(), "themes");
    } else {
      const syWin = this.siyuanWindow();
      if (!syWin) {
        throw new Error("Not in siyuan env");
      }
      return this.joinPath(syWin.location.origin, "appearance", "themes");
    }
  }
  /**
   * 思源笔记 themes 目录-相对路径
   */
  static siyuanThemeRelativePath() {
    const syWin = this.siyuanWindow();
    if (!syWin) {
      throw new Error("Not in siyuan env");
    }
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
};
var SiyuanDevice3 = _SiyuanDevice3;
__publicField23(SiyuanDevice3, "isInSiyuanWidget", () => {
  if (!browserUtil_default3.isInBrowser) {
    return false;
  }
  return window.frameElement != null && window.frameElement.parentElement != null && window.frameElement.parentElement.parentElement != null && window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== "";
});
__publicField23(SiyuanDevice3, "isInSiyuanNewWin", () => {
  if (!browserUtil_default3.isInBrowser) {
    return false;
  }
  if (!browserUtil_default3.isElectron()) {
    return false;
  }
  return typeof window.terwer !== "undefined" || typeof window.siyuanNewWin !== "undefined";
});
__publicField23(SiyuanDevice3, "requireLib", (libpath, abs = true, type = basePathTypeEnum_default3.BasePathType_None) => {
  if (!browserUtil_default3.hasNodeEnv()) {
    throw new Error("require ony works on node env");
  }
  let absLibpath = libpath;
  if (!abs) {
    switch (type) {
      case basePathTypeEnum_default3.BasePathType_Appearance:
        absLibpath = _SiyuanDevice3.joinPath(_SiyuanDevice3.siyuanAppearancePath(), libpath);
        break;
      case basePathTypeEnum_default3.BasePathType_Data:
        absLibpath = _SiyuanDevice3.joinPath(_SiyuanDevice3.siyuanDataPath(), libpath);
        break;
      case basePathTypeEnum_default3.BasePathType_Themes:
        absLibpath = _SiyuanDevice3.joinPath(_SiyuanDevice3.siyuanAppearancePath(), "themes", libpath);
        break;
      case basePathTypeEnum_default3.BasePathType_ZhiTheme:
        absLibpath = _SiyuanDevice3.joinPath(_SiyuanDevice3.siyuanAppearancePath(), "themes", "zhi", libpath);
        break;
      default:
        throw new Error("type must be provided when not use absolute path");
    }
  }
  const syWin = _SiyuanDevice3.siyuanWindow();
  if (!syWin) {
    return __require23(absLibpath);
  }
  if (typeof syWin.require !== "undefined") {
    return syWin.require(absLibpath);
  }
  return void 0;
});
__publicField23(SiyuanDevice3, "requireAppearanceLib", (libpath) => {
  return _SiyuanDevice3.requireLib(libpath, false, basePathTypeEnum_default3.BasePathType_Appearance);
});
__publicField23(SiyuanDevice3, "requireDataLib", (libpath) => {
  return _SiyuanDevice3.requireLib(libpath, false, basePathTypeEnum_default3.BasePathType_Data);
});
__publicField23(SiyuanDevice3, "requireThemesLib", (libpath) => {
  return _SiyuanDevice3.requireLib(libpath, false, basePathTypeEnum_default3.BasePathType_Themes);
});
__publicField23(SiyuanDevice3, "requireZhiThemeLib", (libpath) => {
  return _SiyuanDevice3.requireLib(libpath, false, basePathTypeEnum_default3.BasePathType_ZhiTheme);
});
var crossChalk2 = {
  white: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.whiteBright(str) : kleur_default2.white(str);
  },
  gray: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.gray(str) : kleur_default2.gray(str);
  },
  blue: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.blue(str) : kleur_default2.blue(str);
  },
  green: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.green(str) : kleur_default2.green(str);
  },
  yellow: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.yellow(str) : kleur_default2.yellow(str);
  },
  red: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.red(str) : kleur_default2.red(str);
  },
  bgWhite: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.bgWhiteBright(str) : kleur_default2.bgWhite(str);
  },
  bgGrey: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.bgCyanBright(str) : kleur_default2.bgCyan(str);
  },
  bgBlue: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.bgBlueBright(str) : kleur_default2.bgBlue(str);
  },
  bgGreen: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.bgGreenBright(str) : kleur_default2.bgGreen(str);
  },
  bgYellow: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.bgYellowBright(str) : kleur_default2.bgYellow(str);
  },
  bgRed: (str) => {
    return browserUtil_default3.isElectron() ? import_ansi_colors2.default.bgRedBright(str) : kleur_default2.bgRed(str);
  }
};
var crossChalk_default2 = crossChalk2;

// src/theme/zhi.ts
var Zhi = class {
  logger;
  runAs;
  pkgJson = {};
  ZHI_PACKAGE_JSON = "package.json";
  /**
   * 主题初始化
   *
   * @param runAs - 运行模式
   */
  constructor(runAs) {
    this.logger = ZhiCoreUtil_default.zhiLog("zhi-core");
    this.runAs = runAs ?? deviceTypeEnum_default.DeviceType_Node;
  }
  async main(args) {
    this.logger.debug("Parsing args...", args);
    this.pkgJson = await siyuanDevice_default.importZhiThemeJson(this.ZHI_PACKAGE_JSON);
    this.hello(this.runAs);
    return await Bootstrap_default.start();
  }
  hello(from) {
    this.logger.info(
      `Hello, this is zhi theme v${this.pkgJson.version}, ${this.pkgJson.description} by ${crossChalk_default2.green(
        this.pkgJson.author
      )}! You are from ${from}`
    );
  }
  /**
   * 主流程加载
   */
  async init() {
    try {
      this.logger.info(`Zhi Theme runAs ${this.runAs}`);
      if (this.runAs !== deviceTypeEnum_default.DeviceType_Siyuan_MainWin && this.runAs !== deviceTypeEnum_default.DeviceType_Siyuan_Browser) {
        this.logger.warn(
          `Zhi Theme can only run as ${deviceTypeEnum_default.DeviceType_Siyuan_MainWin} or ${deviceTypeEnum_default.DeviceType_Siyuan_Browser}`
        );
        return;
      }
      if (typeof window !== "undefined") {
        ;
        window.zhiLog = ZhiCoreUtil_default.zhiLog("zhi-core");
        this.logger.info("ZhiLog mounted");
      }
      if (typeof window !== "undefined") {
        ;
        window.zhiRequire = function(libpath) {
          return siyuanDevice_default.requireLib(libpath, false, basePathTypeEnum_default.BasePathType_ZhiTheme);
        };
        this.logger.info("zhiRequire mounted");
      }
      if (typeof window !== "undefined") {
        ;
        window.zhiImport = async function(libpath) {
          return await siyuanDevice_default.importJs(libpath, basePathTypeEnum_default.BasePathType_ZhiTheme);
        };
        this.logger.info("zhiImport mounted");
      }
      const dynamicImports = await this.main([]);
      for (const item of dynamicImports) {
        if (item.format !== "esm" && item.format !== "cjs" && item.format !== "js") {
          this.logger.warn("Only esm, cjs supported, skip this lib!", item.libpath);
          continue;
        }
        if (!item.runAs.includes(this.runAs)) {
          this.logger.debug(
            `I'm sorry because current runtime is ${this.runAs}, while lib's define runtime is ${item.runAs}`
          );
          this.logger.warn(`This lib can only run at ${item.runAs}, will skip!Lib is=>${item.libpath}`);
          continue;
        }
        this.logger.info(`Loading modules form zhi => ${item.libpath}`);
        let lib;
        if (item.importType == "import") {
          lib = await siyuanDevice_default.importJs(item.libpath, item.baseType);
          this.logger.debug(`Importing lib ${item.libpath} with basePath of ${item.baseType} ...`);
        } else {
          lib = siyuanDevice_default.requireLib(item.libpath, false, item.baseType);
          this.logger.debug(`Requiring lib ${item.libpath} with basePath of ${item.baseType} ...`);
        }
        if (lib) {
          const libObj = lib;
          this.logger.debug(`Current ${item.importType} lib ${item.libpath} Obj=>`, typeof libObj);
          if (typeof libObj == "function") {
            await libObj();
            this.logger.info(`Inited ${item.libpath} with default function`);
          } else {
            if (libObj.init) {
              const res = await libObj.init();
              if (res) {
                this.logger.info(`Detected output from ${item.importType} lib ${item.libpath}=>`, res);
              }
              this.logger.info(`Inited ${item.libpath} with init function`);
            } else {
              if (libObj.default) {
                const res = await libObj.default();
                if (res) {
                  this.logger.info(`Detected output from ${item.importType} lib ${item.libpath}=>`, res);
                }
                this.logger.info(`Inited ${item.libpath} with default function`);
              }
              this.logger.info(`No init method for ${item.importType} ${item.libpath}`);
            }
          }
        } else {
          this.logger.debug(`Lib entry is not a function => ${item.importType} ${item.libpath}`, lib);
        }
        this.logger.info(`Success ${item.importType} ${item.libpath}`);
      }
      this.logger.info("Zhi Theme inited");
    } catch (e) {
      this.logger.error("Zhi Theme load error=>", e);
    }
  }
};
var zhi_default = Zhi;

// src/index.ts
var loadTheme = async () => {
  const zhi = new zhi_default(src_default.getDevice());
  await zhi.init();
};
(async () => {
  await loadTheme();
})();
/*! Bundled license information:

uri-js/dist/es5/uri.all.js:
  (** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js *)

showdown/dist/showdown.js:
  (*! showdown v 2.1.0 - 21-04-2022 *)
*/
