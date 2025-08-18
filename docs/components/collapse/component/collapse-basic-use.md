### 基本用法

用于将复杂的内容区域分组和隐藏，可折叠或展开。默认可以展开多个面板。

<div class="cell-demo">
  <yc-collapse :default-active-key="['1', 2]">
    <yc-collapse-item header="Beijing Toutiao Technology Co., Ltd." path="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item header="Beijing Toutiao Technology Co., Ltd." :path="2" disabled>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item header="Beijing Toutiao Technology Co., Ltd." path="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
  </yc-collapse>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-collapse :default-active-key="['1', 2]">
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      path="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      :path="2"
      disabled>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      path="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
  </yc-collapse>
</template>
```

</details>
