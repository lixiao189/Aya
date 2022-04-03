<script lang="ts" setup>
// 导入 util
import { isOnline, timetrans } from "../util";

// 导入配置文件
import { serverConfig } from "../config/Server";

// 导入定义
import { Product, ProductListResponse } from "../define/Product";

// 导入组件
import MarketCard from "../components/market/MarketCard.vue";
import Footer from "../components/Footer.vue";
import TopBar from "../components/TopBar.vue";

// 导入第三方组件
import { NGrid, NGridItem, NEmpty, NButton } from "naive-ui";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// 使用接口
const router = useRouter();

// 定义 ref 变量
const productList = ref<Product[]>([]);

// 获取商品列表
async function getProducts(): Promise<Product[]> {
  const token = localStorage.getItem("token");
  if (token == null) return [];

  const getProductsUrl =
    serverConfig.urlPrefix + serverConfig.apiMap.product.list;

  const respData = (
    await axios.get(getProductsUrl, {
      headers: { Authorization: token },
    })
  ).data as ProductListResponse;

  return respData.data;
}

// 页面跳转函数
function jumpToLogin() {
  router.push("/login");
}

// 挂载流程
onMounted(() => {
  (async () => {
    productList.value = await getProducts(); // 获取产品列表
  })();
});
</script>

<template>
  <TopBar />

  <!-- 没有登录显示的空状态 -->
  <n-empty
    v-if="!isOnline"
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

  <!-- TODO: 没有权限的提示信息 -->

  <!-- 登录以后展现列表 -->
  <NGrid v-else cols="5 1700:6">
    <NGridItem v-for="product in productList">
      <MarketCard
        :begin-time="product.begin_time"
        :end-time="product.end_time"
        :name="product.name"
        :stock="product.stock"
        :price="product.price"
        :money-rate="product.money_rate"
      />
    </NGridItem>
  </NGrid>

  <Footer />
</template>

<style>
#not-online-state {
  margin: 30vh auto;
  height: 100px;
}

#login-button {
  margin-top: 20px;
}
</style>
