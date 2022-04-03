<script lang="ts" setup>
// 导入定义
import { Product } from "../define/Product";

// 导入组件
import MarketCard from "../components/market/MarketCard.vue";
import Footer from "../components/Footer.vue";
import TopBar from "../components/TopBar.vue";

// 导入第三方组件
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
  <TopBar />

  <NGrid cols="5 1700:6">
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
