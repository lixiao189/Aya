<script lang="ts" setup>
// 导入自定义组件
import MarketDetailItem from "./ProductDetailItem.vue";

// 导入第三方
import { NModal, NButton } from "naive-ui";

// 定义组件参数
defineProps<{
  pid: string; // 商品 id

  shouldShowDetail: boolean; // 是否弹出商品细节
}>();

// 定义事件
defineEmits<{
  (e: "update:shouldShowDetail", shouldShowDetail: boolean): void;
}>();
</script>

<template>
  <n-modal
    class="product-detail-container"
    v-model:show="shouldShowDetail"
    preset="card"
    size="huge"
    :title="'存款产品'"
    :bordered="false"
    @after-leave="$emit('update:shouldShowDetail', shouldShowDetail)"
  >
    <!-- 产品的细节内容 -->
    <MarketDetailItem item-name="总库存" value="1212" />
    <MarketDetailItem item-name="产品金额" value="1212" />
    <MarketDetailItem item-name="收益率" value="1212" />
    <MarketDetailItem item-name="单人最大购买份数" value="1212" />
    <MarketDetailItem item-name="存款周期" value="1212" />
    <MarketDetailItem item-name="风险水平" value="1212" />
    <MarketDetailItem item-name="结算方法" value="1212" />

    <template #footer>
      <MarketDetailItem item-name="起息日期" value="1212" />
      <MarketDetailItem item-name="到息日期" value="1212" />
      <MarketDetailItem item-name="秒杀开始时间" value="1212" />
      <MarketDetailItem item-name="秒杀结束时间" value="1212" />
    </template>

    <template #action>
      <div class="purchase-button-container">
        <NButton color="rgb(193, 46, 50)">
          <div class="purchase-button-text">立即购买</div>
        </NButton>
      </div>
    </template>
  </n-modal>
</template>

<style>
.product-detail-container {
  width: 500px;
}

.purchase-button-container {
  text-align: center;
}

.purchase-button-text {
  margin: 20px 50px;
}
</style>
