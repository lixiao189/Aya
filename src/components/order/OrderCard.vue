<script lang="ts" setup>
import { NCard } from 'naive-ui';
import { NButton } from 'naive-ui';
import { NTag } from 'naive-ui';

defineProps<{
  create_time: string; //创建时间
  status: string;  //订单状态
  purchase_number: number; //购买份数
  total_price: number; //订单总金额，单位为分
}>();
</script>

<template>
<n-card title="产品1" class="order-card">
    <template #header-extra>
      <NTag type="warning">{{ status }}</NTag>
    </template>
      创建时间：{{ create_time }}
      购买份数：{{ purchase_number }}
    <template #footer>
      价格：{{ total_price }}
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