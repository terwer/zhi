# zhi-blog-api 顶层退出 SPI 提案

## 目标
为 zhi-blog-api 增加顶层 `logoutWebAuth` SPI 契约，使下游网页授权平台可以通过统一类型与包装器调用平台专有退出动作。

## 阶段
- [x] 阶段 1：恢复/创建规划上下文
- [x] 阶段 2：检查 `IWebApi` / `WebApi` / `WebAdaptor` 结构
- [x] 阶段 3：形成 OpenSpec 提案与依赖说明
- [x] 阶段 4：回写下游插件提案依赖关系

## 约束
- 不使用 mock、占位字段或临时方案。
- 新能力必须作为公共 SPI 契约进入 zhi-blog-api。
- 下游插件在 zhi-blog-api 发布新版本前不得实施依赖性修改。
