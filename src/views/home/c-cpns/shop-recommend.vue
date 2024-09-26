<template>
  <div class="shop-recommend">
    <span>Recommend</span>

    <div class="item-wrap">
      <b-scroll :scroll-x="true" :scroll-y="false" :style="{ width: '100%', borderBottom: '1px solid #eee', paddingBottom: '5px' }" width="auto">
        <van-space :size="10">
          <div class="item" v-for="item in list" :key="item">
            <img :src="item?.['im:image']?.[0]?.label" alt="" />

            <p class="line-1">{{ item?.['im:name']?.label }}</p>
            <span>{{ item?.category?.attributes?.label }}</span>
          </div>
        </van-space>
      </b-scroll>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  list: any[]
}

defineProps<IProps>()
</script>

<style scoped lang="less">
.shop-recommend {
  box-sizing: border-box;
  padding: 10px;
  h5 {
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 10px;
  }

  .item-wrap {
    .item {
      width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      img {
        width: 100%;
        height: 100px;
        border-radius: 20px;
      }

      p {
        width: 100%;
        text-align: center;
        padding: 5px 0;
        font-size: 12px;
      }

      span {
        width: 100%;
        padding-bottom: 5px;
        font-size: 12px;
        text-align: center;
        color: #ccc;
      }
    }
  }
}
</style>
