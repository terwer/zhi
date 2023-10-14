# zhi-server-infra

basic issues for zhi

## How to use from electron

```js
const initZhiInfra = require("/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-infra/dist/index.cjs").default
const path = require("path")
const zhiNpmPath = path.join(window?.siyuan.config.system.workspaceDir, "data", "plugins", "siyuan-plugin-system-tool", "core")
await initZhiInfra(zhiNpmPath)
```

可用的 npm 包地址：

```
Available zhi node_modules path1 => [工作空间]/node_modules
Available zhi node_modules path2 => [工作空间]/data/plugins/siyuan-plugin-system-tool/deps/npm/node_modules
Available zhi node_modules path3 => /Users/[Mac用户名]/Library/Application Support/siyuancommunity/node_modules
```