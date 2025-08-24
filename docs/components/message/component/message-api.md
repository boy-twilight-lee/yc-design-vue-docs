## API

### Message 全局方法

组件<yc-tag>Message</yc-tag>提供的全局方法，可以通过以下三种方法使用：

1. 通过 <yc-tag>this.$message</yc-tag> 调用
2. 在 Composition API 中，通过 <yc-tag>getCurrentInstance().appContext.config.globalProperties.$message</yc-tag> 调用
3. 导入 Message，通过 <yc-tag>Message</yc-tag> 本身调用

### MessageMethod

<field-table :data="messageMethodProps"/>

### MessageConfig

<field-table :data="messageConfigProps"/>

### MessageReturn

<field-table :data="messageReturnProps"/>

<script setup>
import { ref } from 'vue';

const messageMethodProps = ref([
  {
    name: 'info',
    desc: '显示信息提示',
    type: '(config: string | MessageConfig, appContext?: AppContext) => MessageReturn',
    value: '-',
  },
  {
    name: 'success',
    desc: '显示成功提示',
    type: '(config: string | MessageConfig, appContext?: AppContext) => MessageReturn',
    value: '-',
  },
  {
    name: 'warning',
    desc: '显示警告提示',
    type: '(config: string | MessageConfig, appContext?: AppContext) => MessageReturn',
    value: '-',
  },
  {
    name: 'error',
    desc: '显示错误提示',
    type: '(config: string | MessageConfig, appContext?: AppContext) => MessageReturn',
    value: '-',
  },
  {
    name: 'loading',
    desc: '显示加载中提示',
    type: '(config: string | MessageConfig, appContext?: AppContext) => MessageReturn',
    value: '-',
  },
  {
    name: 'normal',
    desc: '显示提示',
    type: '(config: string | MessageConfig, appContext?: AppContext) => MessageReturn',
    value: '- (2.41.0)',
  },
  {
    name: 'clear',
    desc: '清空全部提示',
    type: '(position?: MessagePosition) => void',
    value: '-',
  },
]);

const messageConfigProps = ref([
  {
    name: 'content',
    desc: '内容',
    type: 'RenderContent',
    value: '-',
  },
  {
    name: 'id',
    desc: '唯一id',
    type: 'string',
    value: '-',
  },
  {
    name: 'icon',
    desc: '消息的图标',
    type: 'RenderFunction',
    value: '-',
  },
  {
    name: 'position',
    desc: '消息的位置',
    type: '\'top\' | \'bottom\'',
    value: '-',
  },
  {
    name: 'show-icon',
    desc: '是否显示图标',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'closable',
    desc: '是否显示关闭按钮',
    type: 'boolean',
    value: '`false`',
  },
  {
    name: 'duration',
    desc: '消息显示的持续时间',
    type: 'number',
    value: '-',
  },
  {
    name: 'on-close',
    desc: '关闭时的回调函数',
    type: '(id: number | string) => void',
    value: '-',
  },
  {
    name: 'reset-on-hover',
    desc: '设置鼠标移入后不会自动关闭',
    type: 'boolean',
    value: '`false` (2.39.0)',
  },
]);

const messageReturnProps = ref([
  {
    name: 'close',
    desc: '关闭当前消息',
    type: '() => void',
    value: '-',
  },
]);
</script>
