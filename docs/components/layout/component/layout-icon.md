### 自定义按钮 Icon

通过设置 <yc-tag>Menu.Sider</yc-tag> 的 <yc-tag>trigger</yc-tag> 属性，实现自定义收起按钮的图标。

<div class="cell-demo vp-raw">
  <yc-layout class="layout-demo">
    <yc-layout-sider
      collapsible
      breakpoint="xl">
      <div class="logo" />
      <yc-menu
        :default-open-keys="['1']"
        :default-selected-keys="'0_3'"
        :style="{ width: '100%' }"
        @menu-item-click="onClickMenuItem">
        <yc-menu-item
          path="0_1"
          disabled>
          <IconHome></IconHome>
          Menu 1
        </yc-menu-item>
        <yc-menu-item path="0_2">
          <IconCalendar></IconCalendar>
          Menu 2
        </yc-menu-item>
        <yc-menu-item path="0_3">
          <IconCalendar></IconCalendar>
          Menu 3
        </yc-menu-item>
        <yc-sub-menu path="1">
          <template #title>
            <IconCalendar></IconCalendar> Navigation 1
          </template>
          <yc-menu-item path="1_1">Menu 1</yc-menu-item>
          <yc-menu-item path="1_2">Menu 2</yc-menu-item>
          <yc-sub-menu
            path="2"
            title="Navigation 2">
            <yc-menu-item path="2_1">Menu 1</yc-menu-item>
            <yc-menu-item path="2_2">Menu 2</yc-menu-item>
          </yc-sub-menu>
          <yc-sub-menu
            path="3"
            title="Navigation 3">
            <yc-menu-item path="3_1">Menu 1</yc-menu-item>
            <yc-menu-item path="3_2">Menu 2</yc-menu-item>
            <yc-menu-item path="3_3">Menu 3</yc-menu-item>
          </yc-sub-menu>
        </yc-sub-menu>
        <yc-sub-menu path="4">
          <template #title>
            <IconCalendar></IconCalendar> Navigation 4
          </template>
          <yc-menu-item path="4_1">Menu 1</yc-menu-item>
          <yc-menu-item path="4_2">Menu 2</yc-menu-item>
          <yc-menu-item path="4_3">Menu 3</yc-menu-item>
        </yc-sub-menu>
      </yc-menu>
      <!-- trigger -->
      <template #trigger="{ collapsed }">
        <IconCaretRight v-if="collapsed"></IconCaretRight>
        <IconCaretLeft v-else></IconCaretLeft>
      </template>
    </yc-layout-sider>
    <yc-layout>
      <yc-layout-header style="padding-left: 20px;"> Header </yc-layout-header>
      <yc-layout style="padding: 0 24px;">
        <yc-breadcrumb :style="{ margin: '16px 0' }">
          <yc-breadcrumb-item>Home</yc-breadcrumb-item>
          <yc-breadcrumb-item>List</yc-breadcrumb-item>
          <yc-breadcrumb-item>App</yc-breadcrumb-item>
        </yc-breadcrumb>
        <yc-layout-content>Content</yc-layout-content>
        <yc-layout-footer>Footer</yc-layout-footer>
      </yc-layout>
    </yc-layout>
  </yc-layout>
</div>

<script setup>
import { Message } from 'yc-design-vue';
function onClickMenuItem(key) {
  Message.info({ content: `You select ${key}`, showIcon: true });
}
</script>

<style scoped>
.layout-demo {
  height: 500px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.yc-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout-demo :deep(.yc-layout-sider-light) .logo {
  background: var(--color-fill-2);
}
.layout-demo :deep(.yc-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.yc-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.yc-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.yc-layout-footer),
.layout-demo :deep(.yc-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-layout class="layout-demo">
    <yc-layout-sider
      collapsible
      breakpoint="xl">
      <div class="logo" />
      <yc-menu
        :default-open-keys="['1']"
        :default-selected-keys="'0_3'"
        :style="{ width: '100%' }"
        @menu-item-click="onClickMenuItem">
        <yc-menu-item
          path="0_1"
          disabled>
          <IconHome></IconHome>
          Menu 1
        </yc-menu-item>
        <yc-menu-item path="0_2">
          <IconCalendar></IconCalendar>
          Menu 2
        </yc-menu-item>
        <yc-menu-item path="0_3">
          <IconCalendar></IconCalendar>
          Menu 3
        </yc-menu-item>
        <yc-sub-menu path="1">
          <template #title>
            <IconCalendar></IconCalendar> Navigation 1
          </template>
          <yc-menu-item path="1_1">Menu 1</yc-menu-item>
          <yc-menu-item path="1_2">Menu 2</yc-menu-item>
          <yc-sub-menu
            path="2"
            title="Navigation 2">
            <yc-menu-item path="2_1">Menu 1</yc-menu-item>
            <yc-menu-item path="2_2">Menu 2</yc-menu-item>
          </yc-sub-menu>
          <yc-sub-menu
            path="3"
            title="Navigation 3">
            <yc-menu-item path="3_1">Menu 1</yc-menu-item>
            <yc-menu-item path="3_2">Menu 2</yc-menu-item>
            <yc-menu-item path="3_3">Menu 3</yc-menu-item>
          </yc-sub-menu>
        </yc-sub-menu>
        <yc-sub-menu path="4">
          <template #title>
            <IconCalendar></IconCalendar> Navigation 4
          </template>
          <yc-menu-item path="4_1">Menu 1</yc-menu-item>
          <yc-menu-item path="4_2">Menu 2</yc-menu-item>
          <yc-menu-item path="4_3">Menu 3</yc-menu-item>
        </yc-sub-menu>
      </yc-menu>
      <!-- trigger -->
      <template #trigger="{ collapsed }">
        <IconCaretRight v-if="collapsed"></IconCaretRight>
        <IconCaretLeft v-else></IconCaretLeft>
      </template>
    </yc-layout-sider>
    <yc-layout>
      <yc-layout-header style="padding-left: 20px;"> Header </yc-layout-header>
      <yc-layout style="padding: 0 24px;">
        <yc-breadcrumb :style="{ margin: '16px 0' }">
          <yc-breadcrumb-item>Home</yc-breadcrumb-item>
          <yc-breadcrumb-item>List</yc-breadcrumb-item>
          <yc-breadcrumb-item>App</yc-breadcrumb-item>
        </yc-breadcrumb>
        <yc-layout-content>Content</yc-layout-content>
        <yc-layout-footer>Footer</yc-layout-footer>
      </yc-layout>
    </yc-layout>
  </yc-layout>
</template>

<script setup>
import { Message } from 'yc-design-vue';
function onClickMenuItem(key) {
  Message.info({ content: `You select ${key}`, showIcon: true });
}
</script>

<style scoped>
.layout-demo {
  height: 500px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.yc-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout-demo :deep(.yc-layout-sider-light) .logo {
  background: var(--color-fill-2);
}
.layout-demo :deep(.yc-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.yc-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.yc-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.yc-layout-footer),
.layout-demo :deep(.yc-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
```

</details>
