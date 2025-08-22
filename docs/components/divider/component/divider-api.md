## API

### divider Props

<field-table :data="dividerProps"/>

### divider slots

<field-table :data="dividerSlots"/>

<script setup>
import { ref } from 'vue';
const dividerProps = ref([
  {
    name: 'direction',
    desc: '分割线的方向，是水平还是竖直',
    type: "'horizontal' | 'vertical'",
    value: "`'horizontal'`",
  },
  {
    name: 'orientation',
    desc: '分割线文字的位置',
    type: "'left' | 'center' | 'right'",
    value: "`'center'`",
  },
  {
    name: 'type',
    desc: '分割线样式类型',
    type: "'solid' | 'dashed' | 'dotted' | 'double'",
    value: '-',
  },
  {
    name: 'size',
    desc: '分割线宽度/高度 ',
    type: 'number',
    value: '-',
  },
  {
    name: 'margin',
    desc: '分割线上下 margin (垂直方向时为左右 margin)',
    type: 'number | string',
    value: '-',
  },
]);
const dividerSlots = ref([  {
    name: 'default',
    desc: '分割线内容（垂直情况不生效）',
    type: "-",
    value: "",
  },])
</script>
