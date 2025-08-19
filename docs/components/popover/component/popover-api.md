## API

### Popover Props

| 参数名                  | 描述               | 类型                                                                                                     | 默认值    |
| ----------------------- | ------------------ | -------------------------------------------------------------------------------------------------------- | --------- |
| popup-visible (v-model) | 弹出框是否可见     | `boolean`                                                                                                | `-`       |
| default-popup-visible   | 弹出框默认是否可见 | `boolean`                                                                                                | `false`   |
| title                   | 气泡卡片标题       | `string`                                                                                                 | `-`       |
| content                 | 气泡卡片内容       | `string`                                                                                                 | `-`       |
| trigger                 | 触发方式           | `'hover' \| 'click' \| 'focus' \| 'contextMenu'`                                                         | `'hover'` |
| position                | 弹出位置           | `'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'` | `'top'`   |
| content-class           | 内容区域类名       | `string \| string[]`                                                                                     | `-`       |
| content-style           | 内容区域样式       | `CSSProperties`                                                                                          | `-`       |
| arrow-class             | 箭头类名           | `string \| string[]`                                                                                     | `-`       |
| arrow-style             | 箭头样式           | `CSSProperties`                                                                                          | `-`       |
| popup-container         | 弹出框的挂载容器   | `string \| HTMLElement \| () => HTMLElement`                                                             | `'body'`  |
| trigger-props           | Trigger 组件属性   | `TriggerProps`                                                                                           | `-`       |

### Popover Events

| 事件名               | 描述                     | 参数                 |
| -------------------- | ------------------------ | -------------------- |
| popup-visible-change | 弹出框显示状态改变时触发 | `(visible: boolean)` |

### Popover Slots

| 插槽名  | 描述       |
| ------- | ---------- |
| default | 触发元素   |
| title   | 自定义标题 |
| content | 自定义内容 |

### Popover Methods

| 方法名 | 描述         | 参数 |
| ------ | ------------ | ---- |
| show   | 显示气泡卡片 | `-`  |
| hide   | 隐藏气泡卡片 | `-`  |
