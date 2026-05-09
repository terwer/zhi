## Why

Publisher V2 现在会把“授权成功”和“可以发布”混在一起：Cookie 或登录验证通过后，用户可能被直接带回快速发布，但平台还缺少发布必须的配置。需要在 `zhi-blog-api` 的平台 API 契约里新增一个明确的发布前校验方法，让每个平台自己声明并校验自己的发布前置条件，而不是让 UI 猜平台规则。

## What Changes

- 新增公开类型 `PublishValidationResult`，包含 `canPublish: boolean` 和可选 `reason?: string`。
- 在博客 API SPI 中新增 `validatePublish(): Promise<PublishValidationResult>`。
- 基类默认返回 `{ canPublish: true }`，保证老平台不需要立刻改代码也能兼容。
- `BlogAdaptor` 透传 `validatePublish()`；`WebApi` / `WebAdaptor` 也支持同一套发布校验契约。
- 从包入口导出 `PublishValidationResult` 类型。
- 本变更不设计为破坏性变更。

## Capabilities

### New Capabilities
- `publish-validation-spi`: 定义 `zhi-blog-api` 提供给平台和下游项目使用的发布前校验 SPI。

### Modified Capabilities
- 无。

## Impact

- 影响 `libs/zhi-blog-api` 的公开 TypeScript API 和生成后的声明文件。
- 下游项目可以在进入发布流程前调用 `api.validatePublish()`。
- 平台适配器可以按需覆盖 `validatePublish()`，检查知识库、分类、空间、目录、组织、权限等发布前置条件。
- 下游项目依赖该能力前，需要先构建并发布新版 `zhi-blog-api`。
