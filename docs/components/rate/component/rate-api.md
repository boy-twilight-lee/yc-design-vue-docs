## API

### Rate Props

| 参数         | 说明         | 类型                               | 默认值  |
| ------------ | ------------ | ---------------------------------- | ------- |
| count        | 评分数量     | `number`                           | `5`     |
| modelValue   | 绑定值       | `number`                           | -       |
| defaultValue | 默认值       | `number`                           | `0`     |
| allowHalf    | 是否允许半星 | `boolean`                          | `false` |
| allowClear   | 是否允许清除 | `boolean`                          | `true`  |
| grading      | 是否启用分级 | `boolean`                          | `false` |
| readonly     | 是否只读     | `boolean`                          | `false` |
| disabled     | 是否禁用     | `boolean`                          | `false` |
| color        | 评分颜色     | `string \| Record<number, string>` | -       |

### Events

| 事件名            | 说明               | 回调参数          |
| ----------------- | ------------------ | ----------------- |
| update:modelValue | 绑定值变化时触发   | `(value: number)` |
| change            | 评分变化时触发     | `(value: number)` |
| hover-change      | 悬停评分变化时触发 | `(value: number)` |

### Slots

| 插槽名    | 说明       | 参数                |
| --------- | ---------- | ------------------- |
| character | 自定义字符 | `{ index: number }` |
