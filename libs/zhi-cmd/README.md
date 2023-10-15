# zhi-cmd
commond utils for siyuan-note

## How to use

use from js project

```
pnpm add zhi-cmd
```

```js
import { CustomCmd } from "zhi-cmd"

;(async () => {
    const customCmd = new CustomCmd()
    // 指向您要运行的.js文件
    const command = "/Users/terwer/Documents/mydocs/siyuan-plugins/siyuan-plugin-system-tool/public/deps/npm/npm.js"
    const args = []
    const cwd = undefined
    const result = await customCmd.executeCommandWithBundledNodeAsync(command, args, cwd)
    
    if (result.status) {
    console.log("命令执行成功！😄")
    } else {
    console.error("命令执行失败😭: ", result.msg)
    }
})
```

or use from electron

```js
(async () => {
    const initZhiCmd = require("/Users/terwer/Documents/mydocs/zhi-framework/zhi/libs/zhi-cmd/dist/index.cjs").default
    initZhiCmd()

    // 指向您要运行的.js文件
    const command = "/Users/terwer/Documents/mydocs/siyuan-plugins/siyuan-plugin-system-tool/public/deps/npm/npm.js"
    const args = []
    const cwd = undefined
    const result = await zhiCmd.executeCommandWithBundledNodeAsync(command, args, cwd)
    
    if (result.status) {
    console.log("命令执行成功！😄")
    } else {
    console.error("命令执行失败😭: ", result.msg)
    }
})()
```