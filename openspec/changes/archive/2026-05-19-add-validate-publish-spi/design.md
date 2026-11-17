## Context

`zhi-blog-api` 现在有 `checkAuth()` 用来验证授权，也有 `newPost()` 等发布方法，但没有一个 API 层的方法用来判断“当前平台配置是否已经满足发布前置条件”。所以下游 UI 只能根据通用字段猜测发布是否准备好，导致平台规则泄漏到 UI 层。

## Goals / Non-Goals

**Goals:**
- 新增清晰的 SPI 方法 `validatePublish()`，专门用于发布前置条件校验。
- 保持 `validatePublish()` 和 `checkAuth()` 的职责分离，避免再次把授权和发布准备状态混在一起。
- 通过默认返回 `{ canPublish: true }` 保持老平台兼容。
- 返回值保持直观：`canPublish` 表示能不能发布，`reason` 表示不能发布的原因。

**Non-Goals:**
- 不在 `zhi-blog-api` 中定义任何具体平台规则。
- 不改变发布请求、发布流程或认证语义。
- 不要求所有现有平台立刻实现自定义覆盖。

## Decisions

1. 方法名使用 `validatePublish()`，不使用 `validate()`。
   - 原因：`validatePublish()` 一眼能看出这是控制发布流程的校验；`validate()` 太泛，后续维护时容易忘记它到底校验什么。

2. 返回类型使用 `PublishValidationResult`，字段为 `{ canPublish, reason? }`。
   - 原因：`canPublish` 在调用处比 `valid` 更直观；`reason` 可以给 UI 展示平台自己的阻塞原因，同时 UI 不需要知道平台细节。

3. 把契约放在博客 API SPI 层，网页平台复用同一契约。
   - 原因：发布前置条件不只网页登录平台会有，API 平台也可能需要空间、目录、组织、默认路径等配置。

4. 基类默认返回 `{ canPublish: true }`。
   - 原因：这样能无破坏地引入新 SPI，避免所有老平台被迫立刻修改。

## Risks / Trade-offs

- [Risk] 某个平台明明有发布前置条件，但忘记覆盖 `validatePublish()`。→ Mitigation：下游在新增平台前置条件时必须补对应测试。
- [Risk] 调用方误把 `validatePublish()` 当成授权验证。→ Mitigation：在注释和规格中明确说明授权仍由 `checkAuth()` 负责。
- [Risk] 包装器没有透传新方法。→ Mitigation：给 `BlogAdaptor` 和 `WebAdaptor` 增加转发测试。

## Migration Plan

1. 增加结果类型、SPI 方法、默认实现和 adaptor 转发。
2. 从 `src/index.ts` 导出新类型。
3. 增加测试并构建 `libs/zhi-blog-api`。
4. 发布新版本；下游项目更新依赖后再调用 `validatePublish()`。
5. 回滚方式：下游不消费该新方法即可；默认实现不会产生远端副作用。
