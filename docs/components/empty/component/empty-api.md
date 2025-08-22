## API

### empty Props

<field-table :data="emptyProps"/>

### empty Slots

<field-table :data="emptySlots" type="slots"/>

<script setup>
import { ref } from 'vue';

const emptyProps = ref([
  {
    name: 'description',
    desc: '描述内容',
    type: 'string',
    value: '-',
    version: '',
  },
  {
    name: 'img-src',
    desc: '自定义图片的地址',
    type: 'string',
    value: '-',
    version: '',
  },
  {
    name: 'in-config-provider',
    desc: '是否在 ConfigProvider 中使用',
    type: 'boolean',
    value: 'false',
    version: '2.47.0',
  },
]);

const emptySlots = ref([
  {
    name: 'image',
    desc: '图片/图标',
  },
]);

</script>
