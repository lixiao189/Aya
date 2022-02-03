<script lang="ts" setup>
const props = defineProps<{
  src: string;
}>();
</script>

<template>
  <img
    :src="src"
    width="1420"
    height="500"
    alt="登录背景1"
  />
</template>

<style>
img {
  display: block;
  margin: 0 auto;
}
</style>
