## API

### Typography Props

| 参数名              | 描述                   | 类型                                                             | 默认值  |
| ------------------- | ---------------------- | ---------------------------------------------------------------- | ------- |
| type                | 文本类型               | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `-`     |
| bold                | 是否加粗               | `boolean`                                                        | `false` |
| disabled            | 是否禁用               | `boolean`                                                        | `false` |
| mark                | 是否标记               | `boolean`                                                        | `false` |
| underline           | 是否下划线             | `boolean`                                                        | `false` |
| delete              | 是否删除线             | `boolean`                                                        | `false` |
| code                | 是否代码样式           | `boolean`                                                        | `false` |
| editable            | 是否可编辑             | `boolean`                                                        | `false` |
| editing (v-model)   | 是否处于编辑状态       | `boolean`                                                        | `false` |
| edit-text (v-model) | 编辑的文本内容         | `string`                                                         | `-`     |
| copyable            | 是否可复制             | `boolean`                                                        | `false` |
| copy-text           | 复制的文本内容         | `string`                                                         | `-`     |
| copy-delay          | 复制成功提示的延迟时间 | `number`                                                         | `3000`  |
| ellipsis            | 省略配置               | `boolean \| EllipsisConfig`                                      | `false` |

### TypographyTitle Props

| 参数名  | 描述     | 类型                         | 默认值 |
| ------- | -------- | ---------------------------- | ------ |
| heading | 标题级别 | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1`    |

### TypographyParagraph Props

| 参数名     | 描述           | 类型                   | 默认值      |
| ---------- | -------------- | ---------------------- | ----------- |
| blockquote | 是否为引用样式 | `boolean`              | `false`     |
| spacing    | 行间距类型     | `'default' \| 'close'` | `'default'` |

### Typography Events

| 事件名     | 描述               | 参数                    |
| ---------- | ------------------ | ----------------------- |
| edit-start | 开始编辑时触发     | `-`                     |
| change     | 编辑完成时触发     | `(value: string)`       |
| edit-end   | 结束编辑时触发     | `-`                     |
| copy       | 复制时触发         | `(value: string)`       |
| ellipsis   | 省略状态变化时触发 | `(isEllipsis: boolean)` |
| expand     | 展开状态变化时触发 | `(expanded: boolean)`   |

### Typography Slots

| 插槽名       | 描述           | 参数                    |
| ------------ | -------------- | ----------------------- |
| default      | 文本内容       | `-`                     |
| expand-node  | 自定义展开节点 | `{ expanded: boolean }` |
| copy-icon    | 自定义复制图标 | `{ copied: boolean }`   |
| copy-tooltip | 自定义复制提示 | `{ copied: boolean }`   |
