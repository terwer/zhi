# zhi-lib-log

a simple logger for Node and Browser

## Usage

```ts
import LogFactory from "@siyuan-community/zhi-log"

const env = new Env(import.meta.env)
const logger = LogFactory.defaultLogger(env)
logger.debug("debug msg")
logger.info("info msg")
logger.error("error msg")
```

## Deps

```
├── @siyuan-community/zhi-device
├── @siyuan-community/zhi-env
├── loglevel
├── callsites
├── loglevel-plugin-prefix
├── ansi-colors
├── kleur
```

## Dev

```bash
nx dev zhi-lib-log
```

## Build

```bash
nx build zhi-lib-log
```

## Test

Execute the unit tests via [vitest](https://vitest.dev)

```bash
nx test zhi-lib-log
```

## Publish

```
nx publish zhi-lib-log --ver=0.0.1 --tag=latest
```
