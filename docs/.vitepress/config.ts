import { defineConfig } from 'vitepress';

// iconpath
const iconPath = '/logo.svg';

export default defineConfig({
  title: 'Yc Design Vue',
  description: '基于 Vue 3 和 TypeScript 构建的现代化企业级 UI 组件库',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', href: iconPath }],
    ['meta', { name: 'theme-color', content: '#165DFF' }],
  ],
  themeConfig: {
    logo: iconPath,
    siteTitle: 'Yc Design Vue',
    outline: {
      level: [2, 3],
    },
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button' },
      {
        text: 'GitHub',
        link: 'https://github.com/boy-twilight-lee/yc-design-vue',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            { text: '快速上手', link: '/guide/' },
            { text: '安装', link: '/guide/installation' },
            { text: '按需引入', link: '/guide/import' },
            { text: '主题定制', link: '/guide/theme' },
          ],
        },
      ],
      '/components/': [
        {
          text: '通用',
          items: [
            { text: '按钮 Button', link: '/components/button/index.md' },
            { text: '链接 Link', link: '/components/link/index.md' },
            {
              text: '排版 Typography',
              link: '/components/typography/index.md',
            },
          ],
        },
        {
          text: '布局',
          items: [
            { text: '分割线 Divider', link: '/components/divider/index.md' },
            { text: '栅格 Grid', link: '/components/grid/index.md' },
            { text: '布局 Layout', link: '/components/layout/index.md' },
            { text: '间距 Space', link: '/components/space/index.md' },
          ],
        },
        {
          text: '数据展示',
          items: [
            { text: '头像 Avatar', link: '/components/avatar/index.md' },
            { text: '徽标 Badge', link: '/components/badge/index.md' },
            { text: '日历 Calendar', link: '/components/calendar/index.md' },
            { text: '卡片 Card', link: '/components/card/index.md' },
            {
              text: '图片轮播 Carousel',
              link: '/components/carousel/index.md',
            },
            {
              text: '折叠面板 Collapse',
              link: '/components/collapse/index.md',
            },
            { text: '评论 Comment', link: '/components/comment/index.md' },
            {
              text: '描述列表 Descriptions',
              link: '/components/descriptions/index.md',
            },
            { text: '空状态 Empty', link: '/components/empty/index.md' },
            {
              text: '图片 Image',
              link: '/components/image/index.md',
            },
            { text: '列表 List', link: '/components/list/index.md' },
            { text: '气泡卡片 Popover', link: '/components/popover/index.md' },
            {
              text: '数值显示 Statistic',
              link: '/components/statistic/index.md',
            },
            { text: '标签页 Tabs', link: '/components/tabs/index.md' },
            { text: '标签 Tag', link: '/components/tag/index.md' },
            { text: '时间轴 Timeline', link: '/components/timeline/index.md' },
            { text: '文字气泡 Tooltip', link: '/components/tooltip/index.md' },
          ],
        },
        {
          text: '数据录入',
          items: [
            {
              text: '自动补全 AutoComplete',
              link: '/components/auto-complete/index.md',
            },
            {
              text: '级联选择 Cascader',
              link: '/components/cascader/index.md',
            },
            { text: '复选框 Checkbox', link: '/components/checkbox/index.md' },
            {
              text: '颜色选择器 ColorPicker',
              link: '/components/color-picker/index.md',
            },
            { text: '输入框 Input', link: '/components/input/index.md' },
            {
              text: '数字输入框 InputNumber',
              link: '/components/input-number/index.md',
            },
            {
              text: '验证码 VerificationCode',
              link: '/components/verification-code/index.md',
            },
            {
              text: '标签输入框 InputTag',
              link: '/components/input-tag/index.md',
            },
            { text: '提及 Mention', link: '/components/mention/index.md' },
            { text: '单选框 Radio', link: '/components/radio' },
            { text: '评分 Rate', link: '/components/rate' },
            { text: '选择器 Select', link: '/components/select' },
            { text: '滑块 Slider', link: '/components/slider' },
            { text: '开关 Switch', link: '/components/switch' },
            { text: '文本域 Textarea', link: '/components/textarea' },
            { text: '时间选择器 TimePicker', link: '/components/time-picker' },
            { text: '数据穿梭框 Transfer', link: '/components/transfer' },
          ],
        },
        {
          text: '反馈',
          items: [
            { text: '警告 Alert', link: '/components/alert' },
            { text: '抽屉 Drawer', link: '/components/drawer' },
            { text: '全局提示 Message', link: '/components/message' },
            { text: '对话框 Modal', link: '/components/modal' },
            { text: '通知提醒 Notification', link: '/components/notification' },
            { text: '气泡确认框 Popconfirm', link: '/components/popconfirm' },
            { text: '进度条 Progress', link: '/components/progress' },
            { text: '结果 Result', link: '/components/result' },
            { text: '加载中 Spin', link: '/components/spin' },
            { text: '骨架屏 Skeleton', link: '/components/skeleton' },
          ],
        },
        {
          text: '导航',
          items: [
            { text: '面包屑 Breadcrumb', link: '/components/breadcrumb' },
            { text: '下拉菜单 Dropdown', link: '/components/dropdown' },
            { text: '导航菜单 Menu', link: '/components/menu' },
            { text: '页头 PageHeader', link: '/components/page-header' },
            { text: '分页 Pagination', link: '/components/pagination' },
            { text: '步骤条 Steps', link: '/components/steps' },
          ],
        },
        {
          text: '其他',
          items: [
            { text: '固钉 Affix', link: '/components/affix' },
            { text: '锚点 Anchor', link: '/components/anchor' },
            { text: '回到顶部 BackTop', link: '/components/back-top' },
            {
              text: '全局配置 ConfigProvider',
              link: '/components/config-provider',
            },
            { text: '调整尺寸 ResizeBox', link: '/components/resize-box' },
            { text: '触发器 Trigger', link: '/components/trigger' },
            { text: '分割面板 Split', link: '/components/split' },
            {
              text: '溢出列表 OverflowList',
              link: '/components/overflow-list',
            },
            { text: '滚动条 Scrollbar', link: '/components/scrollbar' },
            { text: '水印 Watermark', link: '/components/watermark' },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/boy-twilight-lee/yc-design-vue',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Yc Design Vue',
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },
  },
  ignoreDeadLinks: true,
  vite: {
    ssr: {
      noExternal: [
        'yc-design-vue',
        '@arco-design/web-vue',
        'nanoid',
        'scroll-into-view-if-needed',
      ],
    },
  },
});
