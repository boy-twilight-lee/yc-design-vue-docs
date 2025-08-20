### 格式化输入

通过 <yc-tag>formatter</yc-tag> 校验输入。此外，可以返回非布尔类型来将用户输入的字符串为特定的格式。

<div class="cell-demo vp-raw">
  <yc-space direction="vertical">
    <yc-verification-code
      defaultValue="123456"
      style="width: 300px"
      :formatter="
        (inputValue) => (/^\d*$/.test(inputValue) ? inputValue : false)
      " />
    <yc-verification-code
      defaultValue="abcdef"
      style="width: 300px"
      :formatter="
        (inputValue) =>
          /^[yc-zA-Z]*$/.test(inputValue) ? inputValue.toUpperCase() : ''
      " />
  </yc-space>
</div>

<details>
<summary>点击查看/隐藏代码</summary>

```vue
<template>
  <yc-space direction="vertical">
    <yc-verification-code
      defaultValue="123456"
      style="width: 300px"
      :formatter="
        (inputValue) => (/^\d*$/.test(inputValue) ? inputValue : false)
      " />
    <yc-verification-code
      defaultValue="abcdef"
      style="width: 300px"
      :formatter="
        (inputValue) =>
          /^[yc-zA-Z]*$/.test(inputValue) ? inputValue.toUpperCase() : ''
      " />
  </yc-space>
</template>
```

</details>
