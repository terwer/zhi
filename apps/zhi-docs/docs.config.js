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

/**
 * 定义需要自动生成 API 文档的模块
 *
 * @author terwer
 * @version 0.1.0
 * @since 0.1.0
 */
module.exports = {
  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-device",
        entryPoints: ["../../libs/zhi-device/src/index.ts"],
        tsconfig: "../../libs/zhi-device/tsconfig.json",
        plugin: ["typedoc-plugin-rename-defaults"],
        out: "zhi-device",
        sidebar: {
          categoryLabel: "Zhi Device",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-env",
        entryPoints: ["../../libs/zhi-env/src/index.ts"],
        tsconfig: "../../libs/zhi-env/tsconfig.json",
        plugin: ["typedoc-plugin-rename-defaults"],
        out: "zhi-env",
        sidebar: {
          categoryLabel: "Zhi Env",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-log",
        entryPoints: ["../../libs/zhi-log/src/index.ts"],
        tsconfig: "../../libs/zhi-log/tsconfig.json",
        plugin: ["typedoc-plugin-rename-defaults"],
        out: "zhi-log",
        sidebar: {
          categoryLabel: "Zhi Log",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-common",
        entryPoints: ["../../libs/zhi-common/src/index.ts"],
        tsconfig: "../../libs/zhi-common/tsconfig.json",
        plugin: ["typedoc-plugin-rename-defaults"],
        out: "zhi-common",
        sidebar: {
          categoryLabel: "Zhi Common",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-blog-api",
        entryPoints: ["../../libs/zhi-blog-api/src/index.ts"],
        tsconfig: "../../libs/zhi-blog-api/tsconfig.json",
        plugin: ["typedoc-plugin-rename-defaults"],
        out: "zhi-blog-api",
        sidebar: {
          categoryLabel: "Zhi Blog Api",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-siyuan-api",
        entryPoints: ["../../libs/zhi-siyuan-api/src/index.ts"],
        tsconfig: "../../libs/zhi-siyuan-api/tsconfig.json",
        plugin: ["typedoc-plugin-rename-defaults"],
        out: "zhi-siyuan-api",
        sidebar: {
          categoryLabel: "Zhi Siyuan Api",
        },
      },
    ],
  ],
}
