## API

### result Props

<field-table :data="resultProps"/>

### result Slots

<field-table :data="resultSlots"/>

<script setup>
import { ref } from 'vue';

const resultProps = ref([
  {
    name: 'status',
    desc: '结果页显示的状态',
    type: '\'info\' | \'success\' | \'warning\' | \'error\' | \'403\' | \'404\' | \'500\' | null',
    value: '\'info\'',
  },
  {
    name: 'title',
    desc: '标题内容',
    type: 'string',
    value: '-',
  },
  {
    name: 'subtitle',
    desc: '子标题内容',
    type: 'string',
    value: '-',
  },
]);

const resultSlots = ref([
  {
    name: 'icon',
    desc: '图标',
    type: '-',
    value: '-',
  },
  {
    name: 'title',
    desc: '标题',
    type: '-',
    value: '-',
  },
  {
    name: 'subtitle',
    desc: '副标题',
    type: '-',
    value: '-',
  },
  {
    name: 'extra',
    desc: '操作区',
    type: '-',
    value: '2.8.0',
  },
  {
    name: 'default',
    desc: '默认插槽',
    type: '-',
    value: '2.8.0',
  },
]);
</script>
