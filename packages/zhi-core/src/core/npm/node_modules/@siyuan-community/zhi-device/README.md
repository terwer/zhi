# zhi-lib-device

auto check environment whether in browser, browser extension, electron, node and more

## Usage

```ts
import { DeviceDetection, BrowserUtil, DeviceTypeEnum } from "@siyuan-community/zhi-device"

console.log("isInBrowser=>", BrowserUtil.isInBrowser)

const deviceType: DeviceTypeEnum = DeviceDetection.getDevice()
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

Execute the unit tests via [jest](https://jestjs.io/docs/getting-started#via-ts-jest)

```bash
nx test zhi-lib-device
```

## Publish

```bash
nx publish zhi-lib-device --ver=0.1.0 --tag=latest
```