import Zhi from "./zhi"
import { DeviceDetection } from "@siyuan-community/zhi-device"

/**
 * 主题唯一入口
 */
export async function zhiCore(): Promise<void> {
  const zhi = new Zhi(DeviceDetection.getDevice())
  await zhi.init()
}
