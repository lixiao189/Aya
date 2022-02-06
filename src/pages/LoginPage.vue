<script lang="ts" setup>
import LoginBackground from "../components/login/LoginBackground.vue";
import LoginForm from "../components/login/LoginForm.vue";
import Logo from "../components/Logo.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <Logo />

  <LoginBackground />
  <LoginForm id="login-form" />

  <Footer />
</template>

<style>
#login-form {
  position: absolute;
  top: 130px;
  left: 1000px;
}
</style>
