## API

### Card Props

| 参数        | 说明             | 类型            | 默认值  |
| ----------- | ---------------- | --------------- | ------- |
| bordered    | 是否有边框       | `boolean`       | `true`  |
| loading     | 是否显示加载状态 | `boolean`       | `false` |
| hoverable   | 是否可悬停       | `boolean`       | `false` |
| size        | 卡片尺寸         | `CardSize`      | -       |
| headerStyle | 头部样式         | `CSSProperties` | `{}`    |
| bodyStyle   | 内容区域样式     | `CSSProperties` | `{}`    |
| title       | 卡片标题         | `string`        | `''`    |
| extra       | 额外操作区域     | `string`        | `''`    |

### CardMeta Props

| 参数        | 说明 | 类型     | 默认值 |
| ----------- | ---- | -------- | ------ |
| title       | 标题 | `string` | -      |
| description | 描述 | `string` | -      |

### CardGrid Props

| 参数      | 说明       | 类型      | 默认值 |
| --------- | ---------- | --------- | ------ |
| hoverable | 是否可悬停 | `boolean` | -      |

### Slots

| 插槽名  | 说明         |
| ------- | ------------ |
| actions | 卡片操作区域 |
| cover   | 卡片封面     |
| extra   | 额外操作区域 |
| title   | 卡片标题     |
| default | 卡片内容     |
