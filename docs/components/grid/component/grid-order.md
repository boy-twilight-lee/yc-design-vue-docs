## 排序

通过 <yc-tag>order</yc-tag> 来进行元素排序。

<div class="cell-demo">
  <div>
    <yc-row class="grid-demo">
      <yc-col :span="6" :order="4">
        <div>1 col-order-4</div>
      </yc-col>
      <yc-col :span="6" :order="3">
        <div>2 col-order-3</div>
      </yc-col>
      <yc-col :span="6" :order="2">
        <div>3 col-order-2</div>
      </yc-col>
      <yc-col :span="6" :order="1">
        <div>4 col-order-1</div>
      </yc-col>
    </yc-row>
  </div>
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
  <div>
    <yc-row class="grid-demo">
      <yc-col
        :span="6"
        :order="4">
        <div>1 col-order-4</div>
      </yc-col>
      <yc-col
        :span="6"
        :order="3">
        <div>2 col-order-3</div>
      </yc-col>
      <yc-col
        :span="6"
        :order="2">
        <div>3 col-order-2</div>
      </yc-col>
      <yc-col
        :span="6"
        :order="1">
        <div>4 col-order-1</div>
      </yc-col>
    </yc-row>
  </div>
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

</details >
