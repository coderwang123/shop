import BScroll from '@better-scroll/core'

import type { IBs } from '@/components/b-scroll/type'
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import type { EventEmitter } from '@better-scroll/shared-utils'

import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
import Pullup from '@better-scroll/pull-up'
import Pulldown from '@better-scroll/pull-down'
import ObserveDOM from '@better-scroll/observe-dom'
import NestedScroll from '@better-scroll/nested-scroll'
import { onMounted, ref, watch } from 'vue'
import { debounce } from '@/utils/common/debounce-or-throttle'

BScroll.use(MouseWheel) //鼠标滚轮
BScroll.use(ScrollBar) //滚动条
BScroll.use(Pullup) // 触发了下拉
BScroll.use(Pulldown) // 触发了上拉
BScroll.use(ObserveDOM) // 触发了上拉
BScroll.use(NestedScroll) // 协调嵌套的 BetterScroll 滚动行为

export function useBScroll(emits: any, props?: IBs) {
  console.log('props ==>', props)
  const scrollRef = ref<any>(null)

  let hooks: EventEmitter | any
  const bs = ref<BScrollConstructor | null | any>(null)

  onMounted(() => {
    init()
  })

  // [props?.scrollX, props?.scrollY, props?.probeType, props?.click, props?.isUsePullingDown, props?.isUsePullingUp, props?.bounce, props?.bounceTime]
  watch(
    () => props,
    () => {
      init()
    }
  )

  function init() {
    bs.value = new BScroll(scrollRef.value, {
      scrollY: props?.scrollY ?? true, // 沿 y轴 滚动
      scrollX: props?.scrollX ?? false, // 沿 x轴 滚动
      probeType: props?.probeType, // 反向偏移量

      click: props?.click ?? false, // 派发点击事件
      // pullDownRefresh: props?.isUsePullingDown ?? false, // 下拉刷新
      // pullUpLoad: props?.isUsePullingUp ?? false, // 上拉加载

      mouseWheel: true, // 开启鼠标滚轮插件

      scrollbar: {
        fade: props?.scrollbar?.fade ?? true,
        interactive: true, // 滚动条是否可以交互
        scrollbarTrackClickable: true // 滚动条轨道是否允许点击
      },

      preventDefault: false,
      autoBlur: false,
      bounce: props?.bounce,

      bounceTime: props?.bounceTime,
      stopPropagation: false,
      observeDOM: true, // 开启 observe-dom 插件
      nestedScroll: true

      // ------ test
      // bindToTarget: true
    })

    // // 初始化 hooks
    hooks = bs.value?.scroller?.hooks
    // 触发时机：window 尺寸发生改变
    hooks?.on('resize', () => {
      // console.log(' ----------- useBScroll 窗口改变 -----------')
      bs.value?.refresh() // 更新 BScroll
    })

    bs.value?.refresh() // 更新 BScroll
    // // 方法
    // // 开启 滚动前 监听事件，触发时机：content 元素 满足 滚动条件，即将 开始 滚动
    if (props?.isUseScrollStart) {
      // bs?.on("scrollStart", () => {
      //   // emit("handleScrollStart");
      // });
    }
    //
    // 开启 滚动中 监听事件，触发时机：正在滚动
    if (props?.isUserScroll) {
      const hideDebounceFn = debounce(debounceScroll, 100)
      bs.value.on('scroll', hideDebounceFn)

      function debounceScroll(position: { x: number; y: number }) {
        // console.log('bs.value.maxScrollY', Math.abs(bs.value!.maxScrollY) == Math.abs(position.y))
        // console.log('bs.value.maxScrollY', Math.abs(bs.value!.maxScrollY))
        // console.log('bs.value.maxScrollY', Math.abs(position.y))
        emits('handleScrollChange', Math.abs(position.y), Math.abs(bs.value!.maxScrollY) == Math.abs(position.y))
      }
    }

    // 开启 滚动后 监听事件，触发时机：滚动结束，或者让一个正在滚动的 content 强制停止
    if (props?.isUseScrollEnd) {
      // bs?.on("scrollEnd", () => {
      //   // emit("handleScrollEnd");
      // });
    }

    // 开启 下拉刷新，触发时机：当顶部 下拉距离 超过阈值
    if (props?.isUsePullingDown) {
      // bs?.on("pullingDown", () => {
      //   console.log("触发了上拉");
      //   // emit("handlePullingDown");
      //   bs?.finishPullDown();
      // });
    }

    // 开启 上拉加载，触发时机：当底部 下拉距离 超过阈值
    if (props && props?.isUsePullingUp) {
      // bs?.on("pullingUp", () => {
      //   console.log("触发了下拉");
      //   // emit("handlePullingUp");
      //   bs?.finishPullUp();
      // });
    }
    return () => {
      bs.value?.destroy()
    }
  }

  function scrollTo(posY: number) {
    if (bs) {
      bs.value?.scrollTo?.(0, -posY, 500)
    }
  }

  function scrollToElement(el: HTMLElement) {
    if (bs) {
      bs.value?.scrollToElement(el, 500)
    }
  }

  onMounted(() => {
    // 监听右键点击事件并阻止默认行为
    document.addEventListener('contextmenu', e => {
      if (bs.value!.enabled) {
        e.preventDefault()
      }
    })
  })

  //
  // // console.log("定义 props bs ref ===> ", scrollRef);
  // console.log(" ----------- useBScroll scrollRef -----------", scrollRef);

  return {
    scrollRef,
    bs,
    scrollTo,
    scrollToElement
  }
}
