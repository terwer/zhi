# zhi-github-middleware

a middleware for github api

## Usage

```js
// usage
import { CommonGithubClient } from "zhi-github-middleware"

const githubConfig = new GithubConfig("terwer", "hexo-blog", "")
const commonGithubClient = new CommonGithubClient(githubConfig)
const result = await commonGithubClient.getGithubPageTreeNode("")
```

## Deps

```
@octokit/core
js-base64
```

## Dev

```bash
pnpm dev -F zhi-github-middleware
```

## Build

```bash
pnpm build -F zhi-github-middleware
```

## Test

Execute the unit tests via [vitest](https://vitest.dev)

```bash
pnpm test -F zhi-github-middleware
```

## Publish

```bash
pnpm publish -F zhi-github-middleware --tag latest
```