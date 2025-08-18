## API

### Button Props

| 参数名    | 描述                   | 类型                                                          | 默认值     |
| --------- | ---------------------- | ------------------------------------------------------------- | ---------- |
| type      | 按钮的类型             | `'primary' \| 'secondary' \| 'dashed' \| 'outline' \| 'text'` | `-`        |
| status    | 按钮的状态             | `'normal' \| 'success' \| 'warning' \| 'danger'`              | `'normal'` |
| size      | 按钮的尺寸             | `'mini' \| 'small' \| 'medium' \| 'large'`                    | `'medium'` |
| shape     | 按钮的形状             | `'square' \| 'round' \| 'circle'`                             | `'round'`  |
| long      | 按钮是否撑满父容器宽度 | `boolean`                                                     | `false`    |
| loading   | 按钮是否处于加载状态   | `boolean`                                                     | `false`    |
| disabled  | 按钮是否禁用           | `boolean`                                                     | `false`    |
| html-type | 按钮的 HTML 类型       | `'button' \| 'submit' \| 'reset'`                             | `'button'` |
| href      | 链接按钮的地址         | `string`                                                      | `-`        |

### Button Events

| 事件名      | 描述           | 参数               |
| ----------- | -------------- | ------------------ |
| click       | 按钮时触发     | `(ev: MouseEvent)` |
| mousedown   | 鼠标按下时触发 | `(ev: MouseEvent)` |
| mouseup     | 鼠标抬起时触发 | `(ev: MouseEvent)` |
| dblclick    | 双击时触发     | `(ev: MouseEvent)` |
| contextmenu | 右键时触发     | `(ev: MouseEvent)` |

### Button Slots

| 插槽名  | 描述       |
| ------- | ---------- |
| default | 按钮的内容 |
| icon    | 按钮的图标 |

### ButtonGroup Props

| 参数名   | 描述           | 类型                                                          | 默认值     |
| -------- | -------------- | ------------------------------------------------------------- | ---------- |
| type     | 按钮组的类型   | `'primary' \| 'secondary' \| 'dashed' \| 'outline' \| 'text'` | `-`        |
| status   | 按钮组的状态   | `'normal' \| 'success' \| 'warning' \| 'danger'`              | `'normal'` |
| size     | 按钮组的尺寸   | `'mini' \| 'small' \| 'medium' \| 'large'`                    | `'medium'` |
| disabled | 按钮组是否禁用 | `boolean`                                                     | `false`    |

### ButtonGroup Slots

| 插槽名  | 描述         |
| ------- | ------------ |
| default | 按钮组的内容 |
