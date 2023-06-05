[English](README.md)

# Zhi

🛍️ 基于思源笔记的一系列框架、类库、工具、插件、挂件、主题等

[![dev checks](https://img.shields.io/github/checks-status/terwer/zhi/dev?label=build)](https://github.com/terwer/zhi/tree/dev)
![version](https://img.shields.io/github/release/terwer/zhi.svg?style=flat-square)
![license](https://img.shields.io/badge/license-GPL-blue.svg?style=popout-square)

## Zhi 项目家族

### 类库
- zhi-framework - 核心框架 
  - [X] [zhi-lib-base](https://github.com/terwer/zhi/tree/main/libs/zhi-lib-base)
  - [X] [zhi-device](https://github.com/terwer/zhi/tree/main/libs/zhi-device)
  - [X] [zhi-env](https://github.com/terwer/zhi/tree/main/libs/zhi-env)
  - [X] [zhi-log](https://github.com/terwer/zhi/tree/main/libs/zhi-log)
  - [X] [zhi-common](https://github.com/terwer/zhi/tree/main/libs/zhi-common)
    - [ ] [zhi-common-basic](https://github.com/terwer/zhi/tree/main/libs/zhi-common-basic)
    - [ ] [zhi-common-json-validate](https://github.com/terwer/zhi/tree/main/libs/zhi-common-json-validate)
    - [ ] [zhi-common-markdown](https://github.com/terwer/zhi/tree/main/libs/zhi-common-markdown)
    - [ ] [zhi-common-version](https://github.com/terwer/zhi/tree/main/libs/zhi-common-version)
  - [X] [zhi-blog-api](https://github.com/terwer/zhi/tree/main/libs/zhi-blog-api)
  - [X] [zhi-xmlrpc-middleware](https://github.com/terwer/zhi/tree/main/libs/zhi-xmlrpc-middleware)
    - [ ] [zhi-metaweblog-api](https://github.com/terwer/zhi/tree/main/libs/zhi-metaweblog-api)
      - [ ] [zhi-wordpress-api](https://github.com/terwer/zhi/tree/main/libs/zhi-wordpress-api)
      - [ ] [zhi-typecho-api](https://github.com/terwer/zhi/tree/main/libs/zhi-typecho-api)
      - [ ] [zhi-cnblogs-api](https://github.com/terwer/zhi/tree/main/libs/zhi-cnblogs-api)
  - [X] [zhi-fetch-middleware](https://github.com/terwer/zhi/tree/main/libs/zhi-fetch-middleware)
    - [ ] [zhi-rest-api](https://github.com/terwer/zhi/tree/main/libs/zhi-rest-api)
      - [ ] [zhi-github-api](https://github.com/terwer/zhi/tree/main/libs/zhi-github-api)
      - [ ] [zhi-gitlab-api](https://github.com/terwer/zhi/tree/main/libs/zhi-gitlab-api)
      - [ ] [zhi-yuque-api](https://github.com/terwer/zhi/tree/main/libs/zhi-yuque-api)
      - [ ] [zhi-liandi-api](https://github.com/terwer/zhi/tree/main/libs/zhi-liandi-api)
      - [ ] [zhi-kms-api](https://github.com/terwer/zhi/tree/main/libs/zhi-kms-api)
      - [ ] [zhi-siyuan-api](https://github.com/terwer/zhi/tree/main/libs/zhi-siyuan-api)
      - [ ] [zhi-wechat-api](https://github.com/terwer/zhi/tree/main/libs/zhi-wechat-api)
    - [ ] [zhi-http-api](https://github.com/terwer/zhi/tree/main/libs/zhi-http-api)
      - [ ] [zhi-zhihu-api](https://github.com/terwer/zhi/tree/main/libs/zhi-zhihu-api)
      - [ ] [zhi-csdn-api](https://github.com/terwer/zhi/tree/main/libs/zhi-csdn-api)

### 脚手架

- [zhi-cli](https://github.com/terwer/zhi/tree/dev/apps/zhi-cli)

### 文档

- [zhi-docs](https://github.com/terwer/zhi/tree/dev/apps/zhi-docs)

### 工具

- [commit-config-custom](https://github.com/terwer/zhi/tree/dev/tools/commit-config-custom)
- [esbuild-config-custom](https://github.com/terwer/zhi/tree/dev/tools/esbuild-config-custom)
- [eslint-config-custom](https://github.com/terwer/zhi/tree/dev/tools/eslint-config-custom)
- [tsconfig](https://github.com/terwer/zhi/tree/dev/tools/tsconfig)
- [vite-config-custom](https://github.com/terwer/zhi/tree/dev/tools/vite-config-custom)
- [vitest-config-custom](https://github.com/terwer/zhi/tree/dev/tools/vitest-config-custom)

### 主题
- [siyuan-theme-zhihu](https://github.com/terwer/siyuan-theme-zhihu) - 知乎主题 <sup>已上架</sup>

### 挂件
- [sy-post-publisher](https://github.com/terwer/sy-post-publisher) - 发布工具挂件版 <sup>已上架</sup>

### 插件
- [siyuan-plugin-publisher](https://github.com/terwer/siyuan-plugin-publisher) - 发布工具 <sup>进行中</sup>
- [siyuan-plugin-blog](https://github.com/terwer/siyuan-plugin-blog) - 博客插件，博客 & 分享 <sup>进行中</sup>
- [siyuan-plugin-importer](https://github.com/terwer/siyuan-plugin-importer) - 导入工具，导入 epub, docx, pdf, html 等格式到思源笔记 <sup>已上架</sup>
- [siyuan-plugin-custom-slug](https://github.com/terwer/siyuan-plugin-custom-slug) - 文档别名，为文档标题新建别名索引，方便快速搜索 <sup>已上架</sup>
- [siyuan-plugin-code-block](https://github.com/terwer/siyuan-plugin-code-block) - 代码块美化，模仿Mac风格的代码块风格 <sup>已上架</sup>
- [siyuan-plugin-2md](https://github.com/terwer/siyuan-plugin-2md) - Markdown批量转换，将思源笔记的文档批量转换为Markdown文件，支持转换属性为Hexo、HUGO、Vitepress、Obsidian等平台对应的FrontFormatter
  <sup>进行中</sup>
