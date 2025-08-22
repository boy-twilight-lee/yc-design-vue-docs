## API

### Textarea Props

| 参数          | 说明             | 类型        | 默认值  |
| ------------- | ---------------- | ----------- | ------- |
| modelValue    | 绑定值           | `string`    | -       |
| defaultValue  | 默认值           | `string`    | -       |
| placeholder   | 占位符           | `string`    | -       |
| disabled      | 是否禁用         | `boolean`   | `false` |
| error         | 是否错误状态     | `boolean`   | `false` |
| maxLength     | 最大长度         | `MaxLength` | -       |
| showWordLimit | 是否显示字数限制 | `boolean`   | `false` |
| allowClear    | 是否允许清除     | `boolean`   | `false` |
| readonly      | 是否只读         | `boolean`   | `false` |
| autoSize      | 自动调整大小     | `AutoSize`  | `false` |

### Events

| 事件名            | 说明             | 回调参数                     |
| ----------------- | ---------------- | ---------------------------- |
| update:modelValue | 绑定值变化时触发 | `(value: string)`            |
| input             | 输入时触发       | `(value: string, ev: Event)` |
| change            | 值变化时触发     | `(value: string, ev: Event)` |
| clear             | 清除时触发       | `(ev: MouseEvent)`           |
| focus             | 获得焦点时触发   | `(ev: FocusEvent)`           |
| blur              | 失去焦点时触发   | `(ev: FocusEvent)`           |

### AutoSize

| 类型                                     | 说明                 |
| ---------------------------------------- | -------------------- |
| `boolean`                                | 是否启用自动调整大小 |
| `{ minRows?: number; maxRows?: number }` | 自定义行数范围       |

## API

### textarea Props

<field-table :data="textareaProps"/>

### textarea Events

<field-table :data="textareaEvents" type="emits" />

### textarea Methods

<field-table :data="textareaMethods" type="expose" />

<script setup>
import { ref } from 'vue';

const textareaProps = ref([
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
    name: 'placeholder',
    desc: '提示文字',
    type: 'string',
    value: '-',
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
    name: 'max-length',
    desc: '输入值的最大长度，errorOnly 属性在 2.12.0 版本添加',
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
    name: 'allow-clear',
    desc: '是否允许清空文本域',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'auto-size',
    desc: '是否让文本框自适应内容高度',
    type: 'boolean | { minRows?: number; maxRows?: number }',
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
    value: '- (2.12.0)',
  },
  {
    name: 'textarea-attrs',
    desc: '透传给 textarea 的属性',
    type: 'Record<string, any>',
    value: '-',
  },
]);

const textareaEvents = ref([
  {
    name: 'input',
    desc: '用户输入时触发',
    type: '(value: string, ev: Event) => void',
  },
  {
    name: 'change',
    desc: '仅在文本框失焦时触发',
    type: '(value: string, ev: Event) => void',
  },
  {
    name: 'clear',
    desc: '点击清除按钮时触发',
    type: '(ev: MouseEvent) => void',
  },
  {
    name: 'focus',
    desc: '文本框获取焦点时触发',
    type: '(ev: FocusEvent) => void',
  },
  {
    name: 'blur',
    desc: '文本框失去焦点时触发',
    type: '(ev: FocusEvent) => void',
  },
]);

const textareaMethods = ref([
  {
    name: 'focus',
    desc: '使输入框获取焦点 (2.24.0)',
    type: '() => void',
  },
  {
    name: 'blur',
    desc: '使输入框失去焦点 (2.24.0)',
    type: '() => void',
  },
]);
</script>
