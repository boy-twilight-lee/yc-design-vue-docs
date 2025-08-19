### 基本用法

基本用法。只需指定 <yc-tag>count</yc-tag> 或者 <yc-tag>content slot</yc-tag>，即可显示徽标。

<div class="cell-demo vp-raw">
  <yc-space :size="40">
    <yc-badge :count="9">
      <yc-avatar shape="square" />
    </yc-badge>
    <yc-badge :count="9" dot :dotStyle="{ width: '10px', height: '10px' }">
      <yc-avatar shape="square" />
    </yc-badge>
    <yc-badge :dotStyle="{ height: '16px', width: '16px', fontSize: '14px' }">
      <template #content>
        <IconClockCircle
          :style="{ verticalAlign: 'middle', color: 'var(--color-text-2)' }"
        />
      </template>
      <yc-avatar shape="square" />
    </yc-badge>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space :size="40">
    <yc-badge :count="9">
      <yc-avatar shape="square" />
    </yc-badge>
    <yc-badge
      :count="9"
      dot
      :dotStyle="{ width: '10px', height: '10px' }">
      <yc-avatar shape="square" />
    </yc-badge>
    <yc-badge :dotStyle="{ height: '16px', width: '16px', fontSize: '14px' }">
      <template #content>
        <IconClockCircle
          :style="{ verticalAlign: 'middle', color: 'var(--color-text-2)' }" />
      </template>
      <yc-avatar shape="square" />
    </yc-badge>
  </yc-space>
</template>
```

</details>
