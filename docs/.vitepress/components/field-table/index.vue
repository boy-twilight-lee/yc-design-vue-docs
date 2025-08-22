<template>
  <a-table
    :columns="columns"
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
  data: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    default: 'props',
  },
});
// 动态计算最终显示的列
const columns = computed(() => {
  const nameMap = {
    props: '参数名',
    emits: '事件名',
    expose: '方法名',
    slots: '插槽名',
  };
  return [
    {
      title: nameMap[props.type],
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: props.type == 'props' ? '类型' : '参数',
      dataIndex: 'type',
      width: 200,
    },
    props.type == 'props'
      ? {
          title: '默认值',
          dataIndex: 'value',
          width: 150,
        }
      : null,
  ].filter((v) => v);
});
</script>
