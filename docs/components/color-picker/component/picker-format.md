### 颜色格式

通过 <yc-tag>format</yc-tag> 设置颜色值的格式，支持 <yc-tag>hex</yc-tag> 和 <yc-tag>rgb</yc-tag>

<div class="cell-demo vp-raw">
  <yc-space direction="vertical">
    <yc-radio-group
      type="button"
      v-model="format">
      <yc-radio
        v-for="item in formatList"
        :value="item"
        >{{ item }}</yc-radio
      >
    </yc-radio-group>
    <yc-color-picker
      defaultValue="#165DFF"
      :format="format"
      showText />
  </yc-space>
</div>

<script setup>
import { ref } from 'vue';
const format = ref('hex');
const formatList = ['hex', 'rgb'];
</script>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-space direction="vertical">
    <yc-radio-group
      type="button"
      v-model="format">
      <yc-radio
        v-for="item in formatList"
        :value="item"
        >{{ item }}</yc-radio
      >
    </yc-radio-group>
    <yc-color-picker
      defaultValue="#165DFF"
      :format="format"
      showText />
  </yc-space>
</template>

<script setup>
import { ref } from 'vue';
const format = ref('hex');
const formatList = ['hex', 'rgb'];
</script>
```

</details>
