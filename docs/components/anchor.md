# Anchor 锚点

用于跳转到页面指定位置。

## 何时使用

- 当页面内容较长，需要快速定位到某个部分时
- 当页面有多个章节，需要显示章节导航时
- 当需要实现页面内导航功能时

## 基础用法

最简单的用法，通过 `href` 属性指定锚点。

```vue
<template>
  <div class="anchor-demo">
    <YcAnchor>
      <YcAnchorLink
        href="#basic"
        title="基础用法" />
      <YcAnchorLink
        href="#static"
        title="静态展示" />
      <YcAnchorLink
        href="#api"
        title="API" />
    </YcAnchor>

    <div class="content">
      <h2 id="basic">基础用法</h2>
      <p>这是基础用法的内容...</p>

      <h2 id="static">静态展示</h2>
      <p>这是静态展示的内容...</p>

      <h2 id="api">API</h2>
      <p>这是API的内容...</p>
    </div>
  </div>
</template>

<style scoped>
.anchor-demo {
  display: flex;
  gap: 20px;
}

.content {
  flex: 1;
}

h2 {
  margin-top: 60px;
  padding-top: 20px;
}
</style>
```

## 无连接线

通过 `lineLess` 属性隐藏连接线。

```vue
<template>
  <YcAnchor :line-less="true">
    <YcAnchorLink
      href="#basic"
      title="基础用法" />
    <YcAnchorLink
      href="#static"
      title="静态展示" />
    <YcAnchorLink
      href="#api"
      title="API" />
  </YcAnchor>
</template>
```

## 嵌套锚点

支持嵌套的锚点结构。

```vue
<template>
  <YcAnchor>
    <YcAnchorLink
      href="#chapter1"
      title="第一章">
      <template #sublist>
        <YcAnchorLink
          href="#chapter1-1"
          title="1.1 基础概念" />
        <YcAnchorLink
          href="#chapter1-2"
          title="1.2 进阶用法" />
      </template>
    </YcAnchorLink>
    <YcAnchorLink
      href="#chapter2"
      title="第二章">
      <template #sublist>
        <YcAnchorLink
          href="#chapter2-1"
          title="2.1 实践案例" />
        <YcAnchorLink
          href="#chapter2-2"
          title="2.2 注意事项" />
      </template>
    </YcAnchorLink>
  </YcAnchor>
</template>
```

## 自定义滚动容器

通过 `scrollContainer` 属性指定滚动容器。

```vue
<template>
  <div
    class="scroll-container"
    ref="containerRef">
    <YcAnchor :scroll-container="containerRef">
      <YcAnchorLink
        href="#section1"
        title="第一部分" />
      <YcAnchorLink
        href="#section2"
        title="第二部分" />
    </YcAnchor>

    <div class="content">
      <div id="section1">第一部分内容...</div>
      <div id="section2">第二部分内容...</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const containerRef = ref();
</script>

<style scoped>
.scroll-container {
  height: 400px;
  overflow: auto;
  border: 1px solid #d9d9d9;
  padding: 20px;
}
</style>
```

## 滚动行为控制

通过 `smooth` 属性控制滚动是否平滑。

```vue
<template>
  <YcAnchor :smooth="false">
    <YcAnchorLink
      href="#section1"
      title="第一部分" />
    <YcAnchorLink
      href="#section2"
      title="第二部分" />
  </YcAnchor>
</template>
```

## 边界对齐方式

通过 `boundary` 属性控制锚点对齐方式。

```vue
<template>
  <YcAnchor boundary="center">
    <YcAnchorLink
      href="#section1"
      title="居中对齐" />
    <YcAnchorLink
      href="#section2"
      title="第二部分" />
  </YcAnchor>
</template>
```

## 不改变URL哈希

通过 `changeHash` 属性控制是否改变URL哈希。

```vue
<template>
  <YcAnchor :change-hash="false">
    <YcAnchorLink
      href="#section1"
      title="不改变哈希" />
    <YcAnchorLink
      href="#section2"
      title="第二部分" />
  </YcAnchor>
</template>
```

## 自定义内容

通过插槽自定义锚点内容。

```vue
<template>
  <YcAnchor>
    <YcAnchorLink
      href="#custom"
      title="自定义内容">
      <template #default>
        <span style="color: #1890ff;">🎯 自定义样式</span>
      </template>
    </YcAnchorLink>
  </YcAnchor>
</template>
```

## API

### Anchor Props

| 参数            | 说明            | 类型                                                  | 默认值    |
| --------------- | --------------- | ----------------------------------------------------- | --------- |
| boundary        | 锚点对齐方式    | `'start' \| 'end' \| 'center' \| 'nearest' \| number` | `'start'` |
| lineLess        | 是否隐藏连接线  | `boolean`                                             | `false`   |
| scrollContainer | 滚动容器        | `TargetContainer`                                     | -         |
| changeHash      | 是否改变URL哈希 | `boolean`                                             | `true`    |
| smooth          | 是否平滑滚动    | `boolean`                                             | `true`    |

### AnchorLink Props

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| title | 锚点标题 | `string` | -      |
| href  | 锚点链接 | `string` | -      |

### Anchor Slots

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 锚点链接列表 |

### AnchorLink Slots

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 锚点标题内容 |
| sublist | 子锚点列表   |

## 注意事项

1. `boundary` 属性支持字符串值和数字值，数字值表示距离顶部的偏移量
2. 当设置 `scrollContainer` 时，锚点会在指定的容器内滚动
3. `changeHash` 为 `false` 时，点击锚点不会改变URL哈希，但仍会滚动到目标位置
4. 支持无限嵌套的锚点结构
5. 组件会自动监听滚动事件，高亮当前激活的锚点
