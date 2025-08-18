## API

### Props

| 参数                     | 说明                 | 类型                    | 默认值  |
| ------------------------ | -------------------- | ----------------------- | ------- |
| current                  | 当前显示的轮播项索引 | `number`                | -       |
| defaultCurrent           | 默认显示的轮播项索引 | `number`                | `0`     |
| autoPlay                 | 是否自动播放         | `AutoPlay`              | `false` |
| moveSpeed                | 移动速度             | `number`                | -       |
| animationName            | 动画效果             | `CarouselAnimationName` | -       |
| trigger                  | 指示器触发方式       | `IndicatorTrigger`      | -       |
| direction                | 轮播方向             | `Direction`             | -       |
| showArrow                | 箭头显示方式         | `CarouselShowArrow`     | -       |
| arrowClass               | 箭头样式类           | `ClassName`             | -       |
| indicatorType            | 指示器类型           | `IndicatorType`         | -       |
| indicatorPosition        | 指示器位置           | `IndicatorPosition`     | -       |
| indicatorClass           | 指示器样式类         | `ClassName`             | -       |
| transitionTimingFunction | 过渡时间函数         | `string`                | -       |

### Events

| 事件名         | 说明               | 回调参数                                               |
| -------------- | ------------------ | ------------------------------------------------------ |
| update:current | 当前索引变化时触发 | `(index: number)`                                      |
| change         | 轮播变化时触发     | `(index: number, preIndex: number, isManual: boolean)` |

### Slots

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 轮播项内容 |
