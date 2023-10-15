import { describe, expect, it } from "vitest"
import init from "./index"

describe("zhi-cmd", () => {
  it("index", () => {
    expect(init()).toBe("ok")
  })
})
