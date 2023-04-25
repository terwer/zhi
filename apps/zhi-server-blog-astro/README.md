# zhi-server-blog-astro

a performance first, ssr first blog

## Build

```bash
pnpm siyuanBuild -F zhi-server-blog-astro
````

## Start

inside siyuan console

```js
// entry file path
// http://127.0.0.1:6806/appearance/themes/zhi/server/blog/dist/server/entry.mjs

// Not work
// const server = await zhiImport("/server/blog/dist/server/entry.mjs")
// server

// This works, but need system environment for node.js
const basePath = SiyuanDevice.zhiThemePath()
await zhiCmd.executeCommand("PORT=3333 node", ["./dist/server/entry.mjs"], {
  cwd: `${basePath}/server/blog`,
})

// Cannot find package 'undici'
const basePath = SiyuanDevice.zhiThemePath()
await zhiCmd.executeCommandWithBundledNode("./dist/server/entry.mjs", [], {
  cwd: `${basePath}/server/blog`,
  silent: true
})
```

for dev

```bash
cd apps/zhi-server-blog-astro
node ./dist/server/entry.mjs

## or
## node ./apps/zhi-server-blog-astro/dist/server/entry.mjs
```

## Stop

```js

```