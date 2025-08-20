---
layout: home
hero:
  name: YC Design Vue
  text: 基于 Vue 3 的现代化 UI 组件库
  tagline: 开箱即用、功能丰富、高度可定制的界面解决方案
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/
    - theme: alt
      text: 查看组件
      link: /components/button
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/boy-twilight-lee/yc-design-vue

features:
  - icon: 🚀
    title: 基于 Vue 3
    details: 充分利用 Vue 3 的新特性，如 Composition API，性能更优
  - icon: 💪
    title: TypeScript 支持
    details: 使用 TypeScript 编写，提供完整的类型定义
  - icon: 🎨
    title: 开箱即用
    details: 引入方式简单，学习成本低，可以快速上手
  - icon: 🎯
    title: 主题定制
    details: 支持灵活的样式覆盖和主题定制，轻松匹配您的品牌视觉
  - icon: 📱
    title: 组件类型丰富
    details: 70+ 个高质量组件，覆盖移动端主流场景
  - icon: 🌟
    title: 企业级品质
    details: 经过严格测试，稳定可靠，适合企业级应用开发
---

## 快速开始

### 安装

```bash
# 使用 npm
npm install yc-design-vue --save

# 使用 yarn
yarn add yc-design-vue
```

### 完整引入

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import YcDesign from 'yc-design-vue';
import 'yc-design-vue/es/style.css';

const app = createApp(App);
app.use(YcDesign);
app.mount('#app');
```

## 组件总览

YC Design Vue 提供了丰富的组件，涵盖：

- **通用组件**：按钮、图标、排版等基础组件
- **布局组件**：栅格、布局、间距等布局相关组件
- **导航组件**：菜单、标签页、面包屑等导航组件
- **数据录入**：输入框、选择器、日期选择器等表单组件
- **数据展示**：表格、列表、卡片等数据展示组件
- **反馈组件**：对话框、提示、加载等反馈组件

## 设计原则

- **一致性**：保持设计语言的一致性，提供统一的用户体验
- **可用性**：注重组件的可用性和易用性
- **可访问性**：遵循无障碍设计原则，支持键盘导航和屏幕阅读器
- **性能**：优化组件性能，确保流畅的用户体验
- **可定制性**：提供灵活的配置选项，满足不同的设计需求

## 浏览器支持

- Chrome >= 64
- Firefox >= 58
- Safari >= 12
- Edge >= 79

## 贡献

欢迎任何形式的贡献！如果您在使用过程中发现任何问题，或者有功能建议，欢迎在项目的代码仓库中提交 Issue 或 Pull Request。

## 许可证

本项目基于 [MIT](https://opensource.org/licenses/MIT) 许可证。
