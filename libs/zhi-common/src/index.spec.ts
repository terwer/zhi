import { describe, expect, it } from "vitest"
import init from "./index"

describe("zhi-common", () => {
  it("index", () => {
    expect(init()).toBe("ok")
  })
})
