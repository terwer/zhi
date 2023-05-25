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
 * NotImplementedException 表示未实现的异常
 *
 * @author terwer
 * @version 1.6.0
 * @since 1.6.0
 */
class NotImplementedException extends Error {
  /**
   * 创建一个 NotImplementedException 对象。
   *
   * @param message 异常的描述信息。
   */
  constructor(message = "Not implemented") {
    // 调用父类 Error 的构造函数，设置异常信息。
    super(message)
    // 设置异常的名称。
    this.name = "NotImplementedException"
    // 设定实例化对象的原型，以便在类继承中能够正确获得方法。
    Object.setPrototypeOf(this, NotImplementedException.prototype)
  }
}

export default NotImplementedException
