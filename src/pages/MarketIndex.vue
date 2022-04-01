<script lang="ts" setup>
import Logo from "../components/Logo.vue";
import { Product } from "../define/Product";
import MarketCard from "../components/Market/MarketCard.vue";
import Footer from "../components/Footer.vue";

import { NGrid, NGridItem } from "naive-ui";

import { onMounted, ref } from "vue";

// 调试用的临时数据
let productList = ref<Product[]>([]);

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    productList.value.push({
      pid: "1644902253293",
      begin_time: 1644901018726,
      end_time: 1644903487860,
      name: "存款产品",
      stock: 114514,
      price: 500000,
      money_rate: 450,
    });
  }
});
</script>

<template>
  <Logo />

  <NGrid :cols="5">
    <NGridItem v-for="product in productList">
      <MarketCard
        :begin-time="product['begin_time']"
        :end-time="product['end_time']"
        :name="product['name']"
        :stock="product['stock']"
        :price="product['price']"
        :money-rate="product['money_rate']"
      />
    </NGridItem>
  </NGrid>

  <Footer />
</template>

<style></style>
