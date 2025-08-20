### 触发方式

文字气泡支持 12 个不同的方位。分别为：<yc-tag>上左</yc-tag>、<yc-tag>上</yc-tag>、<yc-tag>上右</yc-tag>、<yc-tag>下左</yc-tag> <yc-tag>下</yc-tag>、<yc-tag>下右</yc-tag>、<yc-tag>左上</yc-tag>、<yc-tag>左</yc-tag>、<yc-tag>左下</yc-tag>、<yc-tag>右上</yc-tag>、<yc-tag>右</yc-tag>、<yc-tag>右下</yc-tag>。

<div class="cell-demo vp-raw">
  <div :style="{ position: 'relative', width: '440px', height: '280px' }">
    <yc-tooltip position="tl">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '70px' }"
        >TL</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="top">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '180px' }"
        >TOP</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="tr">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '290px' }"
        >TR</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="bl">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '70px' }"
        >BL</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="bottom">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '180px' }"
        >BOTTOM</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="br">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '290px' }"
        >BR</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="lt">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '60px', left: '10px' }"
        >LT</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="left">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '120px', left: '10px' }"
        >LEFT</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="lb">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '180px', left: '10px' }"
        >LB</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="rt">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '60px', left: '350px' }"
        >RT</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="right">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '120px', left: '350px' }"
        >RIGHT</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="rb">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '180px', left: '350px' }"
        >RB</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
  </div>
</div>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <div :style="{ position: 'relative', width: '440px', height: '280px' }">
    <yc-tooltip position="tl">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '70px' }"
        >TL</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="top">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '180px' }"
        >TOP</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="tr">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '0', left: '290px' }"
        >TR</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="bl">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '70px' }"
        >BL</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="bottom">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '180px' }"
        >BOTTOM</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="br">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '240px', left: '290px' }"
        >BR</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="lt">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '60px', left: '10px' }"
        >LT</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="left">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '120px', left: '10px' }"
        >LEFT</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="lb">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '180px', left: '10px' }"
        >LB</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="rt">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '60px', left: '350px' }"
        >RT</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="right">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '120px', left: '350px' }"
        >RIGHT</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
    <yc-tooltip position="rb">
      <yc-button
        class="button"
        :style="{ position: 'absolute', top: '180px', left: '350px' }"
        >RB</yc-button
      >
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-tooltip>
  </div>
</template>

<style lang="less">
.button {
  width: 100px;
}
</style>
```

</details>
