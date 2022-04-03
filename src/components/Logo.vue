<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <RouterLink to="/"><div id="logo-img" /></RouterLink>
</template>

<style>
#logo-img {
  width: 294px;
  height: 36px;
  background: url("/src/assets/logo.png") no-repeat;
  background-size: 294px 36px;
}
</style>
