### 固定状态改变回调

当固定状态发生改变时，会触发事件。

<div class="cell-demo vp-raw">
  <yc-affix
    :offsetBottom="80"
    @change="onChange">
    <yc-button type="primary">80px to affix bottom</yc-button>
  </yc-affix>
</div>

<script setup>
const onChange = (fixed) => {
  console.log(`${fixed}`);
};
</script>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-affix
    :offsetBottom="80"
    @change="onChange">
    <yc-button type="primary">80px to affix bottom</yc-button>
  </yc-affix>
</template>

<script setup>
const onChange = (fixed) => {
  console.log(`${fixed}`);
};
</script>
```

</details>
