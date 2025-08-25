### 底部固定

当页面滚动或浏览器窗口改变时，元素向下滚动到距底部一定距离时固定。

<div class="cell-demo vp-raw">
  <div
    style="height:300px;overflow:auto;background: var(--color-fill-2);position: relative;"
    ref="containerRef">
    <div style="height:2000px;">
      <yc-affix
        :offset-bttom="120"
        :target="containerRef"
        style="position: absolute;">
        <yc-button type="primary">120px to affix bottom</yc-button>
      </yc-affix>
    </div>
  </div>
</div>

<script setup>
import { ref, onMounted } from 'vue';
const containerRef = ref();
</script>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <div
    style="height:300px;overflow:auto;background: var(--color-fill-2); "
    ref="containerRef">
    <div style="height:2000px;">
      <yc-affix
        :offset-bttom="120"
        :target="containerRef">
        <yc-button type="primary">120px to affix bottom</yc-button>
      </yc-affix>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const containerRef = ref();
</script>
```

</details>
