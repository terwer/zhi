# zhi-lib-env

a cross-platform env config lib

## Usage

For simple use

```ts
import Env from "@siyuan-community/zhi-env"

const env = new Env({
  "some-key": "some-value",
})
const val = env.getEnv("some-key")
console.log("val=>", val)
```

For `vite`

```ts
import Env from "@siyuan-community/zhi-env"

const env = new Env(import.meta.env)
const val = env.getEnv("some-key")
console.log("val=>", val)
```

For `Nuxt` framework

```ts
import Env from "@siyuan-community/zhi-env"

const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv)
// 访问公共变量
// const env = new Env(nuxtEnv.public)

const val = env.getEnv("some-key")
console.log("val=>", val)
```

For Astro framework or other libs

```ts
import Env from "@siyuan-community/zhi-env"

// https://github.com/vitejs/vite/issues/9539#issuecomment-1206301266
// 1 add "module": "esnext" to tsconfig.json
//   add "target": "esnext" to tsconfig.json
// 2 add env.d.ts
//   ```
//  interface ImportMeta {
//    readonly env: ImportMetaEnv
//  }
//  ```
// 3 add define to esbuild, vite etc.
//    ```
//    const defineEnv = {
//      NODE_ENV: isProduction ? "production" : "development",
//      ...getNormalizedEnvDefines(["NODE", "VITE_"]),
//    }
//    bundledEsbuildConfig.define = {}
//    bundledEsbuildConfig.define = {
//      ...bundledEsbuildConfig.define,
//      "import.meta.env": JSON.stringify(defineEnv),
//    }
//    ```

const envMeta = import.meta.env
const env = new Env(import.meta.env)

const val = env.getEnv("some-key")
console.log("val=>", val)
```

For unit tests

- vitest<sup>recommend</sup>

```ts
// simple
describe("zhiEnv", () => {
  it("test env", () => {
    const env = new Env(import.meta.env)
    expect(env.getEnv(EnvConstants.NODE_ENV_KEY)).toEqual("test")
  })
})
```

- jest

```ts
import { getNormalizedEnvDefines } from "../../../packages/esbuild-config-custom/esmUtils"

describe("zhiEnv", () => {
  const NOT_EXIST_KEY = "NOT_EXIST_KEY"
  getNormalizedEnvDefines(["NODE", "VITE_"])

  it("test env", () => {
    const env = new Env(import.meta.env)
    expect(env.getEnv(EnvConstants.NODE_ENV_KEY)).toEqual("test")
  })

  it("test debug mode", () => {
    const env = new Env(import.meta.env)
    expect(env.getEnv(EnvConstants.VITE_DEBUG_MODE_KEY)).toEqual("true")
  })
})
```

## Deps

```
## Congregations! zhi-lib-env need no deps, it is just pure js code 🎉
```

## Dev

```bash
nx dev zhi-lib-env
```

## Build

```bash
nx build zhi-lib-env
```

## Test

Execute the unit tests via [vitest](https://vitest.dev)

```bash
nx test zhi-lib-env
```

## Publish

```
nx publish zhi-lib-env --ver=0.0.1 --tag=latest
```