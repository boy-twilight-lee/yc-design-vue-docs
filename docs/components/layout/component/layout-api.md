## API

### Layout Props

| 参数     | 说明           | 类型      | 默认值 |
| -------- | -------------- | --------- | ------ |
| hasSider | 是否包含侧边栏 | `boolean` | -      |

### LayoutSider Props

| 参数             | 说明             | 类型               | 默认值   |
| ---------------- | ---------------- | ------------------ | -------- |
| theme            | 主题             | `Theme`            | `'dark'` |
| collapsed        | 是否折叠         | `boolean`          | -        |
| defaultCollapsed | 默认是否折叠     | `boolean`          | `false`  |
| collapsible      | 是否可折叠       | `boolean`          | `false`  |
| width            | 宽度             | `number`           | `200`    |
| collapsedWidth   | 折叠时宽度       | `number`           | `80`     |
| reverseArrow     | 是否反转箭头     | `boolean`          | `false`  |
| breakpoint       | 响应式断点       | `BreakpointName`   | -        |
| hideTrigger      | 是否隐藏触发器   | `boolean`          | `false`  |
| resizeDirections | 可调整尺寸的方向 | `ResizeDirections` | -        |

### Events

| 事件名           | 说明                 | 回调参数                                                     |
| ---------------- | -------------------- | ------------------------------------------------------------ |
| update:collapsed | 折叠状态变化时触发   | `(collapsed: boolean)`                                       |
| collapse         | 折叠状态变化时触发   | `(collapsed: boolean, type: 'clickTrigger' \| 'responsive')` |
| breakpoint       | 响应式断点触发时触发 | `(collapsed: boolean)`                                       |

### Slots

| 插槽名  | 说明         | 参数                     |
| ------- | ------------ | ------------------------ |
| default | 布局内容     | -                        |
| trigger | 自定义触发器 | `{ collapsed: boolean }` |
