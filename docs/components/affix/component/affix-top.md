### 顶部固定

当页面滚动或浏览器窗口改变时，元素向上滚动到距顶部一定距离时固定。

<div class="cell-demo vp-raw">
  <yc-affix
    :offsetTop="80"
    :target="target">
    <yc-button type="primary">80px to affix top</yc-button>
  </yc-affix>
</div>

<script setup>
import { ref, onMounted } from 'vue';
const target = window;
</script>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-affix :offsetTop="80">
    <yc-button type="primary">80px to affix top</yc-button>
  </yc-affix>
</template>
```

</details>
