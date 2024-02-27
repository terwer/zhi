# esbuild-config-custom

universal esbuild tool for library

## Usages

1 install dependency

```bash
pnpm add @terwer/esbuild-config-custom@latest -D
```

2 add `esbuild.config.js` to project root

for lib

```js
import { dtsPlugin } from "esbuild-plugin-d.ts"

export default {
  esbuildConfig: {
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.cjs",
    bundle: true,
    format: "cjs",
    plugins: [dtsPlugin()],
  }
}
```

for node

```js
import { dtsPlugin } from "esbuild-plugin-d.ts"

export default {
  esbuildConfig: {
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.cjs",
    bundle: true,
    format: "cjs",
    platform: "node",
    banner: {
      js: "#!/usr/bin/env node",
    },
    plugins: [dtsPlugin()],
  }
}
```

3 add build script

```bash
"scripts": {
    "dev": "zhi-build --watch",
    "build": "zhi-build --production"
}
```