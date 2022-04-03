<script lang="ts" setup>
import Footer from "../components/Footer.vue";
import topbar from "../components/TopBar.vue";
import OrderCard from "../components/order/OrderCard.vue";
import { ref } from "vue";
import { Order } from "../define/Order";
import { NGrid, NGridItem, NSpace } from "naive-ui";
import { onMounted } from "vue";

let orderList = ref<Order[]>([]); // 调用临时数据

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    orderList.value.push({
      oid: "123456",
      pid: "123456",
      create_time: "yyyy-MM-dd HH:mm:ss",
      status: "未支付",
      purchase_number: 3,
      total_price: 1000000,
    });
  }
});
</script>

<template>
  <topbar />

  <NGrid cols="4 1600:5" :x-gap="30">
    <NGridItem v-for="order in orderList">
      <OrderCard
        class="order-card"
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
