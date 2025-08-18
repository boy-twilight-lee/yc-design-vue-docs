### 按钮状态

按钮的状态分为 <yc-tag>normal</yc-tag> - 正常（默认）、 <yc-tag>success</yc-tag> - 成功、<yc-tag>warning</yc-tag> - 警告、<yc-tag>danger</yc-tag> - 危险四种，可以与按钮类型同时使用。

<div class="cell-demo">
  <yc-space direction="vertical">
    <yc-space>
      <yc-button type="primary" status="success">Primary</yc-button>
      <yc-button status="success">Default</yc-button>
      <yc-button type="dashed" status="success">Dashed</yc-button>
      <yc-button type="outline" status="success">Outline</yc-button>
      <yc-button type="text" status="success">Text</yc-button>
    </yc-space>
    <yc-space>
      <yc-button type="primary" status="warning">Primary</yc-button>
      <yc-button status="warning">Default</yc-button>
      <yc-button type="dashed" status="warning">Dashed</yc-button>
      <yc-button type="outline" status="warning">Outline</yc-button>
      <yc-button type="text" status="warning">Text</yc-button>
    </yc-space>
    <yc-space>
      <yc-button type="primary" status="danger">Primary</yc-button>
      <yc-button status="danger">Default</yc-button>
      <yc-button type="dashed" status="danger">Dashed</yc-button>
      <yc-button type="outline" status="danger">Outline</yc-button>
      <yc-button type="text" status="danger">Text</yc-button>
    </yc-space>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space direction="vertical">
    <yc-space>
      <yc-button
        type="primary"
        status="success"
        >Primary</yc-button
      >
      <yc-button status="success">Default</yc-button>
      <yc-button
        type="dashed"
        status="success"
        >Dashed</yc-button
      >
      <yc-button
        type="outline"
        status="success"
        >Outline</yc-button
      >
      <yc-button
        type="text"
        status="success"
        >Text</yc-button
      >
    </yc-space>
    <yc-space>
      <yc-button
        type="primary"
        status="warning"
        >Primary</yc-button
      >
      <yc-button status="warning">Default</yc-button>
      <yc-button
        type="dashed"
        status="warning"
        >Dashed</yc-button
      >
      <yc-button
        type="outline"
        status="warning"
        >Outline</yc-button
      >
      <yc-button
        type="text"
        status="warning"
        >Text</yc-button
      >
    </yc-space>
    <yc-space>
      <yc-button
        type="primary"
        status="danger"
        >Primary</yc-button
      >
      <yc-button status="danger">Default</yc-button>
      <yc-button
        type="dashed"
        status="danger"
        >Dashed</yc-button
      >
      <yc-button
        type="outline"
        status="danger"
        >Outline</yc-button
      >
      <yc-button
        type="text"
        status="danger"
        >Text</yc-button
      >
    </yc-space>
  </yc-space>
</template>
```

</details>
