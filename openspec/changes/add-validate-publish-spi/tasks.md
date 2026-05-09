## 1. SPI 契约

- [ ] 1.1 新增公开类型 `PublishValidationResult`，包含 `canPublish: boolean` 和可选 `reason?: string`。
- [ ] 1.2 在 `IBlogApi` 中新增 `validatePublish(): Promise<PublishValidationResult>`。
- [ ] 1.3 从包入口导出 `PublishValidationResult`。

## 2. 基类和包装器实现

- [ ] 2.1 在 `BlogApi` 中实现默认 `validatePublish()`，返回 `{ canPublish: true }`。
- [ ] 2.2 在 `BlogAdaptor` 中新增 `validatePublish()`，转发给被包装的平台 API 实例。
- [ ] 2.3 确认 `WebApi` 和 `WebAdaptor` 支持同一方法，可通过继承或显式转发实现。

## 3. 验证和发布准备

- [ ] 3.1 新增或更新包测试，覆盖默认返回值和 adaptor 转发。
- [ ] 3.2 运行 `zhi-blog-api` 构建和类型声明生成。
- [ ] 3.3 添加发布新版包需要的 changeset / 版本记录。
- [ ] 3.4 运行 `openspec validate add-validate-publish-spi`。
