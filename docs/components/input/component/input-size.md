### 输入框尺寸

输入框分为 <yc-tag>mini</yc-tag>、<yc-tag>small</yc-tag>、<yc-tag>medium</yc-tag>、<yc-tag>large</yc-tag> 四种尺寸。高度分别为：<yc-tag>24px</yc-tag>、<yc-tag>28px</yc-tag>、<yc-tag>32px</yc-tag>、<yc-tag>36px</yc-tag>。推荐（默认）尺寸为 <yc-tag>medium</yc-tag>。可在不同场景及不同业务需求选择适合尺寸。

<div class="cell-demo vp-raw">
  <yc-space
    direction="vertical"
    size="large">
    <yc-radio-group
      type="button"
      v-model="size">
      <yc-radio value="mini">mini</yc-radio>
      <yc-radio value="small">small</yc-radio>
      <yc-radio value="medium">medium</yc-radio>
      <yc-radio value="large">large</yc-radio>
    </yc-radio-group>
    <yc-input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      :size="size"
      allow-clear />
  </yc-space>
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
  <yc-space
    direction="vertical"
    size="large">
    <yc-radio-group
      type="button"
      v-model="size">
      <yc-radio value="mini">mini</yc-radio>
      <yc-radio value="small">small</yc-radio>
      <yc-radio value="medium">medium</yc-radio>
      <yc-radio value="large">large</yc-radio>
    </yc-radio-group>
    <yc-input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      :size="size"
      allow-clear />
  </yc-space>
</template>

<script setup>
import { ref } from 'vue';
const size = ref('medium');
</script>
```

</details>
