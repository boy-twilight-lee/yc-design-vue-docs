# 暗黑模式

组件库内置暗色的主题，你可以轻易的切换到暗色。

## 切换到暗黑模式

组件库通过 BODY 标签上的 yc-design-theme 属性来标明当前的主题，所以你只要修改这个属性，即可完成主题的切换。

```typescript
// 设置为暗黑主题
document.body.setAttribute('yc-design-theme', 'dark');
// 恢复亮色主题
document.body.removeAttribute('yc-design-theme');
```
