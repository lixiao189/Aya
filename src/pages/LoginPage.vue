<script lang="ts" setup>
import { RouterLink } from "vue-router";
import LoginBackground from "../components/login/LoginBackground.vue";
</script>

<template>
  <RouterLink to="/"><div id="logo-img" /></RouterLink>
  <div id="login-form"></div>

  <LoginBackground />

  <footer id="login-page-footer">
    Copyright © 2004-2022 重嘤猛男团队 版权所有
  </footer>
</template>

<style>
#logo-img {
  margin-top: 20px;
  margin-left: 18px;
  width: 400px;
  height: 50px;
  background: url("/src/assets/logo.png") no-repeat;
  background-size: 294px 36px;
}

#login-form {
  margin-top: 20px;
  width: 500px;
}

#login-page-footer {
  text-align: center;
  font-size: small;
  color: rgb(77, 77, 77);
  margin-top: 40px;
}
</style>
