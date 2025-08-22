## API

### descriptions Props

<field-table :data="descriptionsProps"/>

### descriptions Slots

<field-table :data="descriptionsSlots" type="slots"/>

### descriptions-item Props

<field-table :data="descriptionsItemProps"/>

### descriptions-item Slots

<field-table :data="descriptionsItemSlots" type="slots"/>

### DescData

<field-table :data="descDataProps"/>

<script setup>
import { ref } from 'vue';

const descriptionsProps = ref([
  {
    name: 'data',
    desc: '描述列表的数据',
    type: 'DescData[]',
    value: '[]',
    version: '',
  },
  {
    name: 'column',
    desc: '每行放置的数据个数。2.20.0 版本支持响应式配置，配置可参考 Grid',
    type: 'number | ResponsiveValue',
    value: '3',
    version: '',
  },
  {
    name: 'title',
    desc: '描述列表的标题',
    type: 'string',
    value: '-',
    version: '',
  },
  {
    name: 'layout',
    desc: '描述列表的排列方式',
    type: "'horizontal' | 'vertical' | 'inline-horizontal' | 'inline-vertical'",
    value: "'horizontal'",
    version: '',
  },
  {
    name: 'align',
    desc: '文字的对齐位置',
    type: 'TextAlign | { label?: TextAlign; value?: TextAlign }',
    value: "'left'",
    version: '',
  },
  {
    name: 'size',
    desc: '描述列表的大小',
    type: "'mini' | 'small' | 'medium' | 'large'",
    value: '-',
    version: '',
  },
  {
    name: 'bordered',
    desc: '是否显示边框',
    type: 'boolean',
    value: 'false',
    version: '',
  },
  {
    name: 'label-style',
    desc: '数据标签的样式',
    type: 'CSSProperties',
    value: '-',
    version: '',
  },
  {
    name: 'value-style',
    desc: '数据内容的样式',
    type: 'CSSProperties',
    value: '-',
    version: '',
  },
  {
    name: 'table-layout',
    desc: '描述中表格样式的 layout-fixed，当设置成 fixed 时，宽度会均分。',
    type: "'auto' | 'fixed'",
    value: "'auto'",
    version: '2.38.0',
  },
]);

const descriptionsSlots = ref([
  {
    name: 'value',
    desc: '数据内容',
    type: 'value: string, index: number, data: DescData',
  },
  {
    name: 'label',
    desc: '数据标签',
    type: 'label: string, index: number, data: DescData',
  },
  {
    name: 'title',
    desc: '标题',
    type: '-',
  },
]);

const descriptionsItemProps = ref([
  {
    name: 'span',
    desc: '所占列数',
    type: 'number',
    value: '1',
    version: '2.18.0',
  },
  {
    name: 'label',
    desc: '标签',
    type: 'string',
    value: '-',
    version: '2.18.0',
  },
]);

const descriptionsItemSlots = ref([
  {
    name: 'label',
    desc: '标签',
    type: '-',
    version: '2.18.0',
  },
]);

const descDataProps = ref([
  {
    name: 'label',
    desc: '标签',
    type: 'string | RenderFunction',
    value: '-',
  },
  {
    name: 'value',
    desc: '数据',
    type: 'string | RenderFunction',
    value: '-',
  },
  {
    name: 'span',
    desc: '所占列数',
    type: 'number',
    value: '1',
  },
]);

</script>
