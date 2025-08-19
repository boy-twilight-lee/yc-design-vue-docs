### 按钮形状

按钮分为 <yc-tag>square</yc-tag> - 长方形（默认）、<yc-tag>circle</yc-tag> - 圆形、<yc-tag>round</yc-tag> - 全圆角三种形状。

<div class="cell-demo vp-raw">
  <yc-space>
    <yc-button type="primary">Square</yc-button>
    <yc-button type="primary" shape="round">Round</yc-button>
    <yc-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </yc-button>
    <yc-button type="primary" shape="circle">
      <icon-plus />
    </yc-button>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-button type="primary">Square</yc-button>
    <yc-button
      type="primary"
      shape="round"
      >Round</yc-button
    >
    <yc-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </yc-button>
    <yc-button
      type="primary"
      shape="circle">
      <icon-plus />
    </yc-button>
  </yc-space>
</template>
```

</details>
