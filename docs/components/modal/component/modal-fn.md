### 函数调用

通过函数的方式使用对话框。

<div class="cell-demo vp-raw">
  <yc-button @click="handleClick">Open Modal</yc-button>
</div>

<script>
import { h } from 'vue';
import { Modal, Button } from '@arco-design/web-vue';

const ModalContent = {
  setup() {
    const onClick = () => {
      Modal.info({
        title: 'Info Title',
        content: 'This is an nest info message',
      });
    };

    return () =>
      h('div', { class: 'info-modal-content' }, [
        h('span', { style: 'margin-bottom: 10px;' }, 'This is an info message'),
        h(Button, { size: 'mini', onClick }, 'Open Nest Modal'),
      ]);
  },
};

export default {
  setup() {
    const handleClick = () => {
      Modal.info({
        title: 'Info Title',
        content: () => h(ModalContent),
      });
    };

    return {
      handleClick,
    };
  },
};
</script>

<style>
.info-modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-button @click="handleClick">Open Modal</yc-button>
</template>

<script>
import { h } from 'vue';
import { Modal, Button } from '@arco-design/web-vue';

const ModalContent = {
  setup() {
    const onClick = () => {
      Modal.info({
        title: 'Info Title',
        content: 'This is an nest info message',
      });
    };

    return () =>
      h('div', { class: 'info-modal-content' }, [
        h('span', { style: 'margin-bottom: 10px;' }, 'This is an info message'),
        h(Button, { size: 'mini', onClick }, 'Open Nest Modal'),
      ]);
  },
};

export default {
  setup() {
    const handleClick = () => {
      Modal.info({
        title: 'Info Title',
        content: () => h(ModalContent),
      });
    };

    return {
      handleClick,
    };
  },
};
</script>

<style>
.info-modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
```

</details>
