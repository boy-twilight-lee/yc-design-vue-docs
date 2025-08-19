## API

### Statistic Props

| 参数名               | 描述                 | 类型             | 默认值  |
| -------------------- | -------------------- | ---------------- | ------- |
| title                | 标题                 | `string`         | `-`     |
| value                | 数值                 | `number \| Date` | `-`     |
| format               | 格式化字符串         | `string`         | `-`     |
| extra                | 额外内容             | `string`         | `-`     |
| precision            | 数值精度             | `number`         | `-`     |
| separator            | 千分位分隔符         | `string`         | `','`   |
| show-group-separator | 是否显示千分位分隔符 | `boolean`        | `true`  |
| animation            | 是否开启动画         | `boolean`        | `false` |
| animation-duration   | 动画持续时间（毫秒） | `number`         | `2000`  |
| value-from           | 动画起始值           | `number`         | `-`     |
| placeholder          | 占位符               | `string`         | `-`     |
| value-style          | 数值样式             | `CSSProperties`  | `-`     |
| start                | 是否开始动画         | `boolean`        | `true`  |

### Statistic Events

| 事件名 | 描述           | 参数 |
| ------ | -------------- | ---- |
| finish | 动画完成时触发 | `-`  |

### Statistic Slots

| 插槽名 | 描述           |
| ------ | -------------- |
| title  | 自定义标题     |
| prefix | 自定义前缀     |
| suffix | 自定义后缀     |
| extra  | 自定义额外内容 |
| value  | 自定义数值     |

### Countdown Props

| 参数名      | 描述           | 类型            | 默认值       |
| ----------- | -------------- | --------------- | ------------ |
| title       | 标题           | `string`        | `-`          |
| value       | 目标时间       | `number`        | `-`          |
| now         | 当前时间       | `number`        | `Date.now()` |
| format      | 格式化字符串   | `string`        | `'HH:mm:ss'` |
| start       | 是否开始倒计时 | `boolean`       | `true`       |
| value-style | 数值样式       | `CSSProperties` | `-`          |

### Countdown Events

| 事件名 | 描述             | 参数 |
| ------ | ---------------- | ---- |
| finish | 倒计时结束时触发 | `-`  |

### Countdown Slots

| 插槽名 | 描述       |
| ------ | ---------- |
| title  | 自定义标题 |
