/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

/**
 * Runtime logging configuration shared by every zhi logger.
 *
 * The configuration object is stored on a well-known global symbol instead of
 * a module-level variable. Every zhi package may bundle its own copy of this
 * module, and a module-level variable would give each copy an isolated state;
 * the global symbol makes one runtime call visible to all of them.
 *
 * The runtime configuration is optional. When nobody calls
 * {@link configureLogger}, the historical behaviour is preserved: `info` is
 * the default level, and `simpleLogger(..., isDev = true)` still enables
 * `debug`.
 *
 * @author terwer
 * @since 0.11.0
 */

/**
 * Supported log levels, ordered from the quietest to the noisiest.
 */
export type ZhiLogLevel = "silent" | "error" | "warn" | "info" | "debug" | "trace"

/**
 * A runtime logging configuration.
 */
export interface ZhiLoggerConfig {
  /**
   * Global level. A message is printed when its level is lower than or equal
   * to this value.
   */
  level: ZhiLogLevel

  /**
   * Optional per-sign overrides, keyed by the logger sign (the second
   * argument of `simpleLogger`, e.g. `zhi-siyuan-api`).
   */
  overrides: Record<string, ZhiLogLevel>
}

const CONFIG_KEY = Symbol.for("zhi.logger.config")

/**
 * Historical default: libraries printed info/warn/error and kept debug off.
 */
export const DEFAULT_LOG_LEVEL: ZhiLogLevel = "info"

const LEVEL_WEIGHT: Record<ZhiLogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
}

const holder = globalThis as any

/**
 * Normalize a level string, including the upper-case values used by the
 * `zhi-log` `LogLevelEnum`, to a {@link ZhiLogLevel}.
 *
 * @param value - level from a config, an env variable or an enum
 * @returns the normalized level, or `undefined` when the value is unknown
 */
export const normalizeLogLevel = (value?: string | null): ZhiLogLevel | undefined => {
  if (!value) {
    return undefined
  }

  const normalized = value.trim().toLowerCase()
  if (normalized === "off" || normalized === "none") {
    return "silent"
  }

  return Object.prototype.hasOwnProperty.call(LEVEL_WEIGHT, normalized) ? (normalized as ZhiLogLevel) : undefined
}

/**
 * Read the level from a supported environment variable.
 *
 * `ZHI_LOG_LEVEL` is the canonical name; `VITE_LOG_LEVEL` is kept because
 * `zhi-log` already used it before runtime configuration existed.
 */
const readEnvLevel = (): ZhiLogLevel | undefined => {
  try {
    const meta = (import.meta as any)?.env
    const metaLevel = normalizeLogLevel(meta?.ZHI_LOG_LEVEL ?? meta?.VITE_LOG_LEVEL)
    if (metaLevel) {
      return metaLevel
    }
  } catch (e) {
    // import.meta is not available in every JS runtime; ignore
  }

  try {
    const env = (globalThis as any)?.process?.env
    return normalizeLogLevel(env?.ZHI_LOG_LEVEL ?? env?.VITE_LOG_LEVEL)
  } catch (e) {
    return undefined
  }
}

/**
 * Return the configuration that was explicitly set at runtime, if any.
 *
 * Unlike {@link getLoggerConfig}, this does not fall back to env variables or
 * the historical default, so callers can distinguish "the host configured
 * logging" from "nobody configured logging".
 */
export const getRuntimeLoggerConfig = (): ZhiLoggerConfig | undefined => {
  const config = holder[CONFIG_KEY]
  if (!config || typeof config !== "object" || typeof config.level !== "string") {
    return undefined
  }

  return {
    level: normalizeLogLevel(config.level) ?? DEFAULT_LOG_LEVEL,
    overrides: { ...(config.overrides ?? {}) },
  }
}

/**
 * Return the effective configuration: the runtime configuration when it was
 * set, otherwise an env-derived configuration, otherwise the historical
 * default (`info`).
 */
export const getLoggerConfig = (): ZhiLoggerConfig => {
  const runtime = getRuntimeLoggerConfig()
  if (runtime) {
    return runtime
  }

  return {
    level: readEnvLevel() ?? DEFAULT_LOG_LEVEL,
    overrides: {},
  }
}

/**
 * Configure zhi logging at runtime.
 *
 * Partial updates are merged into the current configuration, so a host can
 * change the global level and later add a temporary per-sign override without
 * repeating the whole configuration. Pass `overrides: {}` only clears nothing;
 * use {@link resetLoggerConfig} to return to env/default behaviour.
 *
 * @param config - level and/or per-sign overrides
 * @returns the effective configuration after the update
 */
export const configureLogger = (config: Partial<ZhiLoggerConfig>): ZhiLoggerConfig => {
  const current = getLoggerConfig()
  const requestedLevel = config.level ? normalizeLogLevel(config.level) : undefined
  if (config.level && !requestedLevel) {
    throw new Error(`[zhi] invalid log level: ${config.level}`)
  }

  const next: ZhiLoggerConfig = {
    level: requestedLevel ?? current.level,
    overrides: {
      ...current.overrides,
      ...(config.overrides ?? {}),
    },
  }

  holder[CONFIG_KEY] = next
  return next
}

/**
 * Set the global runtime log level.
 *
 * @param level - `silent`, `error`, `warn`, `info`, `debug` or `trace`
 * @returns the effective configuration after the update
 */
export const setLogLevel = (level: ZhiLogLevel | string): ZhiLoggerConfig => {
  const normalized = normalizeLogLevel(level)
  if (!normalized) {
    throw new Error(`[zhi] invalid log level: ${level}`)
  }

  return configureLogger({ level: normalized })
}

/**
 * Return the configured level without resolving per-sign overrides.
 */
export const getLogLevel = (): ZhiLogLevel => getLoggerConfig().level

/**
 * Set or clear a per-sign override.
 *
 * @param sign - sign passed to `simpleLogger` / used by `zhi-log`
 * @param level - level for this sign, or `undefined`/`null` to remove it
 */
export const setLogLevelOverride = (sign: string, level?: ZhiLogLevel | string | null): ZhiLoggerConfig => {
  const current = getLoggerConfig()
  const overrides = { ...current.overrides }
  if (level === undefined || level === null) {
    delete overrides[sign]
  } else {
    const normalized = normalizeLogLevel(level)
    if (!normalized) {
      throw new Error(`[zhi] invalid log level: ${level}`)
    }
    overrides[sign] = normalized
  }

  // Replace the override map instead of merging it, so removing a sign works.
  const next: ZhiLoggerConfig = { level: current.level, overrides }
  holder[CONFIG_KEY] = next
  return next
}

/**
 * Resolve the effective level for one logger.
 *
 * Precedence:
 * 1. explicit runtime configuration (global level + per-sign override)
 * 2. environment variable (`ZHI_LOG_LEVEL` / `VITE_LOG_LEVEL`)
 * 3. historical fallback: `debug` for `isDev = true`, otherwise `info`
 */
export const getEffectiveLogLevel = (sign?: string, isDev?: boolean): ZhiLogLevel => {
  const runtime = getRuntimeLoggerConfig()
  if (runtime) {
    return (sign && runtime.overrides[sign]) || runtime.level
  }

  const envLevel = readEnvLevel()
  if (envLevel) {
    return envLevel
  }

  return isDev ? "debug" : DEFAULT_LOG_LEVEL
}

/**
 * Return whether a message at `level` should be printed.
 */
export const isLevelEnabled = (level: ZhiLogLevel, sign?: string, isDev?: boolean): boolean => {
  return LEVEL_WEIGHT[level] <= LEVEL_WEIGHT[getEffectiveLogLevel(sign, isDev)]
}

/**
 * Remove the runtime configuration and return to env/default behaviour.
 *
 * This is primarily useful for tests and for host applications that offer a
 * "reset logging" action.
 */
export const resetLoggerConfig = (): void => {
  delete holder[CONFIG_KEY]
}
