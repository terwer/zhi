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

import { describe, it, expect } from "vitest"
import SiyuanKernelApi, { buildNotebookIdsWhere } from "./siyuanKernelApi"
import SiyuanConfig from "../config/siyuanConfig"

describe("buildNotebookIdsWhere", () => {
  it("returns empty when alias is empty", () => {
    expect(buildNotebookIdsWhere("", ["n1"])).toBe("")
  })

  it("returns empty when notebookIds is undefined/empty", () => {
    expect(buildNotebookIdsWhere("b")).toBe("")
    expect(buildNotebookIdsWhere("b", undefined)).toBe("")
    expect(buildNotebookIdsWhere("b", [])).toBe("")
  })

  it("builds a single quoted IN clause for valid ids", () => {
    expect(buildNotebookIdsWhere("b", ["n1", "n2"])).toBe(" AND b.box IN ('n1','n2')")
  })

  it("uses the provided alias", () => {
    expect(buildNotebookIdsWhere("b1", ["20220718062546-2nbmy21"])).toBe(
      " AND b1.box IN ('20220718062546-2nbmy21')"
    )
    expect(buildNotebookIdsWhere("b2", ["20220718062546-2nbmy21"])).toBe(
      " AND b2.box IN ('20220718062546-2nbmy21')"
    )
  })

  it("drops ids outside the [A-Za-z0-9_-] whitelist", () => {
    expect(buildNotebookIdsWhere("b", ["n1", "bad'id; DROP TABLE blocks"])).toBe(" AND b.box IN ('n1')")
  })

  it("returns empty when all ids are invalid", () => {
    expect(buildNotebookIdsWhere("b", ["'; DROP TABLE blocks", "x' OR '1'='1"])).toBe("")
  })
})

describe("SiyuanKernelApi notebook filtering SQL", () => {
  let capturedStmt = ""
  const makeApi = () => {
    const api = new SiyuanKernelApi(new SiyuanConfig("http://127.0.0.1:6806", ""))
    // Stub sql to capture the generated statement without hitting a live kernel.
    api.sql = (async (stmt: string) => {
      capturedStmt = stmt
      return stmt.includes("COUNT(DISTINCT") ? [{ count: 1 }] : []
    }) as any
    return api
  }

  it("getRootBlocksCount appends notebook filter only when set", async () => {
    const api = makeApi()
    await api.getRootBlocksCount("kw", false, ["n1", "n2"])
    expect(capturedStmt).toContain("AND b.box IN ('n1','n2')")
    expect(capturedStmt).not.toContain("LEFT JOIN")
  })

  it("getRootBlocksCount omits filter when notebookIds empty (backward compatible)", async () => {
    const api = makeApi()
    await api.getRootBlocksCount("kw", false, [])
    expect(capturedStmt).not.toContain("b.box IN")
  })

  it("getRootBlocks applies filter and keeps LIMIT/OFFSET in published branch", async () => {
    const api = makeApi()
    await api.getRootBlocks(0, 8, "kw", true, ["n1"])
    expect(capturedStmt).toContain("LEFT JOIN attributes")
    expect(capturedStmt).toContain("AND b.box IN ('n1')")
    expect(capturedStmt).toContain("LIMIT 8 OFFSET 0")
  })

  it("getRootBlocks omits filter when notebookIds omitted", async () => {
    const api = makeApi()
    await api.getRootBlocks(0, 8, "kw", false)
    expect(capturedStmt).not.toContain("b.box IN")
  })

  it("getSubdocCount applies filter with b1 alias", async () => {
    const api = makeApi()
    await api.getSubdocCount("20230927000000-abc123", false, ["n1"])
    expect(capturedStmt).toContain("AND b1.box IN ('n1')")
  })

  it("getSubdocs applies filter with b2 alias", async () => {
    const api = makeApi()
    await api.getSubdocs("20230927000000-abc123", 0, 8, "kw", false, ["n1"])
    expect(capturedStmt).toContain("AND b2.box IN ('n1')")
    expect(capturedStmt).toContain("LIMIT 8 OFFSET 0")
  })
})
