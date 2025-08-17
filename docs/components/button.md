# Button 按钮

按钮用于开始一个即时操作。

---

### 基础用法

按钮分为 <yc-tag>primary</yc-tag> - 主要按钮、<yc-tag>secondary</yc-tag> - 次要按钮（默认）、<yc-tag>dashed</yc-tag>- 虚线按钮、<yc-tag>outline</yc-tag> - 线形按钮、<yc-tag>text</yc-tag> - 文本按钮五种类型。

<div class="cell-demo">
  <yc-space>
    <yc-button type="primary">Primary</yc-button>
    <yc-button>Secondary</yc-button>
    <yc-button type="dashed">Dashed</yc-button>
    <yc-button type="outline">Outline</yc-button>
    <yc-button type="text">Text</yc-button>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <template>
    <yc-space>
      <yc-button type="primary">Primary</yc-button>
      <yc-button>Secondary</yc-button>
      <yc-button type="dashed">Dashed</yc-button>
      <yc-button type="outline">Outline</yc-button>
      <yc-button type="text">Text</yc-button>
    </yc-space>
  </template>
</template>
```

</details>

### 图标按钮

按钮可以嵌入图标。在只设置图标时，按钮的宽高相等。

<div class="cell-demo">
  <yc-space>
    <yc-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </yc-button>
    <yc-button type="primary">
      <template #icon>
        <icon-delete />
      </template>
      <template #default>Delete</template>
    </yc-button>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </yc-button>
    <yc-button type="primary">
      <template #icon>
        <icon-delete />
      </template>
      <!-- Use the default slot to avoid extra spaces -->
      <template #default>Delete</template>
    </yc-button>
  </yc-space>
</template>
```

</details>

### 按钮形状

按钮分为 <yc-tag>square</yc-tag> - 长方形（默认）、<yc-tag>circle</yc-tag> - 圆形、<yc-tag>round</yc-tag> - 全圆角三种形状。

<div class="cell-demo">
  <yc-space>
    <yc-button type="primary">Square</yc-button>
    <yc-button type="primary" shape="round">Round</yc-button>
    <yc-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </yc-button>
    <yc-button type="primary" shape="circle">
      <icon-plus />
    </yc-button>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-button type="primary">Square</yc-button>
    <yc-button
      type="primary"
      shape="round"
      >Round</yc-button
    >
    <yc-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </yc-button>
    <yc-button
      type="primary"
      shape="circle">
      <icon-plus />
    </yc-button>
  </yc-space>
</template>
```

</details>

### 按钮尺寸

按钮分为 <yc-tag>mini</yc-tag>、<yc-tag>small</yc-tag>、<yc-tag>medium</yc-tag>、<yc-tag>large</yc-tag>四种尺寸。高度分别为：<yc-tag>24px</yc-tag>、<yc-tag>28px</yc-tag>、<yc-tag>32px</yc-tag>、<yc-tag>36px</yc-tag>。推荐（默认）尺寸为 <yc-tag>medium</yc-tag>。可在不同场景及不同业务需求选择适合尺寸。

<div class="cell-demo">
  <yc-space>
    <yc-button type="primary" size="mini">Mini</yc-button>
    <yc-button type="primary" size="small">Small</yc-button>
    <yc-button type="primary">Medium</yc-button>
    <yc-button type="primary" size="large">Large</yc-button>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>
```vue
<template>
  <yc-space>
    <yc-button type="primary" size="mini">Mini</yc-button>
    <yc-button type="primary" size="small">Small</yc-button>
    <yc-button type="primary">Medium</yc-button>
    <yc-button type="primary" size="large">Large</yc-button>
  </yc-space>
</template>
```
</details>

### 按钮状态

按钮的状态分为 <yc-tag>normal</yc-tag> - 正常（默认）、 <yc-tag>success</yc-tag> - 成功、<yc-tag>warning</yc-tag> - 警告、<yc-tag>danger</yc-tag> - 危险四种，可以与按钮类型同时使用。

<div class="cell-demo">
  <yc-space direction="vertical">
    <yc-space>
      <yc-button type="primary" status="success">Primary</yc-button>
      <yc-button status="success">Default</yc-button>
      <yc-button type="dashed" status="success">Dashed</yc-button>
      <yc-button type="outline" status="success">Outline</yc-button>
      <yc-button type="text" status="success">Text</yc-button>
    </yc-space>
    <yc-space>
      <yc-button type="primary" status="warning">Primary</yc-button>
      <yc-button status="warning">Default</yc-button>
      <yc-button type="dashed" status="warning">Dashed</yc-button>
      <yc-button type="outline" status="warning">Outline</yc-button>
      <yc-button type="text" status="warning">Text</yc-button>
    </yc-space>
    <yc-space>
      <yc-button type="primary" status="danger">Primary</yc-button>
      <yc-button status="danger">Default</yc-button>
      <yc-button type="dashed" status="danger">Dashed</yc-button>
      <yc-button type="outline" status="danger">Outline</yc-button>
      <yc-button type="text" status="danger">Text</yc-button>
    </yc-space>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space direction="vertical">
    <yc-space>
      <yc-button
        type="primary"
        status="success"
        >Primary</yc-button
      >
      <yc-button status="success">Default</yc-button>
      <yc-button
        type="dashed"
        status="success"
        >Dashed</yc-button
      >
      <yc-button
        type="outline"
        status="success"
        >Outline</yc-button
      >
      <yc-button
        type="text"
        status="success"
        >Text</yc-button
      >
    </yc-space>
    <yc-space>
      <yc-button
        type="primary"
        status="warning"
        >Primary</yc-button
      >
      <yc-button status="warning">Default</yc-button>
      <yc-button
        type="dashed"
        status="warning"
        >Dashed</yc-button
      >
      <yc-button
        type="outline"
        status="warning"
        >Outline</yc-button
      >
      <yc-button
        type="text"
        status="warning"
        >Text</yc-button
      >
    </yc-space>
    <yc-space>
      <yc-button
        type="primary"
        status="danger"
        >Primary</yc-button
      >
      <yc-button status="danger">Default</yc-button>
      <yc-button
        type="dashed"
        status="danger"
        >Dashed</yc-button
      >
      <yc-button
        type="outline"
        status="danger"
        >Outline</yc-button
      >
      <yc-button
        type="text"
        status="danger"
        >Text</yc-button
      >
    </yc-space>
  </yc-space>
</template>
```

</details>

### 禁用状态

按钮的禁用状态。

<div class="cell-demo">
  <yc-space direction="vertical">
    <yc-space>
      <yc-button type="primary" disabled>Primary</yc-button>
      <yc-button disabled>Default</yc-button>
      <yc-button type="dashed" disabled>Dashed</yc-button>
      <yc-button type="outline" disabled>Outline</yc-button>
      <yc-button type="text" disabled>Text</yc-button>
    </yc-space>
    <yc-space>
      <yc-button type="primary" status="success" disabled>Primary</yc-button>
      <yc-button status="success" disabled>Default</yc-button>
      <yc-button type="dashed" status="success" disabled>Dashed</yc-button>
      <yc-button type="outline" status="success" disabled>Outline</yc-button>
      <yc-button type="text" status="success" disabled>Text</yc-button>
    </yc-space>
    <yc-space>
      <yc-button type="primary" status="warning" disabled>Primary</yc-button>
      <yc-button status="warning" disabled>Default</yc-button>
      <yc-button type="dashed" status="warning" disabled>Dashed</yc-button>
      <yc-button type="outline" status="warning" disabled>Outline</yc-button>
      <yc-button type="text" status="warning" disabled>Text</yc-button>
    </yc-space>
    <yc-space>
      <yc-button type="primary" status="danger" disabled>Primary</yc-button>
      <yc-button status="danger" disabled>Default</yc-button>
      <yc-button type="dashed" status="danger" disabled>Dashed</yc-button>
      <yc-button type="outline" status="danger" disabled>Outline</yc-button>
      <yc-button type="text" status="danger" disabled>Text</yc-button>
    </yc-space>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space direction="vertical">
    <yc-space>
      <yc-button
        type="primary"
        disabled
        >Primary</yc-button
      >
      <yc-button disabled>Default</yc-button>
      <yc-button
        type="dashed"
        disabled
        >Dashed</yc-button
      >
      <yc-button
        type="outline"
        disabled
        >Outline</yc-button
      >
      <yc-button
        type="text"
        disabled
        >Text</yc-button
      >
    </yc-space>
    <yc-space>
      <yc-button
        type="primary"
        status="success"
        disabled
        >Primary</yc-button
      >
      <yc-button
        status="success"
        disabled
        >Default</yc-button
      >
      <yc-button
        type="dashed"
        status="success"
        disabled
        >Dashed</yc-button
      >
      <yc-button
        type="outline"
        status="success"
        disabled
        >Outline</yc-button
      >
      <yc-button
        type="text"
        status="success"
        disabled
        >Text</yc-button
      >
    </yc-space>
    <yc-space>
      <yc-button
        type="primary"
        status="warning"
        disabled
        >Primary</yc-button
      >
      <yc-button
        status="warning"
        disabled
        >Default</yc-button
      >
      <yc-button
        type="dashed"
        status="warning"
        disabled
        >Dashed</yc-button
      >
      <yc-button
        type="outline"
        status="warning"
        disabled
        >Outline</yc-button
      >
      <yc-button
        type="text"
        status="warning"
        disabled
        >Text</yc-button
      >
    </yc-space>
    <yc-space>
      <yc-button
        type="primary"
        status="danger"
        disabled
        >Primary</yc-button
      >
      <yc-button
        status="danger"
        disabled
        >Default</yc-button
      >
      <yc-button
        type="dashed"
        status="danger"
        disabled
        >Dashed</yc-button
      >
      <yc-button
        type="outline"
        status="danger"
        disabled
        >Outline</yc-button
      >
      <yc-button
        type="text"
        status="danger"
        disabled
        >Text</yc-button
      >
    </yc-space>
  </yc-space>
</template>
```

</details>

### 加载中状态

通过设置 <yc-tag>loading</yc-tag> 可以让按钮处于加载中状态。处于加载中状态的按钮不会触发事件。

<div class='cell-demo'>
  <yc-space>
    <yc-button type="primary" loading>Primary</yc-button>
    <yc-button loading>Default</yc-button>
    <yc-button type="dashed" loading>Dashed</yc-button>
    <yc-button type="primary" :loading="loading1" @click="handleClick1">Click Me</yc-button>
    <yc-button type="primary" :loading="loading2" @click="handleClick2">
      <template #icon>
        <icon-plus />
      </template>
      Click Me
    </yc-button>
  </yc-space>
</div>

<script setup>
import { ref } from 'vue';
const loading1 = ref(false);
const loading2 = ref(false);

const handleClick1 = () => {
  loading1.value = true;
  setTimeout(() => {
    loading1.value = false;
  }, 3000);
};
const handleClick2 = () => {
  loading2.value = true;
  setTimeout(() => {
    loading2.value = false;
  }, 3000);
};
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-button
      type="primary"
      loading
      >Primary</yc-button
    >
    <yc-button loading>Default</yc-button>
    <yc-button
      type="dashed"
      loading
      >Dashed</yc-button
    >
    <yc-button
      type="primary"
      :loading="loading1"
      @click="handleClick1"
      >Click Me</yc-button
    >
    <yc-button
      type="primary"
      :loading="loading2"
      @click="handleClick2">
      <template #icon>
        <icon-plus />
      </template>
      Click Me
    </yc-button>
  </yc-space>
</template>

<script setup>
import { ref } from 'vue';
const loading1 = ref(false);
const loading2 = ref(false);

const handleClick1 = () => {
  loading1.value = true;
  setTimeout(() => {
    loading1.value = false;
  }, 3000);
};
const handleClick2 = () => {
  loading2.value = true;
  setTimeout(() => {
    loading2.value = false;
  }, 3000);
};
</script>
```

</details>

### 长按钮

通过设置 <yc-tag>long</yc-tag> 属性，使按钮的宽度跟随容器的宽度。

<div class='cell-demo'>
   <yc-space class="wrapper" direction="vertical">
    <yc-button type="primary" long>Primary</yc-button>
    <yc-button long>Default</yc-button>
    <yc-button type="dashed" long>Dashed</yc-button>
    <yc-button type="outline" long>Outline</yc-button>
    <yc-button type="text" long>Text</yc-button>
  </yc-space>
</div>

<style scoped>
.wrapper{
  width: 400px;
  padding: 20px;
  border: 1px solid rgb(229,230,235);
  border-radius: 4px;
}
</style>

<details>
<summary>查看/隐藏代码</summary>
```vue
<template>
  <yc-space>
    <yc-button
      type="primary"
      loading
      >Primary</yc-button
    >
    <yc-button loading>Default</yc-button>
    <yc-button
      type="dashed"
      loading
      >Dashed</yc-button
    >
    <yc-button
      type="primary"
      :loading="loading1"
      @click="handleClick1"
      >Click Me</yc-button
    >
    <yc-button
      type="primary"
      :loading="loading2"
      @click="handleClick2">
      <template #icon>
        <icon-plus />
      </template>
      Click Me
    </yc-button>
  </yc-space>
</template>
````

</details>

### 组合按钮

通过 <yc-tag>yc-button-group></yc-tag> 属性 组件使按钮以组合方式出现。可用在同级多项操作中。

<div class='cell-demo'>
  <yc-space direction="vertical">
    <yc-button-group>
      <yc-button>Publish</yc-button>
      <yc-button>
        <template #icon>
          <icon-down />
        </template>
      </yc-button>
    </yc-button-group>
    <yc-button-group>
      <yc-button>Publish</yc-button>
      <yc-button>
        <template #icon>
          <icon-more />
        </template>
      </yc-button>
    </yc-button-group>
    <yc-button-group>
      <yc-button type="primary">
        <icon-left />
        Prev
      </yc-button>
      <yc-button type="primary">
        Next
        <icon-right />
      </yc-button>
    </yc-button-group>
    <yc-space size="large">
      <yc-button-group type="primary">
        <yc-button> copy </yc-button>
        <yc-button> cut </yc-button>
        <yc-button> find </yc-button>
      </yc-button-group>
      <yc-button-group type="primary" status="warning">
        <yc-button> <template #icon><icon-heart-fill /></template> </yc-button>
        <yc-button> <template #icon><icon-star-fill /></template> </yc-button>
        <yc-button> <template #icon><icon-thumb-up-fill /></template> </yc-button>
      </yc-button-group>
      <yc-button-group size="small" disabled>
        <yc-button> prev </yc-button>
        <yc-button> next </yc-button>
      </yc-button-group>
    </yc-space>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space direction="vertical">
    <yc-button-group>
      <yc-button>Publish</yc-button>
      <yc-button>
        <template #icon>
          <icon-down />
        </template>
      </yc-button>
    </yc-button-group>
    <yc-button-group>
      <yc-button>Publish</yc-button>
      <yc-button>
        <template #icon>
          <icon-more />
        </template>
      </yc-button>
    </yc-button-group>
    <yc-button-group>
      <yc-button type="primary">
        <icon-left />
        Prev
      </yc-button>
      <yc-button type="primary">
        Next
        <icon-right />
      </yc-button>
    </yc-button-group>
    <yc-space size="large">
      <yc-button-group type="primary">
        <yc-button> copy </yc-button>
        <yc-button> cut </yc-button>
        <yc-button> find </yc-button>
      </yc-button-group>
      <yc-button-group
        type="primary"
        status="warning">
        <yc-button>
          <template #icon><icon-heart-fill /></template>
        </yc-button>
        <yc-button>
          <template #icon><icon-star-fill /></template>
        </yc-button>
        <yc-button>
          <template #icon><icon-thumb-up-fill /></template>
        </yc-button>
      </yc-button-group>
      <yc-button-group
        size="small"
        disabled>
        <yc-button> prev </yc-button>
        <yc-button> next </yc-button>
      </yc-button-group>
    </yc-space>
  </yc-space>
</template>
```

</details>

## API

### Button Props

| 参数名    | 描述                   | 类型                                                          | 默认值     |
| --------- | ---------------------- | ------------------------------------------------------------- | ---------- |
| type      | 按钮的类型             | `'primary' \| 'secondary' \| 'dashed' \| 'outline' \| 'text'` | `-`        |
| status    | 按钮的状态             | `'normal' \| 'success' \| 'warning' \| 'danger'`              | `'normal'` |
| size      | 按钮的尺寸             | `'mini' \| 'small' \| 'medium' \| 'large'`                    | `'medium'` |
| shape     | 按钮的形状             | `'square' \| 'round' \| 'circle'`                             | `'round'`  |
| long      | 按钮是否撑满父容器宽度 | `boolean`                                                     | `false`    |
| loading   | 按钮是否处于加载状态   | `boolean`                                                     | `false`    |
| disabled  | 按钮是否禁用           | `boolean`                                                     | `false`    |
| html-type | 按钮的 HTML 类型       | `'button' \| 'submit' \| 'reset'`                             | `'button'` |
| href      | 链接按钮的地址         | `string`                                                      | `-`        |

### Button Events

| 事件名      | 描述           | 参数               |
| ----------- | -------------- | ------------------ |
| click       | 按钮时触发     | `(ev: MouseEvent)` |
| mousedown   | 鼠标按下时触发 | `(ev: MouseEvent)` |
| mouseup     | 鼠标抬起时触发 | `(ev: MouseEvent)` |
| dblclick    | 双击时触发     | `(ev: MouseEvent)` |
| contextmenu | 右键时触发     | `(ev: MouseEvent)` |

### Button Slots

| 插槽名  | 描述       |
| ------- | ---------- |
| default | 按钮的内容 |
| icon    | 按钮的图标 |

### ButtonGroup Props

| 参数名   | 描述           | 类型                                                          | 默认值     |
| -------- | -------------- | ------------------------------------------------------------- | ---------- |
| type     | 按钮组的类型   | `'primary' \| 'secondary' \| 'dashed' \| 'outline' \| 'text'` | `-`        |
| status   | 按钮组的状态   | `'normal' \| 'success' \| 'warning' \| 'danger'`              | `'normal'` |
| size     | 按钮组的尺寸   | `'mini' \| 'small' \| 'medium' \| 'large'`                    | `'medium'` |
| disabled | 按钮组是否禁用 | `boolean`                                                     | `false`    |

### ButtonGroup Slots

| 插槽名  | 描述         |
| ------- | ------------ |
| default | 按钮组的内容 |

## 注意事项

1. 主按钮在同一个操作区域最多出现一次
2. 禁用状态的按钮不会触发任何事件
3. 加载状态的按钮会显示加载动画，并且不可
4. 按钮组中的按钮会自动继承按钮组的样式属性
5. 图标按钮建议使用 `shape="circle"` 来获得更好的视觉效果
