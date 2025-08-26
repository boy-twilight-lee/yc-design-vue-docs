## API

### button Props

<field-table :data="buttonProps"/>

### button Events

<field-table :data="buttonEvents" type="emits" />

### button Slots

<field-table :data="buttonSlots"  type="slots"/>

### button-group Props

<field-table :data="buttonGroupProps" />

### button-group Slots

<field-table :data="buttonGroupSlots"  type="slots"/>

```typescript
type ButtonStatus = 'normal' | 'warning' | 'success' | 'danger';

type ButtonShape = 'square' | 'circle' | 'round';

type ButtonType = 'primary' | 'secondary' | 'dashed' | 'outline' | 'text';

type ButtonHtmlType = 'button' | 'reset' | 'submit';

type ButtonSize = 'mini' | 'small' | 'medium' | 'large';
```

<script setup>
import { ref } from 'vue';

const buttonProps = ref([
  {
    name: 'type',
    desc: '按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。',
    type: 'ButtonType',
    value: "'secondary'",
  },
  {
    name: 'shape',
    desc: '按钮的形状',
    type: `ButtonShape`,
    value: '-',
  },
  {
    name: 'status',
    desc: '按钮的状态',
    type: 'ButtonStatus',
    value: "'normal'",
  },
  {
    name: 'size',
    desc: '按钮的尺寸',
    type: 'ButtonSize',
    value: "'medium'",
  },
  {
    name: 'long',
    desc: '按钮的宽度是否随容器自适应。',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'loading',
    desc: '按钮是否为加载中状态',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'disabled',
    desc: '按钮是否禁用',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'html-type',
    desc: '设置 button 的原生 type 属性，可选值参考 HTML标准',
    type: 'string',
    value: "`'button'`",
  },
  {
    name: 'autofocus',
    desc: '设置 button 的原生 autofocus 属性，可选值参考 HTML标准',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'href',
    desc: '设置跳转链接。设置此属性时，按钮渲染为a标签。',
    type: 'string',
    value: '-',
  },
]);

const buttonEvents = ref([
  {
    name: 'click',
    desc: '点击按钮时触发',
    type: '(ev: MouseEvent) => void',
    value: '-',
  },
]);

const buttonSlots = ref([
  {
    name: 'default',
    desc: '内容',
    type: '-',
    value: '-',
  },
  {
    name: 'icon',
    desc: '图标',
    type: '-',
    value: '-',
  },
]);

const buttonGroupProps = ref([
  {
    name: 'type',
    desc: '按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。',
    type: 'ButtonType',
    value: '-',
  },
  {
    name: 'status',
    desc: '按钮的状态',
    type: 'ButtonStatus',
    value: '-',
  },
  {
    name: 'shape',
    desc: '按钮的形状',
    type: 'ButtonShape',
    value: '-',
  },
  {
    name: 'size',
    desc: '按钮的尺寸',
    type: 'ButtonSize',
    value: '-',
  },
  {
    name: 'disabled',
    desc: '全部子按钮是否禁用',
    type: 'boolean',
    value: '`false`',
  },
]);

const buttonGroupSlots = ref([
  {
    name: 'default',
    desc: '内容',
    type: '-',
    value: '-',
  },
]);
</script>
