<template>
  <div class="scroll-wrap" ref="scrollRef" :style="{ width: '100%' ?? width, height: '100%', ...style }">
    <div class="bs-content" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBScroll } from '@/hooks/use-b-scroll.ts'
import type { IBs } from '@/components/b-scroll/type.ts'

const props = defineProps<IBs>()
const emits = defineEmits(['handleScrollChange'])

const { width, style, ...rest } = props
// console.log("rest ===>", rest);

const { scrollRef, scrollTo, scrollToElement } = useBScroll(emits, rest)

const contentStyle = computed(() => {
  if (props.width == 'auto') {
    return {
      justifyContent: 'center',
      alignItems: 'center'
    }
  } else {
    return {}
  }
})

const bs_content_width = ref(props.width)
const bs_content_display = ref(props.width != 'auto' ? 'block' : 'inline-flex')

defineExpose({ scrollTo, scrollToElement })
</script>

<style scoped lang="less">
.scroll-wrap {
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  z-index: 1;
  // 是否允许复制
  //-webkit-user-select: none;
  //-moz-user-select: none;
  //-ms-user-select: none;
  //user-select: none;
  //background: rgba(200, 193, 210, 0.9);

  //padding: 10px;
  //background: antiquewhite;

  .bs-content {
    height: auto;
    width: v-bind(bs_content_width);
    //border: 2px solid red;
    box-sizing: border-box;
    display: v-bind(bs_content_display);
  }

  :deep(.bscroll-vertical-scrollbar) {
    width: 3px !important;

    .bscroll-indicator {
      border: none !important;
    }
  }
}
</style>
