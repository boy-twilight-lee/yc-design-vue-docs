### 手风琴模式

通过 <yc-tag>accordion</yc-tag> 开启手风琴模式，同时只能打开一个面板。

<div class="cell-demo">
  <yc-collapse
    :default-active-key="[1]"
    accordion>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      path="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      path="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      path="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
  </yc-collapse>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-collapse
    :default-active-key="[1]"
    accordion>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      path="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      path="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
    <yc-collapse-item
      header="Beijing Toutiao Technology Co., Ltd."
      path="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </yc-collapse-item>
  </yc-collapse>
</template>
```

</details>
