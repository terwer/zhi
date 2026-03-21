# zhi-path

```bash
➜  zhi git:(dev) ✗ 
➜  zhi git:(dev) ✗ cd apps              
➜  apps git:(dev) zhi-cli init zhi-path   
✔ What template you want to use? · ts-esbuild-lib
[zhi-cli] [13:29:41] INFO init : zhi-cli is running at node
[zhi-cli] [13:29:41] INFO init : start init zhi project: zhi-path
[zhi-cli] [13:29:41] INFO init : using template: ts-esbuild-lib
✔ please input project description · fix path for mac on electron
✔ please input author · terwer
[zhi-cli] [13:30:02] INFO init : projectOptions=> { description: 'fix path for mac on electron', author: 'terwer' }
[zhi-cli] [13:30:02] INFO init:download : download template
[zhi-cli] [13:30:02] INFO init:download : prepare to checkout templateGitUrl=> https://github.com/terwer/zhi-ts-template
[zhi-cli] [13:30:02] INFO init:download : prepare to checkout downloadPath=> ./zhi-path
[zhi-cli] [13:30:02] INFO init:download : prepare to checkout branch=> ts-esbuild-lib
[zhi-cli] [13:30:02] INFO init:download : start download template ...
[zhi-cli] [13:30:04] INFO init:download : download success
[zhi-cli] [13:30:04] INFO init:modify : start modifying package.json ...
[zhi-cli] [13:30:04] INFO init:modify : modify package.json complete
[zhi-cli] [13:30:04] INFO init:modify : start modifying README.md ...
[zhi-cli] [13:30:04] INFO init:modify : modify README.md complete
[zhi-cli] [13:30:04] INFO init:modify : start modifying src/index.spec.ts ...
[zhi-cli] [13:30:04] INFO init:modify : modify src/index.spec.ts complete
[zhi-cli] [13:30:04] INFO init : .git cleaned.
[zhi-cli] [13:30:04] INFO init : project created.
[zhi-cli] [13:30:04] INFO init : Now you can do cd ./zhi-path and run pnpm install
[zhi-cli] [13:30:04] INFO init : done
➜  apps git:(dev) ✗

➜  apps git:(dev) ✗ git add . 
➜  apps git:(dev) ✗ pnpm add-changeset
> zhi-framework@1.0.0 add-changeset /Volumes/workspace/myproject/zhi-framework/zhi
> changeset

🦋  Which packages would you like to include? · zhi-path
🦋  Which packages should have a major bump? · No items were selected
🦋  Which packages should have a minor bump? · No items were selected
🦋  The following packages will be patch bumped:
🦋  zhi-path@0.1.0
🦋  Please enter a summary for this change (this will be in the changelogs).
🦋    (submit empty line to open external editor)
🦋  Summary › feat: init zhi-path 
 
```

```bash
pnpm install
pnpm dev -F zhi-path
```