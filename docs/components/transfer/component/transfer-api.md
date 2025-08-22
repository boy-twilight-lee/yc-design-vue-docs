## API

### Transfer Props

| 参数            | 说明             | 类型             | 默认值  |
| --------------- | ---------------- | ---------------- | ------- |
| data            | 数据源           | `TransferItem[]` | -       |
| modelValue      | 绑定值           | `string[]`       | -       |
| defaultValue    | 默认值           | `string[]`       | -       |
| selected        | 已选择的数据     | `string[]`       | -       |
| defaultSelected | 默认已选择的数据 | `string[]`       | -       |
| disabled        | 是否禁用         | `boolean`        | `false` |
| simple          | 是否简单模式     | `boolean`        | `false` |
| oneWay          | 是否单向模式     | `boolean`        | `false` |
| showSearch      | 是否显示搜索框   | `boolean`        | `false` |
| showSelectAll   | 是否显示全选     | `boolean`        | `false` |
| title           | 标题             | `string[]`       | -       |

### Events

| 事件名            | 说明                 | 回调参数                                      |
| ----------------- | -------------------- | --------------------------------------------- |
| update:selected   | 已选择数据变化时触发 | `(value: TransferItemValue[])`                |
| update:modelValue | 绑定值变化时触发     | `(value: TransferItemValue[])`                |
| change            | 数据变化时触发       | `(value: TransferItemValue[])`                |
| select            | 选择变化时触发       | `(value: TransferItemValue[])`                |
| search            | 搜索时触发           | `(value: string, type: 'target' \| 'source')` |

### Slots

| 插槽名         | 说明         | 参数                               |
| -------------- | ------------ | ---------------------------------- |
| source         | 源数据面板   | `DefaultSlots`                     |
| target         | 目标数据面板 | `DefaultSlots`                     |
| source-title   | 源数据标题   | `TitleSlots`                       |
| target-title   | 目标数据标题 | `TitleSlots`                       |
| to-source-icon | 向左箭头图标 | -                                  |
| to-target-icon | 向右箭头图标 | -                                  |
| item           | 数据项       | `{ value: string; label: string }` |

### TransferItem

| 参数     | 说明     | 类型                | 默认值  |
| -------- | -------- | ------------------- | ------- |
| label    | 显示文本 | `string`            | -       |
| value    | 数据值   | `TransferItemValue` | -       |
| disabled | 是否禁用 | `boolean`           | `false` |

### TransferItemValue

| 类型               | 说明       |
| ------------------ | ---------- |
| `string \| number` | 数据值类型 |
