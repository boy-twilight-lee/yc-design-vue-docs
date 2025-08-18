### 头像组

使用 <yc-tag>Avatar.Group</yc-tag> 可以使用头像组功能，可通过 <yc-tag>size</yc-tag> 指定头像的大小。

<div class="cell-demo">
  <yc-space :size="32">
    <yc-avatar-group>
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>
    <yc-avatar-group :size="24">
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>
    <yc-avatar-group :size="24" :max-count="3">
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space :size="32">
    <yc-avatar-group>
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>

    <yc-avatar-group :size="24">
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>

    <yc-avatar-group
      :size="24"
      :max-count="3">
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>
  </yc-space>
</template>
```

</details>
