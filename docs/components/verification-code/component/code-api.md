## API

### VerificationCode Props

| 参数名     | 描述       | 类型                 | 默认值     |
| ---------- | ---------- | -------------------- | ---------- |
| modelValue | 绑定值     | `string`             | `-`        |
| length     | 验证码长度 | `number`             | `4`        |
| type       | 输入类型   | `'number' \| 'text'` | `'number'` |
| disabled   | 是否禁用   | `boolean`            | `false`    |

### VerificationCode Events

| 事件名   | 描述           | 参数              |
| -------- | -------------- | ----------------- |
| complete | 输入完成时触发 | `(value: string)` |
| change   | 输入改变时触发 | `(value: string)` |
