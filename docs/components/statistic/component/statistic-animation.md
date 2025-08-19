### 自定义前缀&后缀

通过 <yc-tag>animation</yc-tag> 可以开启数值动画。

<div class="cell-demo vp-raw">
  <yc-statistic
    title="User Growth Rate"
    :value="50.52"
    :precision="2"
    :value-from="0"
    :start="start"
    animation>
    <template #prefix>
      <icon-arrow-rise />
    </template>
    <template #suffix>%</template>
  </yc-statistic>
  <yc-button @click="start = true">Start</yc-button>
</div>

<script setup>
import { ref } from 'vue';
const start = ref(false);
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-statistic
    title="User Growth Rate"
    :value="50.52"
    :precision="2"
    :value-from="0"
    :start="start"
    animation>
    <template #prefix>
      <icon-arrow-rise />
    </template>
    <template #suffix>%</template>
  </yc-statistic>
  <yc-button @click="start = true">Start</yc-button>
</template>

<script setup>
import { ref } from 'vue';
const start = ref(false);
</script>
```

</details>
