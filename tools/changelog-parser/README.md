# changelog-parser

Parse the commit log and de-duplicate it

## Usage

1 add script to package.json

```
"scripts": {
  "parseChangelog": "ts-node-esm --experimental-specifier-resolution=node changelogParser.ts"
}
```

2 

```bash
pnpm parseChangelog
```