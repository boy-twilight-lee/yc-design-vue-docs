### 多选选择器

通过设置 <yc-tag>multiple</yc-tag> ，可以让选择器支持多选。此外通过 <yc-tag>max-tag-count</yc-tag> 可以设置最多显示的标签个数。

<div class="cell-demo vp-raw">
  <div style="margin-bottom: 10px">
    <yc-switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <yc-space
    direction="vertical"
    size="large">
    <yc-select
      :default-value="['Beijing', 'Shanghai']"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      :scrollbar="scrollbar">
      <yc-option>Beijing</yc-option>
      <yc-option :tag-props="{ color: 'red' }">Shanghai</yc-option>
      <yc-option>Guangzhou</yc-option>
      <yc-option disabled>Disabled</yc-option>
      <yc-option>Shenzhen</yc-option>
      <yc-option>Wuhan</yc-option>
    </yc-select>
    <yc-select
      :default-value="['Beijing', 'Shanghai', 'Guangzhou']"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      :max-tag-count="2"
      allow-clear
      :scrollbar="scrollbar">
      <yc-option>Beijing</yc-option>
      <yc-option>Shanghai</yc-option>
      <yc-option>Guangzhou</yc-option>
      <yc-option disabled>Disabled</yc-option>
      <yc-option>Shenzhen</yc-option>
      <yc-option>Chengdu</yc-option>
      <yc-option>Wuhan</yc-option>
    </yc-select>
    <yc-select
      :default-value="['Beijing', 'Shanghai']"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      :limit="2"
      :scrollbar="scrollbar">
      <yc-option>Beijing</yc-option>
      <yc-option :tag-props="{ color: 'red' }">Shanghai</yc-option>
      <yc-option>Guangzhou</yc-option>
      <yc-option disabled>Disabled</yc-option>
      <yc-option>Shenzhen</yc-option>
      <yc-option>Wuhan</yc-option>
    </yc-select>
  </yc-space>
</div>

<script setup>
import { ref } from 'vue';
const scrollbar = ref(true);
</script>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <div style="margin-bottom: 10px">
    <yc-switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <yc-space
    direction="vertical"
    size="large">
    <yc-select
      :default-value="['Beijing', 'Shanghai']"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      :scrollbar="scrollbar">
      <yc-option>Beijing</yc-option>
      <yc-option :tag-props="{ color: 'red' }">Shanghai</yc-option>
      <yc-option>Guangzhou</yc-option>
      <yc-option disabled>Disabled</yc-option>
      <yc-option>Shenzhen</yc-option>
      <yc-option>Wuhan</yc-option>
    </yc-select>
    <yc-select
      :default-value="['Beijing', 'Shanghai', 'Guangzhou']"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      :max-tag-count="2"
      allow-clear
      :scrollbar="scrollbar">
      <yc-option>Beijing</yc-option>
      <yc-option>Shanghai</yc-option>
      <yc-option>Guangzhou</yc-option>
      <yc-option disabled>Disabled</yc-option>
      <yc-option>Shenzhen</yc-option>
      <yc-option>Chengdu</yc-option>
      <yc-option>Wuhan</yc-option>
    </yc-select>
    <yc-select
      :default-value="['Beijing', 'Shanghai']"
      :style="{ width: '360px' }"
      placeholder="Please select ..."
      multiple
      :limit="2"
      :scrollbar="scrollbar">
      <yc-option>Beijing</yc-option>
      <yc-option :tag-props="{ color: 'red' }">Shanghai</yc-option>
      <yc-option>Guangzhou</yc-option>
      <yc-option disabled>Disabled</yc-option>
      <yc-option>Shenzhen</yc-option>
      <yc-option>Wuhan</yc-option>
    </yc-select>
  </yc-space>
</template>

<script setup>
import { ref } from 'vue';
const scrollbar = ref(true);
</script>
```

</details>
