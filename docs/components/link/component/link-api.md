## API

### link Props

<field-table :data="linkProps"/>

### link Events

<field-table :data="emits" type="emits"/>

### link Slots

<field-table :data="slots" type="slots"/>

<script setup>
import { ref } from 'vue';
const linkProps = ref([
  {
    name: 'href',
    desc: '链接地址',
    type: 'string',
    value: '-',
  },
  {
    name: 'status',
    desc: '链接的状态',
    type: "'normal' | 'warning' | 'success' | 'danger'",
    value: "`'normal'`",
  },
  {
    name: 'hoverable',
    desc: '鼠标悬浮时存在底色',
    type: 'boolean',
    value: '`true`',
  },
  {
    name: 'icon',
    desc: '图标',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'loading',
    desc: '链接是否为加载中状态',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'disabled',
    desc: '链接是否禁用',
    type: 'boolean',
    value: '`false`',
  },
]);
const emits =  ref([
  {
    name: 'click',
    desc: '点击时触发',
    type: '(ev: MouseEvent) => void',
    value: '-',
  },
]);
const slots =  ref([
  {
    name: 'default',
    desc: '内容',
    type: '-',
    value: '-',
  },
]);
</script>
