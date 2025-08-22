## API

### cascader Props

<field-table :data="cascaderProps"/>

### cascader Events

<field-table :data="cascaderEvents" type="emits"/>

### cascader Slots

<field-table :data="cascaderSlots" type="slots"/>

### cascader-panel Props

<field-table :data="cascaderPanelProps"/>

### cascader-panel Events

<field-table :data="cascaderPanelEvents" type="emits"/>

### cascader-panel Slots

<field-table :data="cascaderPanelSlots" type="slots"/>

### CascaderOption

<field-table :data="cascaderOption"/>

<script setup>
import { ref } from 'vue';

const cascaderProps = ref([
  { name: 'path-mode', desc: '绑定值是否为路径', type: 'boolean', value: 'false' },
  { name: 'multiple', desc: '是否为多选状态（多选模式默认开启搜索）', type: 'boolean', value: 'false' },
  { name: 'model-value (v-model)', desc: '绑定值', type: 'string| number| Record<string, any>| ( | string | number | Record<string, any> | (string | number | Record<string, any>)[] )[]| undefined', value: '-' },
  { name: 'default-value', desc: '默认值（非受控状态）', type: 'string| number| Record<string, any>| ( | string | number | Record<string, any> | (string | number | Record<string, any>)[] )[]| undefined', value: "'' | undefined | []" },
  { name: 'options', desc: '级联选择器的选项', type: 'CascaderOption[]', value: '[]' },
  { name: 'disabled', desc: '是否禁用', type: 'boolean', value: 'false' },
  { name: 'error', desc: '是否为错误状态', type: 'boolean', value: 'false' },
  { name: 'size', desc: '选择框的大小', type: "'mini' | 'small' | 'medium' | 'large'", value: "'medium'" },
  { name: 'allow-search', desc: '是否允许搜索', type: 'boolean', value: 'false (single) | true (multiple)' },
  { name: 'allow-clear', desc: '是否允许清除', type: 'boolean', value: 'false' },
  { name: 'input-value (v-model)', desc: '输入框的值', type: 'string', value: '-' },
  { name: 'default-input-value', desc: '输入框的默认值（非受控状态）', type: 'string', value: "''" },
  { name: 'popup-visible (v-model)', desc: '是否显示下拉框', type: 'boolean', value: '-' },
  { name: 'expand-trigger', desc: '展开下一级的触发方式', type: "'click' | 'hover'", value: "'click'" },
  { name: 'default-popup-visible', desc: '是否默认显示下拉框（非受控状态）', type: 'boolean', value: 'false' },
  { name: 'placeholder', desc: '占位符', type: 'string', value: '-' },
  { name: 'filter-option', desc: '自定义选项过滤方法', type: '(inputValue: string, option: CascaderOption) => boolean', value: '-' },
  { name: 'popup-container', desc: '弹出框的挂载容器', type: 'string | HTMLElement', value: '-' },
  { name: 'max-tag-count', desc: '多选模式下，最多显示的标签数量。0 表示不限制', type: 'number', value: '0' },
  { name: 'format-label', desc: '格式化展示内容', type: '(options: CascaderOption[]) => string', value: '-' },
  { name: 'trigger-props', desc: '下拉菜单的触发器属性', type: 'TriggerProps', value: '-' },
  { name: 'check-strictly', desc: '是否开启严格选择模式', type: 'boolean', value: 'false' },
  { name: 'load-more', desc: '数据懒加载函数，传入时开启懒加载功能', type: '( option: CascaderOption, done: (children?: CascaderOption[]) => void) => void', value: '-', version: '2.13.0' },
  { name: 'loading', desc: '是否为加载中状态', type: 'boolean', value: 'false', version: '2.15.0' },
  { name: 'search-option-only-label', desc: '搜索下拉菜单中的选项是否仅展示标签', type: 'boolean', value: 'false', version: '2.18.0' },
  { name: 'search-delay', desc: '触发搜索事件的延迟时间', type: 'number', value: '500', version: '2.18.0' },
  { name: 'field-names', desc: '自定义 CascaderOption 中的字段', type: 'CascaderFieldNames', value: '-', version: '2.22.0' },
  { name: 'value-key', desc: '用于确定选项键值的属性名', type: 'string', value: "'value'", version: '2.29.0' },
  { name: 'fallback', desc: '自定义不存在选项的值的展示', type: 'boolean| (( value: | string | number | Record<string, unknown> | (string | number | Record<string, unknown>)[] ) => string)', value: 'true', version: '2.29.0' },
  { name: 'expand-child', desc: '是否展开子菜单', type: 'boolean', value: 'false', version: '2.29.0' },
  { name: 'virtual-list-props', desc: '传递虚拟列表属性，传入此参数以开启虚拟滚动 VirtualListProps', type: 'VirtualListProps', value: '-', version: '2.49.0' },
  { name: 'tag-nowrap', desc: '标签内容不换行', type: 'boolean', value: 'false', version: '2.56.1' },
]);

const cascaderEvents = ref([
  { name: 'change', desc: '选中值改变时触发', type: 'value: string | number | (string | number | (string | number)[])[] | undefined' },
  { name: 'input-value-change', desc: '输入值改变时触发', type: 'value: string' },
  { name: 'clear', desc: '点击清除按钮时触发' },
  { name: 'search', desc: '用户搜索时触发', type: 'value: string' },
  { name: 'popup-visible-change', desc: '下拉框的显示状态改变时触发', type: 'visible: boolean' },
  { name: 'focus', desc: '获得焦点时触发', type: 'ev: FocusEvent' },
  { name: 'blur', desc: '失去焦点时触发', type: 'ev: FocusEvent' },
]);

const cascaderSlots = ref([
  { name: 'label', desc: '选择框的显示内容', type: 'data: CascaderOption', version: '2.18.0' },
  { name: 'prefix', desc: '前缀元素', version: '2.23.0' },
  { name: 'arrow-icon', desc: '选择框的箭头图标', version: '2.16.0' },
  { name: 'loading-icon', desc: '选择框的加载中图标', version: '2.16.0' },
  { name: 'search-icon', desc: '选择框的搜索图标', version: '2.16.0' },
  { name: 'empty', desc: '选项为空时的显示内容', version: '2.23.0' },
  { name: 'option', desc: '选项内容', type: 'data: CascaderOption', version: '2.18.0' },
]);

const cascaderPanelProps = ref([
    { name: 'path-mode', desc: '绑定值是否为路径', type: 'boolean', value: 'false' },
    { name: 'multiple', desc: '是否为多选状态（多选模式默认开启搜索）', type: 'boolean', value: 'false' },
    { name: 'model-value (v-model)', desc: '绑定值', type: 'string| number| Record<string, any>| ( | string | number | Record<string, any> | (string | number | Record<string, any>)[] )[]| undefined', value: '-' },
    { name: 'default-value', desc: '默认值（非受控状态）', type: 'string| number| Record<string, any>| ( | string | number | Record<string, any> | (string | number | Record<string, any>)[] )[]| undefined', value: "'' | undefined | []" },
    { name: 'options', desc: '级联选择器的选项', type: 'CascaderOption[]', value: '[]' },
    { name: 'expand-trigger', desc: '展开下一级的触发方式', type: 'string', value: "'click'" },
    { name: 'check-strictly', desc: '是否开启严格选择模式', type: 'boolean', value: 'false' },
    { name: 'load-more', desc: '数据懒加载函数，传入时开启懒加载功能', type: '( option: CascaderOption, done: (children?: CascaderOption[]) => void) => void', value: '-', version: '2.13.0' },
    { name: 'field-names', desc: '自定义 CascaderOption 中的字段', type: 'CascaderFieldNames', value: '-', version: '2.22.0' },
    { name: 'value-key', desc: '用于确定选项键值的属性名', type: 'string', value: "'value'", version: '2.29.0' },
    { name: 'expand-child', desc: '是否展开子菜单', type: 'boolean', value: 'false', version: '2.29.0' },
]);

const cascaderPanelEvents = ref([
    { name: 'change', desc: '选中值改变时触发', type: 'value: string | number | (string | number | (string | number)[])[] | undefined' },
]);

const cascaderPanelSlots = ref([
    { name: 'empty', desc: '选项为空时的显示内容', version: '2.23.0' },
]);

const cascaderOption = ref([
  { name: 'value', desc: '选项值，2.29.0 版本支持对象', type: 'string | number | Record<string, any>', value: '-' },
  { name: 'label', desc: '选项文本', type: 'string', value: '-' },
  { name: 'render', desc: '自定义渲染', type: 'RenderFunction', value: '-' },
  { name: 'disabled', desc: '是否禁用', type: 'boolean', value: 'false' },
  { name: 'tagProps', desc: '展示的标签属性', type: 'TagProps', value: '-', version: '2.8.0' },
  { name: 'children', desc: '下一级选项', type: 'CascaderOption[]', value: '-' },
  { name: 'isLeaf', desc: '是否是叶子节点', type: 'boolean', value: 'false' },
]);
</script>
