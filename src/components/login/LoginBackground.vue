<script lang="ts" setup>
import { NCarousel } from "naive-ui";
import LoginBackgroundImg from "./LoginBackgroundImg.vue";
</script>

<template>
  <NCarousel draggable :show-dots="false" :autoplay="true">
    <LoginBackgroundImg src="/src/assets/loginBackground/login-bg1.jpg" />
    <LoginBackgroundImg src="/src/assets/loginBackground/login-bg2.jpg" />
  </NCarousel>
</template>
