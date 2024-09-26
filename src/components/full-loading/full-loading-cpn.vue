<template>
  <div v-if="visible" class="loading-overlay">
    <!--    <div class="loading-spinner"></div>-->
    <van-loading size="24px" vertical color="#0094ff">加载中...</van-loading>
    <!--    <p>{{ message }}</p>-->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')

function open(msg: string) {
  message.value = msg
  visible.value = true
}

function close() {
  visible.value = false
}

defineExpose({ open, close })
</script>

<style lang="less" scoped>
//.full-loading {
//  position: absolute;
//  inset: 0;
//  z-index: 9999;
//  margin: auto;
//  background-color: #7f7d7db9;
//
//  .loader-cogs {
//    position: absolute;
//    top: -20px !important;
//    top: 0;
//    right: 0;
//    bottom: 0;
//    left: 0;
//    z-index: -2;
//    margin: auto;
//    width: 100px;
//    height: 100px;
//    // position: relative;
//  }
//}

.loading-overlay {
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background: rgba(230, 253, 260, 0.6);
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999999;
  p {
    margin-top: 60px;
    font-size: 26px;
    color: var(--kl-color-blue-1);
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-spinner {
    position: relative;
    //width: 106px;
    //height: 56px;
    //background-image: linear-gradient(#29d78b 50px, transparent 0),
    //  linear-gradient(#29d78b 50px, transparent 0), linear-gradient(#29d78b 50px, transparent 0),
    //  linear-gradient(#29d78b 50px, transparent 0),
    //  radial-gradient(circle 14px, #29d78b 100%, transparent 0);
    //background-size: 48px 15px, 15px 35px, 15px 35px, 25px 15px, 28px 28px;
    //background-position: 25px 5px, 58px 20px, 25px 17px, 2px 37px, 76px 0px;
    //background-repeat: no-repeat;
    //transform: rotate(-45deg);
    //
    //&::after,
    //&::before {
    //  content: "";
    //  position: absolute;
    //  left: -45px;
    //  top: -10px;
    //  width: 56px;
    //  height: 56px;
    //  border: 6px solid #29d78b;
    //  border-radius: 50%;
    //  background-repeat: no-repeat;
    //  background-image: linear-gradient(#29d78b 64px, transparent 0),
    //    linear-gradient(#29d78b 66px, transparent 0),
    //    radial-gradient(circle 4px, #29d78b 100%, transparent 0);
    //  background-size: 40px 1px, 1px 40px, 8px 8px;
    //  background-position: center center;
    //  -webkit-animation: rotation 0.3s linear infinite;
    //  animation: rotation 0.3s linear infinite;
    //}
    //
    //&::before {
    //  left: 25px;
    //  top: 60px;
    //}
  }
}
</style>
