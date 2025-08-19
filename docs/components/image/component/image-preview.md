### 单独使用预览组件

组件 <yc-tag>yc-image-preview</yc-tag> 可单独使用，需要手动控制 <yc-tag>visible</yc-tag>。

<div class="cell-demo vp-raw">
  <yc-button
    type="primary"
    @click="onClick"
    >Click me to preview image</yc-button
  >
  <yc-image-preview
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
    v-model:visible="visible" />
</div>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
const onClick = () => {
  visible.value = true;
};
</script>
<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-button
    type="primary"
    @click="onClick"
    >Click me to preview image</yc-button
  >
  <yc-image-preview
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
    v-model:visible="visible" />
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
const onClick = () => {
  visible.value = true;
};
</script>
```

</details>
