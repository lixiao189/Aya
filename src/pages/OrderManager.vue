<script lang="ts" setup>
import { NSpace } from "naive-ui"
import logo from "../components/Logo.vue"
import Footer from "../components/Footer.vue"
import topbar from "../components/order/TopBar.vue"
import ordercard from "../components/order/OrderCard.vue"
import { ref } from "vue"
import { Order } from "../define/Order"
import { NGrid,NGridItem } from "naive-ui"
import { onMounted } from "vue"

let orderlist = ref<Order[]>([]); // 调用临时数据

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    orderlist.value.push({
      oid:"123456",
      pid:"123456",
      create_time:"yyyy-MM-dd HH:mm:ss",
      status:"未支付",
      purchase_number:3,
      total_price:1000000,
    });
  }
});


</script>

<template>
  <logo/> 
  <topbar/>
  <NGrid :cols="3">
    <NGridItem v-for="order in orderlist">
      <ordercard
        :status="order['status']"
        :create_time="order['create_time']"
        :purchase_number="order['purchase_number']"
        :total_price="order['total_price']"
      />
    </NGridItem>
  </NGrid>
  <Footer/>
</template>

<style>
#back-space{
  height: auto;
}
</style>