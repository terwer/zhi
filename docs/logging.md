# zhi logging: runtime configuration

This document is the recommended configuration and usage plan for logging in the
zhi packages (`zhi-lib-base`, `zhi-log`, and the packages that bundle them).

## Why this exists

zhi had two logger implementations:

- `simpleLogger` in `zhi-lib-base` (used by `zhi-siyuan-api`, `zhi-blog-api`,
  `zhi-common`, and host applications)
- `Logger` / `LogFactory` in `zhi-log` (used by apps and CLIs)

Both chose their level statically: `simpleLogger` printed `info`/`warn`/`error`
unconditionally and enabled `debug` through a per-call `isDev` flag; `Logger`
read a level once in its constructor. There was no supported way for a host
application to turn logging up or down at runtime, so a plugin could not both
stay quiet for users and offer diagnostics when something went wrong.

The goal is one runtime contract shared by every zhi logger:

- quiet by configuration, without rebuilding or editing library code
- backward compatible with the existing APIs and their historical defaults
- one level switch that also works when several copies of the library are
  bundled into the same application

## The runtime contract

The configuration is stored on a global symbol
(`Symbol.for("zhi.logger.config")`), not in a module variable. Every zhi package
may bundle its own copy of `zhi-lib-base`; a module variable would give each
bundle isolated state, while the global symbol gives them one shared state.

The shape is:

```ts
interface ZhiLoggerConfig {
  level: "silent" | "error" | "warn" | "info" | "debug" | "trace"
  overrides: Record<string, "silent" | "error" | "warn" | "info" | "debug" | "trace">
}
```

`overrides` is keyed by the logger sign (the second argument of
`simpleLogger`, for example `zhi-siyuan-api`).

## API

```ts
import {
  configureLogger,
  setLogLevel,
  getLogLevel,
  setLogLevelOverride,
  isLevelEnabled,
  resetLoggerConfig,
} from "zhi-lib-base"

// Quiet by default for a host application that only wants failures
setLogLevel("error")

// Recommended production setup: failures plus user-visible warnings
setLogLevel("warn")

// Temporary diagnostics for one package without flooding everything
configureLogger({ overrides: { "zhi-siyuan-api": "debug" } })

// Back to env/default behaviour
resetLoggerConfig()
```

`zhi-log` re-exports the same functions, so an application that already depends
on `zhi-log` does not need a second import.

### Precedence

1. an explicitly constructed `zhi-log` `Logger`/`LogFactory` level
2. runtime configuration (`setLogLevel` / `configureLogger`)
3. environment variables (`ZHI_LOG_LEVEL`, or the historical
   `VITE_LOG_LEVEL`)
4. the historical fallback: `debug` for `simpleLogger(..., isDev = true)`,
   otherwise `info`

Runtime configuration wins over `isDev`, so `setLogLevel("error")` also
silences a logger created with `isDev = true`. This is intentional: the host's
runtime decision is the strongest signal.

### Environment variables

| Variable | Values | Notes |
| --- | --- | --- |
| `ZHI_LOG_LEVEL` | `silent`, `error`, `warn`, `info`, `debug`, `trace` | canonical name |
| `VITE_LOG_LEVEL` | same | kept for existing `zhi-log` users |

`off` and `none` are accepted as aliases for `silent`.

## Backward compatibility

Nothing changes for code that does not configure logging:

- `simpleLogger(name, sign?, isDev?)` keeps its signature and defaults.
- `zhi-log`'s `LogFactory` keeps its signatures; an explicit level still wins.
- the historical default remains `info` with `debug` disabled, and
  `isDev = true` still enables `debug` when no runtime level is set.
- environment-variable configuration keeps working.

The one behavioural addition is opt-in: once a host calls `setLogLevel`, the
runtime level applies to every zhi logger in that application.

## Recommended configuration

| Context | Recommendation |
| --- | --- |
| End-user application / plugin | `setLogLevel("warn")` or `"error"` at startup; expose the value in settings if a UI exists |
| Development | `ZHI_LOG_LEVEL=debug` or `setLogLevel("debug")` |
| Troubleshooting one library | keep the global level quiet and add `configureLogger({ overrides: { "<sign>": "debug" } })` |
| Library code | never configure the global level; only emit through `simpleLogger` / `zhi-log` |

### Publisher plugin example

```ts
import { setLogLevel } from "zhi-lib-base"

// plugin bootstrap, after settings are loaded
setLogLevel(settings.logLevel ?? "error")
```

This keeps the panel silent and, on a failed publish, still prints the
`[publish] failed` line with the platform's original error text. A future
"log level" setting can call the same function; no rebuild is needed.

## Rollout

1. release `zhi-lib-base` with this feature (the runtime module)
2. rebuild and release the packages that embed `simpleLogger` in their bundle —
   `zhi-common`, `zhi-blog-api`, `zhi-siyuan-api` — so their copies include the
   runtime reader
3. host applications bump those dependencies and call `setLogLevel`
   (`zhi-log` only needs `zhi-lib-base` as a dependency and picks the feature up
   automatically)

Packages built before step 1 contain the old reader and ignore the
configuration; that is why the dependent rebuild is part of the rollout.
