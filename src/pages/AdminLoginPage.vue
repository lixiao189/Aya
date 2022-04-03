<script lang="ts" setup>
import Footer from "../components/Footer.vue";
import Logo from "../components/Logo.vue";
import LoginForm from "../components/admin/LoginForm.vue";
import { NMessageProvider } from "naive-ui";
</script>

<template>
  <NMessageProvider>
    <Logo />
    <LoginForm />
    <Footer />
  </NMessageProvider>
</template>
