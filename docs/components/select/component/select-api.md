## API

### select Props

<field-table :data="selectProps"/>

### select Events

<field-table :data="selectEvents" type="emits" />

### select Slots

<field-table :data="selectSlots" :showDefaultValue="false" type="slots"/>

### option Props

<field-table :data="optionProps"/>

### optgroup Props

<field-table :data="optgroupProps"/>

### optgroup Slots

<field-table :data="optgroupSlots" :showDefaultValue="false" type="slots"/>

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
    value: '`\'\' | []`',
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
    value: '`\'\'`',
  },
  {
    name: 'size',
    desc: '选择框的大小',
    type: '\'mini\' | \'small\' | \'medium\' | \'large\'',
    value: '`\'medium\'`',
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
    name: 'default-active-first-option',
    desc: '是否在无值时默认选择第一个选项',
    type: 'boolean',
    value: '`true` (2.43.0)',
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
    value: '`true` (2.10.0)',
  },
  {
    name: 'show-extra-options',
    desc: '是否在下拉菜单中显示额外选项',
    type: 'boolean',
    value: '`true` (2.10.0)',
  },
  {
    name: 'value-key',
    desc: '用于确定选项键值的属性名',
    type: 'string',
    value: '`\'value\'` (2.18.0)',
  },
  {
    name: 'search-delay',
    desc: '触发搜索事件的延迟时间',
    type: 'number',
    value: '`500` (2.18.0)',
  },
  {
    name: 'limit',
    desc: '多选时最多的选择个数',
    type: 'number',
    value: '`0` (2.18.0)',
  },
  {
    name: 'field-names',
    desc: '自定义 SelectOptionData 中的字段',
    type: 'SelectFieldNames',
    value: '- (2.22.0)',
  },
  {
    name: 'scrollbar',
    desc: '是否开启虚拟滚动条',
    type: 'boolean | ScrollbarProps',
    value: '`true` (2.38.0)',
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
    value: '`false` (2.56.1)',
  },
]);

const selectEvents = ref([
  {
    name: 'change',
    desc: '值发生改变时触发',
    type: '(value: string | number | boolean | Record<string, any> | (string | number | boolean | Record<string, any>)[]) => void',
  },
  {
    name: 'input-value-change',
    desc: '输入框的值发生改变时触发',
    type: '(inputValue: string) => void',
  },
  {
    name: 'popup-visible-change',
    desc: '下拉框的显示状态改变时触发',
    type: '(visible: boolean) => void',
  },
  {
    name: 'clear',
    desc: '点击清除按钮时触发',
    type: '() => void',
  },
  {
    name: 'remove',
    desc: '点击标签的删除按钮时触发',
    type: '(removed: string | number | boolean | Record<string, any> | undefined) => void',
  },
  {
    name: 'search',
    desc: '用户搜索时触发',
    type: '(inputValue: string) => void',
  },
  {
    name: 'dropdown-scroll',
    desc: '下拉菜单发生滚动时触发',
    type: '() => void',
  },
  {
    name: 'dropdown-reach-bottom',
    desc: '下拉菜单滚动到底部时触发',
    type: '() => void',
  },
  {
    name: 'exceed-limit',
    desc: '多选超出限制时触发 (2.18.0)',
    type: '(value: string | number | boolean | Record<string, any> | undefined, ev: Event) => void',
  },
]);

const selectSlots = ref([
  {
    name: 'trigger',
    desc: '自定义触发元素 (2.22.0)',
  },
  {
    name: 'prefix',
    desc: '前缀元素 (2.22.0)',
  },
  {
    name: 'search-icon',
    desc: '选择框的搜索图标 (2.16.0)',
  },
  {
    name: 'loading-icon',
    desc: '选择框的加载中图标 (2.16.0)',
  },
  {
    name: 'arrow-icon',
    desc: '选择框的箭头图标 (2.16.0)',
  },
  {
    name: 'footer',
    desc: '下拉框的页脚',
  },
  {
    name: 'header',
    desc: '下拉框的页头 (2.43.0)',
  },
  {
    name: 'label',
    desc: '选择框的显示内容 (data: SelectOptionData)',
  },
  {
    name: 'option',
    desc: '选项内容 (data: SelectOptionData)',
  },
  {
    name: 'empty',
    desc: '选项为空时的显示内容',
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
    value: '- (2.8.0)',
  },
  {
    name: 'extra',
    desc: '额外数据。2.18.0 版本废弃，可使用对象形式的 value 扩展数据',
    type: 'object',
    value: '- (2.10.0)',
  },
  {
    name: 'index',
    desc: '用于手动指定选项的 index',
    type: 'number',
    value: '- (2.20.0)',
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
    desc: '选项组的标题 (2.10.0)',
  },
]);

</script>
