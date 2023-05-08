# esbuild-config-custom

universal esbuild tool for library

## Usages

1 install dependency

```bash
pnpm add esbuild-config-custom@latest -D
```

2 add `esbuild.config.cjs` to project root

for lib

```js
const { dtsPlugin } = require("esbuild-plugin-d.ts")

module.exports = {
  esbuildConfig: {
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.cjs",
    bundle: true,
    format: "cjs",
    plugins: [dtsPlugin()],
  },
}
```

for node

```js
const { dtsPlugin } = require("esbuild-plugin-d.ts")

module.exports = {
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
  },
}
```

3 add build script

```bash
"scripts": {
    "dev": "zhi-build --watch",
    "build": "zhi-build --production"
}
```