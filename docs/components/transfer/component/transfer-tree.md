### 树型穿梭框

通过设置 <yc-tag>simple</yc-tag> 来开启简单模式，点击选项即可移动。

<div class="cell-demo vp-raw">
  <yc-transfer
    :data="transferData"
    :default-value="value">
    <template #source="{ data, selectedKeys, onSelect }">
      <a-tree
        :checkable="true"
        checked-strategy="child"
        :checked-keys="selectedKeys"
        :data="getTreeData(data)"
        @check="onSelect" />
    </template>
  </yc-transfer>
</div>

<script setup>
import { Tree as ATree } from '@arco-design/web-vue';
const treeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf 0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        children: [
          {
            title: 'Leaf 0-0-2-1',
            key: '0-0-2-1',
          },
          {
            title: 'Leaf 0-0-2-2',
            key: '0-0-2-2',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Branch 0-1-1',
        key: '0-1-1',
        children: [
          {
            title: 'Leaf 0-1-1-1',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf 0-1-1-2',
            key: '0-1-1-2',
          },
        ],
      },
      {
        title: 'Leaf 0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const getTransferData = (treeData = [], transferDataSource = []) => {
  treeData.forEach((item) => {
    if (item.children) getTransferData(item.children, transferDataSource);
    else transferDataSource.push({ label: item.title, value: item.key });
  });
  return transferDataSource;
};

const getTreeData = (data = []) => {
  const values = data.map((item) => item.value);

  const travel = (_treeData = []) => {
    const treeDataSource = [];
    _treeData.forEach((item) => {
      if (item.children || values.includes(item.key)) {
        treeDataSource.push({
          title: item.title,
          key: item.key,
          children: travel(item.children),
        });
      }
    });
    return treeDataSource;
  };

  return travel(treeData);
};

const transferData = getTransferData(treeData);

const value = ['0-0-2-1'];
</script>

<details>
<summary>
 <button class="code-btn"  >
    <icon-code />
 </button>
</summary>

```vue
<template>
  <yc-transfer
    :data="transferData"
    :default-value="value">
    <template #source="{ data, selectedKeys, onSelect }">
      <a-tree
        :checkable="true"
        checked-strategy="child"
        :checked-keys="selectedKeys"
        :data="getTreeData(data)"
        @check="onSelect" />
    </template>
  </yc-transfer>
</template>

<script setup>
import { Tree as ATree } from '@arco-design/web-vue';
const treeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf 0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        children: [
          {
            title: 'Leaf 0-0-2-1',
            key: '0-0-2-1',
          },
          {
            title: 'Leaf 0-0-2-2',
            key: '0-0-2-2',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Branch 0-1-1',
        key: '0-1-1',
        children: [
          {
            title: 'Leaf 0-1-1-1',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf 0-1-1-2',
            key: '0-1-1-2',
          },
        ],
      },
      {
        title: 'Leaf 0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const getTransferData = (treeData = [], transferDataSource = []) => {
  treeData.forEach((item) => {
    if (item.children) getTransferData(item.children, transferDataSource);
    else transferDataSource.push({ label: item.title, value: item.key });
  });
  return transferDataSource;
};

const getTreeData = (data = []) => {
  const values = data.map((item) => item.value);

  const travel = (_treeData = []) => {
    const treeDataSource = [];
    _treeData.forEach((item) => {
      if (item.children || values.includes(item.key)) {
        treeDataSource.push({
          title: item.title,
          key: item.key,
          children: travel(item.children),
        });
      }
    });
    return treeDataSource;
  };

  return travel(treeData);
};

const transferData = getTransferData(treeData);

const value = ['0-0-2-1'];
</script>
```

</details>
