<script lang="ts" setup>
// 导入配置
import { serverConfig } from "../../../config/Server";

// 导入 util
import { timetrans, getDateToday, transProductEditedData } from "../../../util";

// 导入定义
import { ProductDetail } from "../../../define/Product";
import { CountResponse } from "../../../define/AdminListCount";
import {
  AdminProductListResponse,
  AdminProductResponse,
  AdminProductListReq,
} from "../../../define/AdminProduct";

// 导入自定义组件
import EditProduct from "../EditProduct.vue";

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
            onClick: () =>
              showUpdateProductModal(row as unknown as ProductDetail),
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
const isCreating = ref(false);
const isUpdating = ref(false);
const adminProductList = ref<ProductDetail[]>([]);
const productEditedData = ref<ProductDetail>({
  pid: "",
  begin_time: 0,
  end_time: 0,
  name: "",
  stock: 0,
  price: 0,
  money_rate: 0,
  purchase_limit: 0,
  product_term: "",
  risk_level: "低",
  value_date: getDateToday(),
  due_date: getDateToday(),
  settlement_method: "到期付息",
});

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
// 刷新列表
async function refreshProductList() {
  adminProductList.value = await getProducts();
}
// 修改商品
function showUpdateProductModal(productData: ProductDetail) {
  isUpdating.value = true;
  productEditedData.value = productData;
}
// 添加产品
function showAddProductModal() {
  isCreating.value = true;
}
// 删除商品
async function deleteProduct(pid: string) {
  const adminProductUrl =
    serverConfig.urlPrefix + serverConfig.apiMap.admin.product;
  const token = localStorage.getItem("token") as string;
  const deleteProductResp: AdminProductResponse = (
    await axios.delete(adminProductUrl + "/" + pid, {
      headers: { Authorization: token },
    })
  ).data;

  if (deleteProductResp.code == 200) {
    message.success("商品删除成功");
  }
}
// 提交添加任务
async function submitAdding() {
  transProductEditedData(productEditedData.value);
  const adminProductUrl =
    serverConfig.urlPrefix + serverConfig.apiMap.admin.product;
  const token = localStorage.getItem("token") as string;

  const respData: AdminProductResponse = (
    await axios.post(adminProductUrl, productEditedData.value, {
      headers: { Authorization: token },
    })
  ).data;

  if (respData.code) {
    message.success("添加成功");
  } else {
    message.error(respData.msg);
  }
  isCreating.value = false;
}
// 提交修改任务
async function submitUpdating() {
  transProductEditedData(productEditedData.value);
  const adminProductUrl =
    serverConfig.urlPrefix +
    serverConfig.apiMap.admin.product +
    "/" +
    productEditedData.value.pid;
  const token = localStorage.getItem("token") as string;

  const respData: AdminProductResponse = (
    await axios.put(adminProductUrl, productEditedData.value, {
      headers: { Authorization: token },
    })
  ).data;

  if (respData.code) {
    message.success("修改成功");
  } else {
    message.error(respData.msg);
  }
  isCreating.value = false;
}

// 生命周期函数
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
      @click="showAddProductModal"
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

  <!-- 商品信息创建提交框 -->
  <NModal
    id="admin-product-update-container"
    v-model:show="isCreating"
    size="huge"
    preset="card"
    title="创建商品"
  >
    <EditProduct v-model:product-data="productEditedData" />
    <div id="admin-product-update-button-container">
      <NButton :type="'primary'" @click="submitAdding">创建商品</NButton>
    </div>
  </NModal>

  <!-- 商品信息更新提交框 -->
  <NModal
    id="admin-product-update-container"
    v-model:show="isUpdating"
    size="huge"
    preset="card"
    title="修改商品"
  >
    <EditProduct v-model:product-data="productEditedData" />
    <div id="admin-product-update-button-container">
      <NButton :type="'primary'" @click="submitUpdating">修改商品</NButton>
    </div>
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

#admin-product-update-container {
  width: 1100px;
  margin: 20px auto;
}

#admin-product-update-button-container {
  text-align: center;
}
</style>
