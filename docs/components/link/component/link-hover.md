### 悬浮状态底色

可以通过 hoverable 属性设置是否在悬浮状态时隐藏底色。

<div class="cell-demo">
  <yc-space>
    <yc-link href="link" :hoverable="false">Link</yc-link>
    <yc-link href="link" status="danger" :hoverable="false">Link</yc-link>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-link
      href="link"
      :hoverable="false"
      >Link</yc-link
    >
    <yc-link
      href="link"
      status="danger"
      :hoverable="false"
      >Link</yc-link
    >
  </yc-space>
</template>
```

</details>
