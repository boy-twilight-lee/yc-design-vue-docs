## API

### Avatar Props

| 参数             | 说明                 | 类型                                       | 默认值       |
| ---------------- | -------------------- | ------------------------------------------ | ------------ |
| shape            | 头像形状             | `'square' \| 'round'`                      | -            |
| imageUrl         | 图片地址             | `string`                                   | -            |
| size             | 头像尺寸             | `number`                                   | -            |
| autoFixFontSize  | 是否自动调整字体大小 | `boolean`                                  | -            |
| triggerType      | 触发器类型           | `'mask' \| 'button'`                       | `'button'`   |
| triggerIconStyle | 触发器图标样式       | `CSSProperties`                            | `() => ({})` |
| objectFit        | 图片填充方式         | `'cover' \| 'contain' \| 'fill' \| 'none'` | `'cover'`    |

### AvatarGroup Props

| 参数                   | 说明                 | 类型                  | 默认值       |
| ---------------------- | -------------------- | --------------------- | ------------ |
| shape                  | 头像形状             | `'square' \| 'round'` | `'round'`    |
| size                   | 头像尺寸             | `number`              | `40`         |
| autoFixFontSize        | 是否自动调整字体大小 | `boolean`             | `true`       |
| maxCount               | 最大显示数量         | `number`              | `0`          |
| zIndexAscend           | 层级是否递增         | `boolean`             | `false`      |
| maxStyle               | 最大数量头像样式     | `CSSProperties`       | `() => ({})` |
| maxPopoverTriggerProps | 最大数量弹窗属性     | `TriggerProps`        | `() => ({})` |

### Avatar Events

| 事件名 | 说明               | 回调参数           |
| ------ | ------------------ | ------------------ |
| click  | 点击时触发         | `(ev: MouseEvent)` |
| error  | 图片加载失败时触发 | `(ev: Event)`      |
| load   | 图片加载成功时触发 | `(ev: Event)`      |

### Avatar Slots

| 插槽名       | 说明                     |
| ------------ | ------------------------ |
| default      | 头像内容（文字、图标等） |
| trigger-icon | 触发器图标               |

### AvatarGroup Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 头像列表 |
