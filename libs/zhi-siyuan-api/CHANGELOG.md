# zhi-siyuan-api

## 2.42.0

### Minor Changes

- feat: add math contract
- 6224266: feat: add a generic cover-image contract (`Post.cover`, `CoverSource`, `BlogConfig.coverEnabled`/`coverMode`, `PostUtil.extractFirstImage`) and expose the SiYuan document title image through `ISiyuanKernelApi.getDocTitleImage`.

### Patch Changes

- Updated dependencies
- Updated dependencies [6224266]
- Updated dependencies [4906683]
  - zhi-blog-api@1.87.0
  - zhi-lib-base@0.14.0
  - zhi-common@1.40.0

## 2.41.0

### Minor Changes

- feat: add doc title image support
  - `ISiyuanKernelApi` 新增 `getDocTitleImage(blockId)`，返回文档题头图可用地址
  - `SiyuanKernelApi` 新增静态方法 `parseDocTitleImage(attrs?)`，解析 `title-img` 中的背景图地址
  - `SiyuanKernelApi` 新增 `resolveDocTitleImageUrl(path?)`，把题头图路径补全为可用链接

### Patch Changes

- Updated dependencies
  - zhi-blog-api@1.86.0
  - zhi-lib-base@0.13.0
  - zhi-common@1.39.0

## 2.40.0

### Minor Changes

- feat: add slug api

### Patch Changes

- Updated dependencies
  - zhi-blog-api@1.85.0
  - zhi-lib-base@0.13.0
  - zhi-common@1.39.0

## 2.39.0

### Minor Changes

- fix: version mismatch

## 2.34.0

### Minor Changes

- feat: add runtime log config

### Patch Changes

- Updated dependencies
  - zhi-blog-api@1.84.0
  - zhi-lib-base@0.12.0
  - zhi-common@1.38.0

## 2.33.0

### Minor Changes

- fix: add missing pkg
- feat: add deps

### Patch Changes

- Updated dependencies
- Updated dependencies
  - zhi-lib-base@0.10.0
  - zhi-blog-api@1.83.0
  - zhi-common@1.37.0
