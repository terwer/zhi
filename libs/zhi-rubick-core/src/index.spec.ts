import { describe, expect, it } from "vitest"
import main from "./index"

describe("zhi-rubick-core", () => {
  it("index", async () => {
    expect(await main([])).toBe("ok")
  })
})
