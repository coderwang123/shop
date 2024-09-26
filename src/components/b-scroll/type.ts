import type { CSSProperties } from 'vue'

export interface IBs {
  style?: CSSProperties // 描述: 可用于设置浮层的样式，调整浮层位置等 、 默认值: -
  // slotContent?: () => React.ReactNode;
  // children?: ReactNode | undefined;
  contentPadding?: string
  probeType?: 1 | 2 | 3
  scrollY?: boolean
  scrollX?: boolean
  click?: boolean
  isUsePullingUp?: boolean
  isUsePullingDown?: boolean
  isUseScrollStart?: boolean
  isUserScroll?: boolean
  isUseScrollEnd?: boolean
  bounce?: boolean // 作用：当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画。、默认值：true
  bounceTime?: number //作用：设置回弹动画的动画时长、默认值：800（单位ms）
  width?: 'auto' | string
  scrollbar?: {
    fade?: boolean
  }
}
