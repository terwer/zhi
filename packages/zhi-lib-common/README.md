# zhi-lib-common

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
├── @siyuan-community/zhi-env
├── @siyuan-community/zhi-log
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

```
nx publish zhi-lib-common --ver=0.0.1 --tag=latest
```
