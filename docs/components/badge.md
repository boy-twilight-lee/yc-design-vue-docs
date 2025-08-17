# Badge 徽标

一般出现在图标或文字的右上角。提供及时、重要的信息提示。

---

### 基础用法

基本用法。只需指定 <yc-tag>count</yc-tag> 或者 <yc-tag>content slot</yc-tag>，即可显示徽标。

<div class="cell-demo">
  <yc-space :size="40">
    <yc-badge :count="9">
      <yc-avatar shape="square" />
    </yc-badge>
    <yc-badge :count="9" dot :dotStyle="{ width: '10px', height: '10px' }">
      <yc-avatar shape="square" />
    </yc-badge>
    <yc-badge :dotStyle="{ height: '16px', width: '16px', fontSize: '14px' }">
      <template #content>
        <IconClockCircle
          :style="{ verticalAlign: 'middle', color: 'var(--color-text-2)' }"
        />
      </template>
      <yc-avatar shape="square" />
    </yc-badge>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space :size="40">
    <yc-badge :count="9">
      <yc-avatar shape="square" />
    </yc-badge>
    <yc-badge
      :count="9"
      dot
      :dotStyle="{ width: '10px', height: '10px' }">
      <yc-avatar shape="square" />
    </yc-badge>
    <yc-badge :dotStyle="{ height: '16px', width: '16px', fontSize: '14px' }">
      <template #content>
        <IconClockCircle
          :style="{ verticalAlign: 'middle', color: 'var(--color-text-2)' }" />
      </template>
      <yc-avatar shape="square" />
    </yc-badge>
  </yc-space>
</template>
```

</details>

### 独立使用

<yc-tag>default slot</yc-tag> 为空时，将会独立展示徽标。

<div class="cell-demo">
  <yc-space :size="40">
    <yc-badge :count="2" />
    <yc-badge
      :count="2"
      :dotStyle="{ background: '#E5E6EB', color: '#86909C' }"
    />
    <yc-badge :count="16" />
    <yc-badge :count="1000" :max-count="99" />
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space :size="40">
    <yc-badge :count="2" />
    <yc-badge
      :count="2"
      :dotStyle="{ background: '#E5E6EB', color: '#86909C' }" />
    <yc-badge :count="16" />
    <yc-badge
      :count="1000"
      :max-count="99" />
  </yc-space>
</template>
```

</details>

### 小红点

设置 <yc-tag>dot</yc-tag>，即可只显示小红点而不显示数字。<yc-tag>count > 0</yc-tag> 时才显示

<div class="cell-demo">
  <yc-space :size="40">
    <yc-badge :count="9" dot :offset="[6, -2]">
      <a href="#">Link</a>
    </yc-badge>
    <yc-badge :count="9" dot :offset="[2, -2]">
      <IconNotification
        :style="{ color: '#888', fontSize: '18px', verticalAlign: '-3px' }"
      />
    </yc-badge>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space :size="40">
    <yc-badge
      :count="9"
      dot
      :offset="[6, -2]">
      <a href="#">Link</a>
    </yc-badge>
    <yc-badge
      :count="9"
      dot
      :offset="[2, -2]">
      <IconNotification
        :style="{ color: '#888', fontSize: '18px', verticalAlign: '-3px' }" />
    </yc-badge>
  </yc-space>
</template>
```

</details>

### 文本内容

设置 <yc-tag>text</yc-tag>，可设置自定义提示内容。

<div class="cell-demo">
  <yc-space :size="40">
    <yc-badge text="NEW">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge text="HOT">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space :size="40">
    <yc-badge text="NEW">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge text="HOT">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
  </yc-space>
</template>
```

</details>

### 最大值

设置 <yc-tag>max-count</yc-tag>，可以限制最大显示的徽标数值，超过将会加 <yc-tag>+</yc-tag> 后缀。<yc-tag>max-count</yc-tag> 默认为 <yc-tag>99</yc-tag>。

<div class="cell-demo">
  <yc-space :size="40">
    <yc-badge :max-count="10" :count="0">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge :max-count="10" :count="100">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge :count="100">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge :max-count="999" :count="1000">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space :size="40">
    <yc-badge
      :max-count="10"
      :count="0">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge
      :max-count="10"
      :count="100">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge :count="100">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge
      :max-count="999"
      :count="1000">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
  </yc-space>
</template>
```

</details>

### 状态点

设置 <yc-tag>status</yc-tag>，可以得到不同的状态点。<yc-tag>normal - 正常</yc-tag> <yc-tag>processing - 进行中</yc-tag> <yc-tag>success - 成功</yc-tag> <yc-tag>warning - 提醒</yc-tag> <yc-tag>danger - 危险</yc-tag>。

<div class="cell-demo">
  <yc-space size="large" direction="vertical">
    <yc-space size="large">
      <yc-badge status="normal" />
      <yc-badge status="processing" />
      <yc-badge status="success" />
      <yc-badge status="warning" />
      <yc-badge status="danger" />
    </yc-space>
    <yc-space size="large">
      <yc-badge status="normal" text="Normal" />
      <yc-badge status="processing" text="Processing" />
      <yc-badge status="success" text="Success" />
      <yc-badge status="warning" text="Warning" />
      <yc-badge status="danger" text="Danger" />
    </yc-space>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space
    size="large"
    direction="vertical">
    <yc-space size="large">
      <yc-badge status="normal" />
      <yc-badge status="processing" />
      <yc-badge status="success" />
      <yc-badge status="warning" />
      <yc-badge status="danger" />
    </yc-space>
    <yc-space size="large">
      <yc-badge
        status="normal"
        text="Normal" />
      <yc-badge
        status="processing"
        text="Processing" />
      <yc-badge
        status="success"
        text="Success" />
      <yc-badge
        status="warning"
        text="Warning" />
      <yc-badge
        status="danger"
        text="Danger" />
    </yc-space>
  </yc-space>
</template>
```

</details>

## API

### Props

| 参数     | 说明                                         | 类型               | 默认值   |
| -------- | -------------------------------------------- | ------------------ | -------- |
| count    | 展示的数字，大于 maxCount 时显示为 maxCount+ | `number`           | -        |
| dot      | 不展示数字，只有一个小红点                   | `boolean`          | `false`  |
| dotStyle | 自定义点的样式                               | `CSSProperties`    | `{}`     |
| maxCount | 最大值，超过最大值会显示为 maxCount+         | `number`           | `99`     |
| offset   | 设置状态点的位置偏移                         | `[number, number]` | `[0, 0]` |
| color    | 自定义徽标颜色                               | `string`           | -        |
| status   | 设置徽标为状态点                             | `BadgeStatus`      | -        |
| text     | 状态点的文本                                 | `string`           | `''`     |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 徽标包裹的内容 |
| content | 自定义徽标内容 |

### Types

```typescript
interface BadgeProps {
  text?: string;
  dot?: boolean;
  dotStyle?: CSSProperties;
  maxCount?: number;
  offset?: number[];
  color?: string;
  status?: BadgeStatus;
  count?: number;
}

interface BadgeSlots {
  default(): void;
  content(): void;
}

type BadgeStatus = 'normal' | 'processing' | 'success' | 'warning' | 'danger';
```

## 注意事项

1. 当 `count` 为 0 时，徽标不会显示
2. `status` 和 `color` 属性主要用于状态徽标
3. `offset` 数组的第一个值是水平偏移，第二个值是垂直偏移
4. 徽标会自动根据内容调整大小
5. 独立使用时，徽标会显示为行内元素

## 样式定制

组件提供了多个样式类，可以通过 CSS 进行定制：

```css
.yc-badge {
  /* 徽标容器 */
}

.yc-badge-number {
  /* 数字徽标 */
}

.yc-badge-dot {
  /* 点状徽标 */
}

.yc-badge-status {
  /* 状态徽标 */
}

.yc-badge-text {
  /* 文本徽标 */
}

.yc-badge-custom-dot {
  /* 自定义徽标 */
}
```
