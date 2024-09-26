<template>
  <div class="home">
    <shop-search @handle-change-keyword="handleChangeKeyword" />

    <shop-recommend :list="recommendList" />

    <shop-list :list="topListFilter" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ShopSearch from '@/views/home/c-cpns/shop-search.vue'
import ShopRecommend from '@/views/home/c-cpns/shop-recommend.vue'
import ShopList from '@/views/home/c-cpns/shop-list.vue'
import { getRecommends, getTops } from '@/apis/shop'

// 推荐数据
const recommendList = ref([])
async function initRecommends() {
  const res = await getRecommends(10)
  recommendList.value = res?.feed?.entry ?? []
}
initRecommends()

// 下载量数据
const topList = ref([])
const topListFilter = ref([])
async function initTops() {
  const res = await getTops(100)
  topList.value =
    res?.feed?.entry.map((item: any) => {
      item.rate = getRandomNumber(5) // 随机星级（没有找到字段~~，暂时用个随机数）
      item.comment = getRandomNumber(300) // 随机评论（没有找到字段~~，暂时用个随机数）
      return item
    }) ?? []
  topListFilter.value = topList.value
}
initTops()

function getRandomNumber(num: number): number {
  return Math.floor(Math.random() * (num + 1)) // 产生一个0-5的随机数，然后乘以6后四舍五入到最接近的整数
}

function handleChangeKeyword(keyword: string) {
  // 應⽤名、開發者名 和 應⽤描述
  topListFilter.value = topList.value.filter((item: any) => {
    return item?.['im:name']?.label?.includes(keyword) || item?.category?.attributes?.label.includes(keyword)
  })
}
</script>

<style scoped></style>
