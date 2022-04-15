<script lang="ts" setup>
// 导入第三方组件
import { NCarousel } from "naive-ui";

// 导入自定义组件
import LoginBackgroundImg from "./LoginBackgroundImg.vue";

// 导入图片
import loginBgUrl1 from "/src/assets/loginBackground/login-bg1.jpg";
import loginBgUrl2 from "/src/assets/loginBackground/login-bg2.jpg";
</script>

<template>
  <NCarousel draggable :show-dots="false" :autoplay="true">
    <LoginBackgroundImg :src="loginBgUrl1" />
    <LoginBackgroundImg :src="loginBgUrl2" />
  </NCarousel>
</template>
