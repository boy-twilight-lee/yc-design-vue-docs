## API

### Radio Props

| 参数           | 说明         | 类型         | 默认值    |
| -------------- | ------------ | ------------ | --------- |
| modelValue     | 绑定值       | `RadioValue` | -         |
| defaultChecked | 默认是否选中 | `boolean`    | `false`   |
| value          | 单选框的值   | `RadioValue` | -         |
| type           | 单选框类型   | `RadioType`  | `'radio'` |
| disabled       | 是否禁用     | `boolean`    | `false`   |

### RadioGroup Props

| 参数         | 说明         | 类型          | 默认值         |
| ------------ | ------------ | ------------- | -------------- |
| modelValue   | 绑定值       | `RadioValue`  | -              |
| defaultValue | 默认值       | `RadioValue`  | -              |
| size         | 单选框组尺寸 | `Size`        | `'medium'`     |
| type         | 单选框类型   | `RadioType`   | `'radio'`      |
| options      | 选项配置     | `RadioOption` | -              |
| direction    | 布局方向     | `Direction`   | `'horizontal'` |
| disabled     | 是否禁用     | `boolean`     | `false`        |

### Events

| 事件名            | 说明             | 回调参数                         |
| ----------------- | ---------------- | -------------------------------- |
| update:modelValue | 绑定值变化时触发 | `(value: RadioValue)`            |
| change            | 值变化时触发     | `(value: RadioValue, ev: Event)` |

### Slots

| 插槽名  | 说明         | 参数                                      |
| ------- | ------------ | ----------------------------------------- |
| default | 标签内容     | -                                         |
| radio   | 自定义单选框 | `{ checked: boolean, disabled: boolean }` |
| label   | 自定义标签   | `{ data: ObjectData }`                    |

### RadioValue

| 类型      | 说明     |
| --------- | -------- |
| `string`  | 字符串值 |
| `number`  | 数字值   |
| `boolean` | 布尔值   |

### RadioType

| 类型       | 说明           |
| ---------- | -------------- |
| `'radio'`  | 默认单选框样式 |
| `'button'` | 按钮样式       |

### RadioOption

| 类型                                                        | 说明     |
| ----------------------------------------------------------- | -------- |
| `RadioValue`                                                | 简单值   |
| `{ label?: string, value: RadioValue, disabled?: boolean }` | 对象配置 |
