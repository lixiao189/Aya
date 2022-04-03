<script lang="ts" setup>
import { NCard } from "naive-ui";
import { NButton, NSpace } from "naive-ui";
import { NTag } from "naive-ui";

defineProps<{
  create_time: string; //创建时间
  status: string; //订单状态
  purchase_number: number; //购买份数
  total_price: number; //订单总金额，单位为分
}>();
</script>

<template>
  <div class="order-card-container">
    <NCard title="产品1" class="order-card">
      <template #header-extra>
        <NTag type="warning">{{ status }}</NTag>
      </template>
      创建时间：{{ create_time }} <br />
      购买份数：{{ purchase_number }}
      <template #footer> 价格：{{ total_price }} </template>
      <template #action>
        <NButton type="info" class="order-button">支付</NButton>
        <NButton type="error" class="order-button">取消</NButton>
      </template>
    </NCard>
  </div>
</template>

<style>
.order-card {
  width: 30px;
}

.order-button {
  margin-right: 5%;
}

.order-card-container {
  margin: 20px auto;
}
</style>
