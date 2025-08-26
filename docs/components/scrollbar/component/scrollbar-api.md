## API

### scrollbar Props

<field-table :data="scrollbarProps"/>

### scrollbar Emits

<field-table :data="scrollbarEmits" type="emits"/>

### scrollbar Method

<field-table :data="scrollbarMethod" type="expose"/>

<script setup>
import { ref } from 'vue';

const scrollbarProps = ref([
  {
    name: 'type',
    desc: '类型',
    type: '\'track\' | \'embed\'',
    value: '\'embed\'',
  },
  {
    name: 'outer-class',
    desc: '外层的类名',
    type: 'string|object|array',
    value: '-',
  },
  {
    name: 'outer-style',
    desc: '外层的样式',
    type: 'StyleValue',
    value: '-',
  },
]);

const scrollbarEmits = ref([
  {
    name: 'scroll',
    desc: '滚动时触发',
    type: '-',
    value: '-',
  },
]);

const scrollbarMethod = ref([
  {
    name: 'scrollTo',
    desc: '滚动',
    type: 'options: number | {left?: number;top?: number}',
    value: 'y: number',
  },
  {
    name: 'scrollTop',
    desc: '纵向滚动',
    type: 'top: number',
    value: '- (2.40.0)',
  },
  {
    name: 'scrollLeft',
    desc: '横向滚动',
    type: 'left: number',
    value: '- (2.40.0)',
  },
]);
</script>
