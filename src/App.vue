<script setup lang="ts">
import Theme from "./config/Theme";

import { RouterView } from "vue-router";
import { NDialogProvider, NConfigProvider, NMessageProvider } from "naive-ui";
</script>

<template>
  <NConfigProvider :theme-overrides="Theme">
    <NDialogProvider>
      <NMessageProvider>
        <RouterView />
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>

<style></style>
