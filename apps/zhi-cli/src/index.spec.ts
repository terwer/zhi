import { describe, expect, it } from "vitest"
import init from "./index"

describe("zhi-cli", () => {
  it("index", () => {
    expect(init()).toBe("ok")
  })
})
