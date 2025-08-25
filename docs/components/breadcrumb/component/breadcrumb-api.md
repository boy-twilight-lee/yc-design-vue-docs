## API

### Breadcrumb Props

<field-table :data="breadcrumbProps"/>

### Breadcrumb Slots

<field-table :data="breadcrumbSlots"/>

### BreadcrumbItem Props

<field-table :data="breadcrumbItemProps"/>

### BreadcrumbItem Slots

<field-table :data="breadcrumbItemSlots"/>

### BreadcrumbRoute

<field-table :data="breadcrumbRouteProps"/>

### Tips

同名的自定义插槽优先级是高于属性的

<script setup>
import { ref } from 'vue';

const breadcrumbProps = ref([
  {
    name: 'max-count',
    desc: '最多展示的面包屑数量（0表示不限制）',
    type: 'number',
    value: '0',
    version: '',
  },
  {
    name: 'routes',
    desc: '设置路径',
    type: 'BreadcrumbRoute[]',
    value: '-',
    version: '2.36.0',
  },
  {
    name: 'separator',
    desc: '分隔符文字',
    type: 'string|number',
    value: '-',
    version: '2.36.0',
  },
  {
    name: 'custom-url',
    desc: '自定义链接地址',
    type: '(paths: string[]) => string',
    value: '-',
    version: '2.36.0',
  },
]);

const breadcrumbSlots = ref([
  {
    name: 'more-icon',
    desc: '自定义更多图标',
    params: '-',
    version: '2.36.0',
  },
  {
    name: 'item-render',
    desc: 'routes 设置时生效，自定义渲染面包屑',
    params: 'route: BreadcrumbRoute, routes: BreadcrumbRoute[], paths: string[]',
    version: '2.36.0',
  },
  {
    name: 'separator',
    desc: '自定义分隔符',
    params: '-',
    version: '',
  },
]);

const breadcrumbItemProps = ref([
  {
    name: 'separator',
    desc: '分隔符文字',
    type: 'string|number',
    value: '-',
    version: '2.36.0',
  },
  {
    name: 'droplist',
    desc: '下拉菜单内容',
    type: "BreadcrumbRoute['children']",
    value: '-',
    version: '2.36.0',
  },
  {
    name: 'dropdown-props',
    desc: '下拉菜单属性',
    type: 'DropDownProps',
    value: '-',
    version: '2.36.0',
  },
]);

const breadcrumbItemSlots = ref([
  {
    name: 'droplist',
    desc: '自定义下拉菜单',
    params: '-',
    version: '2.36.0',
  },
  {
    name: 'separator',
    desc: '自定义分隔符',
    params: '-',
    version: '2.36.0',
  },
]);

const breadcrumbRouteProps = ref([
  {
    name: 'label',
    desc: '面包屑名称',
    type: 'string',
    value: '-',
  },
  {
    name: 'path',
    desc: '跳转路径 (a标签的href)',
    type: 'string',
    value: '-',
  },
  {
    name: 'children',
    desc: '下拉菜单展示项',
    type: '{ label: string; path: string; }[]',
    value: '-',
  },
]);
</script>
