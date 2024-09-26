<template>
  <div class="shop-list">
    <b-scroll :scroll-y="true" :style="{ width: '100%', height: '100%', boxSizing: 'border-box' }">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span class="ind">{{ index + 1 }}</span>
        <img :src="item?.['im:image']?.[0]?.label" alt="" />
        <div class="info">
          <p class="name line-1">{{ item?.['im:name']?.label }}</p>
          <span class="type">{{ item?.category?.attributes?.label }}</span>
          <p class="comment-wrap">
            <van-rate v-model="item.rate" :size="10" color="#ffd21e" void-icon="star" void-color="#eee" />
            <span class="comment">({{ item.comment }})</span>
          </p>
        </div>
      </div>
    </b-scroll>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  list: any[]
}

defineProps<IProps>()
</script>

<style scoped lang="less">
.shop-list {
  box-sizing: border-box;
  padding: 10px;
  height: calc(100vh - 250px);
  .item {
    border-bottom: 1px solid #ccc;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 0;
    .ind {
      margin-right: 10px;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 20px;
      margin-right: 10px;
    }

    .info {
      width: calc(100% - 100px);
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .name {
        width: 100%;
        padding: 5px 0;
        font-size: 14px;
      }
      .type {
        width: 100%;
        padding-bottom: 5px;
        font-size: 12px;
        color: #ccc;
      }

      .comment-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .comment {
          margin-left: 5px;
          font-size: 12px;
          transform: scale(0.8);
        }
      }
    }
  }
}
</style>
