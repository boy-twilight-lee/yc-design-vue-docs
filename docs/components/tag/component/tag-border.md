### 带边框的标签

通过参数 <yc-tag>bordered</yc-tag>，可以显示带边框的标签。

<div class="cell-demo vp-raw">
  <yc-space wrap>
    <yc-tag bordered>default</yc-tag>
    <yc-tag
      v-for="(color, index) of colors"
      :key="index"
      :color="color"
      bordered
      >{{ color }}</yc-tag
    >
  </yc-space>
</div>

<script setup>
const colors = [
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space wrap>
    <yc-tag bordered>default</yc-tag>
    <yc-tag
      v-for="(color, index) of colors"
      :key="index"
      :color="color"
      bordered
      >{{ color }}</yc-tag
    >
  </yc-space>
</template>

<script setup>
const colors = [
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];
</script>
```

</details>
