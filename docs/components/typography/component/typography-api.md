## API

### common Props

<field-table :data="props"/>

### common Events

<field-table :data="emits" type="emits"/>

### common slots

<field-table :data="slots" type="slots"/>

### typography-title Props

<field-table :data="titleProps"/>

### typography-paragraph Props

<field-table :data="paragraphProps"/>

### type

```typescript
type TypographyType = 'primary' | 'secondary' | 'dashed' | 'outline' | 'text';
```

<script setup>
import { ref } from 'vue';
const props = ref([
  {
    name: 'type',
    desc: '文本类型',
    type: "TypographyType",
    value: '-',
  },
  {
    name: 'bold',
    desc: '粗体',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'mark',
    desc: '添加标记样式',
    type: 'boolean | { color: string }',
    value: '`false`',
  },
  {
    name: 'underline',
    desc: '下划线样式',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'delete',
    desc: '删除线样式',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'code',
    desc: '代码块样式',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'disabled',
    desc: '禁用状态',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'editable',
    desc: '开启可编辑功能',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'editing (v-model)',
    desc: '是否在编辑状态',
    type: 'boolean',
    value: '-',
  },
  {
    name: 'default-editing',
    desc: '默认的编辑状态',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'edit-text (v-model)',
    desc: '编辑的文字',
    type: 'string',
    value: '-',
  },
  {
    name: 'copyable',
    desc: '开启复制功能',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'copy-text',
    desc: '复制的文字',
    type: 'string',
    value: '-',
  },
  {
    name: 'copy-delay',
    desc: '复制成功后，复制按钮恢复到可点击状态的延迟时间，单位是毫秒',
    type: 'number',
    value: '`3000`',
  },
  {
    name: 'edit-tooltip-props',
    desc: '编辑按钮问题提示配置',
    type: 'object',
    value: '-',
  },
  {
    name: 'copy-tooltip-props',
    desc: '拷贝按钮问题提示配置',
    type: 'object',
    value: '-',
  },
]);
const emits =  ref([
  {
    name: 'edit-start',
    desc: '开始编辑',
    type: '() => void',
    value: '-',
  },
  {
    name: 'change',
    desc: '编辑内容变化',
    type: '(text: string) => void',
    value: '-',
  },
  {
    name: 'edit-end',
    desc: '编辑结束',
    type: '() => void',
    value: '-',
  },
  {
    name: 'copy',
    desc: '复制',
    type: '(text: string) => void',
    value: '-',
  },
]);
const slots = ref([
  {
    name: 'default',
    desc: '内容',
    type: "-",
    value: "",
  },
    {
    name: 'copy-icon',
    desc: '复制图标',
    type: "-",
    value: "",
  },
    {
    name: 'copy-tooltip',
    desc: '复制的文字气泡内容',
    type: "-",
    value: "",
  },
]);
const titleProps = ref([
  {
    name: 'heading',
    desc: '标题级别，相当于 h1 h2 h3 h4 h5 h6',
    type: "'1' | '2' | '3' | '4' | '5' | '6'",
    value: "`'1'`",
  },
]);
const paragraphProps = ref([
  {
    name: 'blockquote',
    desc: '长引用',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'spacing',
    desc: '段落的的行高，长文本(大于5行)的时候推荐使用默认行高，短文本(小于等于3行)推荐使用 close 紧密的行高。',
    type: "'default' | 'close'",
    value: "`'default'`",
  },
]);
</script>
