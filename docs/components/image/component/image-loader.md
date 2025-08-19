### 渐进加载

大图可通过给 <yc-tag>loader</yc-tag> 传递一个小一些的图片，让其在原图未被加载成功时显示，以此来模拟渐进加载。

<div class="demo-cell vp-raw">
  <div>
    <yc-button
      type="primary"
      @click="
        () => {
          timestamp = Date.now();
        }
      "
      style="margin-bottom: 20px;">
      reload
    </yc-button>
  </div>
  <yc-image
    width="200"
    height="200"
    :src="`https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`">
    <template #loader>
      <img
        width="200"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        style="filter: blur(5px);" />
    </template>
  </yc-image>
</div>

<script setup>
import { ref } from 'vue';
const timestamp = ref('');
</script>
<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div>
    <yc-button
      type="primary"
      @click="
        () => {
          timestamp = Date.now();
        }
      "
      style="margin-bottom: 20px;">
      reload
    </yc-button>
  </div>
  <yc-image
    width="200"
    height="200"
    :src="`https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`">
    <template #loader>
      <img
        width="200"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        style="filter: blur(5px);" />
    </template>
  </yc-image>
</template>

<script setup>
import { ref } from 'vue';
const timestamp = ref('');
</script>
```

</details>
