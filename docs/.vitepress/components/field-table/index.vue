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
import { computed, toRefs } from 'vue';
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
const { type } = toRefs(props);
// 动态计算最终显示的列
const columns = computed(() => {
  const nameMap = {
    props: '参数名',
    emits: '事件名',
    methods: '方法名',
    slots: '插槽名',
    format: '格式',
    langs: '语言',
  };
  const typeMap = {
    props: '类型',
    format: '输出',
  };
  return [
    {
      title: nameMap[type.value],
      dataIndex: 'name',
      width: type.value == 'langs' ? 600 : 180,
    },
    {
      title: type.value == 'langs' ? '地区编码' : '描述',
      dataIndex: 'desc',
    },
    type.value != 'langs'
      ? {
          title: typeMap[type.value] ?? '参数',
          dataIndex: 'type',
          width: ['emits', 'methods', 'slots'].includes(props.type) ? 450 : 250,
        }
      : null,
    type.value == 'props'
      ? {
          title: '默认值',
          dataIndex: 'value',
          width: 150,
        }
      : null,
  ].filter((v) => v);
});
</script>
