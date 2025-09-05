## API

### config-provider Props

<field-table :data="configProviderProps"/>

<script setup>
import { ref } from 'vue';
const configProviderProps = ref([
  {
    name: 'locale',
    desc: '配置语言包',
    type: 'Record<string,any>',
    value: '1001',
  },
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
  },
  {
    name: 'update-at-scroll',
    desc: '是否在容器滚动时更新弹出框的位置',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'scroll-to-close',
    desc: '是否在滚动时关闭弹出框',
    type: 'boolean',
    value: '`false`',
  },
]);
</script>
