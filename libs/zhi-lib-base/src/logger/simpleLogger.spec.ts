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

import { describe, expect, it, vitest } from "vitest"
import simpleLogger from "./simpleLogger"

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
    logger.error(error)

    expect(spy).toHaveBeenCalledWith(expect.stringContaining("an error occurred"), expect.objectContaining(error))
    spy.mockRestore()
  })
})
