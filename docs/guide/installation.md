# 📦 安装

本章节将引导您完成 YC Design Vue 的安装，并详细阐述其环境要求与兼容性策略，确保您能顺利地在项目中集成并使用。

## ✅ 环境准备 (Prerequisites)

在开始之前，请确保您的开发环境满足以下要求。一个匹配的环境是组件库正常运行的基础。

- **Node.js**: `v16.0.0` 或更高版本。

  > 我们使用了一些现代的 Node.js API 来构建和优化库，建议保持在 `LTS` 版本。

- **Vue**: `v3.3.0` 或更高版本。

  > YC Design Vue 深度依赖 Vue 3 的新特性，如 `Composition API` 和 `<script setup>`，以提供最佳的性能和开发体验。

- **TypeScript**: `v4.9.0` 或更高版本 (推荐)。
  > 我们强烈推荐在项目中使用 TypeScript，以享受完整的类型提示和更健壮的代码。当然，在纯 JavaScript 项目中同样可以使用。

## 🚀 快速安装

我们推荐通过包管理器（如 `npm`, `yarn`, 或 `pnpm`）将 YC Design Vue 安装为项目的依赖。这是在现代前端工程化项目中**最标准、最推荐**的使用方式。

**第一步：创建一个 Vue 项目**

如果您的项目尚未创建，可以通过官方脚手架快速初始化一个。

```bash
# 使用 Vite (推荐)
npm create vue@latest
```

**第二步：安装组件库**

进入您的项目目录，选择一个包管理器执行安装命令。

### npm

```bash
npm install yc-design-vue --save
```

### yarn

```bash
yarn add yc-design-vue
```

### pnpm (推荐)

```bash
pnpm add yc-design-vue
```

> **提示**：`pnpm` 在依赖管理和安装速度上具有优势，我们推荐您尝试使用。

## 🌐 CDN 引入

对于不使用构建工具的传统 HTML 页面，或者想快速进行原型验证，您可以通过 CDN 的方式引入。

我们推荐使用 [unpkg](https://unpkg.com/) 或 [jsDelivr](https://www.jsdelivr.com/)。

**这是一个可以直接运行的 HTML 示例：**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>YC Design Vue CDN Demo</title>

    <!-- 1. 引入 YC Design Vue 的样式文件 -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/yc-design-vue/dist/style.css" />
  </head>
  <body>
    <div id="app">
      <yc-button
        type="primary"
        @click="handleClick"
        >点击我！</yc-button
      >
    </div>

    <!-- 2. 引入 Vue 3 -->
    <script src="https://unpkg.com/vue@3"></script>

    <!-- 3. 引入 YC Design Vue 的 UMD 格式脚本 -->
    <script src="https://unpkg.com/yc-design-vue/dist/yc-design-vue.umd.js"></script>

    <script>
      const { createApp } = Vue;

      const app = createApp({
        setup() {
          const handleClick = () => {
            alert('Hello, YC Design Vue!');
          };
          return {
            handleClick,
          };
        },
      });

      // 4. 将 YC Design Vue 作为插件注册
      app.use(YcDesignVue);

      app.mount('#app');
    </script>
  </body>
</html>
```

## 🛡️ 兼容性策略

我们非常重视组件库的稳定性和兼容性，并为此制定了清晰的策略。

### 版本管理

YC Design Vue 严格遵循 [语义化版本规范 (Semantic Versioning 2.0.0)](https://semver.org/lang/zh-CN/)。

- **主版本号 (Major)**: 当我们做了不兼容的 API 修改时，会增加主版本号。
- **次版本号 (Minor)**: 当我们做了向下兼容的功能性新增时，会增加次版本号。
- **修订号 (Patch)**: 当我们做了向下兼容的问题修正时，会增加修订号。

**版本锁定建议**：
在您的 `package.json` 文件中，我们建议您使用 `^` (Caret) 来锁定版本，例如 `"yc-design-vue": "^1.2.3"`。这能确保您在享受新功能和问题修复的同时，不会因为破坏性更新而导致项目构建失败。

### 浏览器支持

我们致力于支持所有现代浏览器。

| 浏览器         | 版本  |
| :------------- | :---- |
| 🟢 **Chrome**  | >= 64 |
| 🟢 **Firefox** | >= 78 |
| 🟢 **Safari**  | >= 12 |
| 🟢 **Edge**    | >= 79 |

**关于 Internet Explorer (IE)**:
由于 Vue 3 本身使用了 `Proxy` 等现代 JavaScript 特性，**因此 YC Design Vue 无法支持 IE 浏览器**。我们的目标是为现代浏览器提供最佳体验。

## 下一步

安装成功！现在，您可以根据您的需求，继续探索：

- ➡️ 阅读 **[快速上手](/guide/)**，学习如何在项目中引入并使用第一个组件。
- ✨ 浏览 **[组件文档](/components/button/index.md)**，了解我们提供的所有高质量组件。
- 🎨 探索 **[主题定制](/guide/theme)**，学习如何让组件库的风格与您的品牌完美融合。
