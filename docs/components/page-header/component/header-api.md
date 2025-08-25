## API

### page-header Props

<field-table :data="pageHeaderProps"/>

### page-header Emits

<field-table :data="pageHeaderEmits"/>

### page-header Slots

<field-table :data="pageHeaderSlots"/>

<script setup>
import { ref } from 'vue';

const pageHeaderProps = ref([
  {
    name: 'title',
    desc: '页头的主标题',
    type: 'string',
    value: '-',
  },
  {
    name: 'subtitle',
    desc: '页头的次标题',
    type: 'string',
    value: '-',
  },
  {
    name: 'show-back',
    desc: '是否显示返回按钮',
    type: 'boolean',
    value: 'true',
  },
]);

const pageHeaderEmits = ref([
  {
    name: 'back',
    desc: '点击返回按钮时触发',
    type: 'event: Event',
    value: '-',
  },
]);

const pageHeaderSlots = ref([
  {
    name: 'breadcrumb',
    desc: '面包屑',
    type: '-',
    value: '-',
  },
  {
    name: 'back-icon',
    desc: '返回按钮',
    type: '-',
    value: '2.36.0',
  },
  {
    name: 'title',
    desc: '主标题',
    type: '-',
    value: '-',
  },
  {
    name: 'subtitle',
    desc: '次标题',
    type: '-',
    value: '-',
  },
  {
    name: 'extra',
    desc: '额外的展示内容',
    type: '-',
    value: '-',
  },
]);
</script>
