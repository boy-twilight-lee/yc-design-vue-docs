### 尺寸

内置 4 个尺寸，<yc-tag>mini - 4px</yc-tag> <yc-tag>small - 8px (默认)</yc-tag> <yc-tag>medium - 16px</yc-tag> <yc-tag>large - 24px</yc-tag>，也支持传数字来自定义尺寸。

<div class="cell-demo vp-raw">
  <div>
    <div style="marginBottom: 20px">
      <yc-radio-group v-model="size" type='button'>
        <yc-radio value="mini">mini</yc-radio>
        <yc-radio value="small">small</yc-radio>
        <yc-radio value="medium">medium</yc-radio>
        <yc-radio value="large">large</yc-radio>
      </yc-radio-group>
    </div>
    <yc-space :size="size">
      <yc-button type="primary">Item1</yc-button>
      <yc-button type="primary">Item2</yc-button>
      <yc-button type="primary">Item3</yc-button>
    </yc-space>
  </div>
</div>

<script setup>
import { ref } from 'vue';
const size = ref('medium');
</script>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <div>
    <div style="marginBottom: 20px">
      <yc-radio-group
        v-model="size"
        type="button">
        <yc-radio value="mini">mini</yc-radio>
        <yc-radio value="small">small</yc-radio>
        <yc-radio value="medium">medium</yc-radio>
        <yc-radio value="large">large</yc-radio>
      </yc-radio-group>
    </div>
    <yc-space :size="size">
      <yc-button type="primary">Item1</yc-button>
      <yc-button type="primary">Item2</yc-button>
      <yc-button type="primary">Item3</yc-button>
    </yc-space>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const size = ref('medium');
</script>
```

</details>
