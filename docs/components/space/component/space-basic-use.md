### 基本用法

间距组件的基本用法。

<div class="cell-demo">
  <yc-space>
    <yc-typography-text>Space:</yc-typography-text>
    <yc-tag v-if="false" color='arcoblue'>Tag</yc-tag>
    <yc-button type="primary">Item1</yc-button>
    <yc-button type="primary">Item2</yc-button>
    <yc-switch defaultChecked />
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-typography-text>Space:</yc-typography-text>
    <yc-tag
      v-if="false"
      color="arcoblue">
      Tag
    </yc-tag>
    <yc-button type="primary">Item1</yc-button>
    <yc-button type="primary">Item2</yc-button>
    <yc-switch defaultChecked />
  </yc-space>
</template>
```

</details>
