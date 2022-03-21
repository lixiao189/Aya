<script lang="ts" setup>
import LoginBackground from "../components/login/LoginBackground.vue";
import LoginForm from "../components/login/LoginForm.vue";
import Logo from "../components/Logo.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div id="login-page-container">
    <Logo />

    <LoginBackground />
    <LoginForm id="login-form" />

    <Footer />
  </div>
</template>

<style>
#login-page-container {
  position: relative;
}

#login-form {
  position: absolute;
  top: 130px;
  right: 100px;
}
</style>
