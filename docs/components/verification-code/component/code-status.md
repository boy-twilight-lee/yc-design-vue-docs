### 不同状态

禁用状态、只读状态、错误状态。

<div class="cell-demo vp-raw">
  <yc-space direction="vertical">
    <yc-space>
      <yc-typography-text style="width: 80px">Disabled:</yc-typography-text>
      <yc-verification-code
        defaultValue="123456"
        style="width: 300px"
        disabled />
    </yc-space>
    <yc-space>
      <yc-typography-text style="width: 80px">Readonly:</yc-typography-text>
      <yc-verification-code
        defaultValue="123456"
        style="width: 300px"
        readonly />
    </yc-space>
    <yc-space>
      <yc-typography-text style="width: 80px">Error:</yc-typography-text>
      <yc-verification-code
        defaultValue="123456"
        style="width: 300px"
        error />
    </yc-space>
  </yc-space>
</div>

<details>
<summary>点击查看/隐藏代码</summary>

```vue
<template>
  <yc-space direction="vertical">
    <yc-space>
      <yc-typography-text style="width: 80px">Disabled:</yc-typography-text>
      <yc-verification-code
        defaultValue="123456"
        style="width: 300px"
        disabled />
    </yc-space>
    <yc-space>
      <yc-typography-text style="width: 80px">Readonly:</yc-typography-text>
      <yc-verification-code
        defaultValue="123456"
        style="width: 300px"
        readonly />
    </yc-space>
    <yc-space>
      <yc-typography-text style="width: 80px">Error:</yc-typography-text>
      <yc-verification-code
        defaultValue="123456"
        style="width: 300px"
        error />
    </yc-space>
  </yc-space>
</template>
```

</details>
