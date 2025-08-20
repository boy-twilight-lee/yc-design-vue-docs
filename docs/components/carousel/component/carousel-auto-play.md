### 自动切换

可以通过 <yc-tag>autoPlay</yc-tag> 设置是否自动切换。
可设置 <yc-tag>moveSpeed</yc-tag> 、<yc-tag>timingFunc</yc-tag> 实现不同切换幻灯片效果。

<div class="cell-demo vp-raw">
  <yc-carousel
    :style="{
      width: '600px',
      height: '240px',
    }"
    :auto-play="true"
    indicator-type="dot"
    show-arrow="hover">
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
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-carousel
    :style="{
      width: '600px',
      height: '240px',
    }"
    :auto-play="true"
    indicator-type="dot"
    show-arrow="hover">
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
