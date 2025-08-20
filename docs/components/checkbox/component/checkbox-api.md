## API

### Checkbox Props

| 参数           | 说明           | 类型            | 默认值  |
| -------------- | -------------- | --------------- | ------- |
| modelValue     | 是否选中       | `boolean`       | -       |
| defaultChecked | 默认是否选中   | `boolean`       | `false` |
| disabled       | 是否禁用       | `boolean`       | `false` |
| value          | 复选框的值     | `CheckboxValue` | -       |
| indeterminate  | 是否为半选状态 | `boolean`       | `false` |

### CheckboxGroup Props

| 参数         | 说明             | 类型                                  | 默认值  |
| ------------ | ---------------- | ------------------------------------- | ------- |
| modelValue   | 选中的值列表     | `CheckboxValue[]`                     | -       |
| defaultValue | 默认选中的值列表 | `CheckboxValue[]`                     | `[]`    |
| max          | 最大选择数量     | `number`                              | -       |
| options      | 选项配置         | `(CheckboxOption \| CheckboxValue)[]` | -       |
| direction    | 排列方向         | `Direction`                           | -       |
| disabled     | 是否禁用         | `boolean`                             | `false` |

### Events

| 事件名            | 说明         | 回调参数                                          |
| ----------------- | ------------ | ------------------------------------------------- |
| update:modelValue | 值变化时触发 | `(value: boolean \| CheckboxValue[])`             |
| change            | 值变化时触发 | `(value: boolean \| CheckboxValue[], ev?: Event)` |

### Slots

| 插槽名   | 说明           | 参数                                      |
| -------- | -------------- | ----------------------------------------- |
| default  | 复选框标签内容 | -                                         |
| checkbox | 自定义复选框   | `{ checked: boolean, disabled: boolean }` |
| label    | 自定义标签     | `{ data: ObjectData }`                    |
