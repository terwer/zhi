## 🚀 **zhi-cli 上手指南（用户文档）**

以下是一份简洁清晰的上手指南，可直接放入 `README.md` 或文档站点：

---

# 🧩 zhi-cli 使用指南

`zhi-cli` 是一个基于模板的项目脚手架工具，支持快速初始化 TypeScript 项目，并可通过 `templateConfig.json` 自定义文件替换逻辑。

---

## 🔧 安装

确保已安装 [Node.js](https://nodejs.org/)（v16+）和 [pnpm](https://pnpm.io/)：

```bash
# 全局安装 zhi-cli
npm install -g zhi-cli
# 或
pnpm add -g zhi-cli
```

---

## 🚀 快速开始

### 方式一：使用默认配置（交互式）

```bash
# 初始化名为 my-project 的项目
zhi-cli init my-project

# 按提示选择模板（如 ts-cli）
# 输入项目描述和作者信息
# 自动生成项目！
```

完成后：
```bash
cd my-project
pnpm install
```

---

### 方式二：自定义模板配置（推荐用于团队）

#### 步骤 1：提取模板配置
```bash
# 下载模板并生成 templateConfig.json
zhi-cli init --templateOnly
```
> 会在当前目录生成 `templateConfig.json`。

#### 步骤 2：编辑配置
打开 `templateConfig.json`，按需修改变量和文件替换规则：

```json
{
  "vars": {
    "projectName": "my-custom-project",
    "author": "Your Name",
    "description": "A custom project"
  },
  "templateFiles": {
    "package.json": { "args": ["projectName", "author", "description"] },
    "src/index.ts": { "args": ["projectName"] }
  }
}
```

#### 步骤 3：创建项目
```bash
# 使用自定义配置初始化项目
zhi-cli init my-custom-project
```
> 工具会自动读取当前目录的 `templateConfig.json` 并替换文件内容。

---

## 📦 命令选项

| 选项 | 说明 |
|------|------|
| `zhi-cli init <name>` | 创建名为 `<name>` 的项目 |
| `--templateOnly` | 仅下载模板配置（不创建项目） |
| `--verbose` | 输出详细日志 |
| `--target <name>` | 指定目标平台（默认 `node`） |

---

## 💡 提示

- 模板仓库：[terwer/zhi-ts-template](https://github.com/terwer/zhi-ts-template)
- 修改 `templateConfig.json` 后，所有新项目将自动应用新规则
- 如需重置配置，删除 `templateConfig.json` 即可回退到交互式模式

---

## 🛠️ 故障排查

- **"Project name is required!"** → 非 `--templateOnly` 模式必须提供项目名
- **"template config does not exist"** → 模板仓库缺少 `templateConfig.json`（请检查分支）
- **文件未替换？** → 确保 `templateConfig.json` 中的 `templateFiles` 路径与模板一致

---

> ✨ **现在就开始构建你的下一个项目吧！**

---