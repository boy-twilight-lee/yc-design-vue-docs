## API

### Props

| 参数     | 说明                                         | 类型               | 默认值   |
| -------- | -------------------------------------------- | ------------------ | -------- |
| count    | 展示的数字，大于 maxCount 时显示为 maxCount+ | `number`           | -        |
| dot      | 不展示数字，只有一个小红点                   | `boolean`          | `false`  |
| dotStyle | 自定义点的样式                               | `CSSProperties`    | `{}`     |
| maxCount | 最大值，超过最大值会显示为 maxCount+         | `number`           | `99`     |
| offset   | 设置状态点的位置偏移                         | `[number, number]` | `[0, 0]` |
| color    | 自定义徽标颜色                               | `string`           | -        |
| status   | 设置徽标为状态点                             | `BadgeStatus`      | -        |
| text     | 状态点的文本                                 | `string`           | `''`     |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 徽标包裹的内容 |
| content | 自定义徽标内容 |
