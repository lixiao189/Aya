<script lang="ts" setup>
import { NCard } from 'naive-ui';
import { NButton } from 'naive-ui';
import { NTag } from 'naive-ui';
</script>

<template>
<n-card title="产品1" class="order-card">
    <template #header-extra>
      <NTag type="warning">状态</NTag>
    </template>
      这是个产品
    <template #footer>
      价格
    </template>
    <template #action>
      <NButton class="order-button-1">支付</NButton>
      <NButton class="order-button-2">取消</NButton>
    </template>
</n-card>
</template>

<style>
.order-card{
  width: 30vw;
  margin-top: 5vh;
  margin-left: 2vw;
}
</style>