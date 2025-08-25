### 自定义空状态元素

通过 `empty` 插槽可以全局自定义空状态元素。

<div class="cell-demo vp-raw">
  <yc-config-provider>
    <template #empty="scope">
      <yc-empty
        v-if="scope?.component === 'cascader'"
        description="cascader no data!"
        in-config-provider>
      </yc-empty>
      <yc-empty
        v-else-if="scope?.component === 'select'"
        description="select no data!"
        in-config-provider></yc-empty>
      <yc-empty
        v-else-if="scope?.component === 'tree-select'"
        description="tree-select no data!"
        in-config-provider></yc-empty>
      <yc-empty
        v-else-if="scope?.component === 'list'"
        description="list no data!"
        in-config-provider></yc-empty>
      <yc-empty
        v-else-if="scope?.component === 'table'"
        description="table no data!"
        in-config-provider></yc-empty>
      <div
        v-else
        class="my-empty">
        <icon-trophy />
      </div>
    </template>
    <yc-space
      direction="vertical"
      fill>
      <yc-cascader
        :options="[]"
        placeholder="cascader"
        allow-search />
      <yc-select
        placeholder="select"
        allow-search />
      <yc-tree-select placeholder="tree-select" />
      <yc-list>
        <template #header> Empty List </template>
      </yc-list>
    </yc-space>
  </yc-config-provider>
</div>

<style>
.my-empty {
  padding: 20px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
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
  <yc-config-provider>
    <template #empty="scope">
      <yc-empty
        v-if="scope?.component === 'cascader'"
        description="cascader no data!"
        in-config-provider>
      </yc-empty>
      <yc-empty
        v-else-if="scope?.component === 'select'"
        description="select no data!"
        in-config-provider></yc-empty>
      <yc-empty
        v-else-if="scope?.component === 'tree-select'"
        description="tree-select no data!"
        in-config-provider></yc-empty>
      <yc-empty
        v-else-if="scope?.component === 'list'"
        description="list no data!"
        in-config-provider></yc-empty>
      <yc-empty
        v-else-if="scope?.component === 'table'"
        description="table no data!"
        in-config-provider></yc-empty>
      <div
        v-else
        class="my-empty">
        <icon-trophy />
      </div>
    </template>
    <yc-space
      direction="vertical"
      fill>
      <yc-cascader
        :options="[]"
        placeholder="cascader"
        allow-search />
      <yc-select
        placeholder="select"
        allow-search />
      <yc-tree-select placeholder="tree-select" />
      <yc-list>
        <template #header> Empty List </template>
      </yc-list>
    </yc-space>
  </yc-config-provider>
</template>

<style>
.my-empty {
  padding: 20px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}
</style>
```

</details>
