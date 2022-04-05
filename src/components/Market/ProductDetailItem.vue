<script lang="ts" setup>
// 导入第三方组件
import { NSpace } from "naive-ui";

// 定义参数
defineProps<{
  itemName: string;
  value: string;
}>();
</script>

<template>
  <NSpace justify="space-between">
    <span>{{ itemName }}: </span>
    <span>{{ value }}</span>
  </NSpace>
</template>

<style></style>
