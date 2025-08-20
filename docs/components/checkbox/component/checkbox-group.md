### 禁用状态

禁用复选框。

<div class="cell-demo vp-raw">
  <yc-space
    direction="vertical"
    size="large">
    <yc-checkbox-group :default-value="['1']">
      <yc-checkbox value="1">Option 1</yc-checkbox>
      <yc-checkbox value="2">Option 2</yc-checkbox>
      <yc-checkbox value="3">Option 3</yc-checkbox>
    </yc-checkbox-group>
    <yc-checkbox-group direction="vertical">
      <yc-checkbox value="1">Option 1</yc-checkbox>
      <yc-checkbox value="2">Option 2</yc-checkbox>
      <yc-checkbox value="3">Option 3</yc-checkbox>
    </yc-checkbox-group>
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
    <yc-checkbox-group :default-value="['1']">
      <yc-checkbox value="1">Option 1</yc-checkbox>
      <yc-checkbox value="2">Option 2</yc-checkbox>
      <yc-checkbox value="3">Option 3</yc-checkbox>
    </yc-checkbox-group>
    <yc-checkbox-group direction="vertical">
      <yc-checkbox value="1">Option 1</yc-checkbox>
      <yc-checkbox value="2">Option 2</yc-checkbox>
      <yc-checkbox value="3">Option 3</yc-checkbox>
    </yc-checkbox-group>
  </yc-space>
</template>
```

</details>
