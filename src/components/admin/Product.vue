<script lang="ts" setup>
// 导入定义
import { ProductDetail } from "../../define/Product";

// 导入第三方组件
import { NSkeleton, NButton, NDataTable, DataTableColumn } from "naive-ui";
import { ref, h } from "vue";

// 定义 ref 变量
const isLoading = ref(true);
const adminProductList = ref<ProductDetail[]>([
  {
    due_date: "2007-11-01",
    purchase_limit: 17,
    name: "基应况委",
    product_term: "ullamco",
    begin_time: 399137680166,
    money_rate: 72,
    settlement_method: "Lorem pariatur",
    stock: 1,
    pid: "91",
    value_date: "2008-12-15",
    end_time: 1442232919817,
    risk_level: "sint",
    price: 74,
  },
  {
    due_date: "1998-05-24",
    price: 92,
    begin_time: 509165495059,
    pid: "999",
    purchase_limit: 85,
    value_date: "2020-02-04",
    risk_level: "mollit aliquip eu",
    stock: 4,
    money_rate: 82,
    name: "业资有还林大",
    end_time: 202815672579,
    product_term: "quis",
    settlement_method: "non est enim consequat",
  },
  {
    due_date: "1998-05-24",
    price: 92,
    begin_time: 509165495059,
    pid: "92",
    purchase_limit: 85,
    value_date: "2020-02-04",
    risk_level: "mollit aliquip eu",
    stock: 4,
    money_rate: 82,
    name: "业资有还林大",
    end_time: 202815672579,
    product_term: "quis",
    settlement_method: "non est enim consequat",
  },
  {
    due_date: "1998-05-24",
    price: 92,
    begin_time: 509165495059,
    pid: "93",
    purchase_limit: 85,
    value_date: "2020-02-04",
    risk_level: "mollit aliquip eu",
    stock: 4,
    money_rate: 82,
    name: "业资有还林大",
    end_time: 202815672579,
    product_term: "quis",
    settlement_method: "non est enim consequat",
  },
  {
    due_date: "1998-05-24",
    price: 92,
    begin_time: 509165495059,
    pid: "94",
    purchase_limit: 85,
    value_date: "2020-02-04",
    risk_level: "mollit aliquip eu",
    stock: 4,
    money_rate: 82,
    name: "业资有还林大",
    end_time: 202815672579,
    product_term: "quis",
    settlement_method: "non est enim consequat",
  },
]);
const listColumns: Array<DataTableColumn> = [
  {
    title: "名称",
    key: "name",
  },
  {
    title: "库存",
    key: "stock",
  },
  {
    title: "价格",
    key: "price",
  },
  {
    title: "开始时间",
    key: "begin_time",
  },
  {
    title: "结束时间",
    key: "end_time",
  },
  {
    title: "操作",
    key: "actions",
    render(row) {
      return h("div", {}, [
        h(
          NButton,
          {
            type: "info",
            secondary: true,
            size: "small",
            onClick: () => modifyProduct(row.pid as number),
          },
          { default: () => "修改" }
        ),
        h(
          NButton,
          {
            type: "error",
            secondary: true,
            size: "small",
            style: "margin-left: 20px",
            onclick: () => deleteProduct(row.pid as number),
          },
          { default: () => "删除" }
        ),
        ,
      ]);
    },
  },
];

// 事件 function
async function addProduct() {}
async function refreshProductList() {}
async function modifyProduct(pid: number) {
  console.log(pid);
}
async function deleteProduct(pid: number) {
  console.log(pid);
}

isLoading.value = false; // debug
</script>

<template>
  <!-- 顶部栏  -->
  <div id="admin-product-bar">
    <NButton
      id="admin-product-add-button"
      :type="'primary'"
      @click="addProduct"
    >
      添加商品
    </NButton>
    <NButton
      id="admin-product-add-button"
      :type="'default'"
      @click="refreshProductList"
      >刷新列表</NButton
    >
  </div>

  <!-- 列表内容容器 -->
  <div id="admin-main-container">
    <!-- 加载状态 -->
    <div id="admin-product-loading" v-if="isLoading">
      <NSkeleton text :repeat="5" />
      <NSkeleton text style="width: 60%" />
    </div>

    <!--后台产品管理列表-->
    <div id="admin-product-list-container" v-else>
      <!-- 商品列表 -->
      <NDataTable
        :remote="true"
        :columns="listColumns"
        :data="adminProductList"
        :pagination="{
          pageSize: 10,
        }"
      />
    </div>
  </div>
</template>

<style>
#admin-product-bar {
  margin-top: 30px;
}

#admin-product-add-button {
  width: 100px;
  margin-left: 20px;
}

#admin-main-container {
  padding: 20px;
}

#admin-product-pagination-container {
  display: flex;
  align-items: centePr;
  justify-content: center;
  flex-direction: center;
}
</style>
