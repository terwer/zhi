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

import { Command } from "commander"
import { printVerboseHook } from "../utils"
import { LogFactory, crossChalk, LogLevelEnum } from "zhi-log"
import fs from "fs-extra"
import path from "path"
import { downloadTemplate } from "./download"
import modifyFiles from "./modify"
import { prompt } from "enquirer"
import Select from "enquirer/lib/prompts/select"
import template from "../../template.json" assert { type: "json" }

const logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_INFO, "zhi-cli").getLogger("init")
const templateGitUrl = "https://github.com/terwer/zhi-ts-template"

export const initCommand = () => {
  const command = new Command("init")

  command
    // .description("create a project based on zhi framework")
    // .argument("<name>", "the name for your new project")
    .argument("[name]", "the name for your new project (required unless --templateOnly is used)")
    .argument("[branch]", "the branch for template repo, current support ts-cli")
    .option("--templateOnly", "only download template", false)
    .option("--verbose", "output debug logs", false)
    .option("--target <name>", "the target name", "node")
    .hook("preAction", printVerboseHook)
    .action(async (name, branch, options) => {
      const { templateOnly, verbose, target } = options

      // 如果非 templateOnly 模式，必须提供 name
      if (!templateOnly && !name) {
        logger.error("Project name is required!")
        process.exit(1)
      }

      // 没有指定仓库才去选择
      if (!branch) {
        const templatePrompt = new Select({
          name: "template",
          message: "What template you want to use?",
          choices: template,
        })
        branch = await templatePrompt.run()
      }

      if (verbose) {
        logger.info(`zhi-cli is running at ${target}`)
        logger.info("start init zhi project:", name)
      }
      logger.info("using template:", branch)

      const workDir = "./"

      if (templateOnly) {
        logger.info("Mode: template only — will not install dependencies or initialize git")
        // 只下载模板，不执行后续步骤
        try {
          const tempName = "temp-zhi-template"
          const tempDownloadPath = path.join(workDir, tempName)
          const tempTemplateConfigPath = path.join(tempDownloadPath, "templateConfig.json")
          await downloadTemplate(templateGitUrl, tempDownloadPath, branch)
          if (!fs.existsSync(tempTemplateConfigPath)) {
            throw new Error("template config does not exist")
          }
          // 把 templateConfig.json 提取到临时目录外
          fs.copySync(tempTemplateConfigPath, path.join(workDir, "templateConfig.json"))
          // 删除临时目录
          fs.removeSync(tempDownloadPath)
          logger.info("templateConfig.json extracted to project root.Please check it and modify if necessary😄")
        } catch (e) {
          logger.error(e)
        }
        return
      }

      const description = "please input project description"
      const author = "please input author"
      const projectOptions = await prompt([
        {
          type: "input",
          name: "description",
          message: description,
        },
        {
          type: "input",
          name: "author",
          message: author,
        },
      ])

      logger.info("projectOptions=>", projectOptions)

      try {
        const downloadPath = path.join(workDir, name)
        const templateConfigPath = path.join(workDir, "templateConfig.json")
        const defaultTemplateConfigPath = path.join(workDir, "templateConfig.json")

        // 如果存在需要先删除，否则无法检出
        if (fs.existsSync(downloadPath)) {
          fs.removeSync(downloadPath)
        }

        // 下载仓库并替换参数
        if (!fs.existsSync(downloadPath)) {
          logger.info("Template does not exist, start downloading template...")
          await downloadTemplate(templateGitUrl, downloadPath, branch)
          logger.info("Template downloaded success.")
        }

        if (fs.existsSync(templateConfigPath)) {
          logger.info("Using templateConfig.json for file replacement")
          const templateConfig = JSON.parse(fs.readFileSync(templateConfigPath, "utf-8"))
          const { vars, templateFiles } = templateConfig
          if (verbose) {
            logger.info("Before processing file:", templateFiles)
          }
          for (const [file, config] of Object.entries(templateFiles || {})) {
            logger.info("Processing file:", file)
            if (verbose) {
              logger.info("Template config:", templateConfig)
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const args = config.args || []
            const fileArgsMap: Record<string, string> = {}
            for (const arg of args) {
              // eslint-disable-next-line no-prototype-builtins
              if (vars.hasOwnProperty(arg)) {
                fileArgsMap[arg] = vars[arg]
              }
            }
            logger.info("Replacing file:", file, "with args:", args)
            modifyFiles(downloadPath, [file], fileArgsMap)
          }
        } else {
          logger.warn("templateConfig.json not exists, using default. Will only change package.json and README.md")
          modifyFiles(downloadPath, ["package.json", "README.md"], { name, ...projectOptions })
        }

        // 删除默认的 templateConfig.json
        fs.removeSync(defaultTemplateConfigPath)
        // 删除git信息
        fs.removeSync(path.join(downloadPath, ".git"))
        logger.info(".git cleaned.")

        logger.info("project created.")
        const cdText = crossChalk.yellow(`cd ${downloadPath}`)
        const installText = crossChalk.green(`pnpm install`)
        logger.info(`Now you can do ${cdText} and run ${installText}`)
      } catch (error) {
        logger.error("Failed to create project:", error)
      }

      logger.info("done")
    })
  return command
}
