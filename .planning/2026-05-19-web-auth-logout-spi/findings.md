# 发现记录：zhi-blog-api 顶层 logoutWebAuth SPI

## 2026-05-19 初始发现
- zhi 仓库的 `libs/zhi-blog-api/src/lib/IWebApi.ts` 目前没有 `logoutWebAuth()`。
- `WebApi` 与 `WebAdaptor` 都只转发 `checkAuth / buildCookie / getMetaData / preEditPost / addPost / uploadFile / editPost / deletePost`。
- 下游语雀插件已经确认必须依赖 zhi-blog-api 的新公开契约，才能统一调用退出动作。
