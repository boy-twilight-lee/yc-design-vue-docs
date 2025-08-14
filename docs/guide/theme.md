# 主题定制

YC Design Vue 提供了灵活的主题定制方案，您可以根据项目需求轻松定制组件样式。

## CSS 变量

组件库使用 CSS 变量来定义主题颜色和样式，您可以通过覆盖这些变量来自定义主题。

### 主要颜色变量

```css
:root {
  /* 主题色 */
  --yc-primary-color: #165dff;
  --yc-primary-light-1: #3370ff;
  --yc-primary-light-2: #4080ff;
  --yc-primary-light-3: #5c91ff;
  --yc-primary-light-4: #7ba1ff;
  --yc-primary-light-5: #94b2ff;
  --yc-primary-light-6: #adc2ff;
  --yc-primary-light-7: #c5d3ff;
  --yc-primary-light-8: #dee3ff;
  --yc-primary-light-9: #f2f4ff;

  /* 功能色 */
  --yc-success-color: #00b42a;
  --yc-warning-color: #ff7d00;
  --yc-error-color: #f53f3f;
  --yc-info-color: #909399;

  /* 中性色 */
  --yc-text-color-primary: #1d2129;
  --yc-text-color-regular: #4e5969;
  --yc-text-color-secondary: #86909c;
  --yc-text-color-placeholder: #c9cdd4;
  --yc-text-color-disabled: #c9cdd4;

  /* 边框色 */
  --yc-border-color: #e5e6eb;
  --yc-border-color-light: #f2f3f5;
  --yc-border-color-lighter: #f7f8fa;

  /* 背景色 */
  --yc-bg-color: #ffffff;
  --yc-bg-color-light: #f7f8fa;
  --yc-bg-color-lighter: #fafbfc;
}
```

### 暗色主题

```css
[data-theme='dark'] {
  /* 主题色保持不变 */
  --yc-primary-color: #3370ff;

  /* 功能色 */
  --yc-success-color: #27ae60;
  --yc-warning-color: #f39c12;
  --yc-error-color: #e74c3c;

  /* 文字色 */
  --yc-text-color-primary: #e5e6eb;
  --yc-text-color-regular: #c9cdd4;
  --yc-text-color-secondary: #86909c;
  --yc-text-color-placeholder: #6b7785;
  --yc-text-color-disabled: #6b7785;

  /* 边框色 */
  --yc-border-color: #3a3a3a;
  --yc-border-color-light: #2e2e30;
  --yc-border-color-lighter: #232324;

  /* 背景色 */
  --yc-bg-color: #17171a;
  --yc-bg-color-light: #1e1e20;
  --yc-bg-color-lighter: #232324;
}
```

## 组件样式变量

### 按钮组件

```css
:root {
  --yc-button-height-mini: 24px;
  --yc-button-height-small: 28px;
  --yc-button-height-medium: 32px;
  --yc-button-height-large: 36px;

  --yc-button-border-radius: 2px;
  --yc-button-font-size: 14px;
  --yc-button-font-weight: 400;

  --yc-button-padding-horizontal: 15px;
  --yc-button-padding-vertical: 0;
}
```

### 输入框组件

```css
:root {
  --yc-input-height-mini: 24px;
  --yc-input-height-small: 28px;
  --yc-input-height-medium: 32px;
  --yc-input-height-large: 36px;

  --yc-input-border-radius: 2px;
  --yc-input-font-size: 14px;
  --yc-input-padding-horizontal: 11px;
  --yc-input-padding-vertical: 0;
}
```

## 使用方式

### 在项目中自定义主题

在您的项目样式文件中覆盖 CSS 变量：

```css
/* styles/theme.css */
:root {
  /* 自定义主色调 */
  --yc-primary-color: #1890ff;

  /* 自定义成功色 */
  --yc-success-color: #52c41a;

  /* 自定义警告色 */
  --yc-warning-color: #faad14;

  /* 自定义错误色 */
  --yc-error-color: #f5222d;

  /* 自定义圆角 */
  --yc-button-border-radius: 6px;
  --yc-input-border-radius: 6px;
}
```

然后在项目入口文件中引入：

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import YcUi from 'yc-design-vue';
import 'yc-design-vue/es/style.css';
import './styles/theme.css'; // 引入自定义主题

const app = createApp(App);
app.use(YcUi);
app.mount('#app');
```

### 动态切换主题

您可以通过 JavaScript 动态修改 CSS 变量来实现主题切换：

```typescript
// 切换到暗色主题
function switchToDarkTheme() {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// 切换到亮色主题
function switchToLightTheme() {
  document.documentElement.removeAttribute('data-theme');
}

// 动态修改主题色
function changeThemeColor(color: string) {
  document.documentElement.style.setProperty('--yc-primary-color', color);
}
```

### 使用 ConfigProvider

YC Design Vue 提供了 `ConfigProvider` 组件来全局配置主题：

```vue
<template>
  <yc-config-provider :theme="theme">
    <App />
  </yc-config-provider>
</template>

<script setup>
import { ref } from 'vue';

const theme = ref({
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    borderRadius: 6,
  },
});
</script>
```

## 预设主题

### Ant Design 风格

```css
:root {
  --yc-primary-color: #1890ff;
  --yc-success-color: #52c41a;
  --yc-warning-color: #faad14;
  --yc-error-color: #f5222d;
  --yc-button-border-radius: 6px;
  --yc-input-border-radius: 6px;
}
```

### Element Plus 风格

```css
:root {
  --yc-primary-color: #409eff;
  --yc-success-color: #67c23a;
  --yc-warning-color: #e6a23c;
  --yc-error-color: #f56c6c;
  --yc-button-border-radius: 4px;
  --yc-input-border-radius: 4px;
}
```

### Material Design 风格

```css
:root {
  --yc-primary-color: #2196f3;
  --yc-success-color: #4caf50;
  --yc-warning-color: #ff9800;
  --yc-error-color: #f44336;
  --yc-button-border-radius: 4px;
  --yc-input-border-radius: 4px;
}
```

## Less 变量

如果您在项目中使用 Less，可以通过 Less 变量来定制主题：

```less
// theme.less
@primary-color: #1890ff;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #f5222d;
@border-radius-base: 6px;
@font-size-base: 14px;

// 编译为 CSS 变量
:root {
  --yc-primary-color: @primary-color;
  --yc-success-color: @success-color;
  --yc-warning-color: @warning-color;
  --yc-error-color: @error-color;
  --yc-button-border-radius: @border-radius-base;
  --yc-input-border-radius: @border-radius-base;
}
```

## 注意事项

1. **兼容性**: CSS 变量在现代浏览器中有良好的支持，但在 IE 中需要 polyfill
2. **优先级**: 自定义的 CSS 变量需要确保优先级高于组件库的默认样式
3. **作用域**: CSS 变量具有作用域特性，可以在特定容器内生效
4. **性能**: 使用 CSS 变量进行主题切换性能更好，避免了重新加载样式文件

## 常见问题

### Q: 如何实现按组件定制样式？

A: 您可以通过 CSS 选择器来针对特定组件定制样式：

```css
.my-custom-button {
  --yc-primary-color: #ff6b6b;
}
```

### Q: 如何实现局部主题？

A: 在特定容器内设置 CSS 变量：

```css
.theme-container {
  --yc-primary-color: #52c41a;
  --yc-button-border-radius: 20px;
}
```

### Q: 主题切换时如何添加过渡效果？

A: 在根元素上添加 transition：

```css
:root {
  transition:
    background-color 0.3s,
    color 0.3s;
}
```
