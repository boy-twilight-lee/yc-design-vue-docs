## API

### Textarea Props

| 参数          | 说明             | 类型        | 默认值  |
| ------------- | ---------------- | ----------- | ------- |
| modelValue    | 绑定值           | `string`    | -       |
| defaultValue  | 默认值           | `string`    | -       |
| placeholder   | 占位符           | `string`    | -       |
| disabled      | 是否禁用         | `boolean`   | `false` |
| error         | 是否错误状态     | `boolean`   | `false` |
| maxLength     | 最大长度         | `MaxLength` | -       |
| showWordLimit | 是否显示字数限制 | `boolean`   | `false` |
| allowClear    | 是否允许清除     | `boolean`   | `false` |
| readonly      | 是否只读         | `boolean`   | `false` |
| autoSize      | 自动调整大小     | `AutoSize`  | `false` |

### Events

| 事件名            | 说明             | 回调参数                     |
| ----------------- | ---------------- | ---------------------------- |
| update:modelValue | 绑定值变化时触发 | `(value: string)`            |
| input             | 输入时触发       | `(value: string, ev: Event)` |
| change            | 值变化时触发     | `(value: string, ev: Event)` |
| clear             | 清除时触发       | `(ev: MouseEvent)`           |
| focus             | 获得焦点时触发   | `(ev: FocusEvent)`           |
| blur              | 失去焦点时触发   | `(ev: FocusEvent)`           |

### AutoSize

| 类型                                     | 说明                 |
| ---------------------------------------- | -------------------- |
| `boolean`                                | 是否启用自动调整大小 |
| `{ minRows?: number; maxRows?: number }` | 自定义行数范围       |
