# zhi-common

the library base for zhi related projects

## Usage

```ts
import zhiCommon from "@siyuan-community/zhi-common"

const dateUtil = zhiCommon.dateUtil
const now = dateUtil.nowDateZh()
console.log("now=>", now)
```

## Deps

```
├── lute
├── showdown
├── compare-versions
├── ajv
```

## Dev

```bash
nx dev zhi-lib-common
```

## Build

```bash
nx build zhi-lib-common
```

## Test

Execute the unit tests via [vitest](https://vitest.dev)

```bash
nx test zhi-lib-common
```

## Publish

```bash
## systemjs tag is systemjs, latest tag is esm
nx publish zhi-lib-common --ver=0.1.0 --tag=systemjs
nx publish zhi-lib-common --ver=0.1.1 --tag=latest
```