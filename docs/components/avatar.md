# Avatar 头像

用作头像显示，可以为图片、图标或字符形式展示。

---

### 基础用法

头像的基础使用。如果头像是文字的话，会自动调节字体大小，来适应头像框。

<div class="cell-demo">
  <yc-space size="large">
    <yc-avatar>A</yc-avatar>
    <yc-avatar :style="{ backgroundColor: '#3370ff' }">
      <IconUser />
    </yc-avatar>
    <yc-avatar :style="{ backgroundColor: '#14a9f8' }">Arco</yc-avatar>
    <yc-avatar :style="{ backgroundColor: '#00d0b6' }">Design</yc-avatar>
    <yc-avatar>
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
    </yc-avatar>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space size="large">
    <yc-avatar>A</yc-avatar>
    <yc-avatar :style="{ backgroundColor: '#3370ff' }">
      <IconUser />
    </yc-avatar>
    <yc-avatar :style="{ backgroundColor: '#14a9f8' }">Arco</yc-avatar>
    <yc-avatar :style="{ backgroundColor: '#00d0b6' }">Design</yc-avatar>
    <yc-avatar>
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
    </yc-avatar>
  </yc-space>
</template>
```

</details>

### 大小和形状

通过设置 <yc-tag>size</yc-tag> 字段，可以调节头像的大小，默认大小为 <yc-tag>40px</yc-tag>。设置 <yc-tag>shape</yc-tag> 字段，可以设置头像是圆形 (circle) 还是正方形 (square)。

<div class="cell-demo">
  <yc-space size="large" direction="vertical">
    <yc-space size="large">
      <yc-avatar :size="64">Arco</yc-avatar>
      <yc-avatar :size="40">Arco</yc-avatar>
      <yc-avatar :size="32">Arco</yc-avatar>
      <yc-avatar :size="24">Arco</yc-avatar>
    </yc-space>
    <yc-space size="large">
      <yc-avatar :size="64" shape="square">Arco</yc-avatar>
      <yc-avatar :size="40" shape="square">Arco</yc-avatar>
      <yc-avatar :size="32" shape="square">Arco</yc-avatar>
      <yc-avatar :size="24" shape="square">Arco</yc-avatar>
    </yc-space>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space
    size="large"
    direction="vertical">
    <yc-space size="large">
      <yc-avatar :size="64">Arco</yc-avatar>
      <yc-avatar :size="40">Arco</yc-avatar>
      <yc-avatar :size="32">Arco</yc-avatar>
      <yc-avatar :size="24">Arco</yc-avatar>
    </yc-space>
    <yc-space size="large">
      <yc-avatar
        :size="64"
        shape="square"
        >Arco</yc-avatar
      >
      <yc-avatar
        :size="40"
        shape="square"
        >Arco</yc-avatar
      >
      <yc-avatar
        :size="32"
        shape="square"
        >Arco</yc-avatar
      >
      <yc-avatar
        :size="24"
        shape="square"
        >Arco</yc-avatar
      >
    </yc-space>
  </yc-space>
</template>
```

</details>

### 头像组

使用 <yc-tag>Avatar.Group</yc-tag> 可以使用头像组功能，可通过 <yc-tag>size</yc-tag> 指定头像的大小。

<div class="cell-demo">
  <yc-space :size="32">
    <yc-avatar-group>
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>
    <yc-avatar-group :size="24">
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>
    <yc-avatar-group :size="24" :max-count="3">
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space :size="32">
    <yc-avatar-group>
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>

    <yc-avatar-group :size="24">
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>

    <yc-avatar-group
      :size="24"
      :max-count="3">
      <yc-avatar :style="{ backgroundColor: '#7BC616' }">A</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#14C9C9' }">B</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#168CFF' }">C</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</yc-avatar>
      <yc-avatar :style="{ backgroundColor: '#FFC72E' }">Design</yc-avatar>
    </yc-avatar-group>
  </yc-space>
</template>
```

</details>

### 交互按钮

可以通过 <yc-tag>trigger-icon</yc-tag> <yc-tag>trigger-type</yc-tag> 来定制交互按钮，类型有 <yc-tag>mask (遮罩)</yc-tag> 和 <yc-tag>button (按钮)</yc-tag> 两种。

<div class="cell-demo">
  <yc-space size="large">
    <yc-avatar
      :trigger-icon-style="{ color: '#3491FA' }"
      :auto-fix-font-size="false"
      @click="toast"
      :style="{ backgroundColor: '#168CFF' }"
    >
      A
      <template #trigger-icon>
        <IconCamera />
      </template>
    </yc-avatar>
    <yc-avatar @click="toast" :style="{ backgroundColor: '#14C9C9' }">
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </yc-avatar>
    <yc-avatar
      @click="toast"
      shape="square"
      :style="{ backgroundColor: '#FFC72E' }"
    >
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </yc-avatar>
    <yc-avatar trigger-type="mask">
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </yc-avatar>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space size="large">
    <yc-avatar
      :trigger-icon-style="{ color: '#3491FA' }"
      :auto-fix-font-size="false"
      @click="toast"
      :style="{ backgroundColor: '#168CFF' }">
      A
      <template #trigger-icon>
        <IconCamera />
      </template>
    </yc-avatar>
    <yc-avatar
      @click="toast"
      :style="{ backgroundColor: '#14C9C9' }">
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </yc-avatar>
    <yc-avatar
      @click="toast"
      shape="square"
      :style="{ backgroundColor: '#FFC72E' }">
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </yc-avatar>
    <yc-avatar trigger-type="mask">
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </yc-avatar>
  </yc-space>
</template>

<script setup>
import { Message } from 'yc-design-vue';
const toast = () => {
  Message.info('Uploading...');
};
</script>
```

</details>

### 自动调整字体大小

如果头像是文字的话，会自动调节字体大小，来适应头像框。

<div class="cell-demo">
  <yc-avatar
    :style="{
      marginRight: '24px',
      verticalAlign: 'middle',
      backgroundColor: '#14a9f8',
    }"
  >
    {{ text }}
  </yc-avatar>
  <yc-button
    type="secondary"
    @click="onClick"
    :style="{ verticalAlign: 'middle' }"
  >
    Change
  </yc-button>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space
    size="large"
    direction="vertical">
    <yc-space size="large">
      <yc-avatar :size="64">Arco</yc-avatar>
      <yc-avatar :size="40">Arco</yc-avatar>
      <yc-avatar :size="32">Arco</yc-avatar>
      <yc-avatar :size="24">Arco</yc-avatar>
    </yc-space>
    <yc-space size="large">
      <yc-avatar
        :size="64"
        shape="square"
        >Arco</yc-avatar
      >
      <yc-avatar
        :size="40"
        shape="square"
        >Arco</yc-avatar
      >
      <yc-avatar
        :size="32"
        shape="square"
        >Arco</yc-avatar
      >
      <yc-avatar
        :size="24"
        shape="square"
        >Arco</yc-avatar
      >
    </yc-space>
  </yc-space>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Message } from 'yc-design-vue';
const list = ['B', 'Arco', 'Design', 'Tom', 'AD'];
const index = ref(0);
const text = computed(() => list[index.value]);
const onClick = () => {
  index.value = index.value >= list.length - 1 ? 0 : index.value + 1;
};
</script>
```

</details>

### 自定义头像路径

自定义头像图片路径

<div class="cell-demo">
  <yc-space size="large">
    <yc-avatar
      imageUrl="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    >
    </yc-avatar>
    加载失败:
    <yc-avatar
      imageUrl="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9123.png~tplv-uwbnlip3yd-webp.webp"
    >
    </yc-avatar>
  </yc-space>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-space size="large">
    <yc-avatar
      imageUrl="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp">
    </yc-avatar>
    加载失败:
    <yc-avatar
      imageUrl="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9123.png~tplv-uwbnlip3yd-webp.webp">
    </yc-avatar>
  </yc-space>
</template>
```

</details>

<script setup>
import { computed, ref } from 'vue';
import { Message } from 'yc-design-vue';
const list = ['B', 'Arco', 'Design', 'Tom', 'AD'];
const index = ref(0);
const text = computed(() => list[index.value]);
const onClick = () => {
  index.value = index.value >= list.length - 1 ? 0 : index.value + 1;
};
const toast =()=> {
      Message.info('Uploading...');
};
</script>

## API

### Avatar Props

| 参数             | 说明                 | 类型                                       | 默认值       |
| ---------------- | -------------------- | ------------------------------------------ | ------------ |
| shape            | 头像形状             | `'square' \| 'round'`                      | -            |
| imageUrl         | 图片地址             | `string`                                   | -            |
| size             | 头像尺寸             | `number`                                   | -            |
| autoFixFontSize  | 是否自动调整字体大小 | `boolean`                                  | -            |
| triggerType      | 触发器类型           | `'mask' \| 'button'`                       | `'button'`   |
| triggerIconStyle | 触发器图标样式       | `CSSProperties`                            | `() => ({})` |
| objectFit        | 图片填充方式         | `'cover' \| 'contain' \| 'fill' \| 'none'` | `'cover'`    |

### AvatarGroup Props

| 参数                   | 说明                 | 类型                  | 默认值       |
| ---------------------- | -------------------- | --------------------- | ------------ |
| shape                  | 头像形状             | `'square' \| 'round'` | `'round'`    |
| size                   | 头像尺寸             | `number`              | `40`         |
| autoFixFontSize        | 是否自动调整字体大小 | `boolean`             | `true`       |
| maxCount               | 最大显示数量         | `number`              | `0`          |
| zIndexAscend           | 层级是否递增         | `boolean`             | `false`      |
| maxStyle               | 最大数量头像样式     | `CSSProperties`       | `() => ({})` |
| maxPopoverTriggerProps | 最大数量弹窗属性     | `TriggerProps`        | `() => ({})` |

### Avatar Events

| 事件名 | 说明               | 回调参数           |
| ------ | ------------------ | ------------------ |
| click  | 点击时触发         | `(ev: MouseEvent)` |
| error  | 图片加载失败时触发 | `(ev: Event)`      |
| load   | 图片加载成功时触发 | `(ev: Event)`      |

### Avatar Slots

| 插槽名       | 说明                     |
| ------------ | ------------------------ |
| default      | 头像内容（文字、图标等） |
| trigger-icon | 触发器图标               |

### AvatarGroup Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 头像列表 |

### Types

```typescript
interface AvatarProps {
  shape?: AvatarShape;
  imageUrl?: string;
  size?: number;
  autoFixFontSize?: boolean;
  triggerType?: AvatarTriggerType;
  triggerIconStyle?: CSSProperties;
  objectFit?: ObjectFit;
}

interface AvatarGroupProps {
  shape?: AvatarShape;
  size?: number;
  autoFixFontSize?: boolean;
  maxCount?: number;
  zIndexAscend?: boolean;
  maxStyle?: CSSProperties;
  maxPopoverTriggerProps?: TriggerProps;
}

interface AvatarEmits {
  (e: 'click', ev: MouseEvent): void;
  (e: 'error', ev: Event): void;
  (e: 'load', ev: Event): void;
}

interface AvatarSlots {
  default(): void;
  'trigger-icon'(): void;
}

interface AvatarGroupSlots {
  default(): void;
}

type AvatarShape = 'square' | 'round';
type AvatarTriggerType = 'mask' | 'button';
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none';
```

## 注意事项

1. 当不设置 `size` 属性时，头像会继承父组件的尺寸设置
2. `autoFixFontSize` 属性会自动调整文字大小以适应头像尺寸
3. 头像组支持通过 `maxCount` 限制显示数量，超出部分会显示为 `+N` 的形式
4. 头像组支持通过 `zIndexAscend` 控制层级顺序
5. 触发器图标支持两种类型：`mask`（遮罩）和 `button`（按钮）
6. 图片加载失败时会显示默认的错误图标
