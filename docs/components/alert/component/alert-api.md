## API

### alert Props

<field-table :data="alertProps"/>

### alert Events

<field-table :data="alertEvents" type="emits" />

### alert Slots

<field-table :data="alertSlots" :showDefaultValue="false" type="slots"/>

<script setup>
import { ref } from 'vue';

const alertProps = ref([
  {
    name: 'type',
    desc: '警告提示的类型。2.41.0 新增 normal 类型',
    type: 'info | success | warning | error | normal',
    value: '\'info\'',
  },
  {
    name: 'show-icon',
    desc: '是否展示图标',
    type: 'boolean',
    value: '`true`',
  },
  {
    name: 'closable',
    desc: '是否展示关闭按钮',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'title',
    desc: '警告提示的标题',
    type: 'string',
    value: '-',
  },
  {
    name: 'banner',
    desc: '是否作为顶部公告使用（去除边框和圆角）',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'center',
    desc: '内容是否居中显示',
    type: 'boolean',
    value: '`false`',
  },
]);

const alertEvents = ref([
  {
    name: 'close',
    desc: '点击关闭按钮时触发',
    type: '(ev: MouseEvent) => void',
  },
  {
    name: 'after-close',
    desc: '关闭动画结束后触发',
    type: '() => void',
  },
]);

const alertSlots = ref([
  {
    name: 'icon',
    desc: '图标',
  },
  {
    name: 'title',
    desc: '标题',
  },
  {
    name: 'action',
    desc: '操作项',
  },
  {
    name: 'close-element',
    desc: '关闭元素 (2.36.0)',
  },
]);
</script>
