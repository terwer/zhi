# zhi-log

a simple logger for Node and Browser

## Usage

```ts
import { LogFactory } from "zhi-log"

const env = new Env(import.meta.env)
const logger = LogFactory.defaultLogger(env)
logger.debug("debug msg")
logger.info("info msg")
logger.error("error msg")
```

### Runtime log level

The level can be changed while the application is running:

```ts
import { LogFactory, setLogLevel } from "zhi-log"

setLogLevel("error")
const logger = LogFactory.defaultLogger()
logger.info("hidden")
logger.error("shown")
```

Explicitly constructed levels still win over the runtime level, and the shared
configuration is re-exported from `zhi-lib-base`, so host applications can use
one import. See [docs/logging.md](../../docs/logging.md) for the full contract.

## Deps

```
├── zhi-device
├── zhi-env
├── loglevel
├── callsites
├── loglevel-plugin-prefix
├── ansi-colors
├── kleur
```

## Dev

```bash
pnpm dev -F zhi-log
```

## Build

```bash
pnpm build -F zhi-log
```

## Api

```bash
pnpm doc -F zhi-log
pnpm md -F zhi-log
```

## Test

Execute the unit tests via [vitest](https://vitest.dev)

```bash
pnpm test -F zhi-log
```

## Publish

```
pnpm publish -F zhi-log --tag=latest
```