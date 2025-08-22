# 🚀 快速上手

## 👋 介绍

欢迎来到 YC Design Vue 的世界！

YC Design Vue 是一个基于 **Vue 3** 和 **TypeScript** 精心构建的现代化企业级 UI 组件库。它旨在提供一套开箱即用、功能丰富且高度可定制的界面解决方案，帮助开发者和团队从零开始，以前所未有的速度构建出高质量、设计一致的 Web 应用。

## 🤔 为什么选择 YC Design Vue？

- **💎 设计精良**：拥有一套经过精心设计的视觉语言，确保为您的用户提供美观、一致的体验。
- **🧩 组件丰富**：提供覆盖各类常见业务场景（如表单、数据展示、反馈、导航等）的高质量组件，减少重复造轮。
- **🚀 性能卓越**：充分利用 Vue 3 的 Composition API 和虚拟 DOM 优化，确保组件拥有出色的性能表现。
- **🔒 类型安全**：提供完整的 TypeScript 类型定义，享受 IDE 智能提示带来的极致开发体验，并显著提升代码的健壮性。
- **🎨 主题定制**：基于 CSS 变量的样式系统，让主题定制变得前所未有的简单，轻松匹配您的品牌视觉。
- **🌱 学习曲线平缓**：清晰的 API 设计和详尽的文档，让您可以快速上手并投入到业务开发中。

## 🛠️ 准备工作

在开始之前，请确保您的开发环境满足以下要求：

- ✓ **Node.js**: `v16.0.0` 或更高版本
- ✓ **Vue**: `v3.3.0` 或更高版本
- ✓ 已创建一个基于 `Vite` 或 `Vue CLI` 的 Vue 3 项目

## 📦 安装

我们推荐使用 `npm`、`yarn` 或 `pnpm` 进行安装。

```bash
# 使用 npm
npm install yc-design-vue --save

# 使用 yarn
yarn add yc-design-vue

# 使用 pnpm
pnpm add yc-design-vue
```

## 💡 引入与使用

您可以选择“完整引入”或“按需引入”两种方式来使用组件库。

### 方式一：完整引入 (Global Import)

如果您不特别关心打包体积，或者希望项目中的所有组件都可以直接使用，那么完整引入是最方便的方式。

在您的项目入口文件（通常是 `main.ts` 或 `main.js`）中：

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

// 1. 完整引入 yc-design-vue 组件库
import YcDesignVue from 'yc-design-vue';

// 2. 引入组件库的全局样式
import 'yc-design-vue/es/style.css';

const app = createApp(App);

// 3. 将 YC Design Vue 作为插件注册
app.use(YcDesignVue);

app.mount('#app');
```

> 💡 **专家提示**：完整引入会让您在项目的任何 `.vue` 文件中，无需 `import` 即可直接使用所有 `yc-` 前缀的组件，开发体验极佳。

### 方式二：按需引入 (On-Demand Import) - 🌟 推荐

**我们强烈推荐这种方式**。它只打包您实际使用到的组件，可以极大地优化最终产物的体积。这需要借助一个 Vite 或 Webpack 的插件来自动完成。

**1. 安装插件**

我们将使用 `unplugin-vue-components` 来实现自动按需导入。

```bash
npm install unplugin-vue-components -D
```

**2. 配置插件**

在您的 `vite.config.ts` 文件中，引入并配置插件。

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { YcDesignVueResolver } from 'yc-design-vue/es/resolver'; // (请确认解析器路径)

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // 配置 YC Design Vue 的解析器
        YcDesignVueResolver(),
      ],
      // 指定组件类型声明文件的生成路径
      dts: 'src/components.d.ts',
    }),
  ],
});
```

> ⚠️ **重要提示**：请根据 `yc-design-vue` 的实际导出情况，确认 `YcDesignVueResolver` 的正确引入路径。如果组件库尚未提供官方解析器，您也可以手动配置。

完成配置后，您无需在任何地方手动引入组件或样式，可以直接在模板中使用。插件会自动处理这一切！

## 🎬 第一个示例

现在，让我们把组件用起来！您可以在项目中的任意 `.vue` 文件里直接使用 `yc-design-vue` 的组件了。

```vue
<template>
  <div class="demo-container">
    <yc-button type="primary">主要按钮</yc-button>
    <yc-button>默认按钮</yc-button>
    <yc-button
      type="success"
      disabled
      >成功按钮 (禁用)</yc-button
    >
  </div>
  <div class="demo-container">
    <yc-input
      v-model="text"
      placeholder="请输入内容..."
      style="width: 240px;"></yc-input>
  </div>
  <p>输入的内容是: {{ text }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
</script>

<style scoped>
.demo-container {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}
</style>
```

## 🔑 核心概念

#### 🏷️ 组件前缀

所有 Yc Design Vue 的组件都使用统一的 `yc-` 前缀，以避免与原生HTML标签或其他库的组件产生命名冲突。例如：`yc-button`, `yc-input`, `yc-modal`。

#### 🎨 主题定制

YC Design Vue 开放了一系列全局 CSS 变量，让您可以轻松进行主题定制。只需在您的全局样式文件（如 `style.css`）中覆盖它们即可。

```css
/* 在你的全局样式文件中 */
:root {
  /* 基础品牌色 */
  --yc-primary-color: #165dff;
  --yc-primary-color-hover: #4080ff;
  --yc-primary-color-active: #0e44d1;

  /* 功能色 */
  --yc-success-color: #00b42a;
  --yc-warning-color: #ff7d00;
  --yc-error-color: #f53f3f;

  /* 其他变量... */
  --yc-border-radius-base: 4px;
}
```

## 🧭 下一步

恭喜您已成功上手 Yc Design Vue！现在，您可以开始您的探索之旅：

- 👉 前往 **[组件列表](/components/button/index.md)** 浏览所有可用组件及其用法。
- 👉 阅读 **[主题定制](/guide/theme)** 学习如何深度个性化您的应用。
- 👉 如果您对按需引入的配置有疑问，可以查阅 **[按需引入](/guide/import)** 的详细指南。

## ❓ 常见问题

**❓ Q: 组件渲染了，但是没有样式，怎么办？**

**✅ A:** 如果您是完整引入，请确保在 `main.ts` 中正确引入了全局样式文件 `import 'yc-design-vue/es/style.css';`。如果您是按需引入，请检查 `unplugin-vue-components` 插件的配置是否正确。

**❓ Q: 使用组件时 TypeScript 提示找不到类型？**

**✅ A:** 如果您使用了按需引入，请确保 `vite.config.ts` 中的 `dts` 选项已正确配置，并检查生成的 `components.d.ts` 文件是否已包含在项目的 `tsconfig.json` 的 `include` 范围内。

**❓ Q: 是否支持服务端渲染 (SSR)？**

**✅ A:** (这里根据您组件库的实际情况回答) 是的，YC Design Vue 经过精心设计，完全兼容 Nuxt.js 等服务端渲染环境。/ 目前正在积极适配中，敬请期待。

## ❤️ 社区与支持

我们是一个开放和友好的社区。如果您在使用过程中遇到任何问题，或有任何建议，欢迎通过以下方式与我们交流：

- 🐞 **报告 Bug**: 在 **[GitHub Issues](https://github.com/boy-twilight-lee/yc-design-vue/issues)** 查找类似的问题或提交新的 Issue。
- 💡 **功能建议**: 同样可以通过 **[GitHub Issues](https://github.com/boy-twilight-lee/yc-design-vue/issues/new)** 提出您的宝贵想法。
- 💬 **参与讨论**: 在 **[Discussions](https://github.com/boy-twilight-lee/yc-design-vue/discussions)** 分享您的想法和经验。
