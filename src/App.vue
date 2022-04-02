<script setup lang="ts">
import Theme from "./config/Theme";

import { RouterView } from "vue-router";
import { NDialogProvider, NConfigProvider } from "naive-ui";
</script>

<template>
  <NConfigProvider :theme-overrides="Theme">
    <NDialogProvider>
      <RouterView />
    </NDialogProvider>
  </NConfigProvider>
</template>

<style></style>
