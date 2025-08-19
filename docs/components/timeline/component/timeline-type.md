### 时间轴展示类型

设置 <yc-tag>mode=alternate</yc-tag> 时将会交替展示内容。同时可以通过设置 <yc-tag>TimelineItem</yc-tag> 的 <yc-tag>position</yc-tag> 属性控制时间轴节点的位置.

<div class="cell-demo vp-raw">
  <yc-row justify="space-between">
    <yc-timeline
      mode="alternate"
      :style="{ flex: 1 }">
      <yc-timeline-item label="2017-03-10">The first milestone</yc-timeline-item>
      <yc-timeline-item label="2018-05-12">The second milestone</yc-timeline-item>
      <yc-timeline-item
        label="2020-09-30"
        position="bottom">
        The third milestone
      </yc-timeline-item>
    </yc-timeline>
    <yc-timeline
      mode="right"
      :style="{ flex: 1 }">
      <yc-timeline-item label="2017-03-10">The first milestone</yc-timeline-item>
      <yc-timeline-item label="2018-05-12">The second milestone</yc-timeline-item>
      <yc-timeline-item
        label="2020-09-30"
        position="bottom">
        The third milestone
      </yc-timeline-item>
    </yc-timeline>
  </yc-row>
</div>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-row justify="space-between">
    <yc-timeline
      mode="alternate"
      :style="{ flex: 1 }">
      <yc-timeline-item label="2017-03-10"
        >The first milestone</yc-timeline-item
      >
      <yc-timeline-item label="2018-05-12"
        >The second milestone</yc-timeline-item
      >
      <yc-timeline-item
        label="2020-09-30"
        position="bottom">
        The third milestone
      </yc-timeline-item>
    </yc-timeline>
    <yc-timeline
      mode="right"
      :style="{ flex: 1 }">
      <yc-timeline-item label="2017-03-10"
        >The first milestone</yc-timeline-item
      >
      <yc-timeline-item label="2018-05-12"
        >The second milestone</yc-timeline-item
      >
      <yc-timeline-item
        label="2020-09-30"
        position="bottom">
        The third milestone
      </yc-timeline-item>
    </yc-timeline>
  </yc-row>
</template>
```

</details>
