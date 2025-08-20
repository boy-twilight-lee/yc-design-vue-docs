### 复选框组选项

checkbox-group 通过 <yc-tag>options</yc-tag> 属性设置子元素

<div class="cell-demo vp-raw">
  <yc-space
    direction="vertical"
    size="large">
    <yc-checkbox-group
      v-model="value1"
      :options="plainOptions" />
    <yc-checkbox-group
      v-model="value2"
      :options="options" />
    <yc-checkbox-group
      v-model="value2"
      :options="options">
      <template #label="{ data }">
        <yc-tag>{{ data.label }}</yc-tag>
      </template>
    </yc-checkbox-group>
  </yc-space>
</div>

<script setup>
import { ref } from 'vue';
const value1 = ref(['Plain 1']);
const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3'];
const value2 = ref(['1']);
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3', disabled: true },
];
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
    <yc-checkbox-group
      v-model="value1"
      :options="plainOptions" />
    <yc-checkbox-group
      v-model="value2"
      :options="options" />
    <yc-checkbox-group
      v-model="value2"
      :options="options">
      <template #label="{ data }">
        <yc-tag>{{ data.label }}</yc-tag>
      </template>
    </yc-checkbox-group>
  </yc-space>
</template>

<script setup>
import { ref } from 'vue';
const value1 = ref(['Plain 1']);
const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3'];
const value2 = ref(['1']);
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3', disabled: true },
];
</script>
```

</details>
