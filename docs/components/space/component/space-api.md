## API

### Space Props

| 参数名    | 描述                                          | 类型                                                 | 默认值         |
| --------- | --------------------------------------------- | ---------------------------------------------------- | -------------- |
| align     | 对齐方式                                      | `'start' \| 'end' \| 'center' \| 'baseline'`         | `'start'`      |
| direction | 间距方向                                      | `'horizontal' \| 'vertical'`                         | `'horizontal'` |
| wrap      | 是否自动换行，仅在 horizontal 时有效          | `boolean`                                            | `false`        |
| fill      | 是否让 Space 变为一个块级元素，填充整个父元素 | `boolean`                                            | `false`        |
| size      | 间距大小                                      | `'mini' \| 'small' \| 'medium' \| 'large' \| number` | `'medium'`     |

### Space Slots

| 插槽名  | 描述               |
| ------- | ------------------ |
| default | 需要添加间距的元素 |
| split   | 分隔符             |
