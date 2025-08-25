### 底部固定

当页面滚动或浏览器窗口改变时，元素向下滚动到距底部一定距离时固定。

<div class="cell-demo vp-raw">
  <yc-affix
    :offset-bttom="120"
    :target="target">
    <yc-button type="primary">120px to affix bottom</yc-button>
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
  <yc-affix :offset-bttom="120">
    <yc-button type="primary">120px to affix bottom</yc-button>
  </yc-affix>
</template>
```

</details>
