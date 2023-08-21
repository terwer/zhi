# zhi-notion-markdown

convert md to notion blocks and back

## Usage

```js
import { NotionMarkdownConverter } from "zhi-notion-markdown"

const markdownString = await NotionMarkdownConverter.notionToMarkdown(notionBlocks)
console.log("Converted markdown string:", markdownString)
```

```js
import { NotionMarkdownConverter } from "zhi-notion-markdown"

const notionBlocks = NotionMarkdownConverter.markdownToNotion(markdownString)
console.log("Converted notion blocks:", notionBlocks)
```

## Deps

```
├── @tryfabric/martian
├── notion-to-md
```

## Dev

```bash
pnpm dev -F zhi-notion-markdown
```

## Build

```bash
pnpm build -F zhi-notion-markdown
```

## Test

Execute the unit tests via [vitest](https://vitest.dev)

```bash
pnpm test -F zhi-notion-markdown
```

## Publish

```bash
pnpm publish -F zhi-notion-markdown --tag latest
```
