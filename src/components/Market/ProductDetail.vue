<script lang="ts" setup>
// 导入 util
import { getTimeStamp, timetrans } from "../../util";

// 导入类型定义
import {
  ProductDetail,
  ProductDetailResponse,
  ProductStockResponse,
  ProductOrderUrlResponse,
} from "../../define/Product";

// 导入自定义组件
import MarketDetailItem from "./ProductDetailItem.vue";

// 导入第三方
import { NModal, NButton, useMessage } from "naive-ui";
import { onMounted, ref } from "vue";
import axios from "axios";
import { serverConfig } from "../../config/Server";

// 定义组件参数
const props = defineProps<{
  pid: string; // 商品 id

  shouldShowDetail: boolean; // 是否弹出商品细节
}>();

// 定义事件
defineEmits<{
  (e: "update:shouldShowDetail", shouldShowDetail: boolean): void;
}>();

// 定义 ref 变量
const productDetail = ref<ProductDetail>({
  pid: "",
  begin_time: 0,
  end_time: 0,
  name: "",
  stock: 0,
  price: 0,
  money_rate: 0,
  purchase_limit: 0,
  incre_amount: 0,
  product_term: "",
  risk_level: "",
  value_date: "",
  due_date: "",
  settlement_method: "",
});

// 定义常量
const message = useMessage();

// 获取产品的详情信息
async function getProductDetail(): Promise<ProductDetail> {
  const token = localStorage.getItem("token") as string;
  const getProductDetailUrl =
    serverConfig.urlPrefix + serverConfig.apiMap.product.detail;

  const respData: ProductDetailResponse = (
    await axios.get(getProductDetailUrl + "/" + props.pid, {
      headers: { Authorization: token },
    })
  ).data;

  return respData.data;
}

// 获取商品的实时库存
async function getProductStock(): Promise<number> {
  const token = localStorage.getItem("token") as string;
  const getProductStockUrl =
    serverConfig.urlPrefix + serverConfig.apiMap.product.stock;

  const respData: ProductStockResponse = (
    await axios.get(getProductStockUrl + "/" + props.pid, {
      headers: { Authorization: token },
    })
  ).data;

  return respData.data;
}

// 获取秒杀 url
async function getOrderUrl(): Promise<string> {
  const token = localStorage.getItem("token") as string;
  const getProductOrderUrl =
    serverConfig.urlPrefix + serverConfig.apiMap.product.getUrl;

  const respData: ProductOrderUrlResponse = (
    await axios.get(getProductOrderUrl + "/" + props.pid, {
      headers: { Authorization: token },
    })
  ).data;

  return respData.data;
}

onMounted(() => {
  // 需要完成 一个获取产品的详情, 商品的实时库存, 一个获取产品的秒杀 url
  (async () => {
    productDetail.value = await getProductDetail();
  })();
});

// 事件函数
function orderTheProduct() {
  // 判断秒杀是否在获取期限内
  if (getTimeStamp() < productDetail.value.begin_time) {
    message.error("该商品尚未开始秒杀");
  } else if (getTimeStamp() > productDetail.value.end_time) {
    message.error("该商品秒杀已经结束");
  }

  // 开始异步网络请求
  (async () => {
    const orderUrl = await getOrderUrl();
  })();
}
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
    <MarketDetailItem item-name="总库存" :value="productDetail.stock" />
    <MarketDetailItem item-name="产品金额" :value="productDetail.price" />
    <MarketDetailItem item-name="收益率" :value="productDetail.money_rate" />
    <MarketDetailItem
      item-name="单人最大购买份数"
      :value="productDetail.purchase_limit"
    />
    <MarketDetailItem
      item-name="存款周期"
      :value="productDetail.product_term"
    />
    <MarketDetailItem item-name="风险水平" :value="productDetail.risk_level" />
    <MarketDetailItem
      item-name="结算方法"
      :value="productDetail.settlement_method"
    />

    <!-- 时间细节 -->
    <template #footer>
      <MarketDetailItem
        item-name="起息日期"
        :value="productDetail.value_date"
      />
      <MarketDetailItem item-name="到息日期" :value="productDetail.due_date" />
      <MarketDetailItem
        item-name="秒杀开始时间"
        :value="timetrans(productDetail.begin_time)"
      />
      <MarketDetailItem
        item-name="秒杀结束时间"
        :value="timetrans(productDetail.end_time)"
      />
    </template>

    <template #action>
      <div class="purchase-button-container">
        <NButton @click="orderTheProduct" color="rgb(193, 46, 50)">
          <div class="purchase-button-text">我要下单</div>
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
