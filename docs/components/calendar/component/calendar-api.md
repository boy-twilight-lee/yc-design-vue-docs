## API

### Props

| 参数         | 说明             | 类型             | 默认值              |
| ------------ | ---------------- | ---------------- | ------------------- |
| modelValue   | 当前选中的日期   | `Date`           | -                   |
| defaultValue | 默认选中的日期   | `Date`           | `new Date()`        |
| mode         | 日历模式         | `CalendarMode`   | -                   |
| defaultMode  | 默认模式         | `CalendarMode`   | `'month'`           |
| modes        | 可切换的模式列表 | `CalendarMode[]` | `['month', 'year']` |

### Events

| 事件名            | 说明           | 回调参数               |
| ----------------- | -------------- | ---------------------- |
| update:modelValue | 日期变化时触发 | `(value: Date)`        |
| update:mode       | 模式变化时触发 | `(mode: CalendarMode)` |
| change            | 日期变化时触发 | `(value: Date)`        |
| panel-change      | 面板变化时触发 | `(value: Date)`        |

### Slots

| 插槽名  | 说明                 | 参数                                           |
| ------- | -------------------- | ---------------------------------------------- |
| header  | 自定义头部内容       | `{ year: number, month: number }`              |
| default | 自定义日期单元格内容 | `{ year: number, month: number, day: number }` |
