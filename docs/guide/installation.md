# 安装

## 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- **Node.js** >= 16.0.0
- **Vue** >= 3.3.0
- **TypeScript** >= 4.9.0 (推荐，但不是必需的)

## 包管理器

推荐使用 `npm` 或 `yarn` 作为包管理器。

### npm

```bash
npm install yc-design-vue --save
```

### yarn

```bash
yarn add yc-design-vue
```

### pnpm

```bash
pnpm add yc-design-vue
```

## CDN 引入

如果您不想使用构建工具，也可以通过 CDN 的方式引入：

```html
<!-- 引入 Vue 3 -->
<script src="https://unpkg.com/vue@next"></script>

<!-- 引入 YC Design Vue -->
<link
  rel="stylesheet"
  href="https://unpkg.com/yc-design-vue/dist/style.css" />
<script src="https://unpkg.com/yc-design-vue/dist/yc-design-vue.umd.js"></script>
```

## 版本说明

YC Design Vue 遵循 [语义化版本规范](https://semver.org/lang/zh-CN/)：

- **主版本号**：做了不兼容的 API 修改
- **次版本号**：做了向下兼容的功能性新增
- **修订号**：做了向下兼容的问题修正

我们建议您在生产环境中锁定具体版本，避免因为版本更新导致的不兼容问题。

## 浏览器支持

YC Design Vue 支持现代浏览器和 IE11+：

| 浏览器  | 版本  |
| ------- | ----- |
| Chrome  | >= 64 |
| Firefox | >= 58 |
| Safari  | >= 12 |
| Edge    | >= 79 |
| IE      | >= 11 |

## 下一步

安装完成后，您可以：

- 阅读 [快速上手](/guide/) 了解基本使用方法
- 查看 [按需引入](/guide/import) 优化打包体积
- 探索 [主题定制](/guide/theme) 个性化您的应用
- 浏览 [组件文档](/components/) 了解所有可用组件
