<template>
  <div class="hero-image-container">
    <div class="image-bg"></div>
    <img
      class="VPImage image-src"
      src="/component.svg"
      alt="component" />
  </div>
</template>

<script lang="ts" setup>
// Script部分没有变化
</script>

<style lang="less" scoped>
// 1. 定义一个可复用的 "混入" (Mixin) 来处理响应式尺寸
.responsive-size() {
  width: 192px;
  height: 192px;

  @media (min-width: 640px) {
    width: 256px;
    height: 256px;
  }

  @media (min-width: 960px) {
    width: 320px;
    height: 320px;
  }
}

.hero-image-container {
  height: 100%;
  width: 100%;
  transform: translate(0, 32px);
  display: flex;
  justify-content: center;
  align-items: center;

  .image-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: radial-gradient(circle, #a8c5ff, #165dff);
    filter: blur(68px);
    border-radius: 50%;

    .responsive-size();
  }

  .image-src {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .responsive-size();
  }
}
</style>
