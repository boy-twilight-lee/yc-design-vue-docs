# Grid 栅格系统

栅格可以有效的保证页面的一致性、逻辑性、加强团队协作和统一。

---

### 基本用法

展示了最基本的 24 等分应用。

<div class="cell-demo">
 <div class="grid-demo-background">
    <yc-space direction="vertical" :size="16" style="display: block;">
      <yc-row class="grid-demo">
        <yc-col :span="24">
          <div>24 - 100%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="12">
          <div>12 - 50%</div>
        </yc-col>
        <yc-col :span="12">
          <div>12 - 50%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="8">
          <div>8 - 33.33%</div>
        </yc-col>
        <yc-col :span="8">
          <div>8 - 33.33%</div>
        </yc-col>
        <yc-col :span="8">
          <div>8 - 33.33%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
      </yc-row>
    </yc-space>
  </div>
</div>

<style scoped>
.grid-demo-background {
  background-image: linear-gradient(
    90deg,
    rgb(242,243,245) 4.16666667%,
    transparent 4.16666667%,
    transparent 8.33333333%,
    rgb(242,243,245) 8.33333333%,
    rgb(242,243,245) 12.5%,
    transparent 12.5%,
    transparent 16.66666667%,
    rgb(242,243,245) 16.66666667%,
    rgb(242,243,245) 20.83333333%,
    transparent 20.83333333%,
    transparent 25%,
    rgb(242,243,245) 25%,
    rgb(242,243,245) 29.16666667%,
    transparent 29.16666667%,
    transparent 33.33333333%,
    rgb(242,243,245) 33.33333333%,
    rgb(242,243,245) 37.5%,
    transparent 37.5%,
    transparent 41.66666667%,
    rgb(242,243,245) 41.66666667%,
    rgb(242,243,245) 45.83333333%,
    transparent 45.83333333%,
    transparent 50%,
    rgb(242,243,245) 50%,
    rgb(242,243,245) 54.16666667%,
    transparent 54.16666667%,
    transparent 58.33333333%,
    rgb(242,243,245) 58.33333333%,
    rgb(242,243,245) 62.5%,
    transparent 62.5%,
    transparent 66.66666667%,
    rgb(242,243,245) 66.66666667%,
    rgb(242,243,245) 70.83333333%,
    transparent 70.83333333%,
    transparent 75%,
    rgb(242,243,245) 75%,
    rgb(242,243,245) 79.16666667%,
    transparent 79.16666667%,
    transparent 83.33333333%,
    rgb(242,243,245) 83.33333333%,
    rgb(242,243,245) 87.5%,
    transparent 87.5%,
    transparent 91.66666667%,
    rgb(242,243,245) 91.66666667%,
    rgb(242,243,245) 95.83333333%,
    transparent 95.83333333%
  );
}
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(22,93,255, 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: rgb(106,161,255);
}
</style>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div class="grid-demo-background">
    <yc-space
      direction="vertical"
      :size="16"
      style="display: block;">
      <yc-row class="grid-demo">
        <yc-col :span="24">
          <div>24 - 100%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="12">
          <div>12 - 50%</div>
        </yc-col>
        <yc-col :span="12">
          <div>12 - 50%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="8">
          <div>8 - 33.33%</div>
        </yc-col>
        <yc-col :span="8">
          <div>8 - 33.33%</div>
        </yc-col>
        <yc-col :span="8">
          <div>8 - 33.33%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
        <yc-col :span="6">
          <div>6 - 25%</div>
        </yc-col>
      </yc-row>
      <yc-row class="grid-demo">
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
        <yc-col :span="4">
          <div>4 - 16.66%</div>
        </yc-col>
      </yc-row>
    </yc-space>
  </div>
</template>

<style scoped>
.grid-demo-background {
  background-image: linear-gradient(
    90deg,
    rgb(242, 243, 245) 4.16666667%,
    transparent 4.16666667%,
    transparent 8.33333333%,
    rgb(242, 243, 245) 8.33333333%,
    rgb(242, 243, 245) 12.5%,
    transparent 12.5%,
    transparent 16.66666667%,
    rgb(242, 243, 245) 16.66666667%,
    rgb(242, 243, 245) 20.83333333%,
    transparent 20.83333333%,
    transparent 25%,
    rgb(242, 243, 245) 25%,
    rgb(242, 243, 245) 29.16666667%,
    transparent 29.16666667%,
    transparent 33.33333333%,
    rgb(242, 243, 245) 33.33333333%,
    rgb(242, 243, 245) 37.5%,
    transparent 37.5%,
    transparent 41.66666667%,
    rgb(242, 243, 245) 41.66666667%,
    rgb(242, 243, 245) 45.83333333%,
    transparent 45.83333333%,
    transparent 50%,
    rgb(242, 243, 245) 50%,
    rgb(242, 243, 245) 54.16666667%,
    transparent 54.16666667%,
    transparent 58.33333333%,
    rgb(242, 243, 245) 58.33333333%,
    rgb(242, 243, 245) 62.5%,
    transparent 62.5%,
    transparent 66.66666667%,
    rgb(242, 243, 245) 66.66666667%,
    rgb(242, 243, 245) 70.83333333%,
    transparent 70.83333333%,
    transparent 75%,
    rgb(242, 243, 245) 75%,
    rgb(242, 243, 245) 79.16666667%,
    transparent 79.16666667%,
    transparent 83.33333333%,
    rgb(242, 243, 245) 83.33333333%,
    rgb(242, 243, 245) 87.5%,
    transparent 87.5%,
    transparent 91.66666667%,
    rgb(242, 243, 245) 91.66666667%,
    rgb(242, 243, 245) 95.83333333%,
    transparent 95.83333333%
  );
}
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```

</details>

### 栅格偏移

指定 <yc-tag>offset</yc-tag> 可以对栅格进行平移操作。

<div class="cell-demo">
    <yc-row class="grid-demo" style="marginBottom: 16px; backgroundColor: var(--color-fill-2);">
      <yc-col :span="8">col - 8</yc-col>
      <yc-col :span="8" :offset="8">
        col - 8 | offset - 8
      </yc-col>
    </yc-row>
    <yc-row class="grid-demo" style="marginBottom: 16px; backgroundColor: var(--color-fill-2);">
      <yc-col :span="6" :offset="8">
        col - 6 | offset - 8
      </yc-col>
      <yc-col :span="6" :offset="4">
        col - 6 | offset - 4
      </yc-col>
    </yc-row>
    <yc-row class="grid-demo" style="backgroundColor: var(--color-fill-2)">
      <yc-col :span="12" :offset="8">
        col - 12 | offset - 8
      </yc-col>
    </yc-row>
</div>

<style scoped>
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: #fff;
  text-align: center;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div>
    <yc-row
      class="grid-demo"
      style="marginBottom: 16px; backgroundColor: var(--color-fill-2);">
      <yc-col :span="8">col - 8</yc-col>
      <yc-col
        :span="8"
        :offset="8">
        col - 8 | offset - 8
      </yc-col>
    </yc-row>
    <yc-row
      class="grid-demo"
      style="marginBottom: 16px; backgroundColor: var(--color-fill-2);">
      <yc-col
        :span="6"
        :offset="8">
        col - 6 | offset - 8
      </yc-col>
      <yc-col
        :span="6"
        :offset="4">
        col - 6 | offset - 4
      </yc-col>
    </yc-row>
    <yc-row
      class="grid-demo"
      style="backgroundColor: var(--color-fill-2)">
      <yc-col
        :span="12"
        :offset="8">
        col - 12 | offset - 8
      </yc-col>
    </yc-row>
  </div>
</template>

<style scoped>
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```

</details>

### 区块间隔

通过在 <yc-tag>Row</yc-tag> 上指定 <yc-tag>Gutter</yc-tag> 可以增加栅格的区域间隔。

<div class="cell-demo">
 <div>
    <p>Horizontal</p>
    <yc-row class="grid-demo" :gutter="24">
      <yc-col :span="12">
        <div>col - 12</div>
      </yc-col>
      <yc-col :span="12">
        <div>col - 12</div>
      </yc-col>
    </yc-row>
    <p>Responsive</p>
    <yc-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
    </yc-row>
    <p>Horizontal and Vertical</p>
    <yc-row class="grid-demo" :gutter="[24, 12]">
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
    </yc-row>
  </div>
</div>

<style scoped>
.grid-demo .yc-col {
  height: 48px;
  color: var(--color-white);
}
.grid-demo .yc-col > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.grid-demo .yc-col:nth-child(2n) > div {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) > div {
  background-color: var(--color-primary-light-4);
}
</style>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div>
    <p>Horizontal</p>
    <yc-row
      class="grid-demo"
      :gutter="24">
      <yc-col :span="12">
        <div>col - 12</div>
      </yc-col>
      <yc-col :span="12">
        <div>col - 12</div>
      </yc-col>
    </yc-row>
    <p>Responsive</p>
    <yc-row
      class="grid-demo"
      :gutter="{ md: 8, lg: 24, xl: 32 }">
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
    </yc-row>
    <p>Horizontal and Vertical</p>
    <yc-row
      class="grid-demo"
      :gutter="[24, 12]">
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
    </yc-row>
  </div>
</template>

<style scoped>
.grid-demo .yc-col {
  height: 48px;
  color: var(--color-white);
}
.grid-demo .yc-col > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.grid-demo .yc-col:nth-child(2n) > div {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) > div {
  background-color: var(--color-primary-light-4);
}
</style>
```

</details>

### 水平布局

通过 <yc-tag>justify</yc-tag> 来进行水平布局。

<div class="cell-demo">
  <div>
    <p>Arrange left</p>
    <yc-row class="grid-demo" justify="start">
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
    </yc-row>
    <p>Arrange center</p>
    <yc-row class="grid-demo" justify="center">
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
    </yc-row>
    <p>Arrange right</p>
    <yc-row class="grid-demo" justify="end">
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
    </yc-row>
    <p>Space around</p>
    <yc-row class="grid-demo" justify="space-around">
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
    </yc-row>
    <p>Space between</p>
    <yc-row class="grid-demo" justify="space-between">
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
    </yc-row>
  </div>
</div>

<style scoped>
.grid-demo {
  background-color: var(--color-fill-2);
  margin-bottom: 40px;
}
.grid-demo:last-child {
  margin-bottom: 0px;
}
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div>
    <p>Arrange left</p>
    <yc-row
      class="grid-demo"
      justify="start">
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
    </yc-row>
    <p>Arrange center</p>
    <yc-row
      class="grid-demo"
      justify="center">
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
    </yc-row>
    <p>Arrange right</p>
    <yc-row
      class="grid-demo"
      justify="end">
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
    </yc-row>
    <p>Space around</p>
    <yc-row
      class="grid-demo"
      justify="space-around">
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
    </yc-row>
    <p>Space between</p>
    <yc-row
      class="grid-demo"
      justify="space-between">
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
      <yc-col :span="4">
        <div>col - 4</div>
      </yc-col>
    </yc-row>
  </div>
</template>

<style scoped>
.grid-demo {
  background-color: var(--color-fill-2);
  margin-bottom: 40px;
}
.grid-demo:last-child {
  margin-bottom: 0px;
}
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```

</details>

## 垂直布局

通过 <yc-tag>align</yc-tag> 来进行垂直布局。

<div class="cell-demo">
   <div>
    <p>Arrange top</p>
    <yc-row class="grid-demo" align="start">
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
    </yc-row>
    <p>Arrange center</p>
    <yc-row class="grid-demo" align="center">
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
    </yc-row>
    <p>Arrange bottom</p>
    <yc-row class="grid-demo" align="end">
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
    </yc-row>
  </div>
</div>

<style scoped>
.grid-demo {
  background-color: var(--color-fill-2);
  margin-bottom: 40px;
}
.grid-demo:last-child {
  margin-bottom: 0px;
}
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-of-type(1) {
  height: 90px;
  line-height: 90px;
}
.grid-demo .yc-col:nth-of-type(2) {
  height: 48px;
  line-height: 48px;
}
.grid-demo .yc-col:nth-of-type(3) {
  height: 120px;
  line-height: 120px;
}
.grid-demo .yc-col:nth-of-type(4) {
  height: 60px;
  line-height: 60px;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div>
    <p>Arrange top</p>
    <yc-row
      class="grid-demo"
      align="start">
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
    </yc-row>
    <p>Arrange center</p>
    <yc-row
      class="grid-demo"
      align="center">
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
    </yc-row>
    <p>Arrange bottom</p>
    <yc-row
      class="grid-demo"
      align="end">
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
      <yc-col :span="6">
        <div>col - 6</div>
      </yc-col>
    </yc-row>
  </div>
</template>

<style scoped>
.grid-demo {
  background-color: var(--color-fill-2);
  margin-bottom: 40px;
}
.grid-demo:last-child {
  margin-bottom: 0px;
}
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-of-type(1) {
  height: 90px;
  line-height: 90px;
}
.grid-demo .yc-col:nth-of-type(2) {
  height: 48px;
  line-height: 48px;
}
.grid-demo .yc-col:nth-of-type(3) {
  height: 120px;
  line-height: 120px;
}
.grid-demo .yc-col:nth-of-type(4) {
  height: 60px;
  line-height: 60px;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```

</details>

## 排序

通过 <yc-tag>order</yc-tag> 来进行元素排序。

<div class="cell-demo">
  <div>
    <yc-row class="grid-demo">
      <yc-col :span="6" :order="4">
        <div>1 col-order-4</div>
      </yc-col>
      <yc-col :span="6" :order="3">
        <div>2 col-order-3</div>
      </yc-col>
      <yc-col :span="6" :order="2">
        <div>3 col-order-2</div>
      </yc-col>
      <yc-col :span="6" :order="1">
        <div>4 col-order-1</div>
      </yc-col>
    </yc-row>
  </div>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div>
    <yc-row class="grid-demo">
      <yc-col
        :span="6"
        :order="4">
        <div>1 col-order-4</div>
      </yc-col>
      <yc-col
        :span="6"
        :order="3">
        <div>2 col-order-3</div>
      </yc-col>
      <yc-col
        :span="6"
        :order="2">
        <div>3 col-order-2</div>
      </yc-col>
      <yc-col
        :span="6"
        :order="1">
        <div>4 col-order-1</div>
      </yc-col>
    </yc-row>
  </div>
</template>

<style scoped>
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```

</details >

### 响应式布局

预置六种响应尺寸, 分别为 <yc-tag>xs</yc-tag>, <yc-tag>sm</yc-tag>, <yc-tag>md</yc-tag>, <yc-tag>lg</yc-tag>, <yc-tag>xl</yc-tag>, <yc-tag>xxl</yc-tag>。

<div class="cell-demo">
  <yc-row class="grid-demo">
    <yc-col
      :span="{
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10,
        xxl: 8,
      }">
      Col
    </yc-col>
    <yc-col
      :span="{
        xs: 20,
        sm: 16,
        md: 12,
        lg: 8,
        xl: 4,
        xxl: 8,
      }">
      Col
    </yc-col>
    <yc-col
      :span="{
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10,
        xxl: 8,
      }">
      Col
    </yc-col>
  </yc-row>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-row class="grid-demo">
    <yc-col
      :span="{
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10,
        xxl: 8,
      }">
      Col
    </yc-col>
    <yc-col
      :span="{
        xs: 20,
        sm: 16,
        md: 12,
        lg: 8,
        xl: 4,
        xxl: 8,
      }">
      Col
    </yc-col>
    <yc-col
      :span="{
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10,
        xxl: 8,
      }">
      Col
    </yc-col>
  </yc-row>
</template>

<style scoped>
.grid-demo .yc-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.grid-demo .yc-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .yc-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```

</details>

## API

### Grid Props

| 参数          | 说明     | 类型                        | 默认值  |
| ------------- | -------- | --------------------------- | ------- |
| cols          | 栅格列数 | `number \| ResponsiveValue` | `24`    |
| rowGap        | 行间距   | `number \| ResponsiveValue` | `0`     |
| colGap        | 列间距   | `number \| ResponsiveValue` | `0`     |
| collapsed     | 是否折叠 | `boolean`                   | `false` |
| collapsedRows | 折叠行数 | `number`                    | `1`     |

### GridItem Props

| 参数   | 说明         | 类型                        | 默认值 |
| ------ | ------------ | --------------------------- | ------ |
| span   | 栅格项跨度   | `number \| ResponsiveValue` | -      |
| offset | 栅格项偏移量 | `number \| ResponsiveValue` | -      |
| suffix | 是否为后缀   | `boolean`                   | -      |

### GridRow Props

| 参数    | 说明          | 类型                         | 默认值 |
| ------- | ------------- | ---------------------------- | ------ |
| gutter  | 栅格间距      | `Gutter \| [Gutter, Gutter]` | -      |
| justify | 水平对齐方式  | `GridRowJustify`             | -      |
| align   | 垂直对齐方式  | `GridRowAlign`               | -      |
| div     | 是否渲染为div | `boolean`                    | -      |
| wrap    | 是否换行      | `boolean`                    | -      |

### GridCol Props

| 参数   | 说明         | 类型                             | 默认值 |
| ------ | ------------ | -------------------------------- | ------ |
| span   | 栅格列跨度   | `number \| ResponsiveValue`      | -      |
| offset | 栅格列偏移量 | `number \| ResponsiveValue`      | -      |
| order  | 栅格列顺序   | `number \| ResponsiveValue`      | -      |
| flex   | 栅格列弹性   | `GridColFlex \| ResponsiveValue` | -      |

## 注意事项

1. 栅格系统基于24列设计，可以灵活组合
2. 响应式属性支持断点设置
3. 间距可以通过对象形式设置响应式值
4. 栅格行和栅格列提供了更灵活的布局控制
