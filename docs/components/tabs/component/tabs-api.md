## API

### Tabs Props

| 参数             | 说明               | 类型         | 默认值         |
| ---------------- | ------------------ | ------------ | -------------- |
| activeKey        | 当前激活的标签页   | `TabKey`     | -              |
| defaultActiveKey | 默认激活的标签页   | `TabKey`     | -              |
| position         | 标签页位置         | `TabPositon` | `'top'`        |
| size             | 标签页尺寸         | `Size`       | `'medium'`     |
| type             | 标签页类型         | `TabType`    | `'line'`       |
| direction        | 标签页方向         | `Direction`  | `'horizontal'` |
| editable         | 是否可编辑         | `boolean`    | `false`        |
| showAddButton    | 是否显示添加按钮   | `boolean`    | `false`        |
| destoryOnHide    | 隐藏时是否销毁     | `boolean`    | `false`        |
| justify          | 是否两端对齐       | `boolean`    | `false`        |
| animation        | 是否启用动画       | `boolean`    | `true`         |
| headerPadding    | 是否启用头部内边距 | `boolean`    | `false`        |
| autoSwitch       | 是否自动切换       | `boolean`    | `false`        |
| hideContent      | 是否隐藏内容       | `boolean`    | `false`        |
| trigger          | 触发方式           | `TabTrigger` | `'click'`      |

### Events

| 事件名           | 说明                 | 回调参数          |
| ---------------- | -------------------- | ----------------- |
| update:activeKey | 激活标签页变化时触发 | `(value: TabKey)` |
| change           | 标签页变化时触发     | `(value: TabKey)` |
| tab-click        | 标签页点击时触发     | `(value: TabKey)` |
| add              | 添加标签页时触发     | -                 |
| delete           | 删除标签页时触发     | `(value: TabKey)` |

### Slots

| 插槽名  | 说明       | 参数 |
| ------- | ---------- | ---- |
| extra   | 额外操作   | -    |
| default | 标签页内容 | -    |

### TabPane Props

| 参数          | 说明           | 类型      | 默认值  |
| ------------- | -------------- | --------- | ------- |
| title         | 标签页标题     | `string`  | -       |
| path          | 标签页路径     | `TabKey`  | -       |
| disabled      | 是否禁用       | `boolean` | `false` |
| closable      | 是否可关闭     | `boolean` | `false` |
| destoryOnHide | 隐藏时是否销毁 | `boolean` | `false` |

### TabPane Slots

| 插槽名  | 说明       | 参数 |
| ------- | ---------- | ---- |
| default | 标签页内容 | -    |
| title   | 标签页标题 | -    |

### TabKey

| 类型               | 说明           |
| ------------------ | -------------- |
| `string \| number` | 标签页键值类型 |

### TabType

| 类型            | 说明         |
| --------------- | ------------ |
| `'line'`        | 线条类型     |
| `'card'`        | 卡片类型     |
| `'card-gutter'` | 卡片间隔类型 |
| `'text'`        | 文字类型     |
| `'rounded'`     | 圆角类型     |
| `'capsule'`     | 胶囊类型     |

### TabPositon

| 类型       | 说明 |
| ---------- | ---- |
| `'left'`   | 左侧 |
| `'right'`  | 右侧 |
| `'bottom'` | 底部 |
| `'top'`    | 顶部 |

### TabTrigger

| 类型      | 说明     |
| --------- | -------- |
| `'click'` | 点击触发 |
| `'hover'` | 悬停触发 |
