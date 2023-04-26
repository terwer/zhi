import { fileURLToPath } from "url"
import path from "path"
import { rimraf } from "rimraf"
import { mkdirp } from "mkdirp"
import copy from "recursive-copy"

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

/**
 * 创建文件夹，支持多个目录不存在或者存在的情况
 *
 * @param dirpath - 目录
 */
export const makeDirs = async (dirpath) => {
  await mkdirp(dirpath)
  console.log("dirs maked")
}

/**
 * 复制文件
 *
 * @param src - 原目录
 * @param dest - 目标目录
 */
export const copyDir = async (src, dest) => {
  await makeDirs(dest)

  console.log(`copying file from ${src} to ${dest} ...`)
  try {
    const copyOptions = {
      overwrite: true,
      expand: true,
      dot: true,
      junk: true,
    }
    await copy(src, dest, copyOptions)
  } catch (error) {
    console.error("Copy failed: " + error)
  }
  console.log("file copy finished")
}

/**
 * 删除文件
 *
 * @param filePath - 文件路径，支持通配符
 */
export const rmrf = async (filePath) => {
  console.log(`removing files in ${filePath} ...`)
  await rimraf.rimraf(filePath, { glob: true })
  console.log("file removed")
}

// private functions
