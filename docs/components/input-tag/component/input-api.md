### InputTag Props

| 参数名                | 描述               | 类型                                              | 默认值     |
| --------------------- | ------------------ | ------------------------------------------------- | ---------- |
| modelValue (v-model)  | 绑定值             | `InputTagValue`                                   | `[]`       |
| default-value         | 默认值             | `InputTagValue`                                   | `[]`       |
| input-value (v-model) | 输入框的值         | `string`                                          | `-`        |
| default-input-value   | 输入框的默认值     | `string`                                          | `-`        |
| placeholder           | 输入框占位文本     | `string`                                          | `-`        |
| disabled              | 是否禁用           | `boolean`                                         | `false`    |
| error                 | 是否为错误状态     | `boolean`                                         | `false`    |
| readonly              | 是否只读           | `boolean`                                         | `false`    |
| allow-clear           | 是否允许清空       | `boolean`                                         | `false`    |
| size                  | 尺寸               | `'mini' \| 'small' \| 'medium' \| 'large'`        | `'medium'` |
| max-tag-count         | 最多显示的标签个数 | `number`                                          | `-`        |
| retain-input-value    | 是否保留输入框的值 | `boolean \| { create?: boolean; blur?: boolean }` | `false`    |
| format-tag            | 格式化标签的函数   | `(data: TagData) => string`                       | `-`        |
| unique-value          | 是否唯一值         | `boolean`                                         | `false`    |
| tag-nowrap            | 标签是否不换行     | `boolean`                                         | `false`    |
| field-names           | 自定义字段名       | `Record<string, string>`                          | `-`        |
| allow-create          | 是否允许创建       | `boolean`                                         | `true`     |

### InputTag Events

| 事件名             | 描述               | 参数                                                         |
| ------------------ | ------------------ | ------------------------------------------------------------ |
| input              | 输入框输入时触发   | `(value: string)`                                            |
| input-value-change | 输入框值改变时触发 | `(value: string, ev: Event)`                                 |
| focus              | 获得焦点时触发     | `(ev: FocusEvent)`                                           |
| blur               | 失去焦点时触发     | `(ev: FocusEvent)`                                           |
| press-enter        | 按下回车键时触发   | `(ev: KeyboardEvent)`                                        |
| remove             | 删除标签时触发     | `(value: number \| string, ev: MouseEvent \| KeyboardEvent)` |
| clear              | 点击清除按钮时触发 | `(ev: MouseEvent)`                                           |

### InputTag Slots

| 插槽名 | 描述       | 参数               |
| ------ | ---------- | ------------------ |
| tag    | 自定义标签 | `{ tag: TagData }` |
| prefix | 前缀内容   | `-`                |
| suffix | 后缀内容   | `-`                |

### InputTag Methods

| 方法名 | 描述             | 参数 |
| ------ | ---------------- | ---- |
| focus  | 使输入框获得焦点 | `-`  |
| blur   | 使输入框失去焦点 | `-`  |
