<template>
  <div class="shop-search">
    <van-search v-model="keyword" placeholder="搜索" input-align="center" @update:model-value="handleChangeKeyword" :clearable="false" shape="round" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from '@/utils/common/debounce-or-throttle.ts'
const emits = defineEmits(['handleChangeKeyword'])
const keyword = ref()

const db = debounce(() => {
  emits('handleChangeKeyword', keyword.value)
}, 500)
function handleChangeKeyword() {
  db()
}
</script>

<style scoped lang="less">
.shop-search {
  :deep(.van-search__content) {
    background: #f6f6f6;
  }
  border-bottom: 1px solid #f6f6f6;
}
</style>
