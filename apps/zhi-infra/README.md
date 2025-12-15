# zhi-server-infra

basic issues for zhi

## How to use from electron

```js
(async () => {
    const initZhiInfra = require("/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-infra/dist/index.cjs").default
    const path = require("path")
    const zhiNpmPath = "/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-infra/dist/deps/npm"
    await initZhiInfra(zhiNpmPath, true)
})()
```

可用的 npm 包地址：

```
Available zhi node_modules path1 => [工作空间]/node_modules
Available zhi node_modules path2 => [zhiNpmPath]/node_modules
Available zhi node_modules path3 => [zhiAppNpmPath]/node_modules

备注：
Mac上 [zhiAppNpmPath]=/Users/[Mac用户名]/Library/Application Support/siyuancommunity
Windows上 [zhiAppNpmPath]=[用户目录]/siyuancommunity
Linux上 [zhiAppNpmPath]=[用户目录]/siyuancommunity
```

## How to integrate with siyuan plugin

1. add `public` folder at `[thisPluginPath]/public`

2. copy `dist` to it and rename to `zhi-infra`

```
[thisPluginPath]
├── public
│ └── zhi-infra
│   └── libs
│       └── zhi-infra
│          ├── README.md
│          ├── index.cjs
│ └── deps.json
│ └── hello.json
│ └── setup.cjs
```

config `vite-static-copy-plugin`

```
{
  src: "./public/**",
  dest: "./public/"
}
```

3. bootstrap zhi-infra

add the code to your plugin entry file, like `index.ts`

```ts
import pkg from "../package.json"

export const dataDir = `${(window as any).siyuan.config.system.dataDir}`

// add init logic to your plugin
class YourPlugin extends Plugin {
  async onload() {
    // other logic

    // init zhi-infra async
    void initZhiInfra()
  }

  //================================================================
  // private function
  //================================================================

  public async initZhiInfra() {
    this.logger.info("start init Zhi Infra...");
    try {
      const pluginDir = `${dataDir}/plugins/${pkg.name}`;
      const win = window as any;
      const zhiInfraActivator = win.require(`${pluginDir}/libs/zhi-infra/index.cjs`).default;
      const path = win.require("path");
      const zhiNpmPath = `${pluginDir}/libs/deps/npm`;
      await zhiInfraActivator(zhiNpmPath, true);
      const zhi = win.zhi
      zhi.npm.depsJsonPath = `${pluginDir}`
      this.logger.info("Zhi Infra init success");
    } catch (e) {
      this.logger.error("Zhi Infra init error", e);
    }
  }
}
```

4. add init code to your proper place

```
showMessage("node is init, please wait...", 3000, "info")
const win = window as any
const zhi = win.zhi || {}
await zhi.npm.checkAndInitNode()
showMessage("node is ready", 3000, "info")
```