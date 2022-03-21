<script lang="ts" setup>
const props = defineProps<{
  src: string;
}>();
</script>

<template>
  <img :src="src" alt="登录背景" />
</template>

<style>
img {
  width: 100%;
  height: 600px;
  display: block;
  margin: 0 auto;
}
</style>
