## 1. Contract and base implementation

- [x] 1.1 在 `IWebApi` 中新增 `logoutWebAuth(): Promise<boolean>` 顶层契约。
- [x] 1.2 在 `WebApi` 中补充默认 `logoutWebAuth()` 实现，未覆盖时失败快。
- [x] 1.3 如有必要，更新公开导出或类型声明，确保下游可从包入口使用新契约。

## 2. Wrapper forwarding and tests

- [x] 2.1 在 `WebAdaptor` 中新增 `logoutWebAuth()` 透传实现。
- [x] 2.2 更新 `libs/zhi-blog-api` 的单元测试，覆盖基础实现失败快与包装器透传。
- [x] 2.3 确认现有 Web/Blog 路径的旧行为不受影响。

## 3. Release preparation

- [x] 3.1 为 `zhi-blog-api` 生成 changeset / 版本记录，说明新增 Web 认证退出 SPI。
- [x] 3.2 构建并验证 `libs/zhi-blog-api` 的类型声明与测试通过。
- [ ] 3.3 发布新的 `zhi-blog-api` npm 包版本。
- [ ] 3.4 在下游插件仓库更新依赖版本后，再继续实现语雀退出逻辑。
