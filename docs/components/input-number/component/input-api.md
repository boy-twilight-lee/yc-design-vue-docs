## API

### InputNumber Props

| 参数名               | 描述                | 类型                                       | 默认值      |
| -------------------- | ------------------- | ------------------------------------------ | ----------- |
| modelValue (v-model) | 绑定值              | `number \| string`                         | `-`         |
| default-value        | 默认值              | `number \| string`                         | `-`         |
| mode                 | 步进器模式          | `'embed' \| 'button'`                      | `'embed'`   |
| precision            | 数值精度            | `number`                                   | `-`         |
| step                 | 数字变化步长        | `number`                                   | `1`         |
| min                  | 最小值              | `number`                                   | `-Infinity` |
| max                  | 最大值              | `number`                                   | `Infinity`  |
| disabled             | 是否禁用            | `boolean`                                  | `false`     |
| readonly             | 是否只读            | `boolean`                                  | `false`     |
| error                | 是否为错误状态      | `boolean`                                  | `false`     |
| size                 | 尺寸                | `'mini' \| 'small' \| 'medium' \| 'large'` | `'medium'`  |
| placeholder          | 输入框占位文本      | `string`                                   | `-`         |
| hide-button          | 是否隐藏步进按钮    | `boolean`                                  | `false`     |
| allow-clear          | 是否允许清空        | `boolean`                                  | `false`     |
| formatter            | 格式化函数          | `(value: string) => string`                | `-`         |
| parser               | 解析函数            | `(value: string) => string`                | `-`         |
| model-event          | 触发 v-model 的事件 | `'change' \| 'input'`                      | `'change'`  |

### InputNumber Events

| 事件名      | 描述                               | 参数                                   |
| ----------- | ---------------------------------- | -------------------------------------- |
| input       | 输入框内容变化时触发               | `(value: number \| string, ev: Event)` |
| change      | 仅在输入框失去焦点或按下回车时触发 | `(value: number \| string, ev: Event)` |
| focus       | 获得焦点时触发                     | `(ev: FocusEvent)`                     |
| blur        | 失去焦点时触发                     | `(ev: FocusEvent)`                     |
| clear       | 点击清除按钮时触发                 | `(ev: MouseEvent)`                     |
| keydown     | 键盘按下时触发                     | `(ev: KeyboardEvent)`                  |
| press-enter | 按下回车键时触发                   | `(ev: KeyboardEvent)`                  |

### InputNumber Slots

| 插槽名  | 描述           |
| ------- | -------------- |
| plus    | 自定义加号按钮 |
| minus   | 自定义减号按钮 |
| prefix  | 前缀内容       |
| suffix  | 后缀内容       |
| prepend | 前置内容       |
| append  | 后置内容       |
| label   | 标签内容       |

### InputNumber Methods

| 方法名 | 描述             | 参数 |
| ------ | ---------------- | ---- |
| focus  | 使输入框获得焦点 | `-`  |
| blur   | 使输入框失去焦点 | `-`  |
