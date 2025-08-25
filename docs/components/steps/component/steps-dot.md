### 箭头步骤条

通过设置 `type="arrow"`，可以使用箭头类型的步骤条。注意：仅支持水平步骤条。

<div class="cell-demo vp-raw">
  <yc-steps type="dot">
    <yc-step>Succeeded</yc-step>
    <yc-step>Processing</yc-step>
    <yc-step>Pending</yc-step>
  </yc-steps>
</div>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-steps type="dot">
    <yc-step>Succeeded</yc-step>
    <yc-step>Processing</yc-step>
    <yc-step>Pending</yc-step>
  </yc-steps>
</template>
```

</details>
