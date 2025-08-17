# Calendar 日历

日历组件。

---

### 基础用法

展示和选择日历

<div class="cell-demo">
  <yc-calendar v-model="value" style="width:100%;" />
  select: {{value}}
</div>

<script setup>
import { ref, reactive } from 'vue';
const value = ref(new Date('2023-01-01'));
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-calendar v-model="value" />
  select: {{ value }}
</template>

<script setup>
import { ref, reactive } from 'vue';
const value = ref(new Date('2023-01-01'));
</script>
```

</details>

## API

### Props

| 参数         | 说明             | 类型             | 默认值              |
| ------------ | ---------------- | ---------------- | ------------------- |
| modelValue   | 当前选中的日期   | `Date`           | -                   |
| defaultValue | 默认选中的日期   | `Date`           | `new Date()`        |
| mode         | 日历模式         | `CalendarMode`   | -                   |
| defaultMode  | 默认模式         | `CalendarMode`   | `'month'`           |
| modes        | 可切换的模式列表 | `CalendarMode[]` | `['month', 'year']` |

### Events

| 事件名            | 说明           | 回调参数               |
| ----------------- | -------------- | ---------------------- |
| update:modelValue | 日期变化时触发 | `(value: Date)`        |
| update:mode       | 模式变化时触发 | `(mode: CalendarMode)` |
| change            | 日期变化时触发 | `(value: Date)`        |
| panel-change      | 面板变化时触发 | `(value: Date)`        |

### Slots

| 插槽名  | 说明                 | 参数                                           |
| ------- | -------------------- | ---------------------------------------------- |
| header  | 自定义头部内容       | `{ year: number, month: number }`              |
| default | 自定义日期单元格内容 | `{ year: number, month: number, day: number }` |

## 注意事项

1. 组件使用 dayjs 库处理日期，确保项目中已安装
2. 日期单元格的点击事件通过插槽内容处理
3. 月视图和年视图的切换会影响日期选择的行为
4. 自定义头部和单元格内容时，注意保持布局的一致性
5. 组件会自动处理月份和年份的边界情况
