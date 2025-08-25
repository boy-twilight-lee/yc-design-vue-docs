## API

### list Props

<field-table :data="listProps"/>

### list Events

<field-table :data="listEvents" type="emits"/>

### list Methods

<field-table :data="listMethods" type="expose"/>

### list Slots

<field-table :data="listSlots" type="slots"/>

### list-item Props

<field-table :data="listItemProps"/>

### list-item Slots

<field-table :data="listItemSlots" type="slots"/>

### list-item-meta Props

<field-table :data="listItemMetaProps"/>

### list-item-meta Slots

<field-table :data="listItemMetaSlots" type="slots"/>

### VirtualListProps

<field-table :data="virtualListProps"/>

<script setup>
import { ref } from 'vue';

const listProps = ref([
  { name: 'data', desc: '列表数据，需要和 item 插槽同时使用', type: 'any[]', value: '-' },
  { name: 'size', desc: '列表大小', type: "'small' | 'medium' | 'large'", value: "'medium'" },
  { name: 'bordered', desc: '是否显示边框', type: 'boolean', value: 'true' },
  { name: 'split', desc: '是否显示分割线', type: 'boolean', value: 'true' },
  { name: 'loading', desc: '是否为加载中状态', type: 'boolean', value: 'false' },
  { name: 'hoverable', desc: '是否显示选中样式', type: 'boolean', value: 'false' },
  { name: 'pagination-props', desc: '列表分页配置', type: 'PaginationProps', value: '-' },
  { name: 'grid-props', desc: '列表栅格配置', type: 'object', value: '-' },
  { name: 'max-height', desc: '列表的最大高度', type: 'string | number', value: '0' },
  { name: 'bottom-offset', desc: '触发到达底部的距离阈值', type: 'number', value: '0' },
  { name: 'virtual-list-props', desc: '传递虚拟列表属性，传入此参数以开启虚拟滚动 VirtualListProps', type: 'VirtualListProps', value: '-' },
  { name: 'scrollbar', desc: '是否开启虚拟滚动条', type: 'boolean', value: 'true', version: '2.38.0' },
]);

const listEvents = ref([
  { name: 'scroll', desc: '列表滚动时触发', type: '-' },
  { name: 'reach-bottom', desc: '当列表到达底部时触发', type: '-' },
  { name: 'page-change', desc: '表格分页发生改变时触发', type: 'page: number' },
  { name: 'page-size-change', desc: '表格每页数据数量发生改变时触发', type: 'pageSize: number' },
]);

const listMethods = ref([
  { name: 'scrollIntoView', desc: '虚拟滚动到某个元素', type: "options: { index?: number; key?: number | string; align: 'auto' | 'top' | 'bottom'}", value: '-' },
]);

const listSlots = ref([
  { name: 'scroll-loading', desc: '滚动加载状态时，滚动到底部的提示', version: '2.20.0' },
  { name: 'item', desc: '列表项', type: 'index: number, item: any' },
  { name: 'empty', desc: '空白展示' },
  { name: 'footer', desc: '底部信息' },
  { name: 'header', desc: '头部信息' },
]);

const listItemProps = ref([
  { name: 'action-layout', desc: '操作组排列方向', type: 'Direction', value: "'horizontal'" },
]);

const listItemSlots = ref([
  { name: 'meta', desc: 'meta信息' },
  { name: 'extra', desc: '额外内容' },
  { name: 'actions', desc: '操作组' },
]);

const listItemMetaProps = ref([
  { name: 'title', desc: '标题', type: 'string', value: '-' },
  { name: 'description', desc: '描述内容', type: 'string', value: '-' },
]);

const listItemMetaSlots = ref([
  { name: 'avatar', desc: '头像' },
  { name: 'title', desc: '标题' },
  { name: 'description', desc: '描述内容' },
]);

const virtualListProps = ref([
  { name: 'height', desc: '可视区域高度', type: 'number | string', value: '-' },
  { name: 'threshold', desc: '开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。', type: 'number', value: '-' },
  { name: 'isStaticItemHeight', desc: '（已废除）元素高度是否是固定的。2.34.1 版本废除，请使用 fixedSize', type: 'boolean', value: 'false' },
  { name: 'fixedSize', desc: '元素高度是否是固定的。', type: 'boolean', value: 'false', version: '2.34.1' },
  { name: 'estimatedSize', desc: '元素高度不固定时的预估高度。', type: 'number', value: '-', version: '2.34.1' },
  { name: 'buffer', desc: '视口边界外提前挂载的元素数量。', type: 'number', value: '10', version: '2.34.1' },
]);

</script>
