## API

### Switch Props

| 参数           | 说明             | 类型           | 默认值     |
| -------------- | ---------------- | -------------- | ---------- |
| modelValue     | 绑定值           | `SwitchValue`  | -          |
| defaultChecked | 默认值           | `SwitchValue`  | -          |
| disabled       | 是否禁用         | `boolean`      | `false`    |
| loading        | 是否加载中       | `boolean`      | `false`    |
| type           | 开关类型         | `SwitchType`   | `'circle'` |
| size           | 开关尺寸         | `SwitchSize`   | `'medium'` |
| checkedValue   | 选中时的值       | `SwitchValue`  | `true`     |
| uncheckedValue | 未选中时的值     | `SwitchValue`  | `false`    |
| checkedColor   | 选中时的颜色     | `string`       | -          |
| uncheckedColor | 未选中时的颜色   | `string`       | -          |
| checkedText    | 选中时的文字     | `string`       | -          |
| uncheckedText  | 未选中时的文字   | `string`       | -          |
| beforeChange   | 切换前的回调函数 | `BeforeChange` | -          |

### Events

| 事件名            | 说明             | 回调参数                          |
| ----------------- | ---------------- | --------------------------------- |
| update:modelValue | 绑定值变化时触发 | `(value: SwitchValue)`            |
| change            | 状态变化时触发   | `(value: SwitchValue, ev: Event)` |
| focus             | 获得焦点时触发   | `(ev: FocusEvent)`                |
| blur              | 失去焦点时触发   | `(ev: FocusEvent)`                |

### Slots

| 插槽名         | 说明           | 参数 |
| -------------- | -------------- | ---- |
| checked-icon   | 选中时的图标   | -    |
| unchecked-icon | 未选中时的图标 | -    |
| checked        | 选中时的内容   | -    |
| unchecked      | 未选中时的内容 | -    |

### SwitchValue

| 类型                          | 说明       |
| ----------------------------- | ---------- |
| `string \| number \| boolean` | 开关值类型 |

### SwitchType

| 类型       | 说明     |
| ---------- | -------- |
| `'circle'` | 圆形开关 |
| `'round'`  | 圆角开关 |
| `'line'`   | 线条开关 |

### SwitchSize

| 类型       | 说明     |
| ---------- | -------- |
| `'small'`  | 小尺寸   |
| `'medium'` | 中等尺寸 |

### BeforeChange

| 类型                                                                     | 说明           |
| ------------------------------------------------------------------------ | -------------- |
| `(newValue: SwitchValue) => Promise<boolean \| void> \| boolean \| void` | 切换前回调函数 |
