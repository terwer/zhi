# zhi-server-vue3-ssr
a ssr blog using vue3 and esbuild

## How to use

### Dev

```bash
pnpm dev -F zhi-server-vue3-ssr
```

### Node

1 build

```bash
pnpm nodeBuild -F zhi-server-vue3-ssr
```

2 run

```bash
pnpm nodeDev -F zhi-server-vue3-ssr
```

### Siyuan console

1 build

```bash
pnpm localBuild -F zhi-server-vue3-ssr
```

2 run

```ts
const  server  = zhiRequire("/dynamic/blog/index.cjs")
server.default()
```

### Docker

1 build

```bash
pnpm nodeBuild -F zhi-server-vue3-ssr
```

2 run

```bash
pnpm dockerBuild -F zhi-server-vue3-ssr
```

### Vercel

```bash
pnpm install -F zhi-server-vue3-ssr
## dist
## apps/zhi-server-vue3-ssr/dist
pnpm vercelBuild -F zhi-server-vue3-ssr
````

note:

1 `vercel.json` should be in the project ROOT

2 `api/` file will treat as serverless api. You can change `api/index.js` to register different server entry.

3 You can also define a sun folder inside `api/` and add a `index.js`, it will be automatically registered as a serverless api