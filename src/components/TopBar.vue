<script lang="ts" setup>
// 引入组件
import Logo from "./Logo.vue";

// 引入第三方组件
import { NCard, NButton, NSpace } from "naive-ui";
</script>

<template>
  <NCard class="top-bar">
    <NSpace justify="space-between">
      <Logo />
      <n-button round>个人订单</n-button>
    </NSpace>
  </NCard>
</template>

<style>
.n-card {
  width: 100%;
}
</style>
