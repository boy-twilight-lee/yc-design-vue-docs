### 触发方式

通过设置 <yc-tag>trigger</yc-tag>，可以指定不同的触发方式。

<div class="cell-demo vp-raw">
  <yc-space>
    <yc-popover title="Title">
      <yc-button>Hover Me</yc-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-popover>
    <yc-popover title="Title" trigger="click">
      <yc-button>Click Me</yc-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-popover>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space>
    <yc-popover title="Title">
      <yc-button>Hover Me</yc-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-popover>
    <yc-popover
      title="Title"
      trigger="click">
      <yc-button>Click Me</yc-button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </yc-popover>
  </yc-space>
</template>
```

</details>
