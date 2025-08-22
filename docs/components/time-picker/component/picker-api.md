## API

### TimePicker Props

| 参数                | 说明               | 类型                                                  | 默认值       |
| ------------------- | ------------------ | ----------------------------------------------------- | ------------ |
| type                | 时间选择器类型     | `TimePickerType`                                      | `'time'`     |
| modelValue          | 绑定值             | `TimePickerValue`                                     | -            |
| defaultValue        | 默认值             | `TimePickerValue`                                     | -            |
| disabled            | 是否禁用           | `boolean`                                             | `false`      |
| allowClear          | 是否允许清除       | `boolean`                                             | `false`      |
| readonly            | 是否只读           | `boolean`                                             | `false`      |
| error               | 是否错误状态       | `boolean`                                             | `false`      |
| format              | 时间格式           | `string`                                              | `'HH:mm:ss'` |
| placeholder         | 占位符             | `string \| string[]`                                  | -            |
| size                | 尺寸               | `Size`                                                | `'medium'`   |
| step                | 时间步长           | `{ hour?: number; minute?: number; second?: number }` | -            |
| disabledHours       | 禁用的小时         | `DisabledHours`                                       | -            |
| disabledMinutes     | 禁用的分钟         | `DisabledMinutes`                                     | -            |
| disabledSeconds     | 禁用的秒数         | `DisabledSeconds`                                     | -            |
| hideDisabledOptions | 是否隐藏禁用的选项 | `boolean`                                             | `false`      |
| disableConfirm      | 是否禁用确认       | `boolean`                                             | `false`      |
| position            | 弹出位置           | `TimePickerPosition`                                  | -            |
| popupVisible        | 是否显示弹出层     | `boolean`                                             | -            |
| defaultPopupVisible | 默认是否显示弹出层 | `boolean`                                             | `false`      |
| unmountOnClose      | 关闭时是否卸载     | `boolean`                                             | `false`      |

### Events

| 事件名               | 说明                     | 回调参数                   |
| -------------------- | ------------------------ | -------------------------- |
| update:modelValue    | 绑定值变化时触发         | `(value: TimePickerValue)` |
| update:popupVisible  | 弹出层显示状态变化时触发 | `(value: boolean)`         |
| change               | 时间变化时触发           | `(timeString, time)`       |
| select               | 选择时间时触发           | `(timeString, time)`       |
| clear                | 清除时触发               | -                          |
| popup-visible-change | 弹出层显示状态变化时触发 | `(value: boolean)`         |

### Slots

| 插槽名      | 说明     | 参数 |
| ----------- | -------- | ---- |
| prefix      | 前缀图标 | -    |
| suffix-icon | 后缀图标 | -    |
| extra       | 额外内容 | -    |

### TimePickerType

| 类型           | 说明         |
| -------------- | ------------ |
| `'time'`       | 单个时间选择 |
| `'time-range'` | 时间范围选择 |

### TimePickerPosition

| 类型       | 说明 |
| ---------- | ---- |
| `'top'`    | 顶部 |
| `'tl'`     | 左上 |
| `'tr'`     | 右上 |
| `'bottom'` | 底部 |
| `'bl'`     | 左下 |
| `'br'`     | 右下 |

### DisabledHours

| 类型             | 说明               |
| ---------------- | ------------------ |
| `() => number[]` | 返回禁用的小时数组 |

### DisabledMinutes

| 类型                                  | 说明                             |
| ------------------------------------- | -------------------------------- |
| `(selectedHour?: number) => number[]` | 根据选中的小时返回禁用的分钟数组 |

### DisabledSeconds

| 类型                                                           | 说明                                   |
| -------------------------------------------------------------- | -------------------------------------- |
| `(selectedHour?: number, selectedMinute?: number) => number[]` | 根据选中的小时和分钟返回禁用的秒数数组 |
