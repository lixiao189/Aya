<script lang="ts" setup>
import { NCard } from 'naive-ui';
import { NButton } from 'naive-ui';
import { NSpace } from 'naive-ui';
import { RouterLink } from "vue-router"
</script>

<template>
<NCard>
  <NSpace justify="space-between">
  <router-link to="/"><n-button round>商城</n-button></router-link>
  <n-button round>个人订单</n-button>
  </NSpace>
</NCard>
</template>

<style>
.n-card{
  width: 100vw;
}
</style>
