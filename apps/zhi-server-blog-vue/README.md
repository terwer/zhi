# zhi-server-blog-vue
a ssr blog using vue3 and esbuild

## How to use

### Dev

```bash
pnpm dev -F zhi-server-blog-vue
```

### Node

1 build

```bash
pnpm nodeBuild -F zhi-server-blog-vue
```

2 run

```bash
pnpm nodeDev -F zhi-server-blog-vue
```

### Siyuan console

1 build

```bash
pnpm localBuild -F zhi-server-blog-vue
```

2 run

```ts
const server  = zhiRequire("/dynamic/blog/index.cjs")
server.default()
```

### Docker

1 build

```bash
pnpm nodeBuild -F zhi-server-blog-vue
```

2 run

```bash
pnpm dockerBuild -F zhi-server-blog-vue
```

### Vercel

```bash
pnpm install -F zhi-server-blog-vue
## dist
## apps/zhi-server-blog-vue/dist
## set the static resource path to apps/zhi-server-blog-vue/dist on vercel's dashboard
pnpm vercelBuild -F zhi-server-blog-vue
````

note:

1 `vercel.json` should be in the project ROOT

2 `api/` file will treat as serverless api. You can change `api/index.js` to register different server entry.

3 You can also define a sun folder inside `api/` and add a `index.js`, it will be automatically registered as a serverless api