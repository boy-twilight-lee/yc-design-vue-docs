## API

### config-provider Props

<field-table :data="configProviderProps"/>

### config-provider Slots

<field-table type="slots" :data="configProviderSlots"/>

<script setup>
import { ref } from 'vue';

const configProviderProps = ref([
  {
    name: 'zIndex',
    desc: 'teleport传出组件的层级',
    type: 'number',
    value: '1001',
  },
  {
    name: 'popupContainer',
    desc: 'teleport传出组件挂载的容器',
    type: 'string | HTMLElement',
    value: 'body',
  },
  {
    name: 'size',
    desc: '大小',
    type: 'Size',
    value: '-',
    version: '2.14.0',
  },
  {
    name: 'update-at-scroll',
    desc: '是否在容器滚动时更新弹出框的位置',
    type: 'boolean',
    value: '`false`',
    version: '2.25.0',
  },
  {
    name: 'scroll-to-close',
    desc: '是否在滚动时关闭弹出框',
    type: 'boolean',
    value: '`false`',
    version: '2.46.0',
  },
  {
    name: 'exchange-time',
    desc: '是否交换时间',
    type: 'boolean',
    value: '`true`',
    version: '2.48.0',
  },
]);

const configProviderSlots = ref([
  {
    name: 'loading',
    desc: '自定义加载中元素',
    params: '-',
    version: '2.28.0',
  },
  {
    name: 'empty',
    desc: '自定义空状态元素',
    params: 'component: string',
    version: '2.28.0',
  },
]);


</script>
