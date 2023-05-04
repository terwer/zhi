"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * 主题通用类（由theme.js动态调用，除了单元测试之外请勿主动调用）
 *
 * @public
 * @author terwer
 * @since 0.1.0
 */
class Zhi {
}
//
// const importMap = {
//   imports: {
//     react: "https://esm.sh/react@18.2.0?dev",
//     "react-dom": "https://esm.sh/react-dom@18.2.0?dev",
//     "react-dom/client": "https://esm.sh/react-dom@18.2.0/client?dev",
//     "prop-types": "https://esm.sh/prop-types@15.8.1?dev",
//     "react-feather": "https://unpkg.com/react-feather@2.0.10/dist/index.js",
//   },
// }
//
// const React = await importWithMap("react", importMap)
// const { createRoot } = await importWithMap("react-dom/client", importMap)
//
// // react-feather is a React icon library
// // which contains bare import specifiers for "react" and "prop-types"
// const { Smile } = await importWithMap("react-feather", importMap)
//
// function MyApp(props) {
//   return React.createElement(
//     React.Suspense,
//     { fallback: React.createElement("div", {}, "Loading...") },
//     React.createElement(Smile)
//   )
// }
//
// const domContainer = document.getElementById("root")
// const root = createRoot(domContainer)
// root.render(React.createElement(MyApp))
console.log("hello from dynamic importmap2, see https://github.com/keller-mark/dynamic-importmap#react-example for more details");
// @ts-ignore
const zhi_log_1_9_1_1 = tslib_1.__importDefault(require("https://esm.sh/zhi-log@1.9.1"));
// const env = new Env({})
// console.log(Env)
// console.log(env.isNodeDev())
console.log(zhi_log_1_9_1_1.default);
//# sourceMappingURL=zhi.js.map