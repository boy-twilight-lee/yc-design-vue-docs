### 渐隐切换

指定 <yc-tag>animation</yc-tag> 为 <yc-tag>fade</yc-tag> 使用渐隐切换效果。

<div class="cell-demo">
  <yc-carousel
    :style="{
      width: '600px',
      height: '240px',
    }"
    :auto-play="true"
    animation-name="fade"
    show-arrow="never">
    <yc-carousel-item v-for="image in images">
      <img
        :src="image"
        :style="{
          width: '100%',
        }" />
    </yc-carousel-item>
  </yc-carousel>
</div>

<script setup>
const images = [
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
];
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-carousel
    :style="{
      width: '600px',
      height: '240px',
    }"
    :auto-play="true"
    animation-name="fade"
    show-arrow="never">
    <yc-carousel-item v-for="image in images">
      <img
        :src="image"
        :style="{
          width: '100%',
        }" />
    </yc-carousel-item>
  </yc-carousel>
</template>

<script setup>
const images = [
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
];
</script>
```

</details>
