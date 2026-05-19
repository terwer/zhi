# publish-validation-spi Specification

## Purpose
定义 `zhi-blog-api` 提供给平台和下游项目使用的发布前校验 SPI，让调用方能在进入发布流程前区分授权状态与平台发布前置条件。
## Requirements
### Requirement: Blog API exposes publish validation
`zhi-blog-api` SHALL 在博客 API 契约中暴露 `validatePublish(): Promise<PublishValidationResult>`，让调用方可以询问当前平台配置是否允许进入发布流程。

#### Scenario: Default implementation allows publishing
- **WHEN** 某个平台没有覆盖 `validatePublish()`
- **THEN** 基础 API 实现 SHALL 返回 `{ canPublish: true }`
- **AND** 现有平台适配器 SHALL 保持源码兼容，除非它们主动覆盖该方法

#### Scenario: Platform blocks publishing with a reason
- **WHEN** 平台覆盖实现发现发布前置条件不满足
- **THEN** `validatePublish()` SHALL 返回 `{ canPublish: false, reason: <面向用户的原因> }`
- **AND** 该方法 MUST NOT 创建、更新或删除远端文章

#### Scenario: Blog adaptor forwards validation
- **WHEN** 调用方在 `BlogAdaptor` 上调用 `validatePublish()`
- **THEN** 该调用 SHALL 转发到被包装的平台 API 实例
- **AND** 原始 `PublishValidationResult` SHALL 被返回

#### Scenario: Web API supports publish validation
- **WHEN** 调用方通过 `WebAdaptor` 调用网页登录平台的 `validatePublish()`
- **THEN** 该调用 SHALL 使用同一套博客 API 发布校验契约
- **AND** 网页平台 SHALL 能像 API 平台一样覆盖该方法

### Requirement: Publish validation is separate from authorization validation
`validatePublish()` SHALL 只校验发布前置条件，并且 MUST NOT 替代 `checkAuth()`。

#### Scenario: Consumer needs both checks
- **WHEN** 调用方需要判断平台是否可以展示为可发布
- **THEN** 调用方 SHALL 使用 `checkAuth()` 判断授权/登录是否有效
- **AND** 调用方 SHALL 使用 `validatePublish()` 判断发布前置条件是否满足

#### Scenario: Publish validation does not imply login validity
- **WHEN** `validatePublish()` 返回 `{ canPublish: true }`
- **THEN** 调用方 MUST NOT 推断当前登录、Token 或 Cookie 一定有效
- **AND** 授权状态 SHALL 继续通过现有授权机制检查

### Requirement: Publish validation result is exported
`zhi-blog-api` SHALL 导出公开的 `PublishValidationResult` 类型，供下游 TypeScript 项目使用。

#### Scenario: Downstream imports result type
- **WHEN** 下游项目从 `zhi-blog-api` 导入 `PublishValidationResult`
- **THEN** TypeScript SHALL 能解析该类型，且包含 `canPublish: boolean` 和可选 `reason?: string`
