### 精度和步长

通过 <yc-tag>precision</yc-tag> 来设置数字精度。当 <yc-tag>precision</yc-tag> 小于 <yc-tag>step</yc-tag> 的小数位时，精度取 <yc-tag>step</yc-tag> 的小数个数。

<div class="cell-demo vp-raw">
  <yc-space
    direction="vertical"
    size="large">
    <yc-input-number
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      :default-value="3.6"
      :step="1.2"
      :precision="2"
      class="input-demo" />
    <yc-input-number
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      :default-value="1.22"
      :step="1.22"
      :precision="1"
      class="input-demo" />
  </yc-space>
</div>

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
    <yc-input-number
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      :default-value="3.6"
      :step="1.2"
      :precision="2"
      class="input-demo" />
    <yc-input-number
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      :default-value="1.22"
      :step="1.22"
      :precision="1"
      class="input-demo" />
  </yc-space>
</template>
```

</details>
