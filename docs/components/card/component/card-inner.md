### 内部卡片

卡片中可以嵌套其他卡片组件。

<div class="cell-demo vp-raw">
  <a-card title="Arco Card">
    <a-card :style="{ marginBottom: '20px' }" title="Inner Card Title">
      <template #extra>
        <a-link>More</a-link>
      </template>
      Inner Card Content
    </a-card>
    <a-card title="Inner Card Title">
      <template #extra>
        <a-link>More</a-link>
      </template>
      Inner Card Content
    </a-card>
  </a-card>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-card title="Arco Card">
    <yc-card
      :style="{ marginBottom: '20px' }"
      title="Inner Card Title">
      <template #extra>
        <yc-link>More</yc-link>
      </template>
      Inner Card Content
    </yc-card>
    <yc-card title="Inner Card Title">
      <template #extra>
        <yc-link>More</yc-link>
      </template>
      Inner Card Content
    </yc-card>
  </yc-card>
</template>
```

</details>
