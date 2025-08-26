## API

### space Props

<field-table :data="spaceProps"/>

### space Slots

<field-table :data="spaceSlots" type="slots" />

### Type

```typescript
type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';

type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';

type Direction = 'vertical' | 'horizontal';
```

<script setup>
import { ref } from 'vue';
const spaceProps = ref([
  {
    name: 'align',
    desc: '对齐方式',
    type: "SpaceAlign",
    value: '-',
  },
  {
    name: 'direction',
    desc: '间距方向',
    type: "Direction",
    value: "'horizontal'",
  },
  {
    name: 'size',
    desc: '间距大小，支持分别制定横向和竖向的间距',
    type: "SpaceSize | [SpaceSize, SpaceSize]",
    value: "'small'",
  },
  {
    name: 'wrap',
    desc: '环绕类型的间距，用于折行的场景。',
    type: 'boolean',
    value: 'false',
  },
  {
    name: 'fill',
    desc: '充满整行',
    type: 'boolean',
    value: 'false',
  },
]);
const spaceSlots = ref([
    {
    name: 'default',
    desc: '内容',
    type: '-',
    value: '-',
  },
  {
    name: 'split',
    desc: '设置分隔符',
    type: '-',
    value: '-',
  }
])

</script>
