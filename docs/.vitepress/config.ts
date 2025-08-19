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
            { text: 'Button 按钮', link: '/components/button/index.md' },
            { text: 'Link 链接', link: '/components/link/index.md' },
            {
              text: 'Typography 排版',
              link: '/components/typography/index.md',
            },
          ],
        },
        {
          text: '布局',
          items: [
            { text: 'Divider 分割线', link: '/components/divider/index.md' },
            { text: 'Grid 栅格', link: '/components/grid/index.md' },
            { text: 'Layout 布局', link: '/components/layout/index.md' },
            { text: 'Space 间距', link: '/components/space/index.md' },
          ],
        },
        {
          text: '数据展示',
          items: [
            { text: 'Avatar 头像', link: '/components/avatar/index.md' },
            { text: 'Badge 徽标', link: '/components/badge/index.md' },
            { text: 'Calendar 日历', link: '/components/calendar/index.md' },
            { text: 'Card 卡片', link: '/components/card/index.md' },
            { text: 'Carousel 走马灯', link: '/components/carousel/index.md' },
            {
              text: 'Collapse 折叠面板',
              link: '/components/collapse/index.md',
            },
            { text: 'Comment 评论', link: '/components/comment/index.md' },
            {
              text: 'Descriptions 描述列表',
              link: '/components/descriptions/index.md',
            },
            { text: 'Empty 空状态', link: '/components/empty/index.md' },
            {
              text: 'Image 图片',
              link: '/components/image/index.md',
            },
            { text: 'List 列表', link: '/components/list/index.md' },
            { text: 'Popover 气泡卡片', link: '/components/popover/index.md' },
            { text: 'Statistic 统计数值', link: '/components/statistic' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Timeline 时间轴', link: '/components/timeline' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' },
          ],
        },
        {
          text: '数据录入',
          items: [
            { text: 'Input 输入框', link: '/components/input' },
            {
              text: 'InputNumber 数字输入框',
              link: '/components/input-number',
            },
            { text: 'InputTag 输入标签', link: '/components/input-tag' },
            { text: 'Textarea 文本域', link: '/components/textarea' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Slider 滑块', link: '/components/slider' },
            { text: 'Rate 评分', link: '/components/rate' },
            { text: 'Cascader 级联选择器', link: '/components/cascader' },
            { text: 'TimePicker 时间选择器', link: '/components/time-picker' },
            {
              text: 'ColorPicker 颜色选择器',
              link: '/components/color-picker',
            },
            { text: 'Transfer 穿梭框', link: '/components/transfer' },
            {
              text: 'AutoComplete 自动完成',
              link: '/components/auto-complete',
            },
            { text: 'Mention 提及', link: '/components/mention' },
            {
              text: 'VerificationCode 验证码',
              link: '/components/verification-code',
            },
          ],
        },
        {
          text: '反馈',
          items: [
            { text: 'Alert 警告', link: '/components/alert' },
            { text: 'Drawer 抽屉', link: '/components/drawer' },
            { text: 'Message 全局提示', link: '/components/message' },
            { text: 'Modal 对话框', link: '/components/modal' },
            { text: 'Notification 通知提醒', link: '/components/notification' },
            { text: 'Popconfirm 气泡确认框', link: '/components/popconfirm' },
            { text: 'Progress 进度条', link: '/components/progress' },
            { text: 'Result 结果', link: '/components/result' },
            { text: 'Spin 加载中', link: '/components/spin' },
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
          ],
        },
        {
          text: '导航',
          items: [
            { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
            { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
            { text: 'Menu 导航菜单', link: '/components/menu' },
            { text: 'PageHeader 页头', link: '/components/page-header' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'Steps 步骤条', link: '/components/steps' },
          ],
        },
        {
          text: '其他',
          items: [
            { text: 'Affix 固钉', link: '/components/affix' },
            { text: 'Anchor 锚点', link: '/components/anchor' },
            { text: 'BackTop 回到顶部', link: '/components/back-top' },
            {
              text: 'ConfigProvider 全局配置',
              link: '/components/config-provider',
            },
            { text: 'ResizeBox 调整尺寸', link: '/components/resize-box' },
            { text: 'Trigger 触发器', link: '/components/trigger' },
            { text: 'Split 分割面板', link: '/components/split' },
            {
              text: 'OverflowList 溢出列表',
              link: '/components/overflow-list',
            },
            { text: 'Scrollbar 滚动条', link: '/components/scrollbar' },
            { text: 'Watermark 水印', link: '/components/watermark' },
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
  vite: {
    server: {
      open: true,
    },
    plugins: [],
  },
});
