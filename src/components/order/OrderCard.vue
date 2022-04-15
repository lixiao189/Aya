<script lang="ts" setup>
import { NButton, NSpace, NModal, NTag, NCard, NPopconfirm } from "naive-ui";
import { serverConfig } from "../../config/Server";
import { Order, OrderPayResponse } from "../../define/Order";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { price2Chinese } from "../../util";
import { timetrans } from "../../util";
import { ProductDetail } from "../../define/Product";

const log = useMessage();
const router = useRouter();

const showDetail = ref(false);
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

const props = defineProps<{
  order: Order;
  index: number;
}>();

const status = ref(props.order.status);

function payTheOrder() {
  (async () => {
    const token = localStorage.getItem("token") as string;
    const postPayUrl = serverConfig.urlPrefix + serverConfig.apiMap.order.pay;
    const respData: OrderPayResponse = (
      await axios.post(postPayUrl + "/" + props.order.oid, null, {
        headers: { Authorization: token },
      })
    ).data;
    if (respData.code == 0) {
      log.success("支付成功");
      status.value = "已完成";
    } else {
      log.error("支付失败:" + respData.msg);
    }
  })();
}

function cancelTheOrder() {
  (async () => {
    const token = localStorage.getItem("token") as string;
    const postCancelUrl =
      serverConfig.urlPrefix + serverConfig.apiMap.order.cancel;

    const respData: OrderPayResponse = (
      await axios.post(postCancelUrl + "/" + props.order.oid, null, {
        headers: { Authorization: token },
      })
    ).data;
    if (respData.code == 0) {
      log.success("操作成功");
      status.value = "已取消";
    } else {
      log.error("取消订单失败:" + respData.msg);
    }
  })();
}

function showProductDetail(pid: string) {
  const productDetailUrl =
    serverConfig.urlPrefix + serverConfig.apiMap.product.detail + "/" + pid;
  axios
    .get(productDetailUrl, {
      headers: { Authorization: localStorage.getItem("token") as string },
    })
    .then((resp) => {
      if (resp.data.code === 0) {
        productDetail.value = resp.data.data;
        showDetail.value = true;
      } else {
        log.error(resp.data.msg);
      }
    });
}

function status2Tag(status: string) {
  switch (status) {
    case "未支付": {
      return "info";
    }
    case "超时取消": {
      return "warning";
    }
    case "已取消": {
      return "warning";
    }
    case "已完成": {
      return "success";
    }
    case "订单异常": {
      return "error";
    }
  }
  return "default";
}
</script>

<template>
  <div class="order-card-container">
    <NCard :title="'我的订单 No.' + index" class="order-card">
      <template #header-extra>
        <NTag :type="status2Tag(status)">{{ status }}</NTag>
      </template>
      商品编号：{{ order.pid }} <br />
      创建时间：{{ order.create_time }} <br />
      购买份数：{{ order.purchase_number }}
      <template #footer>
        订单金额：￥{{ (order.total_price / 100).toFixed(2) }}
        <br />&emsp;&emsp;&emsp;&emsp;&emsp;<label style="color: #888">{{
          price2Chinese(order.total_price / 100)
        }}</label>
      </template>
      <template #action>
        <NButton class="order-button" @click="showProductDetail(order.pid)"
          >查看商品</NButton
        >
        <NPopconfirm
          v-if="status === '未支付'"
          @positive-click="payTheOrder"
          @negative-click=""
        >
          <template #trigger>
            <NButton type="info" class="order-button">支付</NButton>
          </template>
          确认支付？
        </NPopconfirm>
        <NPopconfirm
          v-if="status === '未支付'"
          @positive-click="cancelTheOrder"
          @negative-click=""
        >
          <template #trigger>
            <NButton type="error" class="order-button">取消</NButton>
          </template>
          确认取消订单吗？
        </NPopconfirm>
      </template>
    </NCard>
    <NModal v-model:show="showDetail">
      <NCard :title="productDetail.name" style="max-width: 500px">
        <template #header-extra>
          库存：{{ productDetail.stock }}/金额：{{ productDetail.price }}
        </template>
        秒杀开始：{{ timetrans(productDetail.begin_time) }} <br />
        秒杀结束：{{ timetrans(productDetail.end_time) }} <br />
        收益率：{{ (productDetail.money_rate / 100).toFixed(2) }}%<br />
        单人限购：{{ productDetail.purchase_limit }} 份<br />
        存款周期：{{ productDetail.product_term }} <br />
        风险等级：{{ productDetail.risk_level }} <br />
        起息日：{{ productDetail.value_date }} <br />
        到息日：{{ productDetail.due_date }} <br />
        结算方式：{{ productDetail.settlement_method }} <br />
      </NCard>
    </NModal>
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
