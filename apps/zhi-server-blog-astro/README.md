# zhi-server-blog-astro

a performance first, ssr first blog

## Dev

```bash
pnpm dev -F zhi-server-blog-astro
```

## Build

### Siyuan

```bash
pnpm siyuanBuild -F zhi-server-blog-astro
````

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

### node

```bash
pnpm build -F zhi-server-blog-astro
## node ./apps/zhi-server-blog-astro/dist/node/dist/server/entry.mjs
```

### Vercel

```bash
pnpm vercelBuild -F zhi-server-blog-astro
## .vercel
```