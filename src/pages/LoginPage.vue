<script lang="ts" setup>
import { RouterLink } from "vue-router";
import LoginBackground from "../components/login/LoginBackground.vue";
import LoginForm from "../components/login/LoginForm.vue";
</script>

<template>
  <RouterLink to="/"><div id="logo-img" /></RouterLink>
  <div id="login-form"></div>

  <div>
    <LoginBackground />
    <LoginForm id="login-form" />
  </div>

  <footer id="login-page-footer">
    Copyright © 2004-2022 三湘银行 & 重嘤猛男团队 版权所有
  </footer>
</template>

<style>
#login-form {
  position: absolute;
  top: 130px;
  left: 70%;
}

#logo-img {
  margin-top: 20px;
  margin-left: 18px;
  width: 400px;
  height: 50px;
  background: url("/src/assets/logo.png") no-repeat;
  background-size: 294px 36px;
}

#login-page-footer {
  text-align: center;
  font-size: small;
  color: rgb(77, 77, 77);
  margin-top: 40px;
}
</style>
