### 基本用法

展示和选择日历

<div class="cell-demo vp-raw">
  <yc-calendar v-model="value" style="width:100%;" />
  select: {{value}}
</div>

<script setup>
import { ref } from 'vue';
const value = ref(new Date('2023-01-01'));
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-calendar v-model="value" />
  select: {{ value }}
</template>

<script setup>
import { ref } from 'vue';
const value = ref(new Date('2023-01-01'));
</script>
```

</details>
