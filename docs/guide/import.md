# 按需引入

为了减小应用的打包体积，您可以选择按需引入需要的组件，而不是引入整个组件库。

## 自动按需引入（推荐）

我们推荐使用 `unplugin-vue-components` 和 `unplugin-auto-import` 来实现自动按需引入。

### 安装插件

```bash
npm install unplugin-vue-components unplugin-auto-import -D
```

### 配置 Vite

在 `vite.config.ts` 中配置：

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { YcDesignVueResolver } from 'yc-design-vue/es/resolver';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [YcDesignVueResolver()],
    }),
    Components({
      resolvers: [YcDesignVueResolver()],
    }),
  ],
});
```

### 配置 Webpack

在 `webpack.config.js` 中配置：

```javascript
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { YcDesignVueResolver } = require('yc-design-vue/es/resolver');

module.exports = {
  plugins: [
    AutoImport({
      resolvers: [YcDesignVueResolver()],
    }),
    Components({
      resolvers: [YcDesignVueResolver()],
    }),
  ],
};
```

### 使用组件

配置完成后，您就可以直接在模板中使用组件，无需手动引入：

```vue
<template>
  <yc-button type="primary">主要按钮</yc-button>
  <yc-input
    v-model="text"
    placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue';

const text = ref('');
</script>
```

## 手动按需引入

如果您不想使用自动引入插件，也可以手动按需引入组件。

### 引入组件

```typescript
import { Button, Input } from 'yc-design-vue';
import 'yc-design-vue/es/button/style/css';
import 'yc-design-vue/es/input/style/css';
```

### 注册组件

#### 全局注册

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { Button, Input } from 'yc-design-vue';

const app = createApp(App);

app.component('yc-button', Button);
app.component('yc-input', Input);

app.mount('#app');
```

#### 局部注册

```vue
<template>
  <yc-button type="primary">主要按钮</yc-button>
  <yc-input
    v-model="text"
    placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue';
import { Button, Input } from 'yc-design-vue';
import 'yc-design-vue/es/button/style/css';
import 'yc-design-vue/es/input/style/css';

const text = ref('');
</script>
```

## 样式引入

### CSS 样式

如果您只想引入组件的 CSS 样式，可以使用：

```javascript
import 'yc-design-vue/es/button/style/css';
import 'yc-design-vue/es/input/style/css';
```

### Less 样式

如果您使用 Less 预处理器，可以引入 Less 文件：

```javascript
import 'yc-design-vue/es/button/style';
import 'yc-design-vue/es/input/style';
```

## Babel 插件

我们也提供了 Babel 插件来实现按需引入：

### 安装插件

```bash
npm install babel-plugin-yc-design-vue -D
```

### 配置 Babel

在 `.babelrc` 或 `babel.config.js` 中配置：

```javascript
{
  "plugins": [
    ["yc-design-vue", {
      "libraryName": "yc-design-vue",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```

### 使用

配置完成后，您可以这样引入组件：

```javascript
import { Button, Input } from 'yc-design-vue';
// 会自动转换为：
// import Button from 'yc-design-vue/es/button'
// import Input from 'yc-design-vue/es/input'
// import 'yc-design-vue/es/button/style'
// import 'yc-design-vue/es/input/style'
```

## Tree Shaking

现代打包工具（如 Webpack、Rollup、Vite）支持 Tree Shaking，可以自动移除未使用的代码。YC Design Vue 的 ES 模块构建版本支持 Tree Shaking。

如果您使用 ES 模块引入：

```javascript
import { Button, Input } from 'yc-design-vue';
```

打包工具会自动移除未使用的组件代码。

## 注意事项

1. **样式引入**：按需引入组件时，请确保也引入了对应的样式文件
2. **TypeScript 支持**：按需引入的组件同样具有完整的 TypeScript 类型支持
3. **体积优化**：按需引入可以显著减小最终的打包体积
4. **开发体验**：推荐使用自动按需引入插件以获得更好的开发体验

## 打包体积对比

以下是不同引入方式的大致体积对比（gzipped）：

| 引入方式             | 体积  | 说明               |
| -------------------- | ----- | ------------------ |
| 完整引入             | ~60KB | 包含所有组件和样式 |
| 按需引入（5个组件）  | ~15KB | 仅包含使用的组件   |
| 按需引入（单个组件） | ~5KB  | 最小化体积         |

具体体积会根据使用的组件数量和复杂度有所不同。
