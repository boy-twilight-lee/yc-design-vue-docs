## API

### collapse Props

<field-table :data="collapseProps"/>

### collapse Events

<field-table :data="collapseEvents" type="emits"/>

### collapse Slots

<field-table :data="collapseSlots" type="slots"/>

### collapse-item Props

<field-table :data="collapseItemProps"/>

### collapse-item Slots

<field-table :data="collapseItemSlots" type="slots"/>

### Type

```typescript
type CollapseValue = string | number;

type ExpandIconPosition = 'left' | 'right';
```

### FAQ

`<CollapseItem>`组件的 path 属性为必填
<br/>
在 `<Collapse>` 组件中每个 `<CollapseItem>` 都需要指定唯一的 `path` , `path` 对应 `activeKey` 中的值。

<script setup>
import { ref } from 'vue';

const collapseProps = ref([
  {
    name: 'active-key (v-model)',
    desc: '当前展开的面板的 key',
    type: 'CollapseValue[]',
    value: '-',
    version: '',
  },
  {
    name: 'default-active-key',
    desc: '默认展开的面板的 key （非受控模式）',
    type: 'CollapseValue[]',
    value: '[]',
    version: '',
  },
  {
    name: 'accordion',
    desc: '是否开启手风琴模式',
    type: 'boolean',
    value: 'false',
    version: '',
  },
  {
    name: 'show-expand-icon',
    desc: '是否显示展开图标',
    type: 'boolean',
    value: '-',
    version: '2.33.0',
  },
  {
    name: 'expand-icon-position',
    desc: '展开图标显示的位置',
    type: "ExpandIconPosition",
    value: "'left'",
    version: '',
  },
  {
    name: 'bordered',
    desc: '是否显示边框',
    type: 'boolean',
    value: 'true',
    version: '',
  },
  {
    name: 'destroy-on-hide',
    desc: '是否在隐藏时销毁内容',
    type: 'boolean',
    value: 'false',
    version: '2.27.0',
  },
]);

const collapseEvents = ref([
  {
    name: 'change',
    desc: '展开的面板发生改变时触发',
    type: 'activeKey: CollapseValue[], ev: Event',
  },
]);

const collapseSlots = ref([
  {
    name: 'default',
    desc: '内容',
    type: '-',
  }
]);

const collapseItemProps = ref([
  {
    name: 'header',
    desc: '面板的标题',
    type: 'string',
    value: '-',
    version: '',
  },
    {
    name: 'path（必填）',
    desc: '面板的key',
    type: 'CollapseValue',
    value: '-',
    version: '',
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    value: 'false',
    version: '',
  },
  {
    name: 'show-expand-icon',
    desc: '是否显示展开图标',
    type: 'boolean',
    value: 'true',
    version: '',
  },
  {
    name: 'destroy-on-hide',
    desc: '是否在隐藏时销毁内容',
    type: 'boolean',
    value: 'false',
    version: '2.27.0',
  },
]);

const collapseItemSlots = ref([
  {
    name: 'extra',
    desc: '额外内容',
    type: '-',
    version: '',
  },
  {
    name: 'expand-icon',
    desc: '展开图标',
    type: "active: boolean, disabled: boolean, position: 'left' | 'right'",
    version: '2.33.0',
  },
  {
    name: 'header',
    desc: '面板的标题',
    type: '-',
    version: '',
  },
  {
    name: 'default',
    desc: '面板的内容',
    type: '-',
  }
]);

</script>
