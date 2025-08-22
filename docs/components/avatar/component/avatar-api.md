## API

### avatar Props

<field-table :data="avatarProps"/>

### avatar Events

<field-table :data="avatarEvents" type="emits" />

### avatar Slots

<field-table :data="avatarSlots" type="slots"/>

### avatar-group Props

<field-table :data="avatarGroupProps" />

<script setup>
import { ref } from 'vue';
const avatarProps = ref([
  {
    name: 'shape',
    desc: '头像的形状，有圆形(circle)和正方形(square)两种',
    type: "'circle' | 'square'",
    value: "'circle'",
    version: '',
  },
  {
    name: 'image-url',
    desc: '自定义头像图片地址，如果传入该属性，会默认渲染img标签',
    type: 'string',
    value: '-',
    version: '2.40.0',
  },
  {
    name: 'size',
    desc: '头像的尺寸大小，单位是 px。未填写时使用样式中的大小 40px',
    type: 'number',
    value: '-',
    version: '',
  },
  {
    name: 'auto-fix-font-size',
    desc: '是否自动根据头像尺寸调整字体大小',
    type: 'boolean',
    value: 'true',
    version: '',
  },
  {
    name: 'trigger-type',
    desc: '可点击的头像交互类型',
    type: "'mask' | 'button'",
    value: "'button'",
    version: '',
  },
  {
    name: 'trigger-icon-style',
    desc: '交互图标的样式',
    type: 'CSSProperties',
    value: '-',
    version: '',
  },
  {
    name: 'object-fit',
    desc: '图片在容器内的的适应类型',
    type: 'ObjectFit',
    value: '-',
    version: '2.52.0',
  },
]);

const avatarEvents = ref([
  {
    name: 'click',
    desc: '点击回调',
    type: '(ev: MouseEvent)',
  },
  {
    name: 'error',
    desc: '图片加载错误',
    type: '-',
  },
  {
    name: 'load',
    desc: '图片加载成功',
    type: '-',
  },
]);

const avatarSlots = ref([
  {
    name: 'trigger-icon',
    desc: '可点击的头像交互图标',
  },
]);

const avatarGroupProps = ref([
  {
    name: 'shape',
    desc: '头像的形状，有圆形(circle)和正方形(square)两种',
    type: "'circle' | 'square'",
    value: "'circle'",
    version: '',
  },
  {
    name: 'size',
    desc: '头像的尺寸大小，单位是 px',
    type: 'number',
    value: '-',
    version: '',
  },
  {
    name: 'auto-fix-font-size',
    desc: '是否自动根据头像尺寸调整字体大小',
    type: 'boolean',
    value: 'true',
    version: '',
  },
  {
    name: 'max-count',
    desc: '头像组最多显示的头像数量，多余头像将以 +x 的形式展示。',
    type: 'number',
    value: '0',
    version: '',
  },
  {
    name: 'z-index-ascend',
    desc: '头像组内的头像 z-index 递增，默认是递减。',
    type: 'boolean',
    value: 'false',
    version: '',
  },
  {
    name: 'max-style',
    desc: '多余头像样式。',
    type: 'CSSProperties',
    value: '-',
    version: '2.7.0',
  },
  {
    name: 'max-popover-trigger-props',
    desc: '多余头像气泡的 TriggerProps',
    type: 'TriggerProps',
    value: '-',
    version: '2.7.0',
  },
]);
</script>
