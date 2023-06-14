// @ts-ignore

import { PicGo } from "picgo"

function initSyPicgo() {
  const absfolder = "/Users/terwer/Documents/mydocs/sy-picgo/dist"
  const absTestfolder = "/Users/terwer/Documents/mydocs/sy-picgo/test-dist"
  const picgoExtension = require(absfolder + "/picgo.js").default
  const picgo_cfg_070 = absTestfolder + "/picgo.cfg.json"

  const appFolder = picgoExtension.getCrossPlatformAppDataFolder()
  console.log("appFolder=>", appFolder)

  // 初始化
  return picgoExtension.initPicgo(picgo_cfg_070)
}

// @ts-ignore
async function main() {
  try {
    const syPicgo = initSyPicgo()
    // console.log("This is test", syPicgo)

    const picgo = syPicgo.getPicgoObj() as PicGo

    // 本地图片上传测试
    // await picgo.upload(["/Users/terwer/Documents/pictures/test.png"])

    // 远程图片上传测试
    // await picgo.upload([
    //   "http://terwer-img1-upyun.test.upcdn.net/img/113801672665374_.pic_hd-SharpenAI-softness.png",
    // ])

    await picgo.upload([
      "http://127.0.0.1:62930/assets/image-20230211202553-vfpfufa.png",
    ])
  } catch (err) {
    console.log(err)
    console.error("Failed to run tests")
    process.exit(1)
  }
}

main()
