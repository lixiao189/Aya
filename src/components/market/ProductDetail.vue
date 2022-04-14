<script lang="ts" setup>
// 导入 util
import { getTimeStamp, timetrans } from "../../util";

// 导入类型定义
import {
  ProductDetail,
  ProductDetailResponse,
  ProductStockResponse,
  ProductOrderUrlResponse,
  SubmitOrder,
  SubmitOrderResponse,
} from "../../define/Product";

// 导入自定义组件
import MarketDetailItem from "./ProductDetailItem.vue";

// 导入第三方
import { NModal, NButton, useMessage, NInputNumber, useDialog } from "naive-ui";
import { onMounted, ref } from "vue";
import axios from "axios";
import { serverConfig } from "../../config/Server";
import { useRouter } from "vue-router";

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
const orderNumber = ref(0);
const productDetail = ref<ProductDetail>({
  pid: "",
  begin_time: 0,
  end_time: 0,
  name: "",
  stock: 0,
  price: 0,
  money_rate: 0,
  purchase_limit: 0,
  product_term: "",
  risk_level: "",
  value_date: "",
  due_date: "",
  settlement_method: "",
});

// 定义常量
const message = useMessage();
const dialog = useDialog();
const router = useRouter();

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

// 生命周期函数
onMounted(() => {
  // 需要完成 一个获取产品的详情, 商品的实时库存, 一个获取产品的秒杀 url
  (async () => {
    productDetail.value = await getProductDetail();

    // TODO 在开启秒杀后获取秒杀进度
  })();
});

// 事件函数
function orderTheProduct() {
  // 判断秒杀是否在获取期限内
  if (getTimeStamp() < productDetail.value.begin_time) {
    message.error("该商品尚未开始秒杀");
    return;
  } else if (getTimeStamp() > productDetail.value.end_time) {
    message.error("该商品秒杀已经结束");
    return;
  }

  // 开始异步网络请求
  (async () => {
    const token = localStorage.getItem("token") as string;
    const orderUrl = await getOrderUrl();
    const submitOrderData: SubmitOrder = {
      pid: props.pid,
      end_time: productDetail.value.end_time,
      purchase_number: orderNumber.value,
      price: productDetail.value.price,
    };
    const submitOrderUrl =
      serverConfig.urlPrefix +
      serverConfig.apiMap.product.submitOrder +
      "/" +
      orderUrl;

    const respData: SubmitOrderResponse = (
      await axios.post(submitOrderUrl, submitOrderData, {
        headers: { Authorization: token },
      })
    ).data;

    if (respData.code == 0) {
      dialog.success({
        title: "成功",
        content: "秒杀成功! 跳转到订单页面",
        positiveText: "确定",
        onPositiveClick: () => {
          router.push("/order");
        },
      });
    } else if (respData.code == 1) {
      dialog.error({
        title: "错误",
        content: "商品已经卖完了",
        positiveText: "确定",
        onPositiveClick: () => {},
      });
    }
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
      <NInputNumber
        class="order-amount"
        placeholder="请输入份数"
        v-model:value="orderNumber"
      >
        <template #suffix> 份 </template>
      </NInputNumber>
      <div class="order-button-container">
        <NButton @click="orderTheProduct" color="rgb(193, 46, 50)">
          <div class="order-button-text">我要下单</div>
        </NButton>
      </div>
    </template>
  </n-modal>
</template>

<style>
.product-detail-container {
  width: 500px;
}

.order-button-container {
  text-align: center;
}

.order-amount {
  margin-bottom: 20px;
}

.order-button-text {
  margin: 20px 50px;
}
</style>
