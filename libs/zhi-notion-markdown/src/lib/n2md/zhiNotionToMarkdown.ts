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

import { NotionToMarkdown } from "notion-to-md"
import { Annotations, ConfigurationOptions, CustomTransformer, NotionToMarkdownOptions } from "notion-to-md/build/types"
import * as md from "notion-to-md/build/utils/md"

class ZhiNotionToMarkdown extends NotionToMarkdown {
  private zhiConfig: ConfigurationOptions
  private zhiCustomTransformers: Record<string, CustomTransformer>

  constructor(options?: NotionToMarkdownOptions) {
    super({ notionClient: null as any })

    const defaultConfig: ConfigurationOptions = {
      separateChildPage: false,
      convertImagesToBase64: false,
      parseChildPages: true,
    }
    this.zhiConfig = { ...defaultConfig, ...options?.config }
    this.zhiCustomTransformers = {}
  }

  public async notionBlocksToMarkdown(blocks: any[]): Promise<string[]> {
    const mdBlocks = []
    for (let i = 0; i < blocks.length; i++) {
      const block: any = blocks[i]
      if (block.type === "child_page" && !this.zhiConfig.parseChildPages) {
        continue
      }

      const mdBlock = await this.blockToMarkdown(block)
      mdBlocks.push(mdBlock)
    }

    return mdBlocks
  }

  /**
   * Converts a Notion Block to a Markdown Block
   * @param {ListBlockChildrenResponseResult} block - single notion block
   * @returns {string} corresponding markdown string of the passed block
   */
  async blockToMarkdown(block: any) {
    if (typeof block !== "object" || !("type" in block)) return ""

    let parsedData = ""
    const { type } = block
    if (type in this.zhiCustomTransformers && !!this.zhiCustomTransformers[type]) {
      const customTransformerValue = await this.zhiCustomTransformers[type](block)
      if (typeof customTransformerValue === "string") return customTransformerValue
    }

    switch (type) {
      case "image":
        {
          const blockContent = block.image
          let image_title = "image"

          const image_caption_plain = blockContent.caption.map((item: any) => item.plain_text).join("")

          const image_type = blockContent.type
          let link = ""

          if (image_type === "external") {
            link = blockContent.external.url
          }

          if (image_type === "file") {
            link = blockContent.file.url
          }

          // image caption with high priority
          if (image_caption_plain.trim().length > 0) {
            image_title = image_caption_plain
          } else if (image_type === "file" || image_type === "external") {
            const matches = link.match(/[^/\\&?]+\.\w{3,4}(?=([?&].*$|$))/)
            image_title = matches ? matches[0] : image_title
          }

          return await md.image(image_title, link, this.zhiConfig.convertImagesToBase64)
        }
        break

      case "divider": {
        return md.divider()
      }

      case "equation": {
        return md.equation(block.equation.expression)
      }

      case "video":
      case "file":
      case "pdf":
        {
          let blockContent
          let title: string = type

          if (type === "video") blockContent = block.video
          if (type === "file") blockContent = block.file
          if (type === "pdf") blockContent = block.pdf

          const caption = blockContent?.caption.map((item: any) => item.plain_text).join("")

          if (blockContent) {
            const file_type = blockContent.type
            let link = ""
            if (file_type === "external") link = blockContent.external.url
            if (file_type === "file") link = blockContent.file.url

            if (caption && caption.trim().length > 0) {
              title = caption
            } else if (link) {
              const matches = link.match(/[^/\\&?]+\.\w{3,4}(?=([?&].*$|$))/)
              title = matches ? matches[0] : type
            }

            return md.link(title, link)
          }
        }
        break

      case "bookmark":
      case "embed":
      case "link_preview":
      case "link_to_page":
        {
          let blockContent
          const title: string = type
          if (type === "bookmark") blockContent = block.bookmark
          if (type === "embed") blockContent = block.embed
          if (type === "link_preview") blockContent = block.link_preview
          if (type === "link_to_page" && block.link_to_page.type === "page_id") {
            blockContent = { url: block.link_to_page.page_id }
          }

          if (blockContent) return md.link(title, blockContent.url)
        }
        break

      case "child_page":
        {
          if (!this.zhiConfig.parseChildPages) return ""

          const pageTitle: string = block.child_page.title

          if (this.zhiConfig.separateChildPage) {
            return pageTitle
          }

          return md.heading2(pageTitle)
        }
        break
      case "child_database":
        {
          return block.child_database.title || `child_database`
        }
        break

      case "table": {
        // const { id, has_children } = block
        // let tableArr: string[][] = []
        // if (has_children) {
        //   const tableRows = await getBlockChildren(this.notionClient, id, 100)
        //   let rowsPromise = tableRows?.map(async (row) => {
        //     const { type } = row as any
        //     const cells = (row as any)[type]["cells"]
        //
        //     /**
        //      * this is more like a hack since matching the type text was
        //      * difficult. So converting each cell to paragraph type to
        //      * reuse the blockToMarkdown function
        //      */
        //     const cellStringPromise = cells.map(
        //       async (cell: any) =>
        //         await this.blockToMarkdown({
        //           type: "paragraph",
        //           paragraph: { rich_text: cell },
        //         })
        //     )
        //
        //     const cellStringArr = await Promise.all(cellStringPromise)
        //     tableArr.push(cellStringArr)
        //   })
        //   await Promise.all(rowsPromise || [])
        // }
        // return md.table(tableArr)
        break
      }
      // Rest of the types
      // "paragraph"
      // "heading_1"
      // "heading_2"
      // "heading_3"
      // "bulleted_list_item"
      // "numbered_list_item"
      // "quote"
      // "to_do"
      // "template"
      // "synced_block"
      // "child_page"
      // "child_database"
      // "code"
      // "callout"
      // "breadcrumb"
      // "table_of_contents"
      // "link_to_page"
      // "audio"
      // "unsupported"

      default: {
        // In this case typescript is not able to index the types properly, hence ignoring the error
        const blockContent = block[type].text || block[type].rich_text || []
        blockContent.map((content: Text | any) => {
          if (content.type === "equation") {
            parsedData += md.inlineEquation(content.equation.expression)
            return
          }

          const annotations = content.annotations
          let plain_text = content.plain_text ?? ""
          if (plain_text.trim() === "") {
            plain_text = content?.text?.content ?? ""
          }

          plain_text = this.zhiAnnotatePlainText(plain_text, annotations)

          if (content["href"]) plain_text = md.link(plain_text, content["href"])

          parsedData += plain_text
        })
      }
    }

    switch (type) {
      case "code":
        {
          parsedData = md.codeBlock(parsedData, block[type].language)
        }
        break

      case "heading_1":
        {
          parsedData = md.heading1(parsedData)
        }
        break

      case "heading_2":
        {
          parsedData = md.heading2(parsedData)
        }
        break

      case "heading_3":
        {
          parsedData = md.heading3(parsedData)
        }
        break

      case "quote":
        {
          parsedData = md.quote(parsedData)
        }
        break

      case "callout":
        {
          // const { id, has_children } = block
          // let callout_string = ""
          //
          // if (!has_children) {
          //   return md.callout(parsedData, block[type].icon)
          // }
          //
          // const callout_children_object = await getBlockChildren(this.notionClient, id, 100)
          //
          // // // parse children blocks to md object
          // const callout_children = await this.blocksToMarkdown(callout_children_object)
          //
          // callout_string += `${parsedData}\n`
          // callout_children.map((child) => {
          //   callout_string += `${child.parent}\n\n`
          // })
          //
          // parsedData = md.callout(callout_string.trim(), block[type].icon)
        }
        break

      case "bulleted_list_item":
        {
          parsedData = md.bullet(parsedData)
        }
        break

      case "numbered_list_item":
        {
          parsedData = md.bullet(parsedData, block.numbered_list_item.number)
        }
        break

      case "to_do":
        {
          parsedData = md.todo(parsedData, block.to_do.checked)
        }
        break
    }

    return parsedData
  }

  /**
   * Annoate text using provided annotations
   * @param {string} text - String to be annotated
   * @param {Annotations} annotations - Annotation object of a notion block
   * @returns {string} - Annotated text
   */
  private zhiAnnotatePlainText(text: string, annotations: Annotations): string {
    text = text ?? ""

    // if text is all spaces, don't annotate
    if (text?.match(/^\s*$/)) return text

    const leadingSpaceMatch = text?.match(/^(\s*)/)
    const trailingSpaceMatch = text?.match(/(\s*)$/)

    const leading_space = leadingSpaceMatch ? leadingSpaceMatch[0] : ""
    const trailing_space = trailingSpaceMatch ? trailingSpaceMatch[0] : ""

    text = text.trim()

    if (text !== "") {
      if (annotations.code) text = md.inlineCode(text)
      if (annotations.bold) text = md.bold(text)
      if (annotations.italic) text = md.italic(text)
      if (annotations.strikethrough) text = md.strikethrough(text)
      if (annotations.underline) text = md.underline(text)
    }

    return leading_space + text + trailing_space
  }
}

export default ZhiNotionToMarkdown
