## API

### input-number Props

<field-table :data="inputNumberProps"/>

### input-number Events

<field-table :data="inputNumberEvents" type="emits" />

### input-number Methods

<field-table :data="inputNumberMethods" type="expose" />

### input-number Slots

<field-table :data="inputNumberSlots"  type="slots"/>

<script setup>
import { ref } from 'vue';

const inputNumberProps = ref([
  {
    name: 'model-value (v-model)',
    desc: '绑定值',
    type: 'number',
    value: '-',
  },
  {
    name: 'default-value',
    desc: '默认值（非受控模式）',
    type: 'number',
    value: '-',
  },
  {
    name: 'mode',
    desc: '模式（embed：按钮内嵌模式，button：左右按钮模式）',
    type: "'embed' | 'button'",
    value: "'embed'",
  },
  {
    name: 'precision',
    desc: '数字精度',
    type: 'number',
    value: '-',
  },
  {
    name: 'step',
    desc: '数字变化步长',
    type: 'number',
    value: '1',
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'error',
    desc: '是否为错误状态',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'max',
    desc: '最大值',
    type: 'number',
    value: '`Infinity`',
  },
  {
    name: 'min',
    desc: '最小值',
    type: 'number',
    value: '`-Infinity`',
  },
  {
    name: 'formatter',
    desc: '定义输入框展示值',
    type: 'func',
    value: '-',
  },
  {
    name: 'parser',
    desc: '从 formatter 转换为数字，和 formatter 搭配使用',
    type: 'func',
    value: '-',
  },
  {
    name: 'placeholder',
    desc: '输入框提示文字',
    type: 'string',
    value: '-',
  },
  {
    name: 'hide-button',
    desc: '是否隐藏按钮',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'size',
    desc: '输入框大小',
    type: "'mini' | 'small' | 'medium' | 'large'",
    value: "'medium'",
  },
  {
    name: 'allow-clear',
    desc: '是否允许清空输入框',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'model-event',
    desc: '触发 v-model 的事件',
    type: "'change' | 'input'",
    value: "'change'",
  },
  {
    name: 'read-only',
    desc: '只读',
    type: 'boolean',
    value: 'false',
  },
  {
    name: 'input-attrs',
    desc: '内部 input 元素的属性',
    type: 'object',
    value: '-',
  },
]);

const inputNumberEvents = ref([
  {
    name: 'change',
    desc: '值发生改变时触发',
    type: '(value: number | undefined, ev: Event) => void',
  },
  {
    name: 'focus',
    desc: '输入框获取焦点时触发',
    type: '(ev: FocusEvent) => void',
  },
  {
    name: 'blur',
    desc: '输入框失去焦点时触发',
    type: '(ev: FocusEvent) => void',
  },
  {
    name: 'clear',
    desc: '用户点击清除按钮时触发',
    type: '(ev: Event) => void',
  },
  {
    name: 'input',
    desc: '输入时触发',
    type: '(value: number | undefined, inputValue: string, ev: Event) => void',
  },
  {
    name: 'keydown',
    desc: '按下键盘时触发',
    type: '(ev: KeyboardEvent) => void',
  },
]);

const inputNumberMethods = ref([
  {
    name: 'focus',
    desc: '使输入框获取焦点',
    type: '() => void',
  },
  {
    name: 'blur',
    desc: '使输入框失去焦点',
    type: '() => void',
  },
]);

const inputNumberSlots = ref([
  {
    name: 'minus',
    desc: '数值减少图标',
  },
  {
    name: 'plus',
    desc: '数值增加图标',
  },
  {
    name: 'append',
    desc: '后置标签',
  },
  {
    name: 'prepend',
    desc: '前置标签',
  },
  {
    name: 'suffix',
    desc: '后缀',
  },
  {
    name: 'prefix',
    desc: '前缀',
  },
]);
</script>
