<script lang="ts" setup>
import { NStatistic, NCard, NSpace } from "naive-ui";

const userNumber = Math.ceil(Math.random() * 10000).toLocaleString();
const orderNumber = Math.ceil(Math.random() * 100000).toLocaleString();
const productNumber = Math.ceil(Math.random() * 1000).toLocaleString();
const ruleNumber = Math.ceil(Math.random() * 1000).toLocaleString();
</script>

<template>
  <div id="main-container">
    <NSpace vertical>
      <NCard class="data-card">
        <NStatistic label="产品数量"> {{ productNumber }} </NStatistic>
      </NCard>
      <NCard class="data-card">
        <NStatistic label="订单数量"> {{ orderNumber }} </NStatistic>
      </NCard>
      <NCard class="data-card">
        <NStatistic label="注册用户"> {{ userNumber }} </NStatistic>
      </NCard>
      <NCard class="data-card">
        <NStatistic label="规则数量"> {{ ruleNumber }} </NStatistic>
      </NCard>
    </NSpace>
  </div>
</template>

<style>
#main-container {
  margin: 20px;
}

.data-card {
  max-width: 500px;
}
</style>
