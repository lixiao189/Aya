<script lang="ts" setup>
// 导入 util
import { isOnline } from "../util";

// 引入组件
import Logo from "./Logo.vue";

// 引入第三方组件
import { NCard, NButton, NSpace } from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/reactivity";

// 常量
const route = useRoute();
const router = useRouter();

// compute 变量
const isInOrderPage = computed(() => {
  if (route.path == "/order") return true;
  else return false;
});

// 跳转页面
function jumpToOrder() {
  router.push("/order");
}
</script>

<template>
  <NCard class="top-bar">
    <NSpace justify="space-between">
      <Logo />
      <NButton
        v-if="isOnline"
        @click="jumpToOrder"
        color="rgb(193, 46, 50)"
        round
        :ghost="!isInOrderPage"
      >
        个人订单
      </NButton>
    </NSpace>
  </NCard>
</template>

<style>
.n-card {
  width: 100%;
}
</style>
