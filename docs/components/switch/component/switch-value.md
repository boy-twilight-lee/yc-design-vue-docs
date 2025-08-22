### 基本用法

开关分为 <yc-tag>circle</yc-tag> - 圆形（默认）、<yc-tag>round</yc-tag> - 圆角、<yc-tag>line</yc-tag> - 线性三种类型。

<div class="cell-demo vp-raw">
  <yc-space
    direction="vertical"
    size="large">
    <yc-switch
      v-model="value"
      checked-value="yes"
      unchecked-value="no" />
    <div>Current Value: {{ value }}</div>
  </yc-space>
</div>

<script setup>
import { ref } from 'vue';
const value = ref('');
</script>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-space
    direction="vertical"
    size="large">
    <yc-switch
      v-model="value"
      checked-value="yes"
      unchecked-value="no" />
    <div>Current Value: {{ value }}</div>
  </yc-space>
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
```

</details>
