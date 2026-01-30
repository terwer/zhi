import { describe, expect, it } from "vitest"
import main from "./index"

describe("zhi-path", () => {
  it("index", async () => {
    expect(await main([])).toBe("ok")
  })
})
