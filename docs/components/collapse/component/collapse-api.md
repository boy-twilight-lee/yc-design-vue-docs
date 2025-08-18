## API

### Collapse Props

| 参数               | 说明               | 类型                 | 默认值   |
| ------------------ | ------------------ | -------------------- | -------- |
| activeKey          | 当前展开的面板     | `CollapseValue[]`    | -        |
| defaultActiveKey   | 默认展开的面板     | `CollapseValue[]`    | `[]`     |
| accordion          | 是否开启手风琴模式 | `boolean`            | `false`  |
| showExpandIcon     | 是否显示展开图标   | `boolean`            | `true`   |
| expandIconPosition | 展开图标位置       | `ExpandIconPosition` | `'left'` |
| bordered           | 是否有边框         | `boolean`            | `true`   |
| destroyOnHide      | 隐藏时是否销毁内容 | `boolean`            | `false`  |

### CollapseItem Props

| 参数           | 说明               | 类型            | 默认值  |
| -------------- | ------------------ | --------------- | ------- |
| path           | 面板的唯一标识     | `CollapseValue` | -       |
| header         | 面板标题           | `string`        | -       |
| disabled       | 是否禁用           | `boolean`       | `false` |
| showExpandIcon | 是否显示展开图标   | `boolean`       | -       |
| destroyOnHide  | 隐藏时是否销毁内容 | `boolean`       | -       |

### Events

| 事件名           | 说明                 | 回调参数                   |
| ---------------- | -------------------- | -------------------------- |
| update:activeKey | 展开的面板变化时触发 | `(value: CollapseValue[])` |
| change           | 展开的面板变化时触发 | `(value: CollapseValue[])` |

### Slots

| 插槽名      | 说明           | 参数                                                                  |
| ----------- | -------------- | --------------------------------------------------------------------- |
| default     | 面板内容       | -                                                                     |
| expand-icon | 自定义展开图标 | `{ active: boolean, disabled: boolean, position: 'left' \| 'right' }` |
| header      | 自定义头部内容 | -                                                                     |
| extra       | 额外操作区域   | -                                                                     |
