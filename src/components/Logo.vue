<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <RouterLink to="/"><div id="logo-img" /></RouterLink>
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
</style>
