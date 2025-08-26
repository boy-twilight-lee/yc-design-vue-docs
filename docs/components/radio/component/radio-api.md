## API

### radio Props

<field-table :data="radioProps"/>

### radio Events

<field-table :data="radioEvents" type="emits" />

### radio Slots

<field-table :data="radioSlots"  type="slots"/>

### radio-group Props

<field-table :data="radioGroupProps" />

### radio-group Events

<field-table :data="radioGroupEvents" type="emits" />

### radio-group Slots

<field-table :data="radioGroupSlots"  type="slots"/>

### RadioOption

<field-table :data="radioOptionProps"/>

<script setup>
import { ref } from 'vue';

const radioProps = ref([
  {
    name: 'model-value (v-model)',
    desc: '绑定值',
    type: 'string | number | boolean',
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
    type: 'string | number | boolean',
    value: '`true`',
  },
  {
    name: 'type',
    desc: '单选的类型',
    type: "'radio' | 'button'",
    value: "'radio'",
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: '`false`',
  },
]);

const radioEvents = ref([
  {
    name: 'change',
    desc: '值改变时触发',
    type: '(value: string | number | boolean, ev: Event) => void',
    value: '-',
  },
]);

const radioSlots = ref([
  {
    name: 'radio',
    desc: '自定义单选框',
    type: '(checked: boolean, disabled: boolean))',
    value: '-',
  },
]);

const radioGroupProps = ref([
  {
    name: 'model-value (v-model)',
    desc: '绑定值',
    type: 'string | number | boolean',
    value: '-',
  },
  {
    name: 'default-value',
    desc: '默认值（非受控状态）',
    type: 'string | number | boolean',
    value: "''",
  },
  {
    name: 'type',
    desc: '单选框组的类型',
    type: "'radio' | 'button'",
    value: "'radio'",
  },
  {
    name: 'size',
    desc: '单选框组的尺寸',
    type: "'mini' | 'small' | 'medium' | 'large'",
    value: '-',
  },
  {
    name: 'options',
    desc: '选项',
    type: 'Array<string | number | RadioOption>',
    value: '-',
  },
  {
    name: 'direction',
    desc: '单选框组的方向',
    type: "'horizontal' | 'vertical'",
    value: "'horizontal'",
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: '`false`',
  },
]);

const radioGroupEvents = ref([
  {
    name: 'change',
    desc: '值改变时触发',
    type: '(value: string | number | boolean) => void',
    value: '-',
  },
]);

const radioGroupSlots = ref([
  {
    name: 'radio',
    desc: '自定义单选框',
    type: '(checked: boolean, disabled: boolean)',
    value: '-',
  },
  {
    name: 'label',
    desc: 'radio 文案内容',
    type: '(data: RadioOption)',
    value: '-',
  },
]);

const radioOptionProps = ref([
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
]);
</script>
