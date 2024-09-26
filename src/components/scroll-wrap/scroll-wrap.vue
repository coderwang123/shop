<template>
  <div
    class="scroll-wrap"
    :style="{
      width: wrapWidth,
      height: wrapHeight
    }"
    ref="scrollRef"
  >
    <div class="content" :style="{ padding: contentPadding }">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import BScroll from '@better-scroll/core'

import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
import Pullup from '@better-scroll/pull-up'
import Pulldown from '@better-scroll/pull-down'

BScroll.use(MouseWheel) //鼠标滚轮
BScroll.use(ScrollBar) //滚动条
BScroll.use(Pullup) // 触发了下拉
BScroll.use(Pulldown) // 触发了上拉

interface IProps {
  wrapWidth?: string // 滚动wrap 宽度
  wrapHeight?: string // 滚动wrap 高度
  contentPadding?: string // 内容content padding
  probeType?: 1 | 2 | 3 // 1 滚动的时候 会派发 scroll事件，会 截流。2 滚动的时候 实时派发 scroll事件，不会 截流。3 除了 实时派发 scroll事件，在 swipe的 情况下 仍然能 实时 派发 scroll事件
  scrollY?: boolean // 是否 开启 纵向滚动，默认 纵向滚动。
  scrollX?: boolean // 是否 开启 横向滚动，默认 纵向滚动。开启 横向滚动 需要将 传入元素 设置为 横向例如：display:inline-block
  click?: boolean // 点击列表 是否 派发 click事件

  isUsePullingUp?: boolean // 是否 使用 滚动到 底部的 事件，用于 上拉加载，默认 true
  isUsePullingDown?: boolean // 是否 使用  滚动到 顶部的 事件，用于 下拉刷新，默认 true

  isUseScrollStart?: boolean // 是否开启 滚动前 的 监听事件
  isUserScroll?: boolean // 是否开启 正在滚动 的 监听事件
  isUseScrollEnd?: boolean // 是否开启 滚动结束 的 监听事件
}
const props = withDefaults(defineProps<IProps>(), {
  wrapWidth: '100%',
  wrapHeight: '100%',
  contentPadding: '0px',
  probeType: 1,
  scrollY: true,
  scrollX: false,
  click: true,

  isUsePullingDown: false,
  isUsePullingUp: false,

  isUseScrollStart: false,
  isUserScroll: false,
  isUseScrollEnd: false
})
console.log('props ====> ', props)

const emit = defineEmits([
  'handleScrollStart',
  'handleScroll',
  'handleScrollEnd',
  'handlePullingUp',
  'handlePullingDown'
])

let bs: BScroll | null

const scrollRef = ref()

async function initScroll() {
  bs = new BScroll(scrollRef.value, {
    scrollY: props.scrollY, // 沿 y轴 滚动
    scrollX: props.scrollX, // 沿 x轴 滚动
    probeType: props.probeType, // 反向偏移量
    click: props.click, // 派发点击事件

    pullDownRefresh: props.isUsePullingDown, // 下拉刷新
    pullUpLoad: props.isUsePullingUp, // 上拉加载

    mouseWheel: true, // 开启鼠标滚轮插件
    scrollbar: true, // 开启滚动条插件
    preventDefault: true,
    tap: true
  })

  // 开启 滚动前 监听事件，触发时机：content 元素 满足 滚动条件，即将 开始 滚动
  if (props.isUseScrollStart) {
    bs.on('scrollStart', () => {
      emit('handleScrollStart')
    })
  }

  // 开启 滚动中 监听事件，触发时机：正在滚动
  if (props.isUserScroll) {
    bs.on('scroll', (position: { x: number; y: number }) => {
      emit('handleScroll', position)
    })
  }

  // 开启 滚动后 监听事件，触发时机：滚动结束，或者让一个正在滚动的 content 强制停止
  if (props.isUseScrollEnd) {
    bs.on('scrollEnd', () => {
      emit('handleScrollEnd')
    })
  }

  // 开启 下拉刷新，触发时机：当顶部 下拉距离 超过阈值
  if (props.isUsePullingDown) {
    bs.on('pullingDown', () => {
      console.log('触发了上拉')
      emit('handlePullingDown')
      bs?.finishPullDown()
    })
  }

  // 开启 上拉加载，触发时机：当底部 下拉距离 超过阈值
  if (props.isUsePullingUp) {
    bs.on('pullingUp', () => {
      console.log('触发了下拉')
      emit('handlePullingUp')
      bs?.finishPullUp()
    })
  }

  await nextTick()

  handleScrollRefresh() // 更新 BScroll
}

onMounted(() => {
  initScroll()
})

onUnmounted(() => {
  bs = null
})

function handleScrollTo(position?: { x?: number; y?: number }) {
  bs?.scrollTo(position?.x ?? 0, position?.y ?? bs?.maxScrollY)
}

function handleScrollRefresh() {
  bs?.refresh() // 更新 BScroll
}

defineExpose({ handleScrollTo, handleScrollRefresh })
</script>

<style lang="less" scoped>
.scroll-wrap {
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  z-index: 1;
  //border: 1px solid red;
  //background: rebeccapurple;
  .content {
    height: auto;
  }

  :deep(.bscroll-vertical-scrollbar) {
    width: 3px !important;
    .bscroll-indicator {
      border: none !important;
    }
  }
}
</style>
