### 可交互

提供复制、编辑文本等功能。

<div class="cell-demo">
  <yc-typography>
    <yc-typography-paragraph copyable>
      Click the icon to copy this text.
    </yc-typography-paragraph>
    <yc-typography-paragraph
      editable
      v-model:editText="str"
    >
      {{str}}
    </yc-typography-paragraph>
  </yc-typography>
</div>

<script setup>
import { ref } from 'vue';
const str = ref('Click the icon to edit this text.');
</script>

<details>
<summary>点击查看/隐藏代码</summary>

```vue
<template>
  <yc-typography>
    <yc-typography-paragraph copyable>
      Click the icon to copy this text.
    </yc-typography-paragraph>
    <yc-typography-paragraph
      editable
      v-model:editText="str">
      {{ str }}
    </yc-typography-paragraph>
  </yc-typography>
</template>

<script setup>
import { ref } from 'vue';
const str = ref('Click the icon to edit this text.');
</script>
```

</details>
