### 更新内容

更新消息内容，通过设置 <yc-tag>duration</yc-tag> 属性可以重置定时器。

<div class="cell-demo vp-raw">
  <yc-button @click="handleClick">Update Info Message</yc-button>
</div>

<script>
export default {
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    handleClick() {
      this.$message.info({
        id: 'myInfo',
        content: `This is an info message ${this.$data.index++}`,
        duration: 2000,
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
  <yc-button @click="handleClick">Update Info Message</yc-button>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    handleClick() {
      this.$message.info({
        id: 'myInfo',
        content: `This is an info message ${this.$data.index++}`,
        duration: 2000,
      });
    },
  },
};
</script>
```

</details>
