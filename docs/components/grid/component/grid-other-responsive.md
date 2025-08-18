### 其他属性的响应式

<yc-tag>span</yc-tag>, <yc-tag>offset</yc-tag>, <yc-tag>offset</yc-tag> 属性都可以在传入的对象中设置 <yc-tag>xs</yc-tag>, <yc-tag>sm</yc-tag>, <yc-tag>md</yc-tag>, <yc-tag>lg</yc-tag>, <yc-tag>xl</yc-tag>, <yc-tag>xxl</yc-tag> 。

<div class="cell-demo">
  <yc-row class="grid-demo">
    <yc-col
      :span="{
        xs: 5,
        lg: 6,
      }"
      :offset="{
        xs: 1,
        lg: 2,
      }">
      Col
    </yc-col>
    <yc-col
      :span="{
        xs: 11,
        lg: 6,
      }"
      :offset="{
        xs: 1,
        lg: 2,
      }">
      Col
    </yc-col>
    <yc-col
      :span="{
        xs: 5,
        lg: 6,
      }"
      :offset="{
        xs: 1,
        lg: 2,
      }">
      Col
    </yc-col>
  </yc-row>
</div>

<style scoped>
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-row class="grid-demo">
    <yc-col
      :span="{
        xs: 5,
        lg: 6,
      }"
      :offset="{
        xs: 1,
        lg: 2,
      }">
      Col
    </yc-col>
    <yc-col
      :span="{
        xs: 11,
        lg: 6,
      }"
      :offset="{
        xs: 1,
        lg: 2,
      }">
      Col
    </yc-col>
    <yc-col
      :span="{
        xs: 5,
        lg: 6,
      }"
      :offset="{
        xs: 1,
        lg: 2,
      }">
      Col
    </yc-col>
  </yc-row>
</template>

<style scoped>
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```

</details>
