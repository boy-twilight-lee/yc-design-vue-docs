## API

### calendar Props

<field-table :data="calendarProps"/>

### calendar Events

<field-table :data="calendarEvents" type="emits" />

### calendar Slots

<field-table :data="calendarSlots" type="slots"/>

<script setup>
import { ref } from 'vue';
const calendarProps = ref([
  {
    name: 'model-value (v-model)',
    desc: '绑定值',
    type: 'date',
    value: '-',
  },
  {
    name: 'default-value',
    desc: '默认值（非受控状态）',
    type: 'date',
    value: '-',
  },
  {
    name: 'mode',
    desc: '模式',
    type: "'month' | 'year'",
    value: '-',
  },
  {
    name: 'default-mode',
    desc: '默认模式',
    type: "'month' | 'year'",
    value: "'month'",
  },
  {
    name: 'modes',
    desc: '显示的模式',
    type: "('month' | 'year')[]",
    value: "['month', 'year']",
  },
]);

const calendarEvents = ref([
  {
    name: 'change',
    desc: '选择的日期改变时触发',
    type: 'date: Date',
  },
  {
    name: 'panel-change',
    desc: '日期面板改变时触发',
    type: 'date: Date',
  },
]);

const calendarSlots = ref([
  {
    name: 'header',
    desc: '自定义头部内容',
    type: 'year: number, month: number',
    version: '2.53.0',
  },
  {
    name: 'default',
    desc: '自定义单元格内容',
    type: 'year: number, month: number, date: number',
    version: '2.53.0',
  },
]);
</script>
