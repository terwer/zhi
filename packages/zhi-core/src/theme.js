/**
 * 主题入口，由思源笔记自动触发
 */
;(async () => {
  // 1 加载主题核心文件
  const zhiCore = await import("./index.js")

  // 2 加载web字体
  zhiCore.zhiCore.addStylesheet("zhiThemeFontStyle", "/appearance/themes/zhi/style/common/fonts/webfont.css")

  // 3 初始化主题
  await zhiCore.zhiCore.init()
})()
