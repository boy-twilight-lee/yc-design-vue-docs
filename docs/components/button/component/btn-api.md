## API

### button Props

<field-table :data="btnProps"/>

### button Events

<field-table :data="btnEmits" type="emits" />

### button Slots

<field-table :data="btnSlots"  type="slots"/>

### button-group Props

<field-table :data="groupProps" />

### button-group Slots

<field-table :data="groupSlots"  type="slots"/>

<script setup>
import { ref } from 'vue';
const btnProps = ref([
  {
    name: 'type',
    desc: '按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。',
    type: 'ButtonTypes',
    value: "`'secondary'`",
  },
  {
    name: 'shape',
    desc: '按钮的形状',
    type: 'BorderShape',
    value: '-',
  },
  {
    name: 'status',
    desc: '按钮的状态',
    type: "'normal' | 'warning' | 'success' | 'danger'",
    value: "`'normal'`",
  },
  {
    name: 'size',
    desc: '按钮的尺寸',
    type: "'mini' | 'small' | 'medium' | 'large'",
    value: "`'medium'`",
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
const btnEmits = ref([
  {
    name: 'click',
    desc: '点击按钮时触发',
    type: '(ev: MouseEvent) => void',
    value: '-',
  },
]);
const btnSlots = ref([
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
const groupProps = ref([
  {
    name: 'type',
    desc: '按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。',
    type: 'ButtonTypes',
    value: '-',
  },
  {
    name: 'status',
    desc: '按钮的状态',
    type: "'normal' | 'warning' | 'success' | 'danger'",
    value: '-',
  },
  {
    name: 'shape',
    desc: '按钮的形状',
    type: 'BorderShape',
    value: '-',
  },
  {
    name: 'size',
    desc: '按钮的尺寸',
    type: "'mini' | 'small' | 'medium' | 'large'",
    value: '-',
  },
  {
    name: 'disabled',
    desc: '全部子按钮是否禁用',
    type: 'boolean',
    value: '`false`',
  },
]);
const groupSlots = ref([
  {
    name: 'default',
    desc: '内容',
    type: '-',
    value: '-',
  }
]);
</script>
