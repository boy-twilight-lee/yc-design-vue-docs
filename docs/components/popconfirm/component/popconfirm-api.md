## API

## Popconfirm

### popconfirm Props

<field-table :data="popconfirmProps"/>

### popconfirm Events

<field-table :data="popconfirmEvents" type="emits"/>

### popconfirm Slots

<field-table :data="popconfirmSlots" type="slots"/>

<script setup>
import { ref } from 'vue';

const popconfirmProps = ref([
  {
    name: 'content',
    desc: '内容',
    type: 'string',
    value: '-',
  },
  {
    name: 'position',
    desc: '弹出位置',
    type: '\'top\' | \'tl\' | \'tr\' | \'bottom\' | \'bl\' | \'br\' | \'left\' | \'lt\' | \'lb\' | \'right\' | \'rt\' | \'rb\'',
    value: '\'top\'',
  },
  {
    name: 'popup-visible (v-model)',
    desc: '气泡确认框是否可见',
    type: 'boolean',
    value: '-',
  },
  {
    name: 'default-popup-visible',
    desc: '气泡确认框默认是否可见（非受控模式）',
    type: 'boolean',
    value: 'false',
  },
  {
    name: 'type',
    desc: '气泡确认框的类型',
    type: '\'info\' | \'success\' | \'warning\' | \'error\'',
    value: '\'info\'',
  },
  {
    name: 'ok-text',
    desc: '确认按钮的内容',
    type: 'string',
    value: '-',
  },
  {
    name: 'cancel-text',
    desc: '取消按钮的内容',
    type: 'string',
    value: '-',
  },
  {
    name: 'ok-loading',
    desc: '确认按钮是否为加载中状态',
    type: 'boolean',
    value: 'false',
  },
  {
    name: 'ok-button-props',
    desc: '确认按钮的Props',
    type: 'ButtonProps',
    value: '-',
  },
  {
    name: 'cancel-button-props',
    desc: '取消按钮的Props',
    type: 'ButtonProps',
    value: '-',
  },
  {
    name: 'content-class',
    desc: '弹出框内容的类名',
    type: 'ClassName',
    value: '-',
  },
  {
    name: 'content-style',
    desc: '弹出框内容的样式',
    type: 'CSSProperties',
    value: '-',
  },
  {
    name: 'arrow-class',
    desc: '弹出框箭头的类名',
    type: 'ClassName',
    value: '-',
  },
  {
    name: 'arrow-style',
    desc: '弹出框箭头的样式',
    type: 'CSSProperties',
    value: '-',
  },
  {
    name: 'popup-container',
    desc: '弹出框的挂载点',
    type: 'string | HTMLElement',
    value: '-',
  },
  {
    name: 'on-before-ok',
    desc: '触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。',
    type: '( done: (closed: boolean) => void) => void | boolean | Promise<void | boolean>',
    value: '-',
  },
  {
    name: 'on-before-cancel',
    desc: '触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。',
    type: '() => boolean',
    value: '-',
  },
]);

const popconfirmEvents = ref([
  {
    name: 'popup-visible-change',
    desc: '气泡确认框的显隐状态改变时触发',
    type: 'visible: boolean',
    value: '-',
  },
  {
    name: 'ok',
    desc: '点击确认按钮时触发',
    type: '-',
    value: '-',
  },
  {
    name: 'cancel',
    desc: '点击取消按钮时触发',
    type: '-',
    value: '-',
  },
]);

const popconfirmSlots = ref([
  {
    name: 'icon',
    desc: '图标',
    type: '-',
    value: '-',
  },
  {
    name: 'content',
    desc: '内容',
    type: '-',
    value: '-',
  },
]);
</script>
