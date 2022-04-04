<script lang="ts" setup>
import Footer from "../components/Footer.vue";
import Logo from "../components/Logo.vue";
import LoginForm from "../components/admin/LoginForm.vue";
import { useMessage } from "naive-ui";
import { redirect } from "../util";
import { useRouter } from "vue-router";

const infoString = localStorage.getItem("admin");
if (infoString !== null) {
  const msg = useMessage();
  msg.info("您已登录，正在跳转..");
  redirect(useRouter(), "/admin");
}
</script>

<template>
  <Logo />
  <LoginForm :loading="infoString !== null" />
  <Footer />
</template>
