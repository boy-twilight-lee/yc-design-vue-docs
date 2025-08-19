### 自定义前缀&后缀

通过 <yc-tag>prefix</yc-tag> 和 <yc-tag>suffix</yc-tag> 插槽可以添加前后缀。

<div class="cell-demo vp-raw">
  <yc-space size="large">
    <yc-statistic
      title="New Users"
      :value="125670"
      show-group-separator>
      <template #suffix>
        <icon-arrow-rise />
      </template>
    </yc-statistic>
    <yc-statistic
      title="User Growth Rate"
      :value="50.52"
      :precision="2"
      :value-style="{ color: '#0fbf60' }">
      <template #prefix>
        <icon-arrow-rise />
      </template>
      <template #suffix>%</template>
    </yc-statistic>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space size="large">
    <yc-statistic
      title="New Users"
      :value="125670"
      show-group-separator>
      <template #suffix>
        <icon-arrow-rise />
      </template>
    </yc-statistic>
    <yc-statistic
      title="User Growth Rate"
      :value="50.52"
      :precision="2"
      :value-style="{ color: '#0fbf60' }">
      <template #prefix>
        <icon-arrow-rise />
      </template>
      <template #suffix>%</template>
    </yc-statistic>
  </yc-space>
</template>
```

</details>
