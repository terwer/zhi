/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

// @ts-ignore
import { importWithMap } from "https://esm.sh/dynamic-importmap"
// @ts-ignore
// import ZhiUtil from "https://esm.sh/@siyuan-community/zhi-common@1.5.5"
// @ts-ignore
import Env from "https://esm.sh/zhi-env"
// @ts-ignore
import ZhiLog from "https://esm.sh/zhi-log"

console.log("Env=>", Env)
console.log("ZhiLog=>", ZhiLog)

/**
 * 工具类统一入口，每个应用自己实现
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class ZhiCoreUtil{
  // extends ZhiUtil {
//   // @ts-ignore
//   public static override zhiEnv(): Env {
//     // @ts-ignore
//     if (!this.env) {
//       // @ts-ignore
//       this.env = new Env(import.meta.env)
//     }
//     // @ts-ignore
//     return this.env
//   }
}

export default ZhiCoreUtil
