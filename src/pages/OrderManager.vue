<script lang="ts" setup>
import Footer from "../components/Footer.vue";
import topbar from "../components/TopBar.vue";
import OrderCard from "../components/order/OrderCard.vue";
import { ref } from "vue";
import { Order,OrderListResponse } from "../define/Order";
import { NGrid, NGridItem, NSpace,NButton,NEmpty } from "naive-ui";
import { onMounted } from "vue";
import { continueStatement } from "@babel/types";
import { useRouter } from "vue-router";
import { serverConfig } from "../config/Server";
import axios from "axios";

const router = useRouter(); //使用路由
function jumpToLogin(){
  router.push("/login");
}
const loginSuccess = ref(false);
const orderList = ref<Order[]>([]);


//获取订单列表


async function getOrder(): Promise<Order[]> {
  const token = localStorage.getItem('token');
  if (token == null){
    loginSuccess.value = false;
    return [];
  }

  const getOrderUrl = 
    serverConfig.urlPrefix + serverConfig.apiMap.order.list;

  const respData = (
    await axios.get(getOrderUrl,{
      headers: { Authorization: token },
    })
  ).data as OrderListResponse;
  
  
  if (respData.code == 0) {
    loginSuccess.value = true;
    return respData.data;
  } else {
    // 登录没有成功
    loginSuccess.value = false;
  }
  return[]
}



onMounted(() => {
  (async () => {
    orderList.value = await getOrder();
  })();
});
</script>

<template>
  <topbar />
  <!-- 没有登录显示的空状态 -->
  <n-empty
    v-if="!loginSuccess"
    :size="'huge'"
    id="not-online-state"
    description="需要登录开始秒杀"
  >
    <template #extra>
      <n-button
        color="rgb(193, 46, 50)"
        round
        id="login-button"
        :type="'default'"
        :size="'large'"
        @click="jumpToLogin"
      >
        点我登录
      </n-button>
    </template>
  </n-empty>

  <NGrid v-else cols="4 1600:5" :x-gap="30">
    <NGridItem v-for="order in orderList">
      <OrderCard
        class="order-card"
        :oid="order['oid']"
        :status="order['status']"
        :create_time="order['create_time']"
        :purchase_number="order['purchase_number']"
        :total_price="order['total_price']"
      />
    </NGridItem>
  </NGrid>

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
