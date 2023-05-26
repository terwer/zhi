# zhi-siyuan-api

a siyuan-note api including both kernel and client

## Usage

```ts
import { SiyuanKernelApi } from "zhi-siyuan-api"
import { ZhiUtil } from "zhi-common"

// appInstance
const appInstance: any = {}
appInstance.zhiCommon = {
  ZhiUtil: ZhiUtil
}
console.log(appInstance)

// kernelApi
const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
const kernelApi = new SiyuanKernelApi(appInstance, siyuanConfig)
const result = await kernelApi.lsNotebooks()
console.log("result=>", result)
```

动态加载

```ts
import { SiyuanKernelApi } from "zhi-siyuan-api"

// appInstance也可以动态加载，减小打包体积
const appInstance: any = {}

// polyfills
const moduleBase = ""
console.log("moduleBase=>", moduleBase)
// https://github.com/terwer/siyuan-plugin-publisher/blob/main/public/polyfills/fs.js
appInstance.fs = (await import(`${moduleBase}/polyfills/fs.js`))["default"]
// https://github.com/terwer/siyuan-plugin-publisher/blob/main/public/polyfills/path.js
appInstance.path = (await import(`${moduleBase}/polyfills/path.js`))["default"]
appInstance.importDep = async (moduleName) => {
  return await import(appInstance.path.join(moduleBase, moduleName))
}

const zhiCommon = (await appInstance.importDep("./libs/zhi-common/index.js")) as any
appInstance.zhiCommon = {
  ZhiUtil: zhiCommon["ZhiUtil"],
}
console.log(appInstance)

// kernelApi
const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
const kernelApi = new SiyuanKernelApi(appInstance, siyuanConfig)
const result = await kernelApi.lsNotebooks()
console.log("result=>", result)
```

## Deps

```
├── zhi-common - [dynaminc dependency]
├── zhi-blog-api
├── zhi-lib-base
```

## Dev

```bash
pnpm dev -F zhi-siyuan-api
```

## Build

```bash
pnpm build -F zhi-siyuan-api
```

## Test

Execute the unit tests via [vitest](https://vitest.dev)

```bash
pnpm test -F zhi-siyuan-api
```

## Publish

```bash
pnpm publish -F zhi-siyuan-api --tag latest
```