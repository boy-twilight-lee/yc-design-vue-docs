## API

### select Props

<field-table :data="selectProps"/>

### select Events

<field-table :data="selectEvents" type="emits" />

### select Slots

<field-table :data="selectSlots"  type="slots"/>

### option Props

<field-table :data="optionProps"/>

### optgroup Props

<field-table :data="optgroupProps"/>

### optgroup Slots

<field-table :data="optgroupSlots"  type="slots"/>

### Type

```typescript
type Option = string | number | SelectOptionData | SelectOptionGroup;

type FilterOption =
  | boolean
  | ((inputValue: string, option: SelectOptionData) => boolean);
```

### SelectOptionData

<field-table :data="selectOptionDataProps"/>

### SelectOptionGroup

<field-table :data="selectOptionGroupProps"/>

### VirtualListProps

<field-table :data="virtualListPropsProps"/>

### FAQ

使用 `Object` 格式作为选项的值
当使用 `Object` 格式作为选项的值时，需要通过 `value-key` 属性为选择器指定获取唯一标识的字段名，默认值为 `value`.
此外 `value` 的对象值需要在 `setup` 中定义好，不能够在模版中创建对象，这样会导致 `Option` 组件的重复渲染。

例如当我需要指定 `key` 为唯一标识时：

```vue
<template>
  <yc-select
    v-model="value"
    :style="{ width: '320px' }"
    placeholder="Please select ..."
    value-key="key">
    <yc-option
      v-for="item of data"
      :value="item"
      :label="item.label" />
  </yc-select>
</template>

<script setup>
import { ref } from 'vue';
const value = ref();
const data = [
  {
    value: 'beijing',
    label: 'Beijing',
    key: 'extra1',
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    key: 'extra2',
  },
  {
    value: 'guangzhou',
    label: 'Guangzhou',
    key: 'extra3',
  },
  {
    value: 'chengdu',
    label: 'Chengdu',
    key: 'extra4',
  },
];
</script>
```

<script setup>
import { ref } from 'vue';

const selectProps = ref([
  {
    name: 'multiple',
    desc: '是否开启多选模式（多选模式默认开启搜索）',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'model-value (v-model)',
    desc: '绑定值',
    type: 'string | number | boolean | Record<string, any> | (string | number | boolean | Record<string, any>)[]',
    value: '-',
  },
  {
    name: 'default-value',
    desc: '默认值（非受控模式）',
    type: 'string | number | boolean | Record<string, unknown> | (string | number | boolean | Record<string, unknown>)[]',
    value: "'' | []",
  },
  {
    name: 'input-value (v-model)',
    desc: '输入框的值',
    type: 'string',
    value: '-',
  },
  {
    name: 'default-input-value',
    desc: '输入框的默认值（非受控模式）',
    type: 'string',
    value: "''",
  },
  {
    name: 'size',
    desc: '选择框的大小',
    type: "'mini' | 'small' | 'medium' | 'large'",
    value: "'medium'",
  },
  {
    name: 'placeholder',
    desc: '占位符',
    type: 'string',
    value: '-',
  },
  {
    name: 'loading',
    desc: '是否为加载中状态',
    type: 'boolean',
    value: '`false`',
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
    name: 'allow-clear',
    desc: '是否允许清空',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'allow-search',
    desc: '是否允许搜索',
    type: 'boolean | { retainInputValue?: boolean }',
    value: '`false` (single) | `true` (multiple)',
  },
  {
    name: 'allow-create',
    desc: '是否允许创建',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'max-tag-count',
    desc: '多选模式下，最多显示的标签数量。0 表示不限制',
    type: 'number',
    value: '0',
  },
  {
    name: 'popup-container',
    desc: '弹出框的挂载容器',
    type: 'string | HTMLElement',
    value: '-',
  },
  {
    name: 'bordered',
    desc: '是否显示输入框的边框',
    type: 'boolean',
    value: '`true`',
  },
  {
    name: 'popup-visible (v-model)',
    desc: '是否显示下拉菜单',
    type: 'boolean',
    value: '-',
  },
  {
    name: 'default-popup-visible',
    desc: '弹出框默认是否可见（非受控模式）',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'unmount-on-close',
    desc: '是否在下拉菜单关闭时销毁元素',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'filter-option',
    desc: '是否过滤选项',
    type: 'boolean | ((inputValue: string, option: SelectOptionData) => boolean)',
    value: '`true`',
  },
  {
    name: 'options',
    desc: '选项数据',
    type: '(string | number | boolean | SelectOptionData | SelectOptionGroup)[]',
    value: '`[]`',
  },
  {
    name: 'virtual-list-props',
    desc: '传递虚拟列表属性，传入此参数以开启虚拟滚动 VirtualListProps',
    type: 'VirtualListProps',
    value: '-',
  },
  {
    name: 'trigger-props',
    desc: '下拉菜单的触发器属性',
    type: 'TriggerProps',
    value: '-',
  },
  {
    name: 'format-label',
    desc: '格式化显示内容',
    type: '(data: SelectOptionData) => string',
    value: '-',
  },
  {
    name: 'fallback-option',
    desc: '自定义值中不存在的选项',
    type: 'boolean | ((value: string | number | boolean | Record<string, unknown>) => SelectOptionData)',
    value: '`true`',
  },
  {
    name: 'show-extryc-options',
    desc: '是否在下拉菜单中显示额外选项',
    type: 'boolean',
    value: '`true`',
  },
  {
    name: 'value-key',
    desc: '用于确定选项键值的属性名',
    type: 'string',
    value: "'value'",
  },
  {
    name: 'search-delay',
    desc: '触发搜索事件的延迟时间',
    type: 'number',
    value: '`500`',
  },
  {
    name: 'limit',
    desc: '多选时最多的选择个数',
    type: 'number',
    value: '`0`',
  },
  {
    name: 'field-names',
    desc: '自定义 SelectOptionData 中的字段',
    type: 'SelectFieldNames',
    value: '-',
  },
  {
    name: 'scrollbar',
    desc: '是否开启虚拟滚动条',
    type: 'boolean',
    value: '`true`',
  },
  {
    name: 'show-header-on-empty',
    desc: '空状态时是否显示header',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'show-footer-on-empty',
    desc: '空状态时是否显示footer',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'tag-nowrap',
    desc: '标签内容不换行',
    type: 'boolean',
    value: '`false`)',
  },
]);

const selectEvents = ref([
  {
    name: 'change',
    desc: '值发生改变时触发',
    type: 'value: SelectValue | SelectValue[]',
    value: '-',
  },
  {
    name: 'input-value-change',
    desc: '输入框的值发生改变时触发',
    type: 'inputValue: string',
    value: '-',
  },
  {
    name: 'popup-visible-change',
    desc: '下拉框的显示状态改变时触发',
    type: 'visible: boolean',
    value: '-',
  },
  {
    name: 'clear',
    desc: '点击清除按钮时触发',
    type: '-',
    value: '-',
  },
  {
    name: 'remove',
    desc: '点击标签的删除按钮时触发',
    type: 'removed: SelectValue',
    value: '-',
  },
  {
    name: 'search',
    desc: '用户搜索时触发',
    type: 'inputValue: string',
    value: '-',
  },
  {
    name: 'dropdown-scroll',
    desc: '下拉菜单发生滚动时触发',
    type: '-',
    value: '-',
  },
  {
    name: 'dropdown-reach-bottom',
    desc: '下拉菜单滚动到底部时触发',
    type: '-',
    value: '-',
  },
  {
    name: 'exceed-limit',
    desc: '多选超出限制时触发',
    type: 'value: SelectValue,\nev: Event',
    value: '-',
  },
]);

const selectSlots = ref([
  {
    name: 'trigger',
    desc: '自定义触发元素',
    type: '-',
    value: '-',
  },
  {
    name: 'prefix',
    desc: '前缀元素',
    type: '-',
    value: '-',
  },
  {
    name: 'search-icon',
    desc: '选择框的搜索图标',
    type: '-',
    value: '-',
  },
  {
    name: 'loading-icon',
    desc: '选择框的加载中图标',
    type: '-',
    value: '-',
  },
  {
    name: 'arrow-icon',
    desc: '选择框的箭头图标',
    type: '-',
    value: '-',
  },
  {
    name: 'footer',
    desc: '下拉框的页脚',
    type: '-',
    value: '-',
  },
  {
    name: 'header',
    desc: '下拉框的页头',
    type: '-',
    value: '-',
  },
  {
    name: 'label',
    desc: '选择框的显示内容',
    type: 'data: SelectOptionData',
    value: '-',
  },
  {
    name: 'option',
    desc: '选项内容',
    type: 'data: SelectOptionData',
    value: '-',
  },
  {
    name: 'empty',
    desc: '选项为空时的显示内容',
    type: '-',
    value: '-',
  },
]);

const optionProps = ref([
  {
    name: 'value',
    desc: '选项值（如不填，会从内容中获取）',
    type: 'string | number | boolean | object',
    value: '-',
  },
  {
    name: 'label',
    desc: '选项标签（如不填，会从内容中获取）',
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
    name: 'tag-props',
    desc: '展示的标签属性',
    type: 'TagProps',
    value: '-',
  },
  {
    name: 'extra',
    desc: '额外数据',
    type: 'object',
    value: '-',
  },
  {
    name: 'index',
    desc: '用于手动指定选项的 index',
    type: 'number',
    value: '-',
  },
]);

const optgroupProps = ref([
  {
    name: 'label',
    desc: '选项组的标题',
    type: 'string',
    value: '-',
  },
]);

const optgroupSlots = ref([
  {
    name: 'label',
    desc: '选项组的标题',
    type: '-',
    value: '-',
  },
]);

const selectOptionDataProps = ref([
  {
    name: 'value',
    desc: '选项值',
    type: 'string | number | boolean | Record<string, unknown>',
    value: '-',
  },
  {
    name: 'label',
    desc: '选项内容',
    type: 'string',
    value: '-',
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: 'false',
  },
  {
    name: 'tagProps',
    desc: '选项对应的多选标签的属性',
    type: 'any',
    value: '-',
  },
  {
    name: 'render',
    desc: '自定义渲染',
    type: 'RenderFunction',
    value: '-',
  },
]);

const selectOptionGroupProps = ref([
  {
    name: 'isGroup',
    desc: '是否为选项组',
    type: 'true',
    value: '-',
  },
  {
    name: 'label',
    desc: '选项组标题',
    type: 'string',
    value: '-',
  },
  {
    name: 'options',
    desc: '选项组中的选项',
    type: 'SelectOption[]',
    value: '-',
  },
]);

const virtualListPropsProps = ref([
  {
    name: 'itemHeight（必填）',
    desc: '每一项的高度',
    type: 'number',
    value: '-',

  },
  {
    name: 'threshold',
    desc: '开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。',
    type: 'number',
    value: '-',
  },
]);

</script>
