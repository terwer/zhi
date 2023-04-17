# zhi-dist

dist for zhi to publish to siyuan-note theme market

## How to publish

1 backup this repo

```
## Note: build assets should be ignored
git archive --format=zip --output=/Users/terwer/Downloads/zhi-dist.zip HEAD
```

2 get the latest commit from main and rest project files

```
git pull origin main --force && git rm .
```

3 recover basic files

```
unzip /Users/terwer/Downloads/zhi-dist.zip -d /Users/terwer/Documents/mydocs/zhi-dist && git add -A
```

4 build and copy assets from main repo

```
## TODO
git add -A
```

5 make release tag

```
git tag v1.0.0-alpha.2
```

6 generate CHANGELOG

```
git-changelog -c angular --sections feat,fix,refactor,chore,docs -o CHANGELOG.md
```

7 push tags

```
git push --tags
```
