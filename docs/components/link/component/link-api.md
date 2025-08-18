## API

### Link Props

| 参数名    | 描述           | 类型                                             | 默认值     |
| --------- | -------------- | ------------------------------------------------ | ---------- |
| href      | 链接地址       | `string`                                         | `-`        |
| icon      | 是否显示图标   | `boolean`                                        | `false`    |
| status    | 链接状态       | `'normal' \| 'success' \| 'warning' \| 'danger'` | `'normal'` |
| hoverable | 是否有悬停效果 | `boolean`                                        | `true`     |
| disabled  | 是否禁用       | `boolean`                                        | `false`    |
| loading   | 是否加载中     | `boolean`                                        | `false`    |

### Link Events

| 事件名      | 描述           | 参数                  |
| ----------- | -------------- | --------------------- |
| click       | 点击时触发     | `(event: MouseEvent)` |
| dblclick    | 双击时触发     | `(event: MouseEvent)` |
| contextmenu | 右键点击时触发 | `(event: MouseEvent)` |

### Link Slots

| 插槽名  | 描述       |
| ------- | ---------- |
| default | 链接内容   |
| icon    | 自定义图标 |
