## API

### timeline Props

<field-table :data="timelineProps"/>

### timeline Slots

<field-table :data="timelineSlots" type="slots"/>

### timeline-item Props

<field-table :data="timelineItemProps"/>

### timeline-item Slots

<field-table :data="timelineItemSlots" type="slots"/>

### Type

```typescript
type TimelineMode = 'left' | 'right' | 'top' | 'bottom' | 'alternate';

type TimelineLabelPosition = 'relative' | 'same';

type TimelineDotType = 'hollow' | 'solid';

type TimelineLineType = 'solid' | 'dashed' | 'dotted';

type TimelinePositon = 'left' | 'right' | 'top' | 'bottom';

type Direction = 'vertical' | 'horizontal';
```

<script setup>
import { ref } from 'vue';

const timelineProps = ref([
  {
    name: 'reverse',
    desc: '是否倒序',
    type: 'boolean',
    value: 'false',
  },
  {
    name: 'direction',
    desc: '时间轴方向',
    type: "Direction",
    value: "'vertical'",
  },
  {
    name: 'mode',
    desc: '时间轴的展示类型：时间轴在左侧，时间轴在右侧, 交替出现。',
    type: "TimelineMode",
    value: "'left'",
  },
  {
    name: 'pending',
    desc: '是否展示幽灵节点，设置为 true 时候只展示幽灵节点。传入ReactNode时，会作为节点内容展示。',
    type: 'boolean | string',
    value: '-',
  },
  {
    name: 'label-position',
    desc: '设置标签文本的位置',
    type: "TimelineLabelPosition",
    value: "'same'",
  },
]);

const timelineSlots = ref([
  {
    name: 'dot',
    desc: '幽灵节点',
    type: '-',
    value: '-',
  },
]);

const timelineItemProps = ref([
  {
    name: 'dot-color',
    desc: '节点颜色',
    type: 'string',
    value: '-',
  },
  {
    name: 'dot-type',
    desc: '节点类型：空心圆/实心圆',
    type: "TimelineDotType",
    value: "'solid'",
  },
  {
    name: 'line-type',
    desc: '时间轴类型：实线/虚线/点状线',
    type: "TimelineLineType",
    value: "'solid'",
  },
  {
    name: 'line-color',
    desc: '时间轴颜色',
    type: 'string',
    value: '-',
  },
  {
    name: 'label',
    desc: '标签文本',
    type: 'string',
    value: '-',
  },
  {
    name: 'position',
    desc: 'Item 位置',
    type: 'TimelinePositon',
    value: '-',
  },
]);

const timelineItemSlots = ref([
  {
    name: 'dot',
    desc: '自定义节点',
    type: '-',
    value: '-',
  },
  {
    name: 'label',
    desc: '自定义标签',
    type: '-',
    value: '-',
  },
]);
</script>
