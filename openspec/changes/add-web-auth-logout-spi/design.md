## Context

`zhi-blog-api` 的现有抽象将 `checkAuth()`、`validatePublish()`、`addPost()`、`deletePost()` 等行为放在 `BlogApi` / `WebApi` 体系里，但没有覆盖“远端退出认证”这个动作。下游网页授权项目需要一个顶层 SPI 来统一调用平台级退出，而不是在业务仓库里各自补私有 hook。

当前仓库中 `WebApi` 是网页能力的基类，`WebAdaptor` 是对 `WebApi` 的包装透传层。它们是新增网页认证退出 SPI 的正确落点；`BlogApi` 仍应保持面向所有博客平台的通用职责，不承载仅对 Web 会话有意义的能力。

## Goals / Non-Goals

**Goals:**
- 为网页认证平台补充统一的远端退出契约。
- 让 `WebApi` / `WebAdaptor` 在同一公开 API 上暴露该能力。
- 保持未实现平台的失败语义清晰、可预期。
- 通过包版本发布，让下游项目有明确的升级边界。

**Non-Goals:**
- 不把退出能力下沉到所有 `BlogApi` 子类。
- 不定义具体平台的退出 URL、header、CSRF 或 Cookie 派生规则。
- 不在 zhi-blog-api 内实现任何具体平台的远端退出逻辑。

## Decisions

### 1. 将退出 SPI 放在 Web 层，而不是 Blog 层

`logoutWebAuth()` 属于网页会话语义，只对 Web API/Adaptor 有意义，因此放在 `WebApi`/`WebAdaptor` 体系中最合适。

- 选择原因：`BlogApi` 面向所有博客平台，包含 MetaWeblog、WordPress 等非网页会话场景，把退出 SPI 放进去会污染通用抽象。
- 替代方案：放进 `BlogApi`。放弃原因是它会让所有平台都背上一个不适用的能力边界。

### 2. 采用布尔返回值而不是新结果对象

`logoutWebAuth()` 采用 `Promise<boolean>`，成功返回 `true`，不支持的平台由默认实现抛出未实现错误。

- 选择原因：现有 `checkAuth()`、`deletePost()` 等动作型方法已经使用简单布尔/异常语义，和现有契约一致。
- 替代方案：引入 `LogoutResult` 结构体。放弃原因是当前阶段并不需要把退出模式、fallback 路径等下沉到公共包，保持契约简单更利于先发布和被下游采用。

### 3. 默认实现失败快，不伪造支持

`WebApi` 基类提供默认 `logoutWebAuth()`，但对未覆盖的平台直接抛出 `NotImplementedException` 或等效错误。

- 选择原因：可清晰地区分“平台支持但执行失败”和“平台根本不支持该能力”。
- 替代方案：默认返回 `false`。放弃原因是调用方无法区分未实现与业务失败，容易误判。

### 4. `WebAdaptor` 只做透传

`WebAdaptor` 继续作为包装器，只负责把 `logoutWebAuth()` 转发给内部 `WebApi` 实例。

- 选择原因：保持包装器职责单一，避免双层业务分叉。
- 替代方案：在 `WebAdaptor` 中加入更多业务判断。放弃原因是这会让转发层变成策略层，破坏现有抽象。

### 5. 先发布包，再让下游升级

该 SPI 先进入 `libs/zhi-blog-api` 的新版本发布流程，然后下游项目再升级依赖并接入。

- 选择原因：当前下游插件已经明确依赖这个顶层契约，必须等包发布后才有稳定 ABI/TS 声明可用。
- 替代方案：下游先手工复制接口。放弃原因是会造成重复定义和版本漂移。

## Risks / Trade-offs

- [Risk] 新增方法让直接实现 `IWebApi` 的外部代码需要重新编译。→ Mitigation：通过明确版本发布和 changelog 提醒下游升级。
- [Risk] 某些子类忘记覆盖 `logoutWebAuth()`。→ Mitigation：默认实现失败快，并补充基类/包装器测试。
- [Risk] 下游过早接入未发布的契约。→ Mitigation：将该能力的使用明确绑定到新 npm 版本发布后。

## Migration Plan

1. 修改 `IWebApi`、`WebApi`、`WebAdaptor` 并补齐测试。
2. 生成 changeset/版本记录，构建 `libs/zhi-blog-api`。
3. 发布新的 `zhi-blog-api` npm 包版本。
4. 下游项目更新依赖版本后，再实现各自平台的 `logoutWebAuth()`。
5. 若需要回滚，只需让下游继续使用旧版本；新方法不会影响旧调用路径。

## Open Questions

无。
