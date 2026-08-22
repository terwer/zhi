## Why

`zhi-blog-api` 目前只有授权、发布、删除等通用接口，没有一个统一的 Web 认证退出 SPI。下游网页授权平台已经开始需要调用平台专有的远端退出动作，如果没有这个顶层契约，就只能在各项目里各写一套私有方法，导致抽象不统一、包装器无法透传、依赖升级也无法收敛。

## What Changes

- 在 Web API 契约中新增 `logoutWebAuth()` 顶层方法，用于触发平台专有的远端认证退出动作。
- 在 `WebApi` 中提供默认失败实现，保证未覆盖的平台可以明确报出“不支持退出”的错误。
- 在 `WebAdaptor` 中透传 `logoutWebAuth()`，让下游通过包装器仍然可以使用同一契约。
- 保持现有 `BlogApi` 非 Web 平台能力不变，不把退出能力扩散到所有博客 API。
- 发布新的 `zhi-blog-api` 包版本，供下游项目升级后再接入该契约。

## Capabilities

### New Capabilities
- `web-auth-logout-spi`: 为网页认证平台提供统一的远端退出 SPI，并允许下游通过 `WebApi` / `WebAdaptor` 调用。

### Modified Capabilities
- 无。

## Impact

- 影响 `libs/zhi-blog-api` 的公开 TypeScript API、基类实现、包装器转发和测试。
- 影响下游依赖 `zhi-blog-api` 的网页授权项目：它们需要升级到新版本后才能在统一抽象上调用 `logoutWebAuth()`。
- 影响发布流程：需要构建、生成版本记录并发布新的 npm 包版本，然后下游再更新依赖继续实现。
