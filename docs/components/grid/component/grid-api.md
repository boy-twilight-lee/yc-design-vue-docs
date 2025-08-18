## API

### Grid Props

| 参数          | 说明     | 类型                        | 默认值  |
| ------------- | -------- | --------------------------- | ------- |
| cols          | 栅格列数 | `number \| ResponsiveValue` | `24`    |
| rowGap        | 行间距   | `number \| ResponsiveValue` | `0`     |
| colGap        | 列间距   | `number \| ResponsiveValue` | `0`     |
| collapsed     | 是否折叠 | `boolean`                   | `false` |
| collapsedRows | 折叠行数 | `number`                    | `1`     |

### GridItem Props

| 参数   | 说明         | 类型                        | 默认值 |
| ------ | ------------ | --------------------------- | ------ |
| span   | 栅格项跨度   | `number \| ResponsiveValue` | -      |
| offset | 栅格项偏移量 | `number \| ResponsiveValue` | -      |
| suffix | 是否为后缀   | `boolean`                   | -      |

### GridRow Props

| 参数    | 说明          | 类型                         | 默认值 |
| ------- | ------------- | ---------------------------- | ------ |
| gutter  | 栅格间距      | `Gutter \| [Gutter, Gutter]` | -      |
| justify | 水平对齐方式  | `GridRowJustify`             | -      |
| align   | 垂直对齐方式  | `GridRowAlign`               | -      |
| div     | 是否渲染为div | `boolean`                    | -      |
| wrap    | 是否换行      | `boolean`                    | -      |

### GridCol Props

| 参数   | 说明         | 类型                             | 默认值 |
| ------ | ------------ | -------------------------------- | ------ |
| span   | 栅格列跨度   | `number \| ResponsiveValue`      | -      |
| offset | 栅格列偏移量 | `number \| ResponsiveValue`      | -      |
| order  | 栅格列顺序   | `number \| ResponsiveValue`      | -      |
| flex   | 栅格列弹性   | `GridColFlex \| ResponsiveValue` | -      |
