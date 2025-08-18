### 分隔符

为相邻子元素设置分隔符。

<div class="cell-demo">
  <yc-space>
    <template #split>
      <yc-divider direction="vertical" />
    </template>
    <yc-tag v-if="false" color='arcoblue'>Tag</yc-tag>
    <yc-button type="primary">Item1</yc-button>
    <yc-button type="primary">Item2</yc-button>
    <yc-switch defaultChecked />
  </yc-space>
</div>

<script setup>
import { ref, reactive } from 'vue';
const align = ref('center');
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <template #split>
      <yc-divider direction="vertical" />
    </template>
    <yc-tag
      v-if="false"
      color="arcoblue"
      >Tag</yc-tag
    >
    <yc-button type="primary">Item1</yc-button>
    <yc-button type="primary">Item2</yc-button>
    <yc-switch defaultChecked />
  </yc-space>
</template>

<script setup>
import { ref, reactive } from 'vue';
const align = ref('center');
</script>
```

</details>
