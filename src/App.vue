<script setup lang="ts">
import Theme from "./config/Theme";

import { RouterView, useRoute } from "vue-router";
import { NDialogProvider, NConfigProvider, NMessageProvider } from "naive-ui";
import { computed } from "@vue/reactivity";

// 定义 computed 变量
const smartTheme = computed(() => {
  // 如果是 admin 页面就不使用自定义主题
  const path = useRoute().path;

  if (path.indexOf("/admin") != -1) return {};
  else return Theme;
});
</script>

<template>
  <NConfigProvider :theme-overrides="smartTheme">
    <NDialogProvider>
      <NMessageProvider>
        <RouterView />
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>

<style></style>
