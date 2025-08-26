## API

### checkbox Props

<field-table :data="checkboxProps"/>

### checkbox Events

<field-table :data="checkboxEvents" type="emits" />

### checkbox Slots

<field-table :data="checkboxSlots"  type="slots"/>

### checkbox-group Props

<field-table :data="checkboxGroupProps" />

### checkbox-group Events

<field-table :data="checkboxGroupEvents" type="emits" />

### checkbox-group Slots

<field-table :data="checkboxGroupSlots"  type="slots"/>

### CheckboxOption

<field-table :data="checkboxOptionProps"/>

<script setup>
import { ref } from 'vue';

const checkboxProps = ref([
  {
    name: 'model-value (v-model)',
    desc: '绑定值',
    type: 'boolean | Array<string | number | boolean>',
    value: '-',
  },
  {
    name: 'default-checked',
    desc: '默认是否选中（非受控状态）',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'value',
    desc: '选项的 value',
    type: 'string|number|boolean',
    value: '-',
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'indeterminate',
    desc: '是否为半选状态',
    type: 'boolean',
    value: '`false`',
  },
]);

const checkboxEvents = ref([
  {
    name: 'change',
    desc: '值改变时触发',
    type: '(value: boolean | (string | number | boolean)[], ev: Event) => void',
    value: '-',
  },
]);

const checkboxSlots = ref([
  {
    name: 'checkbox',
    desc: '自定义复选框',
    type: '#checkbox',
    value: '-',
  },
]);

const checkboxGroupProps = ref([
  {
    name: 'model-value (v-model)',
    desc: '绑定值',
    type: 'Array<string | number | boolean>',
    value: '-',
  },
  {
    name: 'default-value',
    desc: '默认值（非受控状态）',
    type: 'Array<string | number | boolean>',
    value: '`[]`',
  },
  {
    name: 'max',
    desc: '支持最多选中的数量',
    type: 'number',
    value: '-',
  },
  {
    name: 'options',
    desc: '选项',
    type: 'Array<string | number | CheckboxOption>',
    value: '-',
  },
  {
    name: 'direction',
    desc: '复选框的排列方向',
    type: 'Direction',
    value: "'horizontal'",
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: '`false`',
  },
]);

const checkboxGroupEvents = ref([
  {
    name: 'change',
    desc: '值改变时触发',
    type: '(value: (string | number | boolean)[], ev: Event) => void',
    value: '-',
  },
]);

const checkboxGroupSlots = ref([
  {
    name: 'checkbox',
    desc: '自定义复选框',
    type: '#checkbox',
    value: '-',
  },
  {
    name: 'label',
    desc: 'checkbox 文案内容',
    type: '#label',
    value: '-',
  },
]);

const checkboxOptionProps = ref([
  {
    name: 'label',
    desc: '文案',
    type: 'RenderContent',
    value: '-',
  },
  {
    name: 'value',
    desc: '选项的 value',
    type: 'string | number',
    value: '-',
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: 'false',
  },
  {
    name: 'indeterminate',
    desc: '是否为半选状态',
    type: 'boolean',
    value: 'false',
  },
]);
</script>
