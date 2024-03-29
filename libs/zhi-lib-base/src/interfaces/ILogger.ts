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
 * 简单的日志接口
 *
 * @author terwer
 * @since 1.0.0
 */
interface ILogger {
  /**
   * 输出调试信息
   *
   * @param msg - 调试信息
   * @param obj - 附加对象 (可选)
   */
  debug: (msg: string, obj?: any) => void

  /**
   * 输出信息
   *
   * @param msg - 信息内容
   * @param obj - 附加对象 (可选)
   */
  info: (msg: string, obj?: any) => void

  /**
   * 输出警告信息
   *
   * @param msg - 警告信息
   * @param obj - 附加对象 (可选)
   */
  warn: (msg: string, obj?: any) => void

  /**
   * 输出错误信息
   *
   * @param msg - 错误信息或错误对象
   * @param obj - 附加对象 (可选)
   */
  error: (msg: string | Error, obj?: any) => void
}

export default ILogger
