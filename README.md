[中文](README_zh_CN.md)

# Zhi

🛍️ A series of libraries, widgets, plugins and themes based on siyuan-note

[![dev checks](https://img.shields.io/github/checks-status/terwer/zhi/dev?label=build)](https://github.com/terwer/zhi/tree/dev)
![version](https://img.shields.io/github/release/terwer/zhi.svg?style=flat-square)
![license](https://img.shields.io/badge/license-GPL-blue.svg?style=popout-square)

## Zhi family

### libraries

- zhi-framework - Core Framework
  - [X] [zhi-lib-base](https://github.com/terwer/zhi/tree/main/libs/zhi-lib-base) ![zhi-lib-base](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-lib-base%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-device](https://github.com/terwer/zhi/tree/main/libs/zhi-device) ![zhi-device](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-device%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-env](https://github.com/terwer/zhi/tree/main/libs/zhi-env) ![zhi-env](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-env%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-log](https://github.com/terwer/zhi/tree/main/libs/zhi-log) ![zhi-log](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-log%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-common](https://github.com/terwer/zhi/tree/main/libs/zhi-common) ![zhi-common](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-common%2Fpackage.json&query=%24.version&label=release)
    - [ ] [zhi-common-basic](https://github.com/terwer/zhi/tree/main/libs/zhi-common-basic)
    - [ ] [zhi-common-json-validate](https://github.com/terwer/zhi/tree/main/libs/zhi-common-json-validate)
    - [X] [zhi-common-markdown](https://github.com/terwer/zhi/tree/main/libs/zhi-common-markdown) ![zhi-common-markdown](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-common-markdown%2Fpackage.json&query=%24.version&label=release)
    - [ ] [zhi-common-version](https://github.com/terwer/zhi/tree/main/libs/zhi-common-version)
  - [X] [zhi-infra](https://github.com/terwer/zhi/tree/main/libs/zhi-infra) ![zhi-infra](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-infra%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-cmd](https://github.com/terwer/zhi/tree/main/libs/zhi-cmd) ![zhi-infra](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-cmd%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-blog-api](https://github.com/terwer/zhi/tree/main/libs/zhi-blog-api) ![zhi-blog-api](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-blog-api%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-notion-markdown](https://github.com/terwer/zhi/tree/main/libs/zhi-notion-markdown) ![zhi-notion-markdown](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-notion-markdown%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-xmlrpc-middleware](https://github.com/terwer/zhi/tree/main/libs/zhi-xmlrpc-middleware) ![zhi-xmlrpc-middleware](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-xmlrpc-middleware%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-fetch-middleware](https://github.com/terwer/zhi/tree/main/libs/zhi-fetch-middleware) ![zhi-fetch-middleware](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-fetch-middleware%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-github-middleware](https://github.com/terwer/zhi/tree/main/libs/zhi-github-middleware) ![zhi-github-middleware](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-github-middleware%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-gitlab-middleware](https://github.com/terwer/zhi/tree/main/libs/zhi-gitlab-middleware) ![zhi-github-middleware](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-github-middleware%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-siyuan-api](https://github.com/terwer/zhi/tree/main/libs/zhi-siyuan-api) ![zhi-siyuan-api](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-siyuan-api%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-picgo-core](https://github.com/terwer/zhi/tree/main/libs/zhi-picgo-core) ![zhi-picgo-core](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-picgo-core%2Fpackage.json&query=%24.version&label=release)
  - [X] [zhi-siyuan-picgo](https://github.com/terwer/zhi/tree/main/libs/zhi-siyuan-picgo) ![zhi-siyuan-picgo](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-siyuan-picgo%2Fpackage.json&query=%24.version&label=release)
  - [ ] [zhi-chatgpt](https://github.com/terwer/zhi/tree/main/libs/zhi-chatgpt) ![zhi-chatgpt](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Flibs%2Fzhi-chatgpt%2Fpackage.json&query=%24.version&label=release)

### scaffold && docs

- [zhi-cli](https://github.com/terwer/zhi/tree/dev/apps/zhi-cli) ![zhi-cli](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Fapps%2Fzhi-cli%2Fpackage.json&query=%24.version&label=release)
- [zhi-docs](https://github.com/terwer/zhi/tree/dev/apps/zhi-docs) ![zhi-docs](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Fapps%2Fzhi-docs%2Fpackage.json&query=%24.version&label=release)

### tools

- [commit-config-custom](https://github.com/terwer/zhi/tree/dev/tools/commit-config-custom) ![commit-config-custom](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Ftools%2Fcommit-config-custom%2Fpackage.json&query=%24.version&label=release)
- [esbuild-config-custom](https://github.com/terwer/zhi/tree/dev/tools/esbuild-config-custom) ![esbuild-config-custom](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Ftools%2Fesbuild-config-custom%2Fpackage.json&query=%24.version&label=release)
- [eslint-config-custom](https://github.com/terwer/zhi/tree/dev/tools/eslint-config-custom) ![zeslint-config-custom](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Ftools%2Feslint-config-custom%2Fpackage.json&query=%24.version&label=release)
- [tsconfig](https://github.com/terwer/zhi/tree/dev/tools/tsconfig)
- [vite-config-custom](https://github.com/terwer/zhi/tree/dev/tools/vite-config-custom) ![vite-config-custom](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Ftools%2Fvite-config-custom%2Fpackage.json&query=%24.version&label=release)
- [vitest-config-custom](https://github.com/terwer/zhi/tree/dev/tools/vitest-config-custom) ![vitest-config-custom](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fterwer%2Fzhi%2Fmain%2Ftools%2Fvitest-config-custom%2Fpackage.json&query=%24.version&label=release)

### themes
- [siyuan-theme-zhihu](https://github.com/terwer/siyuan-theme-zhihu) - Zhihu Theme <sup>Available</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-theme-zhihu/releases"><img src="https://img.shields.io/github/release/terwer/siyuan-theme-zhihu.svg?style=flat-square&color=9CF"></a>

### widgets
- [sy-post-publisher](https://github.com/terwer/sy-post-publisher) - The Publishing Tool widget <sup>Available</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-plugin-publisher/releases"><img src="https://img.shields.io/github/release/terwer/sy-post-publisher.svg?style=flat-square&color=9CF"></a>

### plugins

- [siyuan-plugin-publisher](https://github.com/terwer/siyuan-plugin-publisher) - Publishing Tool <sup>Now Available</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-plugin-publisher/releases"><img src="https://img.shields.io/github/release/terwer/siyuan-plugin-publisher.svg?style=flat-square&color=9CF"></a>
- [siyuan-plugin-picgo](https://github.com/terwer/siyuan-plugin-picgo) - PicGo Image Bed <sup>Now Available</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-plugin-picgo/releases"><img src="https://img.shields.io/github/release/terwer/siyuan-plugin-picgo.svg?style=flat-square&color=9CF"></a>
- [siyuan-plugin-blog](https://github.com/terwer/siyuan-plugin-blog) - Blog Plugin <sup>Now Available</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-plugin-blog/releases"><img src="https://img.shields.io/github/release/terwer/siyuan-plugin-blog.svg?style=flat-square&color=9CF"></a>
- [siyuan-plugin-importer](https://github.com/terwer/siyuan-plugin-importer) - Import Tool <sup>Now Available</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-plugin-importer/releases"><img src="https://img.shields.io/github/release/terwer/siyuan-plugin-importer.svg?style=flat-square&color=9CF"></a>
- [siyuan-plugin-custom-slug](https://github.com/terwer/siyuan-plugin-custom-slug) - Document Alias <sup>Now Available</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-plugin-custom-slug/releases"><img src="https://img.shields.io/github/release/terwer/siyuan-plugin-custom-slug.svg?style=flat-square&color=9CF"></a>
- [siyuan-plugin-kanban-girl](https://github.com/terwer/siyuan-plugin-kanban-girl) - Kanban Lady <sup>Now Available</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-plugin-kanban-girl/releases"><img src="https://img.shields.io/github/release/terwer/siyuan-plugin-kanban-girl.svg?style=flat-square&color=9CF"></a>
- [siyuan-plugin-random-doc](https://github.com/terwer/siyuan-plugin-random-doc) - Document Roaming <sup>Now Available</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-plugin-random-doc/releases"><img src="https://img.shields.io/github/release/terwer/siyuan-plugin-random-doc.svg?style=flat-square&color=9CF"></a>
- [siyuan-plugin-code-block](https://github.com/terwer/siyuan-plugin-code-block) - Code Block Beautification <sup>Now Available</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-plugin-code-block/releases"><img src="https://img.shields.io/github/release/terwer/siyuan-plugin-code-block.svg?style=flat-square&color=9CF"></a>
- [siyuan-plugin-system-tool](https://github.com/terwer/siyuan-plugin-system-tool) - System Tool <sup>未上架</sup> <a title="Releases" target="_blank" href="https://github.com/terwer/siyuan-plugin-system-tool/releases"><img src="https://img.shields.io/github/release/terwer/siyuan-plugin-system-tool.svg?style=flat-square&color=9CF"></a>