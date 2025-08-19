## API

### List Props

| 参数             | 说明           | 类型               | 默认值     |
| ---------------- | -------------- | ------------------ | ---------- |
| data             | 列表数据       | `ObjectData[]`     | `[]`       |
| size             | 列表尺寸       | `ListSize`         | `'medium'` |
| bordered         | 是否有边框     | `boolean`          | `true`     |
| split            | 是否有分割线   | `boolean`          | `true`     |
| loading          | 是否加载中     | `boolean`          | `false`    |
| hoverable        | 是否可悬停     | `boolean`          | `false`    |
| paginationProps  | 分页属性       | `PaginationProps`  | -          |
| gridProps        | 栅格属性       | `GridProps`        | -          |
| maxHeight        | 最大高度       | `number \| string` | -          |
| bottomOffset     | 底部偏移       | `number`           | -          |
| virtualListProps | 虚拟列表属性   | `VirtualListProps` | -          |
| scrollbar        | 是否显示滚动条 | `boolean`          | `false`    |

### ListItem Props

| 参数         | 说明         | 类型        | 默认值 |
| ------------ | ------------ | ----------- | ------ |
| actionLayout | 操作区域布局 | `Direction` | -      |

### Events

| 事件名           | 说明               | 回调参数          |
| ---------------- | ------------------ | ----------------- |
| scroll           | 滚动时触发         | `(ev: Event)`     |
| reach-bottom     | 到达底部时触发     | `(ev: Event)`     |
| page-change      | 页码变化时触发     | `(value: number)` |
| page-size-change | 每页条数变化时触发 | `(value: number)` |

### Slots

| 插槽名         | 说明           | 参数                                  |
| -------------- | -------------- | ------------------------------------- |
| default        | 列表内容       | -                                     |
| empty          | 空状态         | -                                     |
| header         | 列表头部       | -                                     |
| footer         | 列表底部       | -                                     |
| item           | 列表项         | `{ index: number, item: ObjectData }` |
| scroll-loading | 滚动加载状态   | -                                     |
| meta           | 列表项元数据   | -                                     |
| extra          | 列表项额外内容 | -                                     |
| actions        | 列表项操作区域 | -                                     |
| avatar         | 头像           | -                                     |
| title          | 标题           | -                                     |
| description    | 描述           | -                                     |
