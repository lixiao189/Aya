<script setup lang="ts">
import Theme from "./Theme"
import { RouterView } from "vue-router";
import { NConfigProvider } from "naive-ui";
</script>

<template>
  <NConfigProvider :theme-overrides="Theme">
    <RouterView />
  </NConfigProvider>
</template>

<style></style>
