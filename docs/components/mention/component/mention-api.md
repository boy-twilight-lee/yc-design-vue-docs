## API

### mention Props

<field-table :data="mentionProps"/>

### mention Events

<field-table :data="mentionEvents" type="emits" />

### mention Methods

<field-table :data="mentionMethods" type="expose" />

### mention Slots

<field-table :data="mentionSlots"  type="slots"/>

<script setup>
import { ref } from 'vue';

const mentionProps = ref([
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
    name: 'data',
    desc: '用于自动补全的数据',
    type: '(string | number | SelectOptionData | SelectOptionGroup)[]',
    value: '[]',
  },
  {
    name: 'prefix',
    desc: '触发自动补全的关键字',
    type: 'string | string[]',
    value: "'@'",
  },
  {
    name: 'split',
    desc: '选中项的前后分隔符',
    type: 'string',
    value: "' '",
  },
  {
    name: 'type',
    desc: '输入框或文本域',
    type: "'input' | 'textarea'",
    value: "'input'",
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'allow-clear',
    desc: '是否允许清空输入框',
    type: 'boolean',
    value: 'false)',
  },
]);

const mentionEvents = ref([
  {
    name: 'change',
    desc: '值发生改变时触发',
    type: '(value: string) => void',
    value: '-',
  },
  {
    name: 'search',
    desc: '动态搜索时触发，2.47.0 版本增加 prefix 参数',
    type: '(value: string, prefix: string) => void',
    value: '-',
  },
  {
    name: 'select',
    desc: '选择下拉选项时触发',
    type: '(value: string | number | Record<string, any> | undefined) => void',
    value: '-',
  },
  {
    name: 'clear',
    desc: '用户点击清除按钮时触发',
    type: '() => void',
    value: '-',
  },
  {
    name: 'focus',
    desc: '文本框获取焦点时触发)',
    type: '(ev: FocusEvent) => void',
    value: '-',
  },
  {
    name: 'blur',
    desc: '文本框失去焦点时触发)',
    type: '(ev: FocusEvent) => void',
    value: '-',
  },
]);

const mentionMethods = ref([
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

const mentionSlots = ref([
  {
    name: 'option',
    desc: '选项内容',
    type: '(data: OptionInfo)',
    value: '-',
  },
]);
</script>
