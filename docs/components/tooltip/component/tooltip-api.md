## API

### Tooltip Props

| 参数                | 说明               | 类型             | 默认值  |
| ------------------- | ------------------ | ---------------- | ------- |
| popupVisible        | 是否显示弹出层     | `boolean`        | -       |
| defaultPopupVisible | 默认是否显示弹出层 | `boolean`        | `false` |
| content             | 提示内容           | `string`         | -       |
| position            | 提示位置           | `TriggerPostion` | `'top'` |
| mini                | 是否迷你提示       | `boolean`        | `false` |
| backgroundColor     | 背景色             | `string`         | -       |
| contentClass        | 内容样式类         | `ClassName`      | -       |
| contentStyle        | 内容内联样式       | `CSSProperties`  | -       |
| arrowClass          | 箭头样式类         | `ClassName`      | -       |
| arrowStyle          | 箭头内联样式       | `CSSProperties`  | -       |
| popupContainer      | 弹出层容器         | `PopupContainer` | -       |
| triggerProps        | 触发器属性         | `TriggerProps`   | -       |

### Events

| 事件名               | 说明                     | 回调参数           |
| -------------------- | ------------------------ | ------------------ |
| update:popupVisible  | 弹出层显示状态变化时触发 | `(value: boolean)` |
| popup-visible-change | 弹出层显示状态变化时触发 | `(value: boolean)` |

### Slots

| 插槽名  | 说明     | 参数 |
| ------- | -------- | ---- |
| default | 触发元素 | -    |
| content | 提示内容 | -    |

### Expose

| 方法名 | 说明     | 参数 |
| ------ | -------- | ---- |
| hide   | 隐藏提示 | -    |
| show   | 显示提示 | -    |
