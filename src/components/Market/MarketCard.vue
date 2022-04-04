<script lang="ts" setup>
// 导入 util
import { timetrans } from "../../util";

// 导入第三方组件
import { NSpace, NButton } from "naive-ui";

// 定义属性
defineProps<{
  beginTime: number; // 秒杀开始时间
  endTime: number; // 秒杀结束时间
  name: string; // 商品名
  stock: number; // 库存量
  price: number; // 价格
  moneyRate: number; // 年利率
}>();

// 定义事件
defineEmits<{
  (e: "showDetail"): void; // 展示商品细节
}>();
</script>

<template>
  <NSpace class="market-card" vertical>
    <!-- 商品名称 -->
    <div class="market-card-title">{{ name }}</div>
    <div class="market-card-sub-title">金融产品</div>

    <!-- 商品详情信息 -->
    <div class="detailed-info">
      <div>库存: {{ stock }} 份</div>
      <div>金额: {{ price }}</div>
      <div>利率: {{ moneyRate / 100 }} %</div>
    </div>

    <!-- 商品抢购时间 -->
    <div class="time-info">
      <div>开始时间: {{ timetrans(beginTime) }}</div>
      <div>结束时间: {{ timetrans(endTime) }}</div>
    </div>

    <div class="purchase-button-container">
      <NButton
        @click="$emit('showDetail')"
        class="purchase-button"
        color="rgb(193, 46, 50)"
      >
        查看详情
      </NButton>
    </div>
  </NSpace>
</template>

<style>
.market-card {
  width: 220px;
  margin: 30px auto;
  padding: 10px;

  border: 1px solid rgb(252, 227, 213);
  border-radius: 5px;

  background-image: url("../../assets/market/market-card-background.png");
  background-size: 100%;
  background-repeat: no-repeat;
}

.market-card-sub-title {
  color: #62453b;
  font-size: 14px;
}

.market-card-title {
  font-size: 20px;
  font-weight: 500;
}

.purchase-button {
  width: 100%;
  margin-top: 20px;
}

.detailed-info {
  margin-top: 10px;
}

.time-info {
  margin-top: 10px;
}
</style>
