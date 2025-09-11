<template>
  <a-table
    :columns="columns"
    :data="data"
    :pagination="false"
    style="width: 100%; margin-top: 20px"
    class="vp-raw">
    <template #columns>
      <a-table-column
        v-for="v in columns"
        :key="v.dataIndex"
        v-bind="v">
        <template #cell="{ record }">
          <span
            v-html="parse(record, v.dataIndex)"
            style="white-space: pre-wrap"
            @click="handleClick(record)"></span>
        </template>
      </a-table-column>
    </template>
  </a-table>
</template>

<script setup>
import { computed, toRefs } from 'vue';
import { useRouter } from 'vitepress';
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
const router = useRouter();
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
// 获取style
const getStyleStr = (style) => {
  return Object.entries(style)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
};
// 获取解析的html
const parse = (data, field) => {
  const dataValue = data[field];
  if (dataValue == '-') return '-';
  if (
    ['emits', 'methods', 'slots', 'props'].includes(type.value) &&
    ['type', 'value'].includes(field)
  ) {
    const styleStr = getStyleStr({
      color: 'rgb(var(--primary-6))',
      'text-decoration': data.href ? 'underline' : 'none',
      cursor: data.href ? 'pointer' : '',
    });
    return ['emits', 'methods', 'slots'].includes(type.value) && field == 'type'
      ? dataValue
          .split(',')
          .map((v) => {
            const [key, value] = v.split(': ');
            return `${key}：<i style="${styleStr}">${value}</i>`;
          })
          .join(',')
      : `<i style="${styleStr}">${dataValue}</i>`;
  }
  return dataValue;
};
// 处理点击
const handleClick = (record) => {
  if (!record.href) return;
  router.go(record.href);
};
</script>
