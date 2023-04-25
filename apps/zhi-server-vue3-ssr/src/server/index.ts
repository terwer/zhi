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

import express, { Express } from "express"
import ZhiServerVue3SsrUtil from "~/utils/ZhiServerVue3SsrUtil"
import createVueApp from "~/src/app"
import { renderToString } from "vue/server-renderer"
import path from "path"
import "cross-fetch/polyfill"

/**
 * 通用的 express 实例
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class ServerMiddleware {
  protected env
  protected logger

  constructor() {
    this.env = ZhiServerVue3SsrUtil.zhiEnv()
    this.logger = ZhiServerVue3SsrUtil.zhiLog("server-middleware")
  }

  /**
   * 创建一个 express 实例，并添加通用路由
   *
   * @protected
   * @param staticPath - 静态资源路径，不传递则不设置
   */
  public createExpressServer(staticPath?: string) {
    const logger = ZhiServerVue3SsrUtil.zhiLog("server-middleware")
    const server = express()

    /**
     * CORS 在 vercel.json 配置，这里只处理 OPTIONS 预检请求
     */
    server.use(function (req, res, next) {
      if (req.method === "OPTIONS") {
        logger.debug("precheck request received")
        res.send(200)
      } else {
        next()
      }
    })

    let luteAbsPath: string
    // 静态资源路径
    if (staticPath) {
      // 指定静态文件目录
      const absStaticPath = path.resolve(staticPath)
      logger.info("absStaticPath=>", absStaticPath)
      server.use(express.static(absStaticPath))

      luteAbsPath = path.join(absStaticPath, "lib", "lute", "lute-1.7.5-20230410.min.cjs")
      logger.info("staticPath is set, luteAbsPath=>", luteAbsPath)
    } else {
      // const autoAbsbase = path.resolve("./")
      const currentProcessPath = this.env.getStringEnv("CWD")
      logger.info("currentProcessPath=>", currentProcessPath)
      luteAbsPath = path.join(currentProcessPath, "dist", "lib", "lute", "lute-1.7.5-20230410.min.cjs")
      logger.info("process dir is set, luteAbsPath=>", luteAbsPath)
    }
    require(luteAbsPath)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    logger.info("required Lute in Server Side Rendering success", Lute)

    // api 接口
    server.get("/api", (req, res) => {
      res.send("Hello World!")
    })

    server.get("/api/user/:id", (req, res) => {
      const userId = req.params.id // 获取URL参数id
      const user = {
        id: userId,
        name: "Emily",
        age: 28,
        email: "emily@gmail.com",
      }
      res.json(user)
    })

    // 服务器端路由匹配
    server.get("*", (req, res) => {
      const context = {
        url: req.url,
      }

      const { app, router } = createVueApp()

      logger.debug("ssr context=>", context)
      router
        .push(context.url)
        .then(() => {
          logger.info("route pushed to=>", context.url)

          router.isReady().then(() => {
            // 匹配组件
            logger.debug("router.isReady")
            const matchedComponents = router.currentRoute.value.matched
            logger.trace("matchedComponents=>", matchedComponents)
            if (!matchedComponents.length) {
              return res.status(404).end("Page Not Found")
            }
            Promise.all([
              (async () => {
                logger.info("you can do some init before rendering")
              })(),
            ])
              .then(() => {
                logger.trace("start renderToString...")
                const staticV = "202304220051"
                renderToString(app, context).then((appHtml) => {
                  logger.trace("appHtml=>", appHtml)
                  res.send(`
                  <!DOCTYPE html>
                  <html lang="zh">
                    <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                      <link rel="icon" href="/favicon.ico">
                      <link rel="stylesheet" href="/app.css?v=${staticV}" />
                      <title>zhi-blog-ssr-dev</title>
                    </head>
                    <body>
                      <div id="app">${appHtml}</div>
                      <script type="module" src="/app.js?v=${staticV}" async defer></script>
                      <script src="/lib/lute/lute-1.7.5-20230410.min.cjs?v=${staticV}" async defer></script>
                    </body>
                  </html>
              `)
                  res.end()
                })
              })
              .catch((reason) => {
                res.end("error, reason is:" + reason)
              })
          })
        })
        .catch((reason) => {
          logger.error("route push failed", reason)
        })
    })

    return server
  }

  /**
   * 启动 express 服务器
   *
   * @param server express 实例
   * @param p 端口，默认3333
   */
  public startServer(server: Express, p?: number) {
    const logger = ZhiServerVue3SsrUtil.zhiLog("server-middleware")

    // 监听端口
    const listener = server.listen(p ?? 3333, () => {
      let serveUrl
      const addr = listener.address() ?? "unknown host"
      if (typeof addr == "string") {
        serveUrl = addr
      } else {
        const { port, address } = addr
        serveUrl = `${address}:${port}`
      }
      logger.info(`Server is listening on ${serveUrl}`)
      logger.info("Note that if you running in docker, this port is a inner port")
    })
  }
}

export default ServerMiddleware
