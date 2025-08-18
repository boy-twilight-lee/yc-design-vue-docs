### 带有文字的分割线

通过 <yc-tag>orientation</yc-tag> 为分割线添加描述文字。

<div class="cell-demo">
  <div class="divider-demo">
    <p>A design is a plan or specification for the construction of an object.</p>
    <yc-divider orientation="left">Text</yc-divider>
    <p>A design is a plan or specification for the construction of an object.</p>
    <yc-divider orientation="center">Text</yc-divider>
    <p>A design is a plan or specification for the construction of an object.</p>
    <yc-divider orientation="right">Text</yc-divider>
    <yc-divider :margin="10">
      <icon-star style="width:14px;height:14px;" />
    </yc-divider>
  </div>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div class="divider-demo">
    <p>
      A design is a plan or specification for the construction of an object.
    </p>
    <yc-divider orientation="left">Text</yc-divider>
    <p>
      A design is a plan or specification for the construction of an object.
    </p>
    <yc-divider orientation="center">Text</yc-divider>
    <p>
      A design is a plan or specification for the construction of an object.
    </p>
    <yc-divider orientation="right">Text</yc-divider>
    <yc-divider :margin="10">
      <icon-star />
    </yc-divider>
  </div>
</template>
```

</details>
