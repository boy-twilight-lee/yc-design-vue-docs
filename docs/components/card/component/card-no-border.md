### 无边框卡片

设置 <yc-tag>bordered</yc-tag> 为 <yc-tag>false</yc-tag> 来使用无边框卡片。

<div class="cell-demo vp-raw">
  <div
    :style="{
      display: 'flex',
      width: '100%',
      boxSizing: 'border-box',
      padding: '40px',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <yc-card :style="{ width: '360px' }" title="Arco Card" :bordered="false">
      <template #extra>
        <yc-link>More</yc-link>
      </template>
      Card content
      <br />
      Card content
    </yc-card>
    <yc-card
      :style="{ width: '360px', marginLeft: '24px' }"
      title="Hover me"
      hoverable
      :bordered="false"
    >
      <template #extra>
        <yc-link>More</yc-link>
      </template>
      Card content
      <br />
      Card content
    </yc-card>
  </div>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div
    :style="{
      display: 'flex',
      width: '100%',
      boxSizing: 'border-box',
      padding: '40px',
      backgroundColor: 'var(--color-fill-2)',
    }">
    <yc-card
      :style="{ width: '360px' }"
      title="Arco Card"
      :bordered="false">
      <template #extra>
        <yc-link>More</yc-link>
      </template>
      Card content
      <br />
      Card content
    </yc-card>
    <yc-card
      :style="{ width: '360px', marginLeft: '24px' }"
      title="Hover me"
      hoverable
      :bordered="false">
      <template #extra>
        <yc-link>More</yc-link>
      </template>
      Card content
      <br />
      Card content
    </yc-card>
  </div>
</template>
```

</details>
