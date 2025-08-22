## API

### button Props

<field-table :data="btnProps"/>

### button Events

<field-table :data="btnEmits" type="emits" />

### button Slots

<field-table :data="btnSlots" :showDefaultValue="false" type="slots"/>

### button-group Props

<field-table :data="groupProps" />

<script setup>
import { ref } from 'vue';
const btnProps = ref([
  {
    name: 'type', // anem -> name
    desc: '按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。',
    type: '`ButtonTypes`',
    value: "`'secondary'`",
  },
  {
    name: 'shape', // anem -> name
    desc: '按钮的形状',
    type: '`BorderShape`',
    value: '-',
  },
  {
    name: 'status', // anem -> name
    desc: '按钮的状态',
    type: "`'normal' | 'warning' | 'success' | 'danger'`",
    value: "`'normal'`",
  },
  {
    name: 'size', // anem -> name
    desc: '按钮的尺寸',
    type: "`'mini' | 'small' | 'medium' | 'large'`",
    value: "`'medium'`",
  },
  {
    name: 'long', // anem -> name
    desc: '按钮的宽度是否随容器自适应。',
    type: '`boolean`',
    value: '`false`',
  },
  {
    name: 'loading', // anem -> name
    desc: '按钮是否为加载中状态',
    type: '`boolean`',
    value: '`false`',
  },
  {
    name: 'disabled', // anem -> name
    desc: '按钮是否禁用',
    type: '`boolean`',
    value: '`false`',
  },
  {
    name: 'html-type', // anem -> name
    desc: '设置 button 的原生 type 属性，可选值参考 HTML标准',
    type: '`string`',
    value: "`'button'`",
  },
  {
    name: 'autofocus', // anem -> name
    desc: '设置 button 的原生 autofocus 属性，可选值参考 HTML标准',
    type: '`boolean`',
    value: '`false`',
  },
  {
    name: 'href', // anem -> name
    desc: '设置跳转链接。设置此属性时，按钮渲染为a标签。',
    type: '`string`',
    value: '-',
  },
]);
const btnEmits = ref([
  {
    name: 'click',
    desc: '点击按钮时触发',
    type: '`(ev: MouseEvent) => void`', // 描述回调函数的参数和返回类型
    value: '-', // 事件没有默认值
  },
]);
const btnSlots = ref([
  {
    name: 'icon',
    desc: '图标',
    type: '`#icon`', // 使用 #name 的格式来清晰地表示这是一个插槽
    value: '-',    // 插槽没有默认值
  },
]);
const groupProps = ref([
  {
    name: 'type',
    desc: '按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。',
    type: '`ButtonTypes`',
    value: '-',
  },
  {
    name: 'status',
    desc: '按钮的状态',
    type: "`'normal' | 'warning' | 'success' | 'danger'`",
    value: '-',
  },
  {
    name: 'shape',
    desc: '按钮的形状',
    type: '`BorderShape`',
    value: '-',
  },
  {
    name: 'size',
    desc: '按钮的尺寸',
    type: "`'mini' | 'small' | 'medium' | 'large'`",
    value: '-',
  },
  {
    name: 'disabled',
    desc: '全部子按钮是否禁用',
    type: '`boolean`',
    value: '`false`',
  },
]);
</script>
