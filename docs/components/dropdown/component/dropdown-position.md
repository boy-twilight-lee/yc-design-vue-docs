### 弹出方向

通过 `position` 支持指定 6 种弹出方位，分别是：`top`: 向上, `tl`: 左上, `tr`: 右上, `bottom:` 下方(默认), `bl`: 左下, `br`: 右下。

<div class="cell-demo vp-raw">
  <yc-space size="large">
    <yc-dropdown @select="handleSelect">
      <yc-button>Click Me</yc-button>
      <template #content>
        <yc-doption>Option 1</yc-doption>
        <yc-doption disabled>Option 2</yc-doption>
        <yc-doption :value="{ value: 'Option3' }">Option 3</yc-doption>
      </template>
    </yc-dropdown>
    <yc-dropdown
      @select="handleSelect"
      disabled>
      <yc-button disabled>Click Me</yc-button>
      <template #content>
        <yc-doption>Option 1</yc-doption>
        <yc-doption disabled>Option 2</yc-doption>
        <yc-doption>Option 3</yc-doption>
      </template>
    </yc-dropdown>
    <yc-dropdown
      @select="handleSelect"
      :popup-max-height="false">
      <yc-button>No Max Height <icon-down /></yc-button>
      <template #content>
        <yc-doption>Option 1</yc-doption>
        <yc-doption disabled>Option 2</yc-doption>
        <yc-doption>Option 3</yc-doption>
        <yc-doption>Option 4</yc-doption>
        <yc-doption>Option 5</yc-doption>
        <yc-doption>Option 6</yc-doption>
        <yc-doption>Option 7</yc-doption>
        <yc-doption>Option 8</yc-doption>
        <yc-doption>Option 9</yc-doption>
      </template>
    </yc-dropdown>
  </yc-space>
</div>

<script setup>
const handleSelect = (v) => {
  console.log(v);
};
</script>

<style>
.yc-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-space size="large">
    <yc-dropdown @select="handleSelect">
      <yc-button>Click Me</yc-button>
      <template #content>
        <yc-doption>Option 1</yc-doption>
        <yc-doption disabled>Option 2</yc-doption>
        <yc-doption :value="{ value: 'Option3' }">Option 3</yc-doption>
      </template>
    </yc-dropdown>
    <yc-dropdown
      @select="handleSelect"
      disabled>
      <yc-button disabled>Click Me</yc-button>
      <template #content>
        <yc-doption>Option 1</yc-doption>
        <yc-doption disabled>Option 2</yc-doption>
        <yc-doption>Option 3</yc-doption>
      </template>
    </yc-dropdown>
    <yc-dropdown
      @select="handleSelect"
      :popup-max-height="false">
      <yc-button>No Max Height <icon-down /></yc-button>
      <template #content>
        <yc-doption>Option 1</yc-doption>
        <yc-doption disabled>Option 2</yc-doption>
        <yc-doption>Option 3</yc-doption>
        <yc-doption>Option 4</yc-doption>
        <yc-doption>Option 5</yc-doption>
        <yc-doption>Option 6</yc-doption>
        <yc-doption>Option 7</yc-doption>
        <yc-doption>Option 8</yc-doption>
        <yc-doption>Option 9</yc-doption>
      </template>
    </yc-dropdown>
  </yc-space>
</template>

<script setup>
const handleSelect = (v) => {
  console.log(v);
};
</script>

<style>
.yc-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
```

</details>
