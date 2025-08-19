### 格栅列表

通过 <yc-tag>grid</yc-tag> 属性来配置格栅列表。

<div class="cell-demo vp-raw">
  <yc-list
    :gridProps="{ gutter: 0, span: 6 }"
    :bordered="false">
    <yc-list-item>
      <yc-list>
        <template #header>Platform</template>
        <yc-list-item>iOS</yc-list-item>
        <yc-list-item>Android</yc-list-item>
        <yc-list-item>Web</yc-list-item>
      </yc-list>
    </yc-list-item>
    <yc-list-item>
      <yc-list>
        <template #header>Framework</template>
        <yc-list-item>Angular</yc-list-item>
        <yc-list-item>Vue</yc-list-item>
        <yc-list-item>React</yc-list-item>
      </yc-list>
    </yc-list-item>
    <yc-list-item>
      <yc-list>
        <template #header>Language</template>
        <yc-list-item>C++</yc-list-item>
        <yc-list-item>JavaScript</yc-list-item>
        <yc-list-item>Python</yc-list-item>
      </yc-list>
    </yc-list-item>
    <yc-list-item>
      <yc-list>
        <template #header>Component</template>
        <yc-list-item>Button</yc-list-item>
        <yc-list-item>Breadcrumb</yc-list-item>
        <yc-list-item>Transfer</yc-list-item>
      </yc-list>
    </yc-list-item>
  </yc-list>
</div>

<details>
<summary>查看/隐藏代码</summary>

```vue
<template>
  <yc-list
    :gridProps="{ gutter: 0, span: 6 }"
    :bordered="false">
    <yc-list-item>
      <yc-list>
        <template #header>Platform</template>
        <yc-list-item>iOS</yc-list-item>
        <yc-list-item>Android</yc-list-item>
        <yc-list-item>Web</yc-list-item>
      </yc-list>
    </yc-list-item>
    <yc-list-item>
      <yc-list>
        <template #header>Framework</template>
        <yc-list-item>Angular</yc-list-item>
        <yc-list-item>Vue</yc-list-item>
        <yc-list-item>React</yc-list-item>
      </yc-list>
    </yc-list-item>
    <yc-list-item>
      <yc-list>
        <template #header>Language</template>
        <yc-list-item>C++</yc-list-item>
        <yc-list-item>JavaScript</yc-list-item>
        <yc-list-item>Python</yc-list-item>
      </yc-list>
    </yc-list-item>
    <yc-list-item>
      <yc-list>
        <template #header>Component</template>
        <yc-list-item>Button</yc-list-item>
        <yc-list-item>Breadcrumb</yc-list-item>
        <yc-list-item>Transfer</yc-list-item>
      </yc-list>
    </yc-list-item>
  </yc-list>
</template>
```

</details>
