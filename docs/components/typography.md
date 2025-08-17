# Typography 排版

用于展示标题、段落、文本内容。

---

### 组合使用

排版组件用于展示标题、段落、文本内容，这里展示了排版的组合使用。

<div class="cell-demo">
  <yc-typography :style="{ marginTop: '-40px' }">
    <yc-typography-title>
      Design system
    </yc-typography-title>
    <yc-typography-paragraph>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design.
    </yc-typography-paragraph>
    <yc-typography-paragraph>
      In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered <yc-typography-text bold>to be a design activity.</yc-typography-text>
    </yc-typography-paragraph>
    <yc-typography-title :heading="2">ArcoDesign</yc-typography-title>
    <yc-typography-paragraph>
      The ArcoDesign component library defines a set of default particle variables, and a custom theme is to <yc-typography-text mark>customize</yc-typography-text> and <yc-typography-text underline>overwrite</yc-typography-text> this variable list.
    </yc-typography-paragraph>
    <yc-typography-paragraph blockquote>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a <yc-typography-text code>prototype</yc-typography-text>, <yc-typography-text code>product</yc-typography-text> or <yc-typography-text code>process</yc-typography-text>. The verb to design expresses the process of developing a design.
    </yc-typography-paragraph>
    <yc-typography-paragraph mark underline delete>A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process.</yc-typography-paragraph>
    <yc-typography-paragraph>
      <ul>
        <li>
          Architectural blueprints
          <ul>
            <li>Architectural blueprints</li>
          </ul>
        </li>
        <li>Engineering drawings</li>
        <li>Business processes</li>
      </ul>
    </yc-typography-paragraph>
    <yc-typography-paragraph>
      <ol>
        <li>Architectural blueprints</li>
        <li>Engineering drawings</li>
        <li>Business processes</li>
      </ol>
    </yc-typography-paragraph>
  </yc-typography>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-typography :style="{ marginTop: '-40px' }">
    <yc-typography-title> Design system </yc-typography-title>
    <yc-typography-paragraph>
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
    </yc-typography-paragraph>
    <yc-typography-paragraph>
      In some cases, the direct construction of an object without an explicit
      prior plan (such as in craftwork, some engineering, coding, and graphic
      design) may also be considered
      <yc-typography-text bold>to be a design activity.</yc-typography-text>
    </yc-typography-paragraph>
    <yc-typography-title :heading="2">ArcoDesign</yc-typography-title>
    <yc-typography-paragraph>
      The ArcoDesign component library defines a set of default particle
      variables, and a custom theme is to
      <yc-typography-text mark>customize</yc-typography-text> and
      <yc-typography-text underline>overwrite</yc-typography-text> this variable
      list.
    </yc-typography-paragraph>
    <yc-typography-paragraph blockquote>
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a
      <yc-typography-text code>prototype</yc-typography-text>,
      <yc-typography-text code>product</yc-typography-text> or
      <yc-typography-text code>process</yc-typography-text>. The verb to design
      expresses the process of developing a design.
    </yc-typography-paragraph>
    <yc-typography-paragraph
      mark
      underline
      delete
      >A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or
      process.</yc-typography-paragraph
    >
    <yc-typography-paragraph>
      <ul>
        <li>
          Architectural blueprints
          <ul>
            <li>Architectural blueprints</li>
          </ul>
        </li>
        <li>Engineering drawings</li>
        <li>Business processes</li>
      </ul>
    </yc-typography-paragraph>
    <yc-typography-paragraph>
      <ol>
        <li>Architectural blueprints</li>
        <li>Engineering drawings</li>
        <li>Business processes</li>
      </ol>
    </yc-typography-paragraph>
  </yc-typography>
</template>
```

</details>

### 标题

展示不同级别的标题。

<div class="cell-demo">
  <yc-typography>
    <yc-typography-title>
      H1. The Pragmatic Romanticism
    </yc-typography-title>
    <yc-typography-title :heading="2">
      H2. The Pragmatic Romanticism
    </yc-typography-title>
    <yc-typography-title :heading="3">
      H3. The Pragmatic Romanticism
    </yc-typography-title>
    <yc-typography-title :heading="4">
      H4. The Pragmatic Romanticism
    </yc-typography-title>
    <yc-typography-title :heading="5">
      H5. The Pragmatic Romanticism
    </yc-typography-title>
    <yc-typography-title :heading="6">
      H6. The Pragmatic Romanticism
    </yc-typography-title>
  </yc-typography>
</div>

<details>
<summary>点击查看/隐藏代码</summary>

```vue
<template>
  <yc-typography>
    <yc-typography-title> H1. The Pragmatic Romanticism </yc-typography-title>
    <yc-typography-title :heading="2">
      H2. The Pragmatic Romanticism
    </yc-typography-title>
    <yc-typography-title :heading="3">
      H3. The Pragmatic Romanticism
    </yc-typography-title>
    <yc-typography-title :heading="4">
      H4. The Pragmatic Romanticism
    </yc-typography-title>
    <yc-typography-title :heading="5">
      H5. The Pragmatic Romanticism
    </yc-typography-title>
    <yc-typography-title :heading="6">
      H6. The Pragmatic Romanticism
    </yc-typography-title>
  </yc-typography>
</template>
```

</details>

### 文本

不同样式的文本以及超链接组件。

<div class="cell-demo">
<yc-space direction="vertical" :size="10">
    <yc-typography-text>
      Arco Design
    </yc-typography-text>
    <yc-typography-text type="secondary">
      Secondary
    </yc-typography-text>
    <yc-typography-text type="primary">
      Primary
    </yc-typography-text>
    <yc-typography-text type="success">
      Success
    </yc-typography-text>
    <yc-typography-text type="warning">
      Warning
    </yc-typography-text>
    <yc-typography-text type="danger">
      Danger
    </yc-typography-text>
    <yc-typography-text bold>
      Bold
    </yc-typography-text>
    <yc-typography-text disabled>
      Disabled
    </yc-typography-text>
    <yc-typography-text mark>
      Mark
    </yc-typography-text>
    <yc-typography-text underline>
      Underline
    </yc-typography-text>
    <yc-typography-text delete>
      Line through
    </yc-typography-text>
    <yc-typography-text code>
      Code snippet
    </yc-typography-text>
  </yc-space>
</div>

<details>
<summary>点击查看/隐藏代码</summary>

```vue
<template>
  <yc-space
    direction="vertical"
    :size="10">
    <yc-typography-text> Arco Design </yc-typography-text>
    <yc-typography-text type="secondary"> Secondary </yc-typography-text>
    <yc-typography-text type="primary"> Primary </yc-typography-text>
    <yc-typography-text type="success"> Success </yc-typography-text>
    <yc-typography-text type="warning"> Warning </yc-typography-text>
    <yc-typography-text type="danger"> Danger </yc-typography-text>
    <yc-typography-text bold> Bold </yc-typography-text>
    <yc-typography-text disabled> Disabled </yc-typography-text>
    <yc-typography-text mark> Mark </yc-typography-text>
    <yc-typography-text underline> Underline </yc-typography-text>
    <yc-typography-text delete> Line through </yc-typography-text>
    <yc-typography-text code> Code snippet </yc-typography-text>
  </yc-space>
</template>
```

</details>

### 段落

文本段落样式。

<div class="cell-demo">
  <yc-typography>
    <yc-typography-title :heading="5">Default</yc-typography-title>
    <yc-typography-paragraph>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.
    </yc-typography-paragraph>
    <yc-typography-title :heading="5">Secondary</yc-typography-title>
    <yc-typography-paragraph type="secondary">
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.
    </yc-typography-paragraph>
    <yc-typography-title :heading="5">Spacing default</yc-typography-title>
    <yc-typography-paragraph>
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.
    </yc-typography-paragraph>
    <yc-typography-title :heading="5">Spacing close</yc-typography-title>
    <yc-typography-paragraph type="secondary" spacing="close">
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design.
    </yc-typography-paragraph>
  </yc-typography>
</div>

<details>
<summary>点击查看/隐藏代码</summary>

```vue
<template>
  <yc-typography>
    <yc-typography-title :heading="5">Default</yc-typography-title>
    <yc-typography-paragraph>
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
      In some cases, the direct construction of an object without an explicit
      prior plan (such as in craftwork, some engineering, coding, and graphic
      design) may also be considered to be a design activity.
    </yc-typography-paragraph>
    <yc-typography-title :heading="5">Secondary</yc-typography-title>
    <yc-typography-paragraph type="secondary">
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
      In some cases, the direct construction of an object without an explicit
      prior plan (such as in craftwork, some engineering, coding, and graphic
      design) may also be considered to be a design activity.
    </yc-typography-paragraph>
    <yc-typography-title :heading="5">Spacing default</yc-typography-title>
    <yc-typography-paragraph>
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
      In some cases, the direct construction of an object without an explicit
      prior plan (such as in craftwork, some engineering, coding, and graphic
      design) may also be considered to be a design activity.
    </yc-typography-paragraph>
    <yc-typography-title :heading="5">Spacing close</yc-typography-title>
    <yc-typography-paragraph
      type="secondary"
      spacing="close">
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
    </yc-typography-paragraph>
  </yc-typography>
</template>
```

</details>

### 可交互

提供复制、编辑文本等功能。

<div class="cell-demo">
  <yc-typography>
    <yc-typography-paragraph copyable>
      Click the icon to copy this text.
    </yc-typography-paragraph>
    <yc-typography-paragraph
      editable
      v-model:editText="str"
    >
      {{str}}
    </yc-typography-paragraph>
  </yc-typography>
</div>

<details>
<summary>点击查看/隐藏代码</summary>

```vue
<template>
  <div class="cell-demo">
    <yc-typography>
      <yc-typography-paragraph copyable>
        Click the icon to copy this text.
      </yc-typography-paragraph>
      <yc-typography-paragraph
        editable
        v-model:editText="str">
        {{ str }}
      </yc-typography-paragraph>
    </yc-typography>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const str = ref('Click the icon to edit this text.');
</script>
```

</details>

<script setup>
import { ref } from 'vue';
const str = ref('Click the icon to edit this text.');
</script>

## API

### Typography Props

| 参数名              | 描述                   | 类型                                                             | 默认值  |
| ------------------- | ---------------------- | ---------------------------------------------------------------- | ------- |
| type                | 文本类型               | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `-`     |
| bold                | 是否加粗               | `boolean`                                                        | `false` |
| disabled            | 是否禁用               | `boolean`                                                        | `false` |
| mark                | 是否标记               | `boolean`                                                        | `false` |
| underline           | 是否下划线             | `boolean`                                                        | `false` |
| delete              | 是否删除线             | `boolean`                                                        | `false` |
| code                | 是否代码样式           | `boolean`                                                        | `false` |
| editable            | 是否可编辑             | `boolean`                                                        | `false` |
| editing (v-model)   | 是否处于编辑状态       | `boolean`                                                        | `false` |
| edit-text (v-model) | 编辑的文本内容         | `string`                                                         | `-`     |
| copyable            | 是否可复制             | `boolean`                                                        | `false` |
| copy-text           | 复制的文本内容         | `string`                                                         | `-`     |
| copy-delay          | 复制成功提示的延迟时间 | `number`                                                         | `3000`  |
| ellipsis            | 省略配置               | `boolean \| EllipsisConfig`                                      | `false` |

### TypographyTitle Props

| 参数名  | 描述     | 类型                         | 默认值 |
| ------- | -------- | ---------------------------- | ------ |
| heading | 标题级别 | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1`    |

### TypographyParagraph Props

| 参数名     | 描述           | 类型                   | 默认值      |
| ---------- | -------------- | ---------------------- | ----------- |
| blockquote | 是否为引用样式 | `boolean`              | `false`     |
| spacing    | 行间距类型     | `'default' \| 'close'` | `'default'` |

### Typography Events

| 事件名     | 描述               | 参数                    |
| ---------- | ------------------ | ----------------------- |
| edit-start | 开始编辑时触发     | `-`                     |
| change     | 编辑完成时触发     | `(value: string)`       |
| edit-end   | 结束编辑时触发     | `-`                     |
| copy       | 复制时触发         | `(value: string)`       |
| ellipsis   | 省略状态变化时触发 | `(isEllipsis: boolean)` |
| expand     | 展开状态变化时触发 | `(expanded: boolean)`   |

### Typography Slots

| 插槽名       | 描述           | 参数                    |
| ------------ | -------------- | ----------------------- |
| default      | 文本内容       | `-`                     |
| expand-node  | 自定义展开节点 | `{ expanded: boolean }` |
| copy-icon    | 自定义复制图标 | `{ copied: boolean }`   |
| copy-tooltip | 自定义复制提示 | `{ copied: boolean }`   |

## 类型定义

<details>
<summary>点击查看/隐藏代码</summary>

```typescript
export interface TypographyBaseProps {
  tag?: string;
  type?: TypographyType;
  bold?: boolean;
  disabled?: boolean;
  mark?: boolean;
  underline?: boolean;
  delete?: boolean;
  code?: boolean;
  editable?: boolean;
  editing?: boolean;
  editText?: string;
  copyable?: boolean;
  copyText?: string;
  copyDelay?: number;
  ellipsis?: boolean | EllipsisConfig;
}

export interface TypographyTitleProps {
  heading?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TypographyParagraphProps {
  blockquote?: boolean;
  spacing?: 'default' | 'close';
}

export type EllipsisConfig = {
  rows?: number;
  expandable?: boolean;
  ellipsisStr?: string;
  suffix?: string;
  showTooltip?:
    | boolean
    | { type: 'tooltip' | 'popover'; props: Record<string, any> };
  css?: boolean;
};

export type TypographyType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning';
```

</details>

## 注意事项

1. 可编辑文本在编辑模式下支持 Enter 键确认和 Escape 键取消
2. 复制功能需要浏览器支持 Clipboard API
3. 省略功能支持单行和多行省略，多行省略需要指定行数
4. 可展开的省略文本支持自定义展开/收起节点
5. 标题组件会根据 `heading` 属性渲染对应的 HTML 标签（h1-h6）
