<script lang="ts" setup>
import Footer from "../components/Footer.vue";
import TopBar from "../components/TopBar.vue";
import OrderCard from "../components/order/OrderCard.vue";
import { ref } from "vue";
import { Order, OrderListResponse } from "../define/Order";
import {
  NGrid,
  NGridItem,
  NButton,
  NEmpty,
  useMessage,
  NSpin,
} from "naive-ui";
import { onMounted } from "vue";
import { continueStatement } from "@babel/types";
import { useRouter } from "vue-router";
import { serverConfig } from "../config/Server";
import axios from "axios";

const log = useMessage();
const router = useRouter(); //使用路由

const orderList = ref<Order[]>([]);
const loading = ref(true);
//获取订单列表
async function getOrder(token: string): Promise<Order[]> {
  const getOrderUrl = serverConfig.urlPrefix + serverConfig.apiMap.order.list;

  const respData = (
    await axios.get(getOrderUrl, {
      headers: { Authorization: token },
    })
  ).data as OrderListResponse;

  loading.value = false;
  if (respData.code == 0) {
    return respData.data;
  } else {
    // 请求失败
    log.error(respData.msg);
    return [];
  }
}

onMounted(() => {
  let token = null;
  loading.value = true;
  if ((token = localStorage.getItem("token")) === null) {
    router.push("/login");
    return;
  }
  (async () => {
    orderList.value = await getOrder(token);
  })();
});
</script>

<template>
  <TopBar />

  <NSpin :show="loading" size="large" stroke="rgb(193, 46, 50)">
    <NGrid cols="4 1600:5" :x-gap="30" v-if="orderList&&orderList.length!==0">
      <NGridItem v-for="(order, index) in orderList">
        <OrderCard class="order-card" :order="order" :index="index + 1" />
      </NGridItem>
    </NGrid>
    <NEmpty v-else size="huge" description="您还没有订单哦" style="margin-top: 50px;">
      <template #extra>
        <NButton size="small" @click="router.push('/')">前往购买</NButton>
      </template>
    </NEmpty>
    <template #description><label style="color: rgb(193, 46, 50);"> 加载订单中 </label></template>
  </NSpin>

  <Footer />
</template>

<style>
#back-space {
  height: auto;
}

.order-card {
  width: 300px;
}
</style>
