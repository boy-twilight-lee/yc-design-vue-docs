## API

### Tag Props

| 参数           | 说明           | 类型      | 默认值     |
| -------------- | -------------- | --------- | ---------- |
| color          | 标签颜色       | `string`  | -          |
| size           | 标签尺寸       | `TagSize` | `'medium'` |
| bordered       | 是否有边框     | `boolean` | `true`     |
| visible        | 是否可见       | `boolean` | -          |
| defaultVisible | 默认是否可见   | `boolean` | `true`     |
| loading        | 是否加载中     | `boolean` | `false`    |
| closable       | 是否可关闭     | `boolean` | `false`    |
| checkable      | 是否可选择     | `boolean` | `false`    |
| checked        | 是否已选择     | `boolean` | -          |
| defaultChecked | 默认是否已选择 | `boolean` | `false`    |
| nowrap         | 是否不换行     | `boolean` | `false`    |

### Events

| 事件名         | 说明               | 回调参数                           |
| -------------- | ------------------ | ---------------------------------- |
| update:visible | 可见性变化时触发   | `(value: boolean)`                 |
| update:checked | 选择状态变化时触发 | `(value: boolean)`                 |
| close          | 关闭时触发         | `(ev: MouseEvent, value?: string)` |
| check          | 选择状态变化时触发 | `(value: boolean, ev: MouseEvent)` |

### Slots

| 插槽名     | 说明     | 参数 |
| ---------- | -------- | ---- |
| default    | 标签内容 | -    |
| icon       | 标签图标 | -    |
| close-icon | 关闭图标 | -    |

### TagSize

| 类型       | 说明     |
| ---------- | -------- |
| `'small'`  | 小尺寸   |
| `'medium'` | 中等尺寸 |
| `'large'`  | 大尺寸   |
