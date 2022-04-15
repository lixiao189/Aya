<script lang="ts" setup>
// 引入组件
import Logo from "./Logo.vue";

// 引入第三方组件
import { ref, onMounted, withDefaults, defineProps } from "vue";
import { NButton, NSpace } from "naive-ui";
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

withDefaults(defineProps<{ noButton: boolean }>(), {
  noButton: false,
});

// 跳转页面
function jumpToOrder() {
  router.push("/order");
}

// 退出登录
function logout() {
  localStorage.removeItem("token");
  router.push("/login");
}

const inLogin = ref(false);

onMounted(() => {
  if (localStorage.getItem("token") !== null) {
    inLogin.value = true;
  }
});
</script>

<template>
  <NSpace justify="space-between" class="top-bar">
    <Logo />
    <div v-if="!noButton && inLogin" id="profile">
      <div
        @click="jumpToOrder"
        style="margin-right: 10px; border-radius: 3px"
        :class="{ 'button-active': isInOrderPage }"
      >
        我的订单
      </div>
      <div @click="logout" style="border-radius: 3px">退出登录</div>
    </div>
    <NButton
      v-if="!noButton && !inLogin"
      @click="router.push('/login')"
      color="rgb(193, 46, 50)"
      round
      :ghost="false"
    >
      点击登录
    </NButton>
  </NSpace>
</template>

<style scoped>
.top-bar {
  box-sizing: border-box;
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  height: 78px;
  padding: 20px 24px 20px 24px;
}
#profile {
  height: 34px;
}

#profile > div {
  box-sizing: border-box;
  display: inline-block;
  width: 80px;
  height: 100%;
  border: 1px solid rgb(193, 46, 50);
  color: rgb(193, 46, 50);
  line-height: 34px;
  text-align: center;
  cursor: pointer;
}

.button-active {
  background-color: rgb(193, 46, 50);
  color: white !important;
}
</style>
