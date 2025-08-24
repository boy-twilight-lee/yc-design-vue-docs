### 自定义图标

设置 <yc-tag>icon</yc-tag> 来自定义图标。

<div class="cell-demo vp-rwa">
  <yc-button @click="handleClick">Info Message</yc-button>
</div>

<script>
import { h } from 'vue';
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';

export default {
  methods: {
    handleClick() {
      this.$message.info({
        content: 'This is an info message!',
        icon: () => h(IconFaceSmileFill),
      });
    },
  },
};
</script>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-button @click="handleClick">Info Message</yc-button>
</template>

<script>
import { h } from 'vue';
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';

export default {
  methods: {
    handleClick() {
      this.$message.info({
        content: 'This is an info message!',
        icon: () => h(IconFaceSmileFill),
      });
    },
  },
};
</script>
```

</details>
