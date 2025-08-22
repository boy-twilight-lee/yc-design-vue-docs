## API

### Slider Props

| 参数          | 说明           | 类型                     | 默认值         |
| ------------- | -------------- | ------------------------ | -------------- |
| modelValue    | 绑定值         | `SliderValue`            | -              |
| defaultValue  | 默认值         | `SliderValue`            | -              |
| step          | 步长           | `number`                 | `1`            |
| min           | 最小值         | `number`                 | `0`            |
| max           | 最大值         | `number`                 | `100`          |
| marks         | 标记           | `Record<number, string>` | -              |
| direction     | 方向           | `Direction`              | `'horizontal'` |
| disabled      | 是否禁用       | `boolean`                | `false`        |
| showTicks     | 是否显示刻度   | `boolean`                | `false`        |
| showInput     | 是否显示输入框 | `boolean`                | `false`        |
| range         | 是否范围选择   | `boolean`                | `false`        |
| showTooltip   | 是否显示提示   | `boolean`                | `true`         |
| formatTooltip | 提示格式化函数 | `FormatTooltip`          | -              |

### Events

| 事件名            | 说明             | 回调参数               |
| ----------------- | ---------------- | ---------------------- |
| update:modelValue | 绑定值变化时触发 | `(value: SliderValue)` |
| change            | 值变化时触发     | `(value: SliderValue)` |

### SliderValue

| 类型       | 说明       |
| ---------- | ---------- |
| `number`   | 单选值     |
| `number[]` | 范围选择值 |

### FormatTooltip

| 类型                        | 说明           |
| --------------------------- | -------------- |
| `(value: number) => string` | 提示格式化函数 |
