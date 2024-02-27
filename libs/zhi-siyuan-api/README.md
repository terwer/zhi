# zhi-siyuan-api

a siyuan-note api including both kernel api and blog adaptor

## Usage

```ts
import { SiyuanConfig, SiyuanKernelApi } from "zhi-siyuan-api"

// kernelApi
const siyuanConfig = new SiyuanConfig("http://127.0.0.1:6806", "")
const kernelApi = new SiyuanKernelApi(siyuanConfig)
const result = await kernelApi.lsNotebooks()
console.log("result=>", result)
```

## Deps

```
├── zhi-blog-api
├── zhi-common
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