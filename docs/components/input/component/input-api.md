## API

### input Props

<field-table :data="inputProps"/>

### input Events

<field-table :data="inputEvents" type="emits" />

### input Methods

<field-table :data="inputMethods" type="expose" />

### input Slots

<field-table :data="inputSlots"  type="slots"/>

<script setup>
import { ref } from 'vue';

const inputProps = ref([
  {
    name: 'model-value (v-model)',
    desc: '绑定值',
    type: 'string',
    value: '-',
  },
  {
    name: 'default-value',
    desc: '默认值（非受控状态）',
    type: 'string',
    value: "''",
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
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'readonly',
    desc: '是否为只读状态',
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
    name: 'placeholder',
    desc: '提示文字',
    type: 'string',
    value: '-',
  },
  {
    name: 'max-length',
    desc: '输入值的最大长度',
    type: 'number | { length: number; errorOnly?: boolean }',
    value: '0',
  },
  {
    name: 'show-word-limit',
    desc: '是否显示字数统计',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'word-length',
    desc: '字符长度的计算方法',
    type: '(value: string) => number',
    value: '-',
  },
  {
    name: 'word-slice',
    desc: '字符截取方法，同 wordLength 一起使用',
    type: '(value: string, maxLength: number) => string',
    value: '2.12.0',
  },
  {
    name: 'input-attrs',
    desc: '内部 input 元素的属性',
    type: 'object',
    value: '2.27.0',
  },
  {
    name: 'prepend',
    desc: '前置标签',
    type: 'string',
    value: '-',
  },
  {
    name: 'append',
    desc: '后置标签',
    type: 'string',
    value: '-',
  },
]);

const inputEvents = ref([
  {
    name: 'input',
    desc: '用户输入时触发',
    type: '(value: string, ev: Event) => void',
    value: '-',
  },
  {
    name: 'change',
    desc: '仅在输入框失焦或按下回车时触发',
    type: '(value: string, ev: Event) => void',
    value: '-',
  },
  {
    name: 'press-enter',
    desc: '用户按下回车时触发',
    type: '(ev: KeyboardEvent) => void',
    value: '-',
  },
  {
    name: 'clear',
    desc: '用户点击清除按钮时触发',
    type: '(ev: MouseEvent) => void',
    value: '-',
  },
  {
    name: 'focus',
    desc: '输入框获取焦点时触发',
    type: '(ev: FocusEvent) => void',
    value: '-',
  },
  {
    name: 'blur',
    desc: '输入框失去焦点时触发',
    type: '(ev: FocusEvent) => void',
    value: '-',
  },
]);

const inputMethods = ref([
  {
    name: 'focus',
    desc: '使输入框获取焦点',
    type: '() => void',
    value: '-',
  },
  {
    name: 'blur',
    desc: '使输入框失去焦点',
    type: '() => void',
    value: '-',
  },
]);

const inputSlots = ref([
  {
    name: 'append',
    desc: '后置标签',
    type: '-',
    value: '-',
  },
  {
    name: 'prepend',
    desc: '前置标签',
    type: '-',
    value: '-',
  },
  {
    name: 'suffix',
    desc: '后缀元素',
    type: '-',
    value: '-',
  },
  {
    name: 'prefix',
    desc: '前缀元素',
    type: '-',
    value: '-',
  },
]);
</script>
