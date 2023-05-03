export default {
  dependencies: {
    core: [
      {
        libpath: "server/infra/index.cjs",
        baseType: "ZhiTheme",
        format: "cjs",
        importType: "require",
        runAs: ["Siyuan_MainWindow"],
        order: 0,
      },
      {
        libpath: "core/plugin-system/plugin.js",
        baseType: "ZhiTheme",
        format: "esm",
        importType: "import",
        runAs: ["Siyuan_MainWindow", "Siyuan_Browser"],
        order: 1,
      },
      {
        libpath: "core/plugin-system/zhi-plugin-loader.js",
        baseType: "ZhiTheme",
        format: "esm",
        importType: "import",
        runAs: ["Siyuan_MainWindow", "Siyuan_Browser"],
        order: 2,
      },
    ],
    server: [
      {
        libpath: "server/electron/index.js",
        baseType: "ZhiTheme",
        format: "esm",
        importType: "import",
        runAs: ["Siyuan_MainWindow"],
        order: 3,
      },
    ],
    web: [],
    vendor: [],
    plugin: [],
  },
  blog: {
    server: {
      post: "3333",
    },
  },
}
