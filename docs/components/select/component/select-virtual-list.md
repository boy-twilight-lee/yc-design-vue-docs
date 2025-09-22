### 虚拟列表

虚拟列表的使用方法。

<div class="cell-demo vp-raw">
  <yc-select
    :style="{ width: '320px' }"
    :options="options"
    placeholder="Please select ..."
    :virtual-list-props="{ itemHeight: 36 }" />
</div>

<script setup>
const options = Array(1000)
  .fill(null)
  .map((_, index) => `Option ${index}`);
</script>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-select
    :style="{ width: '320px' }"
    :options="options"
    placeholder="Please select ..."
    :virtual-list-props="{ itemHeight: 36 }" />
</template>

<script setup>
const options = Array(1000)
  .fill(null)
  .map((_, index) => `Option ${index}`);
</script>
```

</details>
