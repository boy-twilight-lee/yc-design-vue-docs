### 布局示例

当<yc-tag>span</yc-tag>所占列数大于<yc-tag>column</yc-tag>可放置的数据个数时，<yc-tag>span</yc-tag>会被设置为 <yc-tag>column</yc-tag> 的值，当行剩余列数不够放置下一列时将自动换行，每行末尾列会自动填充剩余量。

<div class="cell-demo vp-raw">
  <yc-form
    :model="form"
    auto-label-width>
    <yc-form-item label="size">
      <yc-radio-group
        v-model="form.size"
        type="button"
        :options="sizeOptions" />
    </yc-form-item>
    <yc-form-item label="layout">
      <yc-radio-group
        v-model="form.layout"
        type="button"
        :options="layoutOptions" />
    </yc-form-item>
    <yc-form-item label="table-layout">
      <yc-radio-group
        v-model="form.tableLayout"
        type="button"
        :options="['auto', 'fixed']" />
    </yc-form-item>
    <yc-form-item label="column">
      <yc-radio-group
        v-model="form.column"
        type="button"
        :options="columnOptions" />
    </yc-form-item>
    <yc-form-item label="firstSpan">
      <yc-radio-group
        v-model="form.firstSpan"
        type="button"
        :options="firstSpanOptions" />
    </yc-form-item>
  </yc-form>
  <div style="margin-top: 20px">
    <yc-descriptions
      title="Layout Example"
      :size="form.size"
      :column="form.column"
      :layout="form.layout"
      :table-layout="form.tableLayout"
      bordered>
      <yc-descriptions-item
        label="Item1"
        :span="form.firstSpan">
        <div>
          Span：{{ form.firstSpan }}
          <span
            v-if="form.firstSpan > form.column"
            style="color: red;">
            Exceeds Column, set to Column size
          </span>
        </div>
      </yc-descriptions-item>
      <yc-descriptions-item
        label="Item2"
        :span="2"
        >Span：2</yc-descriptions-item
      >
      <yc-descriptions-item
        label="Item3"
        :span="3"
        >Span：3</yc-descriptions-item
      >
      <yc-descriptions-item
        label="Item4"
        :span="2"
        >Span：2</yc-descriptions-item
      >
      <yc-descriptions-item
        label="Item5"
        :span="1"
        >Span：1</yc-descriptions-item
      >
      <yc-descriptions-item
        label="Item6"
        :span="1"
        >Span：1</yc-descriptions-item
      >
    </yc-descriptions>
  </div>
</div>

<script setup>
import { reactive } from 'vue';
import { Form as YcForm, FormItem as YcFormItem } from '@arco-design/web-vue';
const form = reactive({
  size: 'medium',
  layout: 'horizontal',
  column: 4,
  tableLayout: 'auto',
  firstSpan: 2,
});
const layoutOptions = [
  'horizontal',
  'inline-horizontal',
  'vertical',
  'inline-vertical',
];
const columnOptions = [1, 2, 3, 4, 5];
const firstSpanOptions = [1, 2, 3, 4, 5];
const sizeOptions = ['mini', 'small', 'medium', 'large'];
</script>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-form
    :model="form"
    auto-label-width>
    <yc-form-item label="size">
      <yc-radio-group
        v-model="form.size"
        type="button"
        :options="sizeOptions" />
    </yc-form-item>

    <yc-form-item label="layout">
      <yc-radio-group
        v-model="form.layout"
        type="button"
        :options="layoutOptions" />
    </yc-form-item>

    <yc-form-item label="table-layout">
      <yc-radio-group
        v-model="form.tableLayout"
        type="button"
        :options="['auto', 'fixed']" />
    </yc-form-item>

    <yc-form-item label="column">
      <yc-radio-group
        v-model="form.column"
        type="button"
        :options="columnOptions" />
    </yc-form-item>

    <yc-form-item label="firstSpan">
      <yc-radio-group
        v-model="form.firstSpan"
        type="button"
        :options="firstSpanOptions" />
    </yc-form-item>
  </yc-form>
  <div style="margin-top: 20px">
    <yc-descriptions
      title="Layout Example"
      :size="form.size"
      :column="form.column"
      :layout="form.layout"
      :table-layout="form.tableLayout"
      bordered>
      <yc-descriptions-item
        label="Item1"
        :span="form.firstSpan">
        <div>
          Span：{{ form.firstSpan }}
          <span
            v-if="form.firstSpan > form.column"
            style="color: red;">
            Exceeds Column, set to Column size
          </span>
        </div>
      </yc-descriptions-item>
      <yc-descriptions-item
        label="Item2"
        :span="2"
        >Span：2</yc-descriptions-item
      >
      <yc-descriptions-item
        label="Item3"
        :span="3"
        >Span：3</yc-descriptions-item
      >
      <yc-descriptions-item
        label="Item4"
        :span="2"
        >Span：2</yc-descriptions-item
      >
      <yc-descriptions-item
        label="Item5"
        :span="1"
        >Span：1</yc-descriptions-item
      >
      <yc-descriptions-item
        label="Item6"
        :span="1"
        >Span：1</yc-descriptions-item
      >
    </yc-descriptions>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Form as YcForm, FormItem as YcFormItem } from '@arco-design/web-vue';
const form = reactive({
  size: 'medium',
  layout: 'horizontal',
  column: 4,
  tableLayout: 'auto',
  firstSpan: 2,
});
const layoutOptions = [
  'horizontal',
  'inline-horizontal',
  'vertical',
  'inline-vertical',
];
const columnOptions = [1, 2, 3, 4, 5];
const firstSpanOptions = [1, 2, 3, 4, 5];
const sizeOptions = ['mini', 'small', 'medium', 'large'];
</script>
```

</details>
