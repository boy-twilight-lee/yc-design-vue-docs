## API

### Timeline Props

| 参数          | 说明       | 类型                    | 默认值       |
| ------------- | ---------- | ----------------------- | ------------ |
| reverse       | 是否倒序   | `boolean`               | `false`      |
| direction     | 时间轴方向 | `Direction`             | `'vertical'` |
| mode          | 时间轴模式 | `TimelineMode`          | `'left'`     |
| pending       | 待处理状态 | `boolean \| string`     | -            |
| labelPosition | 标签位置   | `TimelineLabelPosition` | -            |

### Timeline Slots

| 插槽名  | 说明       | 参数 |
| ------- | ---------- | ---- |
| dot     | 自定义节点 | -    |
| default | 时间轴内容 | -    |

### TimelineItem Props

| 参数      | 说明         | 类型               | 默认值  |
| --------- | ------------ | ------------------ | ------- |
| dotColor  | 节点颜色     | `string`           | -       |
| dotType   | 节点类型     | `TimelineDotType`  | -       |
| lineType  | 线条类型     | `TimelineLineType` | -       |
| lineColor | 线条颜色     | `string`           | -       |
| label     | 标签         | `string`           | -       |
| position  | 位置         | `TimelinePositon`  | -       |
| isGhost   | 是否幽灵节点 | `boolean`          | `false` |

### TimelineItem Slots

| 插槽名  | 说明       | 参数 |
| ------- | ---------- | ---- |
| dot     | 自定义节点 | -    |
| label   | 自定义标签 | -    |
| default | 节点内容   | -    |

### TimelineMode

| 类型          | 说明     |
| ------------- | -------- |
| `'left'`      | 左侧模式 |
| `'right'`     | 右侧模式 |
| `'top'`       | 顶部模式 |
| `'bottom'`    | 底部模式 |
| `'alternate'` | 交替模式 |

### TimelineLabelPosition

| 类型         | 说明     |
| ------------ | -------- |
| `'relative'` | 相对位置 |
| `'same'`     | 相同位置 |

### TimelineDotType

| 类型       | 说明     |
| ---------- | -------- |
| `'hollow'` | 空心节点 |
| `'solid'`  | 实心节点 |

### TimelineLineType

| 类型       | 说明 |
| ---------- | ---- |
| `'solid'`  | 实线 |
| `'dashed'` | 虚线 |
| `'dotted'` | 点线 |

### TimelinePositon

| 类型       | 说明 |
| ---------- | ---- |
| `'left'`   | 左侧 |
| `'right'`  | 右侧 |
| `'top'`    | 顶部 |
| `'bottom'` | 底部 |
