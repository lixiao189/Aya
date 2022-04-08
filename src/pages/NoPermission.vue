<script lang="ts" setup>
// 导入第三方组件
import { NEmpty } from "naive-ui";

// 导入自定义组件
import TopBar from "../components/TopBar.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <TopBar />

  <!-- 没有权限显示的空状态 -->
  <n-empty
    :size="'huge'"
    id="no-permission-state"
    description="你暂时没有资格参加秒杀, 请联系我们的客服"
  >
  </n-empty>

  <Footer />
</template>

<style>
#no-permission-state {
  margin: 30vh auto;
  height: 100px;
}
</style>
