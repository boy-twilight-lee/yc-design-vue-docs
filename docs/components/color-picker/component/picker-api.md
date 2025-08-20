## API

### Props

| 参数          | 说明               | 类型           | 默认值  |
| ------------- | ------------------ | -------------- | ------- |
| modelValue    | 当前选中的颜色     | `string`       | -       |
| defaultValue  | 默认颜色           | `string`       | -       |
| format        | 颜色格式           | `ColorFormat`  | -       |
| size          | 尺寸               | `Size`         | -       |
| showText      | 是否显示颜色值文本 | `boolean`      | -       |
| showHistory   | 是否显示历史颜色   | `boolean`      | -       |
| showPreset    | 是否显示预设颜色   | `boolean`      | -       |
| disabled      | 是否禁用           | `boolean`      | `false` |
| disabledAlpha | 是否禁用透明度     | `boolean`      | -       |
| hideTrigger   | 是否隐藏触发器     | `boolean`      | -       |
| triggerProps  | 触发器属性         | `TriggerProps` | -       |
| historyColors | 历史颜色列表       | `string[]`     | -       |
| presetColors  | 预设颜色列表       | `string[]`     | -       |

### Events

| 事件名               | 说明                   | 回调参数                            |
| -------------------- | ---------------------- | ----------------------------------- |
| update:modelValue    | 颜色变化时触发         | `(value: string)`                   |
| change               | 颜色变化时触发         | `(value: string)`                   |
| popup-visible-change | 弹窗显示状态变化时触发 | `(visible: boolean, color: string)` |
