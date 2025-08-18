### 无边框卡片

卡片可以只有内容区域。

<div class="cell-demo">
  <yc-card hoverable :style="{ width: '360px', marginBottom: '20px' }">
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }"
    >
      <span
        :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
      >
        <yc-avatar
          :style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
          :size="28"
        >
          A
        </yc-avatar>
        <yc-typography-text>Username</yc-typography-text>
      </span>
      <yc-link>More</yc-link>
    </div>
  </yc-card>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-card
    hoverable
    :style="{ width: '360px', marginBottom: '20px' }">
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }">
      <span
        :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
        <yc-avatar
          :style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
          :size="28">
          A
        </yc-avatar>
        <yc-typography-text>Username</yc-typography-text>
      </span>
      <yc-link>More</yc-link>
    </div>
  </yc-card>
</template>
```

</details>
