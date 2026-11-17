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

import { afterEach, describe, expect, it, vitest } from "vitest"
import simpleLogger from "./simpleLogger"
import {
  configureLogger,
  getEffectiveLogLevel,
  getLogLevel,
  normalizeLogLevel,
  resetLoggerConfig,
  setLogLevel,
  setLogLevelOverride,
} from "./loggerConfig"

describe("test simpleLogger", () => {
  it("should log debug message when isSiyuanApiDev is true", () => {
    const spy = vitest.spyOn(console, "log")

    const logger = simpleLogger("test", "sign", true)
    const message = "debug"
    const data = { data: "test" }
    logger.debug(message, data)

    expect(spy).toHaveBeenCalledWith(expect.stringContaining(message), expect.objectContaining(data))
    spy.mockRestore()
  })

  it("should not log debug message when isSiyuanApiDev is false", () => {
    const spy = vitest.spyOn(console, "log")

    const logger = simpleLogger("test", "sign", false)
    const message = "debug"
    const data = { data: "test" }
    logger.debug(message, data)

    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  it("should log info message", () => {
    const spy = vitest.spyOn(console, "info")

    const logger = simpleLogger("test", "sign")
    const message = "info"
    const data = { data: "test" }
    logger.info(message, data)

    expect(spy).toHaveBeenCalledWith(expect.stringContaining(message), expect.objectContaining(data))
    spy.mockRestore()
  })

  it("should log warn message", () => {
    const spy = vitest.spyOn(console, "warn")

    const logger = simpleLogger("test", "sign")
    const message = "warn"
    const data = { data: "test" }
    logger.warn(message, data)

    expect(spy).toHaveBeenCalledWith(expect.stringContaining(message), expect.objectContaining(data))
    spy.mockRestore()
  })

  it("should log error message when msg is a string", () => {
    const spy = vitest.spyOn(console, "error")

    const logger = simpleLogger("test", "sign")
    const message = "error"
    const data = { data: "test" }
    logger.error(message, data)

    expect(spy).toHaveBeenCalledWith(expect.stringContaining(message), expect.objectContaining(data))
    spy.mockRestore()
  })

  it("should log error message when msg is an error with data", () => {
    const spy = vitest.spyOn(console, "error")

    const logger = simpleLogger("test", "sign")
    const error = new Error("test error")
    logger.error("an error occurred", error)

    expect(spy).toHaveBeenCalledWith(expect.stringContaining("an error occurred"), expect.objectContaining(error))
    spy.mockRestore()
  })
})

describe("runtime logger configuration", () => {
  afterEach(() => {
    resetLoggerConfig()
    vitest.restoreAllMocks()
  })

  it("keeps the historical info default when nothing is configured", () => {
    expect(getLogLevel()).toBe("info")
    expect(getEffectiveLogLevel("sign")).toBe("info")

    const info = vitest.spyOn(console, "info")
    simpleLogger("test", "sign").info("info")
    expect(info).toHaveBeenCalled()
  })

  it("silences info and warn but keeps errors at error level", () => {
    setLogLevel("error")

    const info = vitest.spyOn(console, "info")
    const warn = vitest.spyOn(console, "warn")
    const error = vitest.spyOn(console, "error")

    const logger = simpleLogger("test", "sign")
    logger.info("info")
    logger.warn("warn")
    logger.error("error")

    expect(info).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
    expect(error).toHaveBeenCalled()
  })

  it("supports a per-sign override without enabling other signs", () => {
    setLogLevel("error")
    setLogLevelOverride("verbose", "debug")

    expect(getEffectiveLogLevel("verbose")).toBe("debug")
    expect(getEffectiveLogLevel("quiet")).toBe("error")

    const log = vitest.spyOn(console, "log")
    const info = vitest.spyOn(console, "info")

    simpleLogger("test", "verbose").debug("verbose debug")
    simpleLogger("test", "quiet").info("quiet info")

    expect(log).toHaveBeenCalledTimes(1)
    expect(info).not.toHaveBeenCalled()
  })

  it("removes a per-sign override", () => {
    setLogLevel("error")
    setLogLevelOverride("verbose", "debug")
    expect(getEffectiveLogLevel("verbose")).toBe("debug")

    setLogLevelOverride("verbose")
    expect(getEffectiveLogLevel("verbose")).toBe("error")
  })

  it("lets runtime configuration silence an isDev logger", () => {
    setLogLevel("error")
    const log = vitest.spyOn(console, "log")

    simpleLogger("test", "sign", true).debug("debug")

    expect(log).not.toHaveBeenCalled()
  })

  it("enables debug for every logger at debug level", () => {
    setLogLevel("debug")
    const log = vitest.spyOn(console, "log")

    simpleLogger("test", "sign", false).debug("debug")

    expect(log).toHaveBeenCalledTimes(1)
  })

  it("stores the configuration on the documented global symbol", () => {
    setLogLevel("error")

    const raw = (globalThis as any)[Symbol.for("zhi.logger.config")]
    expect(raw?.level).toBe("error")
  })

  it("shares the configuration with a second copy of the module", async () => {
    setLogLevel("silent")

    // @ts-ignore - the query suffix creates a separate module instance on purpose
    const secondCopy = await import("./loggerConfig?bundle=second")
    expect(secondCopy.getRuntimeLoggerConfig()?.level).toBe("silent")
  })

  it("normalizes upper-case, legacy and alias level names", () => {
    expect(normalizeLogLevel("DEBUG")).toBe("debug")
    expect(normalizeLogLevel("off")).toBe("silent")
    expect(normalizeLogLevel("none")).toBe("silent")
    expect(normalizeLogLevel("nope")).toBeUndefined()
  })

  it("merges configureLogger overrides and can reset to defaults", () => {
    configureLogger({ level: "warn", overrides: { "zhi-siyuan-api": "debug" } })
    expect(getLogLevel()).toBe("warn")
    expect(getEffectiveLogLevel("zhi-siyuan-api")).toBe("debug")

    configureLogger({ overrides: { "zhi-common": "error" } })
    expect(getEffectiveLogLevel("zhi-siyuan-api")).toBe("debug")
    expect(getEffectiveLogLevel("zhi-common")).toBe("error")

    resetLoggerConfig()
    expect(getLogLevel()).toBe("info")
    expect(getEffectiveLogLevel("zhi-siyuan-api")).toBe("info")
  })
})
