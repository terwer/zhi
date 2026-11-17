# zhi-lib-base

minimization dependencies for class library

## Usage

```js
// usage
```

## Logging

`simpleLogger` keeps its historical signature, but the level can now be
configured at runtime for every zhi logger:

```ts
import { simpleLogger, setLogLevel, configureLogger, resetLoggerConfig } from "zhi-lib-base"

const logger = simpleLogger("my-lib", "my-sign")

// Quiet host application: only print failures
setLogLevel("error")

// Temporary diagnostics for one sign
configureLogger({ overrides: { "zhi-siyuan-api": "debug" } })

// Back to the historical default (info, debug for isDev loggers)
resetLoggerConfig()
```

The configuration is shared through the `Symbol.for("zhi.logger.config")`
global, so it also reaches zhi packages that bundle their own copy of this
module. `ZHI_LOG_LEVEL` / `VITE_LOG_LEVEL` are read as a fallback.

See [docs/logging.md](../../docs/logging.md) for levels, precedence, the
backward-compatibility matrix and the recommended rollout.

## Deps

```
## Congregations! zhi-lib-base need no deps, it is just pure js code 🎉
```

## Dev

```bash
pnpm dev -F zhi-lib-base
```

## Build

```bash
pnpm build -F zhi-lib-base
```

## Test

Execute the unit tests via [vitest](https://vitest.dev)

```bash
pnpm test -F zhi-lib-base
```

## Publish

```bash
pnpm publish -F zhi-lib-base --tag latest
```