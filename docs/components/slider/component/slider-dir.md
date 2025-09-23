### 竖直滑动条

设置 `direction="vertical"` ，将会显示竖直的滑动条。

<div class="cell-demo vp-raw">
  <yc-space align="start">
    <yc-slider
      :default-value="50"
      :style="{ height: '300px' }"
      direction="vertical" />
    <yc-slider
      direction="vertical"
      :default-value="5"
      :style="{ height: '300px' }"
      :max="15"
      :marks="{
        5: '5km',
        10: '10km',
      }" />
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
  <yc-space align="start">
    <yc-slider
      :default-value="50"
      direction="vertical" />

    <yc-slider
      direction="vertical"
      :default-value="5"
      :style="{ width: '300px' }"
      :max="15"
      :marks="{
        5: '5km',
        10: '10km',
      }" />
  </yc-space>
</template>
```

</details>
