### 链接的状态

链接的状态分为 <yc-tag>normal</yc-tag> - 正常（默认）、<yc-tag>success</yc-tag> - 成功、<yc-tag>warning</yc-tag> - 警告、<yc-tag>danger</yc-tag> - 危险四种。

<div class="cell-demo">
  <yc-space direction="vertical">
    <yc-space>
      <yc-link href="link">Normal Link</yc-link>
      <yc-link href="link" disabled>Normal Link</yc-link>
    </yc-space>
    <yc-space>
      <yc-link href="link" status="success">Success Link</yc-link>
      <yc-link href="link" status="success" disabled>Success Link</yc-link>
    </yc-space>
    <yc-space>
      <yc-link href="link" status="warning">Warning Link</yc-link>
      <yc-link href="link" status="warning" disabled>Warning Link</yc-link>
    </yc-space>
    <yc-space>
      <yc-link href="link" status="danger">Danger Link</yc-link>
      <yc-link href="link" status="danger" disabled>Danger Link</yc-link>
    </yc-space>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space direction="vertical">
    <yc-space>
      <yc-link href="link">Normal Link</yc-link>
      <yc-link
        href="link"
        disabled
        >Normal Link</yc-link
      >
    </yc-space>
    <yc-space>
      <yc-link
        href="link"
        status="success"
        >Success Link</yc-link
      >
      <yc-link
        href="link"
        status="success"
        disabled
        >Success Link</yc-link
      >
    </yc-space>
    <yc-space>
      <yc-link
        href="link"
        status="warning"
        >Warning Link</yc-link
      >
      <yc-link
        href="link"
        status="warning"
        disabled
        >Warning Link</yc-link
      >
    </yc-space>
    <yc-space>
      <yc-link
        href="link"
        status="danger"
        >Danger Link</yc-link
      >
      <yc-link
        href="link"
        status="danger"
        disabled
        >Danger Link</yc-link
      >
    </yc-space>
  </yc-space>
</template>
```

</details>
