<template>
  <a-table
    :columns="computedColumns"
    :data="data"
    :pagination="false"
    style="width: 100%; margin-top: 20px"
    class="vp-raw">
  </a-table>
</template>

<script setup>
import { computed } from 'vue';
import { Table as ATable } from '@arco-design/web-vue';
const props = defineProps({
  /**
   * 表格数据
   */
  data: {
    type: Array,
    required: true,
  },
  showDefaultValue: {
    type: Boolean,
    default: true,
  },
  header: {
    type: String,
    default: '参数名',
  },
});

// 动态计算最终显示的列
const computedColumns = computed(() => {
  const baseColumns = [
    {
      title: props.header,
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
  ];
  const defaultValueColumn = {
    title: '默认值',
    dataIndex: 'value',
    width: 100,
  };
  if (props.showDefaultValue) {
    return [...baseColumns, defaultValueColumn];
  }
  return baseColumns;
});
</script>
