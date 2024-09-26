<template>
  <div class="nav-bar">
    <slot name="left"></slot>
    <div class="center-wrap">
      <slot name="center"></slot>
    </div>

    <slot name="right"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.nav-bar {
  box-sizing: border-box;
  padding: 0 18px 0;
  height: 44px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background: rgba(238, 238, 238, 0.85);
  .center-wrap {
    font-family: PingFang SC;
    font-size: 17px;
    line-height: 17px;
    font-weight: 500;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
}
</style>
