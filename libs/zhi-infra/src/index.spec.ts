import { describe, expect, it } from "vitest"
import init from "./index"

describe("zhi-server-infra", () => {
  it("index", () => {
    expect(init()).toBe("ok")
  })
})
