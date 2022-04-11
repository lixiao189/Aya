<script lang="ts" setup>
// 导入 util
import { isOnline } from "../util";

// 引入组件
import Logo from "./Logo.vue";

// 引入第三方组件
import { ref, onMounted } from "vue";
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

// 退出登录
function logout() {
  localStorage.removeItem('token');
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
  <NCard class="top-bar">
    <NSpace justify="space-between">
      <Logo />
      <div v-if="inLogin" id="profile">
        <div @click="jumpToOrder" style="border-radius: 17px 0 0 17px;margin-right: 2px;" :class="{'button-active':isInOrderPage}">我的订单</div>
        <div @click="logout" style="border-radius: 0 17px 17px 0;">退出登录</div>
      </div>
      <NButton
        v-if="!inLogin"
        @click="router.push('/login')"
        color="rgb(193, 46, 50)"
        round
        :ghost="false"
      >
        点击登录
      </NButton>
    </NSpace>
  </NCard>
</template>

<style>
.n-card {
  width: 100%;
}

#profile {
  height: 34px;
}

#profile > div{
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
