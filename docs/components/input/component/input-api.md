## API

### Input Props

| 参数名                | 描述             | 类型                                                            | 默认值     |
| --------------------- | ---------------- | --------------------------------------------------------------- | ---------- |
| model-value / v-model | 绑定值           | `string \| number`                                              | `-`        |
| type                  | 输入框类型       | `'text' \| 'password' \| 'number' \| 'email' \| 'url' \| 'tel'` | `'text'`   |
| size                  | 输入框尺寸       | `'mini' \| 'small' \| 'medium' \| 'large'`                      | `'medium'` |
| status                | 输入框状态       | `'normal' \| 'success' \| 'warning' \| 'error'`                 | `'normal'` |
| placeholder           | 输入框占位符     | `string`                                                        | `-`        |
| disabled              | 是否禁用         | `boolean`                                                       | `false`    |
| readonly              | 是否只读         | `boolean`                                                       | `false`    |
| clearable             | 是否可清空       | `boolean`                                                       | `false`    |
| allow-clear           | 是否允许清空     | `boolean`                                                       | `false`    |
| max-length            | 最大输入长度     | `number`                                                        | `-`        |
| show-word-limit       | 是否显示字数统计 | `boolean`                                                       | `false`    |
| auto-size             | 自适应内容高度   | `boolean \| { minRows: number; maxRows: number }`               | `false`    |

### Input Events

| 事件名  | 描述           | 参数                                   |
| ------- | -------------- | -------------------------------------- |
| input   | 输入时触发     | `(value: string \| number, ev: Event)` |
| change  | 值改变时触发   | `(value: string \| number)`            |
| focus   | 获得焦点时触发 | `(ev: FocusEvent)`                     |
| blur    | 失去焦点时触发 | `(ev: FocusEvent)`                     |
| clear   | 清空时触发     | `-`                                    |
| keydown | 按下键盘时触发 | `(ev: KeyboardEvent)`                  |
| keyup   | 松开键盘时触发 | `(ev: KeyboardEvent)`                  |
| enter   | 按下回车时触发 | `(ev: KeyboardEvent)`                  |

### Input Slots

| 插槽名  | 描述         |
| ------- | ------------ |
| default | 输入框的内容 |
| prefix  | 输入框前缀   |
| suffix  | 输入框后缀   |

### InputSearch Props

| 参数名        | 描述                     | 类型      | 默认值   |
| ------------- | ------------------------ | --------- | -------- |
| search-button | 是否显示搜索按钮         | `boolean` | `false`  |
| loading       | 搜索按钮是否处于加载状态 | `boolean` | `false`  |
| button-text   | 搜索按钮文字             | `string`  | `'搜索'` |

### InputSearch Events

| 事件名 | 描述               | 参数                        |
| ------ | ------------------ | --------------------------- |
| search | 点击搜索按钮时触发 | `(value: string \| number)` |

### InputNumber Props

| 参数名                | 描述           | 类型                        | 默认值      |
| --------------------- | -------------- | --------------------------- | ----------- |
| model-value / v-model | 绑定值         | `number`                    | `-`         |
| min                   | 最小值         | `number`                    | `-Infinity` |
| max                   | 最大值         | `number`                    | `Infinity`  |
| step                  | 步长           | `number`                    | `1`         |
| precision             | 精度           | `number`                    | `-`         |
| hide-button           | 是否隐藏步进器 | `boolean`                   | `false`     |
| formatter             | 格式化函数     | `(value: number) => string` | `-`         |
| parser                | 解析函数       | `(value: string) => number` | `-`         |

### InputNumber Events

| 事件名 | 描述           | 参数               |
| ------ | -------------- | ------------------ |
| change | 值改变时触发   | `(value: number)`  |
| blur   | 失去焦点时触发 | `(ev: FocusEvent)` |
| focus  | 获得焦点时触发 | `(ev: FocusEvent)` |

### InputTag Props

| 参数名                | 描述             | 类型                                                 | 默认值  |
| --------------------- | ---------------- | ---------------------------------------------------- | ------- |
| model-value / v-model | 绑定值           | `string[]`                                           | `[]`    |
| placeholder           | 占位符           | `string`                                             | `-`     |
| max-tag-count         | 最大标签数量     | `number`                                             | `-`     |
| allow-duplicates      | 是否允许重复标签 | `boolean`                                            | `false` |
| validate-tag          | 标签验证函数     | `(tag: string, tags: string[]) => boolean \| string` | `-`     |

### InputTag Events

| 事件名 | 描述           | 参数                           |
| ------ | -------------- | ------------------------------ |
| change | 标签改变时触发 | `(tags: string[])`             |
| remove | 移除标签时触发 | `(tag: string, index: number)` |
| add    | 添加标签时触发 | `(tag: string)`                |
