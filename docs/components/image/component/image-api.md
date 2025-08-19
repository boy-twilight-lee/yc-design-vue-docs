## API

### Image Props

| 参数名                  | 描述                 | 类型                                                       | 默认值    |
| ----------------------- | -------------------- | ---------------------------------------------------------- | --------- |
| src                     | 图片地址             | `string`                                                   | `-`       |
| width                   | 图片宽度             | `number \| string`                                         | `-`       |
| height                  | 图片高度             | `number \| string`                                         | `-`       |
| title                   | 图片标题             | `string`                                                   | `-`       |
| description             | 图片描述             | `string`                                                   | `-`       |
| fit                     | 图片填充模式         | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `-`       |
| alt                     | 图片的替代文字       | `string`                                                   | `-`       |
| hide-footer             | 是否隐藏底部信息     | `boolean \| 'never'`                                       | `false`   |
| footer-position         | 底部信息位置         | `'inner' \| 'outer'`                                       | `'inner'` |
| show-loader             | 是否显示加载状态     | `boolean`                                                  | `true`    |
| preview                 | 是否开启预览         | `boolean`                                                  | `false`   |
| preview-visible         | 预览是否可见（受控） | `boolean`                                                  | `-`       |
| default-preview-visible | 预览默认是否可见     | `boolean`                                                  | `false`   |
| preview-props           | 预览的配置项         | `ImagePreviewProps`                                        | `-`       |

### Image Events

| 事件名                 | 描述                   | 参数                 |
| ---------------------- | ---------------------- | -------------------- |
| preview-visible-change | 预览显示状态改变时触发 | `(visible: boolean)` |

### Image Slots

| 插槽名          | 描述             |
| --------------- | ---------------- |
| error           | 自定义错误状态   |
| error-icon      | 自定义错误图标   |
| loader          | 自定义加载状态   |
| extra           | 自定义额外内容   |
| preview-actions | 自定义预览操作栏 |

### ImagePreviewGroup Props

| 参数名          | 描述               | 类型       | 默认值                                                                             |
| --------------- | ------------------ | ---------- | ---------------------------------------------------------------------------------- |
| src-list        | 图片地址列表       | `string[]` | `-`                                                                                |
| current         | 当前显示的图片索引 | `number`   | `-`                                                                                |
| default-current | 默认显示的图片索引 | `number`   | `0`                                                                                |
| infinite        | 是否无限循环       | `boolean`  | `false`                                                                            |
| visible         | 预览是否可见       | `boolean`  | `-`                                                                                |
| default-visible | 预览默认是否可见   | `boolean`  | `false`                                                                            |
| mask-closable   | 点击蒙层是否关闭   | `boolean`  | `true`                                                                             |
| closable        | 是否显示关闭按钮   | `boolean`  | `true`                                                                             |
| actions-layout  | 操作栏布局         | `string[]` | `['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize']` |
| esc-to-close    | 按 ESC 键是否关闭  | `boolean`  | `true`                                                                             |

### ImagePreviewGroup Events

| 事件名         | 描述                   | 参数                 |
| -------------- | ---------------------- | -------------------- |
| change         | 切换图片时触发         | `(index: number)`    |
| visible-change | 预览显示状态改变时触发 | `(visible: boolean)` |

### ImagePreviewGroup Slots

| 插槽名  | 描述         |
| ------- | ------------ |
| actions | 自定义操作栏 |
| default | 图片内容     |
