<script lang="ts" setup>
// 导入配置
import { serverConfig } from "../../../config/Server";

// 导入 util
import { timetrans } from "../../../util";

// 导入定义
import { ProductDetail } from "../../../define/Product";
import { CountResponse } from "../../../define/AdminListCount";
import {
  AdminProductListResponse,
  AdminProductDeleteResponse,
  AdminProductListReq,
} from "../../../define/AdminProduct";

// 导入第三方组件
import {
  NSkeleton,
  NButton,
  NDataTable,
  DataTableColumn,
  NModal,
  useMessage,
  useDialog,
} from "naive-ui";
import { ref, h, onMounted } from "vue";
import axios from "axios";

// 表单列定义
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
    render(row) {
      return h("div", {}, timetrans(row.begin_time as number));
    },
  },
  {
    title: "结束时间",
    key: "end_time",
    render(row) {
      return h("div", {}, timetrans(row.begin_time as number));
    },
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
            onClick: () => updateProduct(row.pid as string),
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
            onclick: () => {
              dialog.error({
                title: "警告",
                content: "确定删除商品？",
                positiveText: "确定",
                negativeText: "取消",
                onPositiveClick: () => {
                  deleteProduct(row.pid as string);
                },
                onNegativeClick: () => {},
              });
            },
          },
          { default: () => "删除" }
        ),
        ,
      ]);
    },
  },
];

// 定义 const 常量
const message = useMessage();
const dialog = useDialog();

// 定义 ref 变量
const isLoading = ref(true);
const isEditing = ref(false);
const productEditingID = ref("");
const adminProductList = ref<ProductDetail[]>([]);

// functions
// 获取产品列表
async function getProducts(): Promise<ProductDetail[]> {
  // 开始加载
  isLoading.value = true;

  const token = localStorage.getItem("token") as string;
  const getProductsCountUrl =
    serverConfig.urlPrefix + serverConfig.apiMap.admin.count;
  const getProductsUrl =
    serverConfig.urlPrefix + serverConfig.apiMap.admin.product;

  const getProductsCountResp: CountResponse = (
    await axios.get(getProductsCountUrl + "/product", {
      headers: { Authorization: token },
    })
  ).data;

  const getProductsData: AdminProductListReq = {
    p: 1,
    c: getProductsCountResp.data,
  };
  const getProductsResp: AdminProductListResponse = (
    await axios.get(getProductsUrl, {
      params: getProductsData,
      headers: { Authorization: token },
    })
  ).data;

  // 加载结束
  setTimeout(() => {
    isLoading.value = false;
  }, 200);

  return getProductsResp.data;
}
// 添加产品
async function addProduct() {}
// 刷新列表
async function refreshProductList() {
  adminProductList.value = await getProducts();
}
// 修改商品
async function updateProduct(pid: string) {
  isEditing.value = true;
  productEditingID.value = pid;
}
// 删除商品
async function deleteProduct(pid: string) {
  const adminProductUrl =
    serverConfig.urlPrefix + serverConfig.apiMap.admin.product;
  const token = localStorage.getItem("token") as string;
  const deleteProductResp: AdminProductDeleteResponse = (
    await axios.delete(adminProductUrl + "/" + pid, {
      headers: { Authorization: token },
    })
  ).data;

  if (deleteProductResp.code == 200) {
    message.success("商品删除成功");
  }
}

onMounted(() => {
  (async () => {
    adminProductList.value = await getProducts();
  })();
});
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
    >
      刷新列表
    </NButton>
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

  <!-- 商品信息提交框 -->
  <NModal
    v-model:show="isEditing"
    preset="card"
    title="编辑商品信息"
    size="huge"
    style="width: 600px"
  >
    内容
    <template #footer>
      <div id="admin-product-update-button-container">
        <NButton :type="'primary'">提交</NButton>
      </div>
    </template>
  </NModal>
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

#admin-product-update-button-container {
  text-align: center;
}
</style>
