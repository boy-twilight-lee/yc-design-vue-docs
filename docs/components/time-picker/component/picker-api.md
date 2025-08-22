## API

### time-picker Props

<field-table :data="timePickerProps"/>

### time-picker Events

<field-table :data="timePickerEvents" type="emits" />

### time-picker Slots

<field-table :data="timePickerSlots" :showDefaultValue="false" type="slots"/>

<script setup>
import { ref } from 'vue';

const timePickerProps = ref([
  {
    name: 'type',
    desc: '选择器类型',
    type: "'time' | 'time-range'",
    value: "'time'",
  },
  {
    name: 'model-value (v-model)',
    desc: '绑定值',
    type: 'string | number | Date | Array<string | number | Date>',
    value: '-',
  },
  {
    name: 'default-value',
    desc: '默认值',
    type: 'string | number | Date | Array<string | number | Date>',
    value: '-',
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'allow-clear',
    desc: '是否允许清除',
    type: 'boolean',
    value: '`true`',
  },
  {
    name: 'readonly',
    desc: '是否为只读模式',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'error',
    desc: '是否为错误状态',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'format',
    desc: '展示日期的格式，参考字符串解析格式',
    type: 'string',
    value: "'HH:mm:ss'",
  },
  {
    name: 'placeholder',
    desc: '提示文案',
    type: 'string | string[]',
    value: '-',
  },
  {
    name: 'size',
    desc: '输入框尺寸',
    type: "'mini' | 'small' | 'medium' | 'large'",
    value: "'medium'",
  },
  {
    name: 'popup-container',
    desc: '弹出框的挂载容器',
    type: 'string | HTMLElement',
    value: '-',
  },
  {
    name: 'use12-hours',
    desc: '12 小时制',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'step',
    desc: '设置 时 / 分 / 秒 的选择间隔',
    type: '{ hour?: number; minute?: number; second?: number;}',
    value: '-',
  },
  {
    name: 'disabled-hours',
    desc: '禁用的部分小时选项',
    type: '() => number[]',
    value: '-',
  },
  {
    name: 'disabled-minutes',
    desc: '禁用的部分分钟选项',
    type: '(selectedHour?: number) => number[]',
    value: '-',
  },
  {
    name: 'disabled-seconds',
    desc: '禁用的部分秒数选项',
    type: '(selectedHour?: number, selectedMinute?: number) => number[]',
    value: '-',
  },
  {
    name: 'hide-disabled-options',
    desc: '隐藏禁止选择的选项',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'disable-confirm',
    desc: '禁用确认步骤，开启后直接点选时间不需要点击确认按钮',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'position',
    desc: '弹出的位置',
    type: "'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br'",
    value: "'bl'",
  },
  {
    name: 'popup-visible (v-model)',
    desc: '控制弹出框打开或者关闭',
    type: 'boolean',
    value: '-',
  },
  {
    name: 'default-popup-visible',
    desc: '弹出框默认打开或者关闭',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'trigger-props',
    desc: '可以传入 Trigger 组件的参数',
    type: 'TriggerProps',
    value: '-',
  },
  {
    name: 'unmount-on-close',
    desc: '是否在关闭后销毁 dom 结构',
    type: 'boolean',
    value: '`false`',
  },
]);

const timePickerEvents = ref([
  {
    name: 'change',
    desc: '组件值发生改变',
    type: '(timeString: string | Array<string | undefined> | undefined, time: Date | Array<Date | undefined> | undefined) => void',
  },
  {
    name: 'select',
    desc: '选择时间但未触发组件值变化',
    type: '(timeString: string | Array<string | undefined>, time: Date | Array<Date | undefined>) => void',
  },
  {
    name: 'clear',
    desc: '点击清除按钮',
    type: '() => void',
  },
  {
    name: 'popup-visible-change',
    desc: '弹出框展开和收起',
    type: '(visible: boolean) => void',
  },
]);

const timePickerSlots = ref([
  {
    name: 'prefix',
    desc: '输入框前缀',
    value: '2.41.0',
  },
  {
    name: 'suffix-icon',
    desc: '输入框后缀图标',
  },
  {
    name: 'extra',
    desc: '额外的页脚',
  },
]);
</script>
