# Layout 布局

页面的基础布局框架，常与组件嵌套使用，构建页面整体布局。

---

### 基本用法

典型的页面布局。

<div class="cell-demo">
  <div class="layout-demo">
    <yc-layout style="height: 400px;">
      <yc-layout-header>Header</yc-layout-header>
      <yc-layout-content>Content</yc-layout-content>
      <yc-layout-footer>Footer</yc-layout-footer>
    </yc-layout>
    <br />
    <yc-layout style="height: 400px;">
      <yc-layout-header>Header</yc-layout-header>
      <yc-layout>
        <yc-layout-sider theme="dark">Sider</yc-layout-sider>
        <yc-layout-content>Content</yc-layout-content>
      </yc-layout>
      <yc-layout-footer>Footer</yc-layout-footer>
    </yc-layout>
    <br />
    <yc-layout style="height: 400px;">
      <yc-layout-header>Header</yc-layout-header>
      <yc-layout>
        <yc-layout-content>Content</yc-layout-content>
        <yc-layout-sider>Sider</yc-layout-sider>
      </yc-layout>
      <yc-layout-footer>Footer</yc-layout-footer>
    </yc-layout>
    <br />
    <yc-layout style="height: 400px;">
      <yc-layout-header>Header</yc-layout-header>
      <yc-layout>
        <yc-layout-sider style="width: 64px;">Sider</yc-layout-sider>
        <yc-layout-sider style="width: 206px; margin-left: 1px;">Sider</yc-layout-sider>
        <yc-layout-content>Content</yc-layout-content>
      </yc-layout>
      <yc-layout-footer>Footer</yc-layout-footer>
    </yc-layout>
  </div>
</div>

<style scoped>
.layout-demo :deep(.yc-layout-header),
.layout-demo :deep(.yc-layout-footer),
.layout-demo :deep(.yc-layout-sider-children),
.layout-demo :deep(.yc-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
.layout-demo :deep(.yc-layout-header),
.layout-demo :deep(.yc-layout-footer) {
height: 64px;
background-color: var(--color-primary-light-4);
}
.layout-demo :deep(.yc-layout-sider) {
width: 206px;
background-color: var(--color-primary-light-3);
}
.layout-demo :deep(.yc-layout-content) {
background-color: rgb(var(--arcoblue-6));
}
</style>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div class="layout-demo">
    <yc-layout style="height: 400px;">
      <yc-layout-header>Header</yc-layout-header>
      <yc-layout-content>Content</yc-layout-content>
      <yc-layout-footer>Footer</yc-layout-footer>
    </yc-layout>
    <br />
    <yc-layout style="height: 400px;">
      <yc-layout-header>Header</yc-layout-header>
      <yc-layout>
        <yc-layout-sider theme="dark">Sider</yc-layout-sider>
        <yc-layout-content>Content</yc-layout-content>
      </yc-layout>
      <yc-layout-footer>Footer</yc-layout-footer>
    </yc-layout>
    <br />
    <yc-layout style="height: 400px;">
      <yc-layout-header>Header</yc-layout-header>
      <yc-layout>
        <yc-layout-content>Content</yc-layout-content>
        <yc-layout-sider>Sider</yc-layout-sider>
      </yc-layout>
      <yc-layout-footer>Footer</yc-layout-footer>
    </yc-layout>
    <br />
    <yc-layout style="height: 400px;">
      <yc-layout-header>Header</yc-layout-header>
      <yc-layout>
        <yc-layout-sider style="width: 64px;">Sider</yc-layout-sider>
        <yc-layout-sider style="width: 206px; margin-left: 1px;"
          >Sider</yc-layout-sider
        >
        <yc-layout-content>Content</yc-layout-content>
      </yc-layout>
      <yc-layout-footer>Footer</yc-layout-footer>
    </yc-layout>
  </div>
</template>

<style scoped>
.layout-demo :deep(.yc-layout-header),
.layout-demo :deep(.yc-layout-footer),
.layout-demo :deep(.yc-layout-sider-children),
.layout-demo :deep(.yc-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.layout-demo :deep(.yc-layout-header),
.layout-demo :deep(.yc-layout-footer) {
  height: 64px;
  background-color: var(--color-primary-light-4);
}

.layout-demo :deep(.yc-layout-sider) {
  width: 206px;
  background-color: var(--color-primary-light-3);
}

.layout-demo :deep(.yc-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}
</style>
```

</details>

### 可伸缩侧边栏

可以用鼠标进行拖拽放大缩小的侧边栏，需要用到的参数：<yc-tag>resizeDirections</yc-tag>。

<div class="cell-demo">
  <div class="layout-demo">
    <yc-layout>
      <yc-layout-header>Header</yc-layout-header>
      <yc-layout>
        <yc-layout-sider :resize-directions="['right']" class="resize-sider">
          Sider
        </yc-layout-sider>
        <yc-layout-content>Content</yc-layout-content>
      </yc-layout>
      <yc-layout-footer>Footer</yc-layout-footer>
    </yc-layout>
  </div>
</div>

<style scoped>
.layout-demo :deep(.yc-layout-header),
.layout-demo :deep(.yc-layout-footer),
.layout-demo :deep(.yc-layout-sider-children),
.layout-demo :deep(.yc-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
.layout-demo :deep(.yc-layout-header),
.layout-demo :deep(.yc-layout-footer) {
height: 64px;
background-color: var(--color-primary-light-4);
}
.layout-demo :deep(.resize-sider) {
width: 206px;
background-color: var(--color-primary-light-3);
min-width: 150px;
max-width: 500px;
height: 200px;
}
.layout-demo :deep(.yc-layout-content) {
background-color: rgb(var(--arcoblue-6));
}
</style>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div class="layout-demo">
    <yc-layout>
      <yc-layout-header>Header</yc-layout-header>
      <yc-layout>
        <yc-layout-sider :resize-directions="['right']">
          Sider
        </yc-layout-sider>
        <yc-layout-content>Content</yc-layout-content>
      </yc-layout>
      <yc-layout-footer>Footer</yc-layout-footer>
    </yc-layout>
  </div>
</template>

<style scoped>
.layout-demo :deep(.yc-layout-header),
.layout-demo :deep(.yc-layout-footer),
.layout-demo :deep(.yc-layout-sider-children),
.layout-demo :deep(.yc-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
.layout-demo :deep(.yc-layout-header),
.layout-demo :deep(.yc-layout-footer) {
  height: 64px;
  background-color: var(--color-primary-light-4);
}
.layout-demo :deep(.yc-layout-sider) {
  width: 206px;
  background-color: var(--color-primary-light-3);
  min-width: 150px;
  max-width: 500px;
  height: 200px;
}
.layout-demo :deep(.yc-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}
</style>
```

</details>

## API

### Layout Props

| 参数     | 说明           | 类型      | 默认值 |
| -------- | -------------- | --------- | ------ |
| hasSider | 是否包含侧边栏 | `boolean` | -      |

### LayoutSider Props

| 参数             | 说明             | 类型               | 默认值   |
| ---------------- | ---------------- | ------------------ | -------- |
| theme            | 主题             | `Theme`            | `'dark'` |
| collapsed        | 是否折叠         | `boolean`          | -        |
| defaultCollapsed | 默认是否折叠     | `boolean`          | `false`  |
| collapsible      | 是否可折叠       | `boolean`          | `false`  |
| width            | 宽度             | `number`           | `200`    |
| collapsedWidth   | 折叠时宽度       | `number`           | `80`     |
| reverseArrow     | 是否反转箭头     | `boolean`          | `false`  |
| breakpoint       | 响应式断点       | `BreakpointName`   | -        |
| hideTrigger      | 是否隐藏触发器   | `boolean`          | `false`  |
| resizeDirections | 可调整尺寸的方向 | `ResizeDirections` | -        |

### Events

| 事件名           | 说明                 | 回调参数                                                     |
| ---------------- | -------------------- | ------------------------------------------------------------ |
| update:collapsed | 折叠状态变化时触发   | `(collapsed: boolean)`                                       |
| collapse         | 折叠状态变化时触发   | `(collapsed: boolean, type: 'clickTrigger' \| 'responsive')` |
| breakpoint       | 响应式断点触发时触发 | `(collapsed: boolean)`                                       |

### Slots

| 插槽名  | 说明         | 参数                     |
| ------- | ------------ | ------------------------ |
| default | 布局内容     | -                        |
| trigger | 自定义触发器 | `{ collapsed: boolean }` |

## 注意事项

1. Layout 组件会自动检测是否包含侧边栏
2. 侧边栏支持响应式折叠和手动折叠
3. 可以通过插槽自定义折叠触发器
4. 支持多种主题和尺寸调整
