# 进度记录：zhi-blog-api 顶层退出 SPI 提案

## 2026-05-19
- 准备为 zhi-blog-api 创建顶层 `logoutWebAuth` SPI 提案。
- 明确该 SPI 将作为下游语雀插件提案的前置依赖。

- 已完成 OpenSpec change `add-web-auth-logout-spi` 的 proposal/design/specs/tasks。
- `openspec status --change add-web-auth-logout-spi` 显示 4/4 artifacts complete，已可进入 apply/implementation。

- 已回写下游插件仓库的依赖说明，确认该 SPI 是下游实现前置条件。
