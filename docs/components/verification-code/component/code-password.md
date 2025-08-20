### 密码模式

指定 <yc-tag>masked = true</yc-tag> 可开启密码模式

<div class="cell-demo vp-raw">
 <yc-verification-code
    defaultValue="123"
    style="width: 300px"
    masked
    @finish="onFinish" />
</div>

<script setup>
import { Message } from 'yc-design-vue';
const onFinish = (value) => Message.info(`Verification code: ${value}`);
</script>

<details>
<summary>点击查看/隐藏代码</summary>

```vue
<template>
  <yc-verification-code
    defaultValue="123"
    style="width: 300px"
    masked
    @finish="onFinish" />
</template>

<script setup>
import { Message } from 'yc-design-vue';
const onFinish = (value) => Message.info(`Verification code: ${value}`);
</script>
```

</details>
