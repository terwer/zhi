import { describe, it } from "vitest"
// import { FormdataFetch } from "./index"

describe("zhi-formdata-fetch", () => {
  // it("test doFetch", async () => {
  //   const f = new FormdataFetch(true)
  //   const response = await f.doFetch()
  //   console.log(response)
  // })

  it("test doFetch2", async () => {
    const moduleBase = "/Users/terwer/Documents/mydocs/zhi-framework/zhi"
    const { FormdataFetch } = require(`${moduleBase}/apps/zhi-formdata-fetch/dist/index.cjs`) as any
    console.log(FormdataFetch)

    const f = new FormdataFetch()
    const response = await f.doFetch()
    console.log(response)
  })
})
