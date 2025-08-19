### 自定义样式

自定义面板样式。

<div class="cell-demo vp-raw">
  <yc-collapse
    :default-active-key="['1', 2]"
    :bordered="false">
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      :style="customStyle"
      path="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      :style="customStyle"
      :path="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      :style="customStyle"
      path="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
  </yc-collapse>
</div>

<script setup>
const customStyle = {
  borderRadius: '6px',
  marginBottom: '18px',
  border: 'none',
  overflow: 'hidden',
};
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-collapse
    :default-active-key="['1', 2]"
    :bordered="false">
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      :style="customStyle"
      path="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      :style="customStyle"
      :path="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      :style="customStyle"
      path="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
  </yc-collapse>
</template>

<script setup>
const customStyle = {
  borderRadius: '6px',
  marginBottom: '18px',
  border: 'none',
  overflow: 'hidden',
};
</script>
```

</details>
