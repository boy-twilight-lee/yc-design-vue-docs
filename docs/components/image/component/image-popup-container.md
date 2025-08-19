### 挂载节点

可以通过 <yc-tag>popupContainer</yc-tag> 指定预览挂载的父级节点。

<div class="demo-cell vp-raw">
  <div
    :style="{
      width: '100%',
      height: '400px',
      backgroundColor: 'var(--color-fill-2)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
    id="image-popup-container">
    <yc-image
      width="200"
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      :preview-props="{
        popupContainer: containerRef,
        closable: false,
      }" />
  </div>
</div>

<script setup>
import { ref,onMounted } from 'vue';
const containerRef = ref(null);
onMounted(() => {
  containerRef.value = document.querySelector('#image-popup-container');
});
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div
    :style="{
      width: '100%',
      height: '400px',
      backgroundColor: 'var(--color-fill-2)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
    id="image-popup-container">
    <yc-image
      width="200"
      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      :preview-props="{
        popupContainer: containerRef,
        closable: false,
      }" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const containerRef = ref(null);
onMounted(() => {
  containerRef.value = document.querySelector('#image-popup-container');
});
</script>
```

</details>
