### 设置步长

通过 <yc-tag>step</yc-tag> 设置步长，默认步长为 <yc-tag>1</yc-tag>。建议设置能够被 <yc-tag>max-min</yc-tag> 整除的值，否则会出现可选最大值小于 <yc-tag>max</yc-tag> 的情况。当设置<yc-tag>show-ticks</yc-tag> 时，显示步长刻度线。

<div class="cell-demo vp-raw">
  <yc-space
    direction="vertical"
    size="large">
    <yc-form
      :model="data"
      layout="inline">
      <yc-form-item
        label="Step"
        field="step">
        <yc-input-number
          :style="{ width: '100px' }"
          v-model="data.step" />
      </yc-form-item>
      <yc-form-item
        label="Show steps"
        field="showTicks">
        <yc-switch v-model="data.showTicks" />
      </yc-form-item>
    </yc-form>
    <yc-slider
      :default-value="20"
      :style="{ width: '300px' }"
      :step="data.step"
      :show-ticks="data.showTicks" />
  </yc-space>
</div>

<script setup>
import { reactive } from 'vue';
const data = reactive({
  step: 5,
  showTicks: true,
});
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
    <yc-form
      :model="data"
      layout="inline">
      <yc-form-item
        label="Step"
        field="step">
        <yc-input-number
          :style="{ width: '100px' }"
          v-model="data.step" />
      </yc-form-item>
      <yc-form-item
        label="Show steps"
        field="showTicks">
        <yc-switch v-model="data.showTicks" />
      </yc-form-item>
    </yc-form>
    <yc-slider
      :default-value="20"
      :style="{ width: '300px' }"
      :step="data.step"
      :show-ticks="data.showTicks" />
  </yc-space>
</template>

<script setup>
import { reactive } from 'vue';
const data = reactive({
  step: 5,
  showTicks: true,
});
</script>
```

</details>
