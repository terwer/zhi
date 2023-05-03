import DateUtil from "./dateUtil.js"
import StrUtil from "./strUtil.js"
import VersionUtil from "./versionUtil.js"
import HtmlUtil from "./htmlUtil.js"
import MarkdownUtil from "./markdownUtil.js"
import JsonUtil from "./jsonUtil.js"
import ObjectUtil from "./objectUtil.js"

/**
 * 平台无关的通用工具类
 *
 * @author terwer
 * @version 1.4.0
 * @since 1.3.0
 */
class ZhiCommon {
  public readonly dateUtil
  public readonly strUtil
  public readonly versionUtil
  public readonly htmlUtil
  public readonly markdownUtil
  public readonly jsonUtil
  public readonly objectUtil

  constructor() {
    this.dateUtil = new DateUtil()
    this.strUtil = new StrUtil()
    this.versionUtil = new VersionUtil()
    this.htmlUtil = new HtmlUtil()
    this.markdownUtil = new MarkdownUtil()
    this.jsonUtil = new JsonUtil()
    this.objectUtil = new ObjectUtil()
  }
}

export default ZhiCommon
export { DateUtil, StrUtil, VersionUtil, HtmlUtil, MarkdownUtil, JsonUtil, ObjectUtil }
