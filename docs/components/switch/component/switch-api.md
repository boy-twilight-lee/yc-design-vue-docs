## API

### switch Props

<field-table :data="switchProps"/>

### switch Events

<field-table :data="switchEvents" type="emits" />

### switch Slots

<field-table :data="switchSlots"  type="slots"/>

<script setup>
import { ref } from 'vue';

const switchProps = ref([
  {
    name: 'model-value (v-model)',
    desc: '绑定值',
    type: 'string|number|boolean',
    value: '-',
  },
  {
    name: 'default-checked',
    desc: '默认选中状态（非受控状态）',
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
    name: 'loading',
    desc: '是否为加载中状态',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'type',
    desc: '开关的类型',
    type: "'circle' | 'round' | 'line'",
    value: "'circle'",
  },
  {
    name: 'size',
    desc: '开关的大小',
    type: "'small' | 'medium'",
    value: "'medium'",
  },
  {
    name: 'checked-value',
    desc: '选中时的值',
    type: 'string|number|boolean',
    value: 'true',
  },
  {
    name: 'unchecked-value',
    desc: '未选中时的值',
    type: 'string|number|boolean',
    value: 'false)',
  },
  {
    name: 'checked-color',
    desc: '选中时的开关颜色',
    type: 'string',
    value: '-',
  },
  {
    name: 'unchecked-color',
    desc: '未选中时的开关颜色',
    type: 'string',
    value: '-',
  },
  {
    name: 'before-change',
    desc: 'switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换。',
    type: '( newValue: string | number | boolean) => Promise<boolean | void> | boolean | void',
    value: '-',
  },
  {
    name: 'checked-text',
    desc: "打开状态时的文案（type='line'和size='small'时不生效）",
    type: 'string',
    value: '-',
  },
  {
    name: 'unchecked-text',
    desc: "关闭状态时的文案（type='line'和size='small'时不生效）",
    type: 'string',
    value: '-',
  },
]);

const switchEvents = ref([
  {
    name: 'change',
    desc: '值改变时触发',
    type: {
      value: 'boolean | string | number',
      ev: 'Event'
    },
    value: '-',
  },
  {
    name: 'focus',
    desc: '组件获得焦点时触发',
    type: {
      ev: 'FocusEvent'
    },
    value: '-',
  },
  {
    name: 'blur',
    desc: '组件失去焦点时触发',
    type: {
      ev: 'FocusEvent'
    },
    value: '-',
  },
]);

const switchSlots = ref([
  {
    name: 'checked-icon',
    desc: '打开状态时，按钮上的图标',
    type: '-',
    value: '-',
  },
  {
    name: 'unchecked-icon',
    desc: '关闭状态时，按钮上的图标',
    type: '-',
    value: '-',
  },
  {
    name: 'checked',
    desc: "打开状态时的文案（type='line'和size='small'时不生效）",
    type: '-',
    value: '-',
  },
  {
    name: 'unchecked',
    desc: "关闭状态时的文案（type='line'和size='small'时不生效）",
    type: '-',
    value: '-',
  },
]);
</script>
