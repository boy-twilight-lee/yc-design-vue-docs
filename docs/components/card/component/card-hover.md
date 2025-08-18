### 鼠标悬浮样式

指定 <yc-tag>hoverable</yc-tag> 来为卡片添加鼠标悬浮样式，同时你可以通过样式覆盖来自定义悬浮样式。

<div class="cell-demo">
  <div :style="{ display: 'flex' }">
    <yc-card :style="{ width: '360px' }" title="Arco Card" hoverable>
      <template #extra>
        <yc-link>More</yc-link>
      </template>
      Card content <br />
      Card content
    </yc-card>
    <yc-card
      class="card-demo"
      title="Custom hover style"
      hoverable
    >
      <template #extra>
        <yc-link>More</yc-link>
      </template>
      Card content <br />
      Card content
    </yc-card>
  </div>
</div>

<style scoped>
.card-demo {
  width: 360px;
  margin-left: 24px;
  transition-property: all;
}
.card-demo:hover {
  transform: translateY(-4px);
}
</style>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div :style="{ display: 'flex' }">
    <yc-card
      :style="{ width: '360px' }"
      title="Arco Card"
      hoverable>
      <template #extra>
        <yc-link>More</yc-link>
      </template>
      Card content <br />
      Card content
    </yc-card>
    <yc-card
      class="card-demo"
      title="Custom hover style"
      hoverable>
      <template #extra>
        <yc-link>More</yc-link>
      </template>
      Card content <br />
      Card content
    </yc-card>
  </div>
</template>

<style scoped>
.card-demo {
  width: 360px;
  margin-left: 24px;
  transition-property: all;
}
.card-demo:hover {
  transform: translateY(-4px);
}
</style>
```

</details>
