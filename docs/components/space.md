# Space 间距

设置组件之间的间距

---

### 基础用法

间距组件的基本用法。

<div class="cell-demo">
  <yc-space>
    <yc-typography-text>Space:</yc-typography-text>
    <yc-tag v-if="false" color='arcoblue'>Tag</yc-tag>
    <yc-button type="primary">Item1</yc-button>
    <yc-button type="primary">Item2</yc-button>
    <yc-switch defaultChecked />
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-typography-text>Space:</yc-typography-text>
    <yc-tag
      v-if="false"
      color="arcoblue">
      Tag
    </yc-tag>
    <yc-button type="primary">Item1</yc-button>
    <yc-button type="primary">Item2</yc-button>
    <yc-switch defaultChecked />
  </yc-space>
</template>
```

</details>

### 垂直间距

可以设置垂直方向排列的间距。

<div class="cell-demo">
  <yc-space direction="vertical" fill>
    <yc-button type="primary" long>Item1</yc-button>
    <yc-button type="primary" long>Item2</yc-button>
    <yc-button type="primary" long>Item3</yc-button>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space
    direction="vertical"
    fill>
    <yc-button
      type="primary"
      long
      >Item1</yc-button
    >
    <yc-button
      type="primary"
      long
      >Item2</yc-button
    >
    <yc-button
      type="primary"
      long
      >Item3</yc-button
    >
  </yc-space>
</template>
```

</details>

### 尺寸

内置 4 个尺寸，<yc-tag>mini - 4px</yc-tag> <yc-tag>small - 8px (默认)</yc-tag> <yc-tag>medium - 16px</yc-tag> <yc-tag>large - 24px</yc-tag>，也支持传数字来自定义尺寸。

<div class="cell-demo">
  <div>
    <div style="marginBottom: 20px">
      <yc-radio-group v-model="size" type='button'>
        <yc-radio value="mini">mini</yc-radio>
        <yc-radio value="small">small</yc-radio>
        <yc-radio value="medium">medium</yc-radio>
        <yc-radio value="large">large</yc-radio>
      </yc-radio-group>
    </div>
    <yc-space :size="size">
      <yc-button type="primary">Item1</yc-button>
      <yc-button type="primary">Item2</yc-button>
      <yc-button type="primary">Item3</yc-button>
    </yc-space>
  </div>
</div>

<script setup lang="ts">
import { ref } from 'vue'
const size = ref('medium')
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div>
    <div style="marginBottom: 20px">
      <yc-radio-group
        v-model="size"
        type="button">
        <yc-radio value="mini">mini</yc-radio>
        <yc-radio value="small">small</yc-radio>
        <yc-radio value="medium">medium</yc-radio>
        <yc-radio value="large">large</yc-radio>
      </yc-radio-group>
    </div>
    <yc-space :size="size">
      <yc-button type="primary">Item1</yc-button>
      <yc-button type="primary">Item2</yc-button>
      <yc-button type="primary">Item3</yc-button>
    </yc-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const size = ref('medium');
const align = ref('center');
</script>
```

</details>

### 对齐

内置 4 种对齐方式，分别为 <yc-tag>start</yc-tag> <yc-tag>center</yc-tag> <yc-tag>end</yc-tag> <yc-tag>baseline</yc-tag>，在水平模式下默认为 <yc-tag>center</yc-tag>。

<div class="cell-demo">
  <div>
    <div style="marginBottom: 20px">
      <yc-radio-group v-model="align" type='button'>
        <yc-radio value="start">start</yc-radio>
        <yc-radio value="center">center</yc-radio>
        <yc-radio value="end">end</yc-radio>
        <yc-radio value="baseline">baseline</yc-radio>
      </yc-radio-group>
    </div>
    <yc-space :align="align" style="backgroundColor: var(--color-fill-2);padding: 10px;">
      <yc-typography-text>Space:</yc-typography-text>
      <yc-button type="primary">Item2</yc-button>
      <yc-card title='Card'>
        Card content
      </yc-card>
    </yc-space>
  </div>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <div>
    <div style="marginBottom: 20px">
      <yc-radio-group
        v-model="align"
        type="button">
        <yc-radio value="start">start</yc-radio>
        <yc-radio value="center">center</yc-radio>
        <yc-radio value="end">end</yc-radio>
        <yc-radio value="baseline">baseline</yc-radio>
      </yc-radio-group>
    </div>
    <yc-space
      :align="align"
      style="backgroundColor: var(--color-fill-2);padding: 10px;">
      <yc-typography-text>Space:</yc-typography-text>
      <yc-button type="primary">Item2</yc-button>
      <yc-card title="Card"> Card content </yc-card>
    </yc-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const align = ref('center');
</script>
```

</details>

### 环绕间距

环绕类型的间距，四周都有间距，一般用于换行的场景。

<div class="cell-demo">
  <yc-space wrap>
    <yc-button type="primary">Item1</yc-button>
    <yc-button type="primary">Item2</yc-button>
    <yc-button type="primary">Item3</yc-button>
    <yc-button type="primary">Item4</yc-button>
    <yc-button type="primary">Item5</yc-button>
    <yc-button type="primary">Item6</yc-button>
    <yc-button type="primary">Item7</yc-button>
    <yc-button type="primary">Item8</yc-button>
    <yc-button type="primary">Item9</yc-button>
    <yc-button type="primary">Item10</yc-button>
    <yc-button type="primary">Item11</yc-button>
    <yc-button type="primary">Item12</yc-button>
    <yc-button type="primary">Item13</yc-button>
    <yc-button type="primary">Item14</yc-button>
    <yc-button type="primary">Item15</yc-button>
    <yc-button type="primary">Item16</yc-button>
    <yc-button type="primary">Item17</yc-button>
    <yc-button type="primary">Item18</yc-button>
    <yc-button type="primary">Item19</yc-button>
    <yc-button type="primary">Item20</yc-button>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space wrap>
    <yc-button type="primary">Item1</yc-button>
    <yc-button type="primary">Item2</yc-button>
    <yc-button type="primary">Item3</yc-button>
    <yc-button type="primary">Item4</yc-button>
    <yc-button type="primary">Item5</yc-button>
    <yc-button type="primary">Item6</yc-button>
    <yc-button type="primary">Item7</yc-button>
    <yc-button type="primary">Item8</yc-button>
    <yc-button type="primary">Item9</yc-button>
    <yc-button type="primary">Item10</yc-button>
    <yc-button type="primary">Item11</yc-button>
    <yc-button type="primary">Item12</yc-button>
    <yc-button type="primary">Item13</yc-button>
    <yc-button type="primary">Item14</yc-button>
    <yc-button type="primary">Item15</yc-button>
    <yc-button type="primary">Item16</yc-button>
    <yc-button type="primary">Item17</yc-button>
    <yc-button type="primary">Item18</yc-button>
    <yc-button type="primary">Item19</yc-button>
    <yc-button type="primary">Item20</yc-button>
  </yc-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const align = ref('center');
</script>
```

</details>

### 分隔符

为相邻子元素设置分隔符。

<div class="cell-demo">
  <yc-space>
    <template #split>
      <yc-divider direction="vertical" />
    </template>
    <yc-tag v-if="false" color='arcoblue'>Tag</yc-tag>
    <yc-button type="primary">Item1</yc-button>
    <yc-button type="primary">Item2</yc-button>
    <yc-switch defaultChecked />
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <template #split>
      <yc-divider direction="vertical" />
    </template>
    <yc-tag
      v-if="false"
      color="arcoblue"
      >Tag</yc-tag
    >
    <yc-button type="primary">Item1</yc-button>
    <yc-button type="primary">Item2</yc-button>
    <yc-switch defaultChecked />
  </yc-space>
</template>
```

</details>

## API

### Space Props

| 参数名    | 描述                                          | 类型                                                 | 默认值         |
| --------- | --------------------------------------------- | ---------------------------------------------------- | -------------- |
| align     | 对齐方式                                      | `'start' \| 'end' \| 'center' \| 'baseline'`         | `'start'`      |
| direction | 间距方向                                      | `'horizontal' \| 'vertical'`                         | `'horizontal'` |
| wrap      | 是否自动换行，仅在 horizontal 时有效          | `boolean`                                            | `false`        |
| fill      | 是否让 Space 变为一个块级元素，填充整个父元素 | `boolean`                                            | `false`        |
| size      | 间距大小                                      | `'mini' \| 'small' \| 'medium' \| 'large' \| number` | `'medium'`     |

### Space Slots

| 插槽名  | 描述               |
| ------- | ------------------ |
| default | 需要添加间距的元素 |
| split   | 分隔符             |

## 类型定义

```typescript
export interface SpaceProps {
  align?: SpaceAlign;
  direction?: Direction;
  wrap?: boolean;
  fill?: boolean;
  size?: Size | number;
}

export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';
```

## 设计原则

- **视觉平衡**：通过合理的间距让页面布局更加平衡
- **一致性**：保持相同类型元素的间距一致
- **响应式**：在不同屏幕尺寸下保持良好的间距效果
- **易用性**：提供简单易用的 API，降低使用成本

## 注意事项

1. `size` 支持预设值（mini、small、medium、large）和数字
2. 在垂直模式下，`wrap` 属性无效
3. `fill` 模式下，子元素会平均分布并填充整个容器宽度
4. 使用分隔符时，分隔符会出现在每两个子元素之间
5. 对齐方式仅在交叉轴方向上生效（水平布局时影响垂直对齐，垂直布局时影响水平对齐）
