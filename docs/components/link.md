# Link 链接

Link 链接组件用于页面间导航或外部链接跳转，支持不同状态和样式。

---

### 基础用法

链接的基本用法。

<div class="cell-demo">
  <yc-space>
    <yc-link href="link">Link</yc-link>
    <yc-link href="link" disabled>Link</yc-link>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-link href="link">Link</yc-link>
    <yc-link
      href="link"
      disabled
      >Link</yc-link
    >
  </yc-space>
</template>
```

</details>

### 链接的状态

链接的状态分为 <yc-tag>normal</yc-tag> - 正常（默认）、<yc-tag>success</yc-tag> - 成功、<yc-tag>warning</yc-tag> - 警告、<yc-tag>danger</yc-tag> - 危险四种。

<div class="cell-demo">
  <yc-space direction="vertical">
    <yc-space>
      <yc-link href="link">Normal Link</yc-link>
      <yc-link href="link" disabled>Normal Link</yc-link>
    </yc-space>
    <yc-space>
      <yc-link href="link" status="success">Success Link</yc-link>
      <yc-link href="link" status="success" disabled>Success Link</yc-link>
    </yc-space>
    <yc-space>
      <yc-link href="link" status="warning">Warning Link</yc-link>
      <yc-link href="link" status="warning" disabled>Warning Link</yc-link>
    </yc-space>
    <yc-space>
      <yc-link href="link" status="danger">Danger Link</yc-link>
      <yc-link href="link" status="danger" disabled>Danger Link</yc-link>
    </yc-space>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space direction="vertical">
    <yc-space>
      <yc-link href="link">Normal Link</yc-link>
      <yc-link
        href="link"
        disabled
        >Normal Link</yc-link
      >
    </yc-space>
    <yc-space>
      <yc-link
        href="link"
        status="success"
        >Success Link</yc-link
      >
      <yc-link
        href="link"
        status="success"
        disabled
        >Success Link</yc-link
      >
    </yc-space>
    <yc-space>
      <yc-link
        href="link"
        status="warning"
        >Warning Link</yc-link
      >
      <yc-link
        href="link"
        status="warning"
        disabled
        >Warning Link</yc-link
      >
    </yc-space>
    <yc-space>
      <yc-link
        href="link"
        status="danger"
        >Danger Link</yc-link
      >
      <yc-link
        href="link"
        status="danger"
        disabled
        >Danger Link</yc-link
      >
    </yc-space>
  </yc-space>
</template>
```

</details>

### 悬浮状态底色

可以通过 hoverable 属性设置是否在悬浮状态时隐藏底色。

<div class="cell-demo">
  <yc-space>
    <yc-link href="link" :hoverable="false">Link</yc-link>
    <yc-link href="link" status="danger" :hoverable="false">Link</yc-link>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-link
      href="link"
      :hoverable="false"
      >Link</yc-link
    >
    <yc-link
      href="link"
      status="danger"
      :hoverable="false"
      >Link</yc-link
    >
  </yc-space>
</template>
```

</details>

### 图标

通过 <yc-tag>icon</yc-tag> 设置带图标的链接，设置为 <yc-tag>true</yc-tag> 时候显示默认图标。

 <div class='cell-demo'>
    <yc-space>
      <yc-link href="link" icon>Link</yc-link>
      <yc-link href="link" disabled icon>Link</yc-link>
    </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div>
    <yc-space>
      <yc-link
        href="link"
        icon
        >Link</yc-link
      >
      <yc-link
        href="link"
        disabled
        icon
        >Link</yc-link
      >
    </yc-space>
  </div>
  <div>
    <yc-space>
      <yc-link href="link">
        <template #icon>
          <icon-edit />
        </template>
        Link
      </yc-link>
      <yc-link
        href="link"
        disabled>
        <template #icon>
          <icon-edit />
        </template>
        Link
      </yc-link>
    </yc-space>
  </div>
</template>
```

</details>

### 加载中状态

通过设置 <yc-tag>loading</yc-tag> 可以让链接处于加载中状态。处于加载中状态的链接不会触发点击事件。

 <div class='cell-demo'>
  <yc-space>
    <yc-link loading>Link</yc-link>
    <yc-link :loading="loading1" @click="handleClick1">Link</yc-link>
    <yc-link :loading="loading2" @click="handleClick2">
      <template #icon>
        <icon-edit />
      </template>
      Link
    </yc-link>
  </yc-space>
</div>

<script setup>
import { ref } from 'vue';
const loading1 = ref(false);
const loading2 = ref(false);

const handleClick1 = () => {
      loading1.value = true;
      setTimeout(() => {
        loading1.value = false;
      }, 3000);
    }
const handleClick2 = () => {
      loading2.value = true;
      setTimeout(() => {
        loading2.value = false;
      }, 3000);
    }

</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-link loading>Link</yc-link>
    <yc-link
      :loading="loading1"
      @click="handleClick1"
      >Link</yc-link
    >
    <yc-link
      :loading="loading2"
      @click="handleClick2">
      <template #icon>
        <icon-edit />
      </template>
      Link
    </yc-link>
  </yc-space>
</template>

<script setup>
import { ref } from 'vue';
const loading1 = ref(false);
const loading2 = ref(false);

const handleClick1 = () => {
  loading1.value = true;
  setTimeout(() => {
    loading1.value = false;
  }, 3000);
};
const handleClick2 = () => {
  loading2.value = true;
  setTimeout(() => {
    loading2.value = false;
  }, 3000);
};
</script>
```

</details>

## API

### Link Props

| 参数名    | 描述           | 类型                                             | 默认值     |
| --------- | -------------- | ------------------------------------------------ | ---------- |
| href      | 链接地址       | `string`                                         | `-`        |
| icon      | 是否显示图标   | `boolean`                                        | `false`    |
| status    | 链接状态       | `'normal' \| 'success' \| 'warning' \| 'danger'` | `'normal'` |
| hoverable | 是否有悬停效果 | `boolean`                                        | `true`     |
| disabled  | 是否禁用       | `boolean`                                        | `false`    |
| loading   | 是否加载中     | `boolean`                                        | `false`    |

### Link Events

| 事件名      | 描述           | 参数                  |
| ----------- | -------------- | --------------------- |
| click       | 点击时触发     | `(event: MouseEvent)` |
| dblclick    | 双击时触发     | `(event: MouseEvent)` |
| contextmenu | 右键点击时触发 | `(event: MouseEvent)` |

### Link Slots

| 插槽名  | 描述       |
| ------- | ---------- |
| default | 链接内容   |
| icon    | 自定义图标 |

## 注意事项

1. 设置 `href` 属性时链接会表现为标准的 `<a>` 标签
2. 禁用状态的链接不会触发任何事件
3. 加载状态会显示加载动画并禁用点击
4. 可以同时使用 `href` 和 `@click` 事件
5. 外部链接建议添加适当的图标以区分内部链接
