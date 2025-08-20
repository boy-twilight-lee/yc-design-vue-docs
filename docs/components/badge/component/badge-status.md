### 状态点

设置 <yc-tag>status</yc-tag>，可以得到不同的状态点。<yc-tag>normal - 正常</yc-tag> 、 <yc-tag>processing - 进行中</yc-tag> 、<yc-tag>success - 成功</yc-tag> 、 <yc-tag>warning - 提醒</yc-tag> 、 <yc-tag>danger - 危险</yc-tag>。

<div class="cell-demo vp-raw">
  <yc-space size="large" direction="vertical">
    <yc-space size="large">
      <yc-badge status="normal" />
      <yc-badge status="processing" />
      <yc-badge status="success" />
      <yc-badge status="warning" />
      <yc-badge status="danger" />
    </yc-space>
    <yc-space size="large">
      <yc-badge status="normal" text="Normal" />
      <yc-badge status="processing" text="Processing" />
      <yc-badge status="success" text="Success" />
      <yc-badge status="warning" text="Warning" />
      <yc-badge status="danger" text="Danger" />
    </yc-space>
  </yc-space>
</div>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-space
    size="large"
    direction="vertical">
    <yc-space size="large">
      <yc-badge status="normal" />
      <yc-badge status="processing" />
      <yc-badge status="success" />
      <yc-badge status="warning" />
      <yc-badge status="danger" />
    </yc-space>
    <yc-space size="large">
      <yc-badge
        status="normal"
        text="Normal" />
      <yc-badge
        status="processing"
        text="Processing" />
      <yc-badge
        status="success"
        text="Success" />
      <yc-badge
        status="warning"
        text="Warning" />
      <yc-badge
        status="danger"
        text="Danger" />
    </yc-space>
  </yc-space>
</template>
```

</details>
