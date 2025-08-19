### 小红点

设置 <yc-tag>dot</yc-tag>，即可只显示小红点而不显示数字。<yc-tag>count > 0</yc-tag> 时才显示

<div class="cell-demo vp-raw">
  <yc-space :size="40">
    <yc-badge :count="9" dot :offset="[6, -2]">
      <a href="#">Link</a>
    </yc-badge>
    <yc-badge :count="9" dot :offset="[2, -2]">
      <IconNotification
        :style="{ color: '#888', fontSize: '18px', verticalAlign: '-3px' }"
      />
    </yc-badge>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space :size="40">
    <yc-badge
      :count="9"
      dot
      :offset="[6, -2]">
      <a href="#">Link</a>
    </yc-badge>
    <yc-badge
      :count="9"
      dot
      :offset="[2, -2]">
      <IconNotification
        :style="{ color: '#888', fontSize: '18px', verticalAlign: '-3px' }" />
    </yc-badge>
  </yc-space>
</template>
```

</details>
