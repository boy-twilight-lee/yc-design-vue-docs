## API

### Props

| 参数     | 说明     | 类型           | 默认值   |
| -------- | -------- | -------------- | -------- |
| author   | 评论作者 | `string`       | `''`     |
| avatar   | 头像地址 | `string`       | `''`     |
| content  | 评论内容 | `string`       | `''`     |
| datetime | 评论时间 | `string`       | `''`     |
| align    | 对齐方式 | `CommentAlign` | `'left'` |

### Slots

| 插槽名   | 说明       |
| -------- | ---------- |
| avatar   | 自定义头像 |
| author   | 自定义作者 |
| datetime | 自定义时间 |
| content  | 自定义内容 |
| actions  | 操作区域   |
| default  | 嵌套评论   |
