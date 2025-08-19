## API

### Descriptions Props

| 参数        | 说明       | 类型                 | 默认值         |
| ----------- | ---------- | -------------------- | -------------- |
| data        | 描述数据   | `DescData[]`         | `[]`           |
| column      | 列数       | `DescriptionsColumn` | `3`            |
| title       | 标题       | `string`             | `''`           |
| layout      | 布局方式   | `DescriptionsLayout` | `'horizontal'` |
| align       | 对齐方式   | `DescriptionsAlign`  | `'left'`       |
| size        | 尺寸       | `Size`               | -              |
| bordered    | 是否有边框 | `boolean`            | `false`        |
| labelStyle  | 标签样式   | `CSSProperties`      | `{}`           |
| valueStyle  | 值样式     | `CSSProperties`      | `{}`           |
| tableLayout | 表格布局   | `TableLayout`        | `'auto'`       |

### DescriptionsItem Props

| 参数  | 说明   | 类型     | 默认值 |
| ----- | ------ | -------- | ------ |
| span  | 跨列数 | `number` | `1`    |
| label | 标签   | `string` | -      |

### Slots

| 插槽名  | 说明       | 参数                                               |
| ------- | ---------- | -------------------------------------------------- |
| default | 描述项内容 | -                                                  |
| value   | 自定义值   | `{ value: string, index: number, data: DescData }` |
| label   | 自定义标签 | `{ label: string, index: number, data: DescData }` |
| title   | 自定义标题 | -                                                  |
