# Divider 分割线

划分内容区域，对模块做分隔。

---

### 基本用法

对不同章节的文本段落进行分割，默认为水平分割线，可在中间加入文字。

<div class="cell-demo">
  <div class="divider-demo">
    <p>A design is a plan or specification for the construction of an object.</p>
    <yc-divider />
    <p>A design is a plan or specification for the construction of an object.</p>
    <yc-divider dashed />
    <p>A design is a plan or specification for the construction of an object.</p>
    <yc-divider :size="2" style="border-bottom-style: dotted" />
    <p>A design is a plan or specification for the construction of an object.</p>
  </div>
  <div class="divider-demo" style="marginTop: 48px">
    <div class="flex-box">
      <span class="avatar"><IconImage style="width:16px;height:16px;"/></span>
      <div class="content">
        <yc-typography-title :heading="6">Image</yc-typography-title>
        May 4, 2010
      </div>
    </div>
    <yc-divider class="half-divider" />
    <div class="flex-box">
      <span class="avatar"><IconUser style="width:16px;height:16px;"/></span>
      <div class="content">
        <yc-typography-title :heading="6">Avatar</yc-typography-title>
        May 4, 2010
      </div>
    </div>
    <yc-divider class="half-divider" />
    <div class="flex-box">
      <span class="avatar"><IconPen style="width:16px;height:16px;" /></span>
      <div class="content">
        <yc-typography-title :heading="6">Icon</yc-typography-title>
        May 4, 2010
      </div>
    </div>
  </div>
</div>

<style scoped>
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(242, 243, 245);
}
.half-divider {
  left: 55px;
  width: calc(100% - 55px);
  min-width: auto;
  margin: 16px 0;
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-box .avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  color: rgb(78, 89, 105);
  font-size: 16px;
  background-color: rgb(229, 230, 235);
  border-radius: 50%;
}
.flex-box .content {
  flex: 1;
  color: rgb(78, 89, 105);
  font-size: 12px;
  line-height: 20px;
}
</style>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div class="cell-demo">
    <div class="divider-demo">
      <p>
        A design is a plan or specification for the construction of an object.
      </p>
      <yc-divider />
      <p>
        A design is a plan or specification for the construction of an object.
      </p>
      <yc-divider dashed />
      <p>
        A design is a plan or specification for the construction of an object.
      </p>
      <yc-divider
        :size="2"
        style="border-bottom-style: dotted" />
      <p>
        A design is a plan or specification for the construction of an object.
      </p>
    </div>
    <div
      class="divider-demo"
      style="marginTop: 48px">
      <div class="flex-box">
        <span class="avatar"
          ><IconImage style="width:16px;height:16px;"
        /></span>
        <div class="content">
          <yc-typography-title :heading="6">Image</yc-typography-title>
          May 4, 2010
        </div>
      </div>
      <yc-divider class="half-divider" />
      <div class="flex-box">
        <span class="avatar"><IconUser style="width:16px;height:16px;" /></span>
        <div class="content">
          <yc-typography-title :heading="6">Avatar</yc-typography-title>
          May 4, 2010
        </div>
      </div>
      <yc-divider class="half-divider" />
      <div class="flex-box">
        <span class="avatar"><IconPen style="width:16px;height:16px;" /></span>
        <div class="content">
          <yc-typography-title :heading="6">Icon</yc-typography-title>
          May 4, 2010
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(242, 243, 245);
}
.half-divider {
  left: 55px;
  width: calc(100% - 55px);
  min-width: auto;
  margin: 16px 0;
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-box .avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  color: rgb(78, 89, 105);
  font-size: 16px;
  background-color: rgb(229, 230, 235);
  border-radius: 50%;
}
.flex-box .content {
  flex: 1;
  color: rgb(78, 89, 105);
  font-size: 12px;
  line-height: 20px;
}
</style>
```

</details>

### 带有文字的分割线

通过 <yc-tag>orientation</yc-tag> 为分割线添加描述文字。

<div class="cell-demo">
  <div class="divider-demo">
    <p>A design is a plan or specification for the construction of an object.</p>
    <yc-divider orientation="left">Text</yc-divider>
    <p>A design is a plan or specification for the construction of an object.</p>
    <yc-divider orientation="center">Text</yc-divider>
    <p>A design is a plan or specification for the construction of an object.</p>
    <yc-divider orientation="right">Text</yc-divider>
    <yc-divider :margin="10">
      <icon-star style="width:14px;height:14px;" />
    </yc-divider>
  </div>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div class="divider-demo">
    <p>
      A design is a plan or specification for the construction of an object.
    </p>
    <yc-divider orientation="left">Text</yc-divider>
    <p>
      A design is a plan or specification for the construction of an object.
    </p>
    <yc-divider orientation="center">Text</yc-divider>
    <p>
      A design is a plan or specification for the construction of an object.
    </p>
    <yc-divider orientation="right">Text</yc-divider>
    <yc-divider :margin="10">
      <icon-star />
    </yc-divider>
  </div>
</template>
```

</details>

### 竖直分割线

指定 <yc-tag>direction</yc-tag> 为 <yc-tag>vertical</yc-tag> 即可使用竖直分割线。竖直分割线不能带文字。

<div class="cell-demo">
  <div class="divider-demo">
    <span>Item 1</span>
    <yc-divider direction="vertical" />
    <span>Item 2</span>
    <yc-divider direction="vertical" />
    <span>Item 3</span>
  </div>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div class="divider-demo">
    <span>Item 1</span>
    <yc-divider direction="vertical" />
    <span>Item 2</span>
    <yc-divider direction="vertical" />
    <span>Item 3</span>
  </div>
</template>
```

</details>

## API

### Props

| 参数        | 说明           | 类型          | 默认值         |
| ----------- | -------------- | ------------- | -------------- |
| direction   | 分割线方向     | `Direction`   | `'horizontal'` |
| orientation | 分割线文字位置 | `Orientation` | `'center'`     |
| type        | 分割线类型     | `DividerType` | `'solid'`      |
| size        | 分割线粗细     | `number`      | `1`            |
| margin      | 分割线边距     | `number`      | -              |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 分割线文字内容 |

## 注意事项

1. 垂直分割线不支持文字内容
2. 边距会根据方向自动调整
3. 分割线类型会影响视觉效果
4. 在响应式设计中注意分割线的显示
