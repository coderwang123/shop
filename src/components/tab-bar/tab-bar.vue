<template>
  <ul class="tab-bar-wrap">
    <li
      v-for="(item, index) in tabBarList"
      :key="index"
      @click.stop="handleTabBarItemClick(item.path, index)"
    >
      <div class="icon-wrap">
        <van-icon
          :name="currentIndex === index ? item.iconNameActive : item.iconName"
          :size="25"
          color="#191919"
          :class="currentIndex === index ? 'active' : ''"
        />
        <span class="num" v-if="index == 0"> ··· </span>
        <span class="inform" v-if="index == 2"></span>
      </div>
      <span class="name" :class="currentIndex === index ? 'active' : ''">
        {{ item.name }}
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const currentIndex = ref(0)

const router = useRouter()
const route = useRoute()
function handleTabBarItemClick(path: string, index: number) {
  currentIndex.value = index
  router.push(path)
}

watch(route, (newRoute) => {
  const index = tabBarList.findIndex((item) => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})

const tabBarList = reactive([
  {
    name: '微信',
    iconName: 'chat-o',
    iconNameActive: 'chat',
    path: '/chat-list'
  },
  {
    name: '通讯录',
    iconName: 'manager-o',
    iconNameActive: 'manager',
    path: '/contacts'
  },
  {
    name: '发现',
    iconName: 'underway-o',
    iconNameActive: 'underway',
    path: '/discovery'
  },
  {
    name: '我',
    iconName: 'user-o',
    iconNameActive: 'user',
    path: '/mine'
  }
])
</script>

<style lang="less" scoped>
.tab-bar-wrap {
  width: 100%;
  height: 56px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  border-top: 0.33px solid #e5e5e5;

  position: fixed;
  bottom: 0;
  left: 0;

  li {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon-wrap {
      position: relative;
      .num {
        position: absolute;
        border-radius: 100px;
        top: -6px;
        right: -20px;
        padding: 2px 7.5px;
        background: #fa5051;
        font-size: 16px;
        line-height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }

      .inform {
        position: absolute;
        border-radius: 50%;
        top: -1px;
        right: -1px;
        width: 8px;
        height: 8px;
        background: #fa5051;
      }
    }
    .name {
      margin-top: 5px;
      font-family: PingFang SC;
      font-size: 10px;
      line-height: 10px;
      font-weight: normal;
      color: #191919;
    }

    .active {
      color: #07c160 !important;
    }
  }
}
</style>
