# zhi-cli
a tool for generating zhi framework related projects

[Read more about node with cli](https://www.terwer.space/post/use-typescript-to-develop-a-custom-nodejs-frontend-development-scaffold-1i5fne.html)

[Read more about nx vite with cli](https://www.terwer.space/post/use-nrwlnxworkspace-to-create-a-nodejscommand-line-library-1urtj8.html)

[Read more about turbo esbuild with cli](https://www.terwer.space/implement-a-general-environment-variable-settings-tool-2bxmkh.html)

## Usage

```bash
brew install n
n 16
npm i -g zhi-cli
```

Creating project use the following commands

```bash
## turbo-workspace
zhi-cli init my-turbo-workspace turbo-workspace-simple

## ts-vite-lib
zhi-cli init my-project ts-esbuild-lib

## ts-vite-lib
zhi-cli init my-project ts-vite-lib

## ts-vite-siyuan-plugin
zhi-cli init my-siyuan-plugin ts-vite-siyuan-plugin
```

## Dev

```bash
pnpm dev -F zhi-cli
```

## Build

```bash
pnpm build -F zhi-cli
```

## Test

```
chmod u+x apps/zhi-cli/dist/index.cjs
zhi-cli -h
```

## Publish

```
pnpm publish -F zhi-cli --tag=latest
```