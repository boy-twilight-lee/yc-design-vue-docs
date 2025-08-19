### 懒加载

通过设置 <yc-tag>lazy-load</yc-tag> 属性，可以让面板在首次激活时渲染。

<div class="cell-demo vp-raw">
  <yc-tabs
    default-active-key="2"
    lazy-load>
    <yc-tab-pane
      path="1"
      title="Tab 1">
      Content of Tab Panel 1
    </yc-tab-pane>
    <yc-tab-pane
      path="2"
      title="Tab 2">
      Content of Tab Panel 2
    </yc-tab-pane>
    <yc-tab-pane
      path="3"
      title="Tab 3">
      Content of Tab Panel 3
    </yc-tab-pane>
  </yc-tabs>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-tabs
    default-active-key="2"
    lazy-load>
    <yc-tab-pane
      path="1"
      title="Tab 1">
      Content of Tab Panel 1
    </yc-tab-pane>
    <yc-tab-pane
      path="2"
      title="Tab 2">
      Content of Tab Panel 2
    </yc-tab-pane>
    <yc-tab-pane
      path="3"
      title="Tab 3">
      Content of Tab Panel 3
    </yc-tab-pane>
  </yc-tabs>
</template>
```

</details>
