# zhi-lib-device

auto check environment whether in browser, browser extension, electron, node and more

## Usage

```js
import { DeviceDetection, BrowserUtil } from "@siyuan-community/zhi-device"

console.log("isInBrowser=>", BrowserUtil.isInBrowser)

const deviceType = DeviceDetection.getDevice()
console.log("deviceType=>", deviceType)

// supported platforms
// Mobile
// Siyuan_Widget
// Siyuan_NewWindow
// Siyuan_MainWindow
// Chrome_Extension
// Chrome_Browser
// Node
```

## Deps

```
## Congregations! zhi-lib-device need no deps, it is just pure js code 🎉
```

## Dev

```bash
nx dev zhi-lib-device
```

## Build

```bash
nx build zhi-lib-device
```

## Test

Execute the unit tests via [vitest](https://vitest.dev)

```bash
nx test zhi-lib-device
```

## Publish

```bash
## systemjs tag is systemjs, latest tag is esm
nx publish zhi-lib-device --ver=0.1.0 --tag=systemjs
nx publish zhi-lib-device --ver=0.1.1 --tag=latest
```
