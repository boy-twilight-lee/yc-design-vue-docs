### 滚动容器

用 `target` 设置需要监听其滚动事件的元素，默认为 `window`。
<br />
`target` 指定为非 `window` 容器时，可能会出现 `target` 外层元素滚动，固钉元素跑出滚动容器的问题。这个时候可以通过传入`targetContainer` 传入 `target` 外层的滚动元素。
<br />
`Affix`会监听该元素的滚动事件来实时更新滚钉元素的位置。 当然您也可以在业务代码中自己监听 `target` 外层滚动元素的 `scroll` 事件，并调用 `updatePosition` 去更新固钉的位置。

<div class="cell-demo vp-raw">
  <div
    style="height: 200px; overflow: auto"
    ref="containerRef">
    <div style="height: 400px; background: #cccccc; overflow: hidden">
      <yc-affix
        :offsetTop="20"
        :target="containerRef"
        style="margin: 40px">
        <yc-button type="primary">Affix in scrolling container</yc-button>
      </yc-affix>
    </div>
  </div>
</div>

<script setup>
import { ref } from 'vue';
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
    style="height: 200px; overflow: auto"
    ref="containerRef">
    <div style="height: 400px; background: #cccccc; overflow: hidden">
      <yc-affix
        :offsetTop="20"
        :target="containerRef"
        style="margin: 40px">
        <yc-button type="primary">Affix in scrolling container</yc-button>
      </yc-affix>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const containerRef = ref();
</script>
```

</details>
