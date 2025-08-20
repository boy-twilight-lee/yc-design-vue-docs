## API

### Props

| 参数             | 说明             | 类型                                                        | 默认值       |
| ---------------- | ---------------- | ----------------------------------------------------------- | ------------ |
| modelValue       | 绑定值           | `string`                                                    | -            |
| defaultValue     | 默认值           | `string`                                                    | `''`         |
| disabled         | 是否禁用         | `boolean`                                                   | `false`      |
| data             | 选项数据         | `SelectOptions`                                             | `() => []`   |
| popupContainer   | 弹出层容器       | `PopupContainer`                                            | -            |
| strict           | 是否严格模式     | `boolean`                                                   | `false`      |
| filterOption     | 自定义过滤函数   | `(inputValue: string, option: SelectOptionData) => boolean` | -            |
| triggerProps     | 触发器属性       | `TriggerProps`                                              | `() => ({})` |
| allowClear       | 是否允许清空     | `boolean`                                                   | `true`       |
| vistualListProps | 虚拟列表属性     | `VirtualListProps`                                          | -            |
| isSelectSetValue | 选择时是否设置值 | `boolean`                                                   | `true`       |
| isSearch         | 是否启用搜索     | `boolean`                                                   | `true`       |
| type             | 输入框类型       | `'textarea' \| 'input'`                                     | `'input'`    |

### Events

| 事件名                | 说明             | 回调参数                     |
| --------------------- | ---------------- | ---------------------------- |
| update:modelValue     | 值更新时触发     | `(value: string)`            |
| change                | 值改变时触发     | `(value: string)`            |
| search                | 搜索时触发       | `(value: string)`            |
| select                | 选择选项时触发   | `(value: string)`            |
| clear                 | 清空时触发       | `(ev?: Event)`               |
| dropdown-scroll       | 下拉框滚动时触发 | `(ev?: Event)`               |
| dropdown-reach-bottom | 下拉框触底时触发 | `(ev?: Event)`               |
| blur                  | 失去焦点时触发   | `(ev: FocusEvent)`           |
| focus                 | 获得焦点时触发   | `(ev: FocusEvent)`           |
| input                 | 输入时触发       | `(value: string, ev: Event)` |
| keydown               | 按键按下时触发   | `(ev: KeyboardEvent)`        |

### Slots

| 插槽名  | 说明           | 参数                   |
| ------- | -------------- | ---------------------- |
| option  | 自定义选项渲染 | `{ data: ObjectData }` |
| footer  | 底部内容       | -                      |
| trigger | 自定义触发器   | -                      |

### Expose

| 方法名         | 说明           | 参数                     |
| -------------- | -------------- | ------------------------ |
| focus          | 聚焦           | -                        |
| blur           | 失焦           | -                        |
| getInputRef    | 获取输入框引用 | -                        |
| getMirrorRef   | 获取镜像引用   | -                        |
| updatePosition | 更新位置       | `(x: number, y: number)` |
