import { describe, it } from "vitest"
import path from "path"

describe("index", () => {
  it("test index", async () => {
    const appInstance: any = {}

    const zhiPublisherSdk = (await import(path.resolve(__dirname, "../dist/index.js"))) as any
    appInstance.zhiPublisherSdk = {
      PublishSdk: zhiPublisherSdk["PublishSdk"],
    }
    console.log(appInstance)
  })
})
