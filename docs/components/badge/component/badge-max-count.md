### 最大值

设置 <yc-tag>max-count</yc-tag>，可以限制最大显示的徽标数值，超过将会加 <yc-tag>+</yc-tag> 后缀。<yc-tag>max-count</yc-tag> 默认为 <yc-tag>99</yc-tag>。

<div class="cell-demo vp-raw">
  <yc-space :size="40">
    <yc-badge :max-count="10" :count="0">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge :max-count="10" :count="100">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge :count="100">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge :max-count="999" :count="1000">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
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
  <yc-space :size="40">
    <yc-badge
      :max-count="10"
      :count="0">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge
      :max-count="10"
      :count="100">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge :count="100">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
    <yc-badge
      :max-count="999"
      :count="1000">
      <yc-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </yc-avatar>
    </yc-badge>
  </yc-space>
</template>
```

</details>
