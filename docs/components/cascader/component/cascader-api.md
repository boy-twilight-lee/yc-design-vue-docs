## API

### Cascader Props

| 参数名                | 描述                     | 类型                                                      | 默认值     |
| --------------------- | ------------------------ | --------------------------------------------------------- | ---------- |
| modelValue (v-model)  | 绑定值                   | `CascaderValue`                                           | `-`        |
| default-value         | 默认值                   | `CascaderValue`                                           | `-`        |
| options               | 可选项数据源             | `CascaderOption[]`                                        | `[]`       |
| multiple              | 是否多选                 | `boolean`                                                 | `false`    |
| size                  | 尺寸                     | `'mini' \| 'small' \| 'medium' \| 'large'`                | `'medium'` |
| placeholder           | 输入框占位文本           | `string`                                                  | `-`        |
| disabled              | 是否禁用                 | `boolean`                                                 | `false`    |
| error                 | 是否为错误状态           | `boolean`                                                 | `false`    |
| allow-search          | 是否支持搜索             | `boolean`                                                 | `false`    |
| allow-clear           | 是否支持清除             | `boolean`                                                 | `false`    |
| expand-trigger        | 次级菜单的触发方式       | `'click' \| 'hover'`                                      | `'click'`  |
| popup-visible         | 弹出框是否可见           | `boolean`                                                 | `-`        |
| default-popup-visible | 弹出框默认是否可见       | `boolean`                                                 | `false`    |
| format-label          | 格式化显示标签           | `(options: CascaderOption[]) => string`                   | `-`        |
| max-tag-count         | 多选时最多显示的标签数量 | `number`                                                  | `-`        |
| loading               | 是否为加载状态           | `boolean`                                                 | `false`    |
| search-delay          | 搜索防抖延时             | `number`                                                  | `500`      |
| filter-option         | 自定义搜索逻辑           | `(inputValue: string, option: CascaderOption) => boolean` | `-`        |

### Cascader Events

| 事件名               | 描述                     | 参数                     |
| -------------------- | ------------------------ | ------------------------ |
| change               | 选择完成后触发           | `(value: CascaderValue)` |
| input-value-change   | 输入框值改变时触发       | `(value: string)`        |
| clear                | 点击清除按钮时触发       | `-`                      |
| search               | 搜索时触发               | `(value: string)`        |
| popup-visible-change | 弹出框显示状态改变时触发 | `(visible: boolean)`     |
| focus                | 获得焦点时触发           | `(ev: FocusEvent)`       |
| blur                 | 失去焦点时触发           | `(ev: FocusEvent)`       |

### Cascader Slots

| 插槽名       | 描述           | 参数                       |
| ------------ | -------------- | -------------------------- |
| label        | 自定义标签显示 | `{ data: CascaderOption }` |
| option       | 自定义选项显示 | `{ data: CascaderOption }` |
| prefix       | 前缀内容       | `-`                        |
| arrow-icon   | 自定义箭头图标 | `-`                        |
| loading-icon | 自定义加载图标 | `-`                        |
| search-icon  | 自定义搜索图标 | `-`                        |
| empty        | 自定义空状态   | `-`                        |
