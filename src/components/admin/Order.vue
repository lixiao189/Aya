<script lang="ts" setup>
import { serverConfig } from "../../config/Server";
import { AdminInfo } from "../../define/Admin";
import { AdminOrder, AdminGetOderResponse } from "../../define/AdminOrder";
import axios from "axios";
import { NSkeleton, useMessage, NDataTable, NTag, NButton } from "naive-ui";
import { h, ref } from "vue";

const msg = useMessage();

const columns = [
  {
    title: "订单编号",
    key: "oid",
  },
  {
    title: "用户编号",
    key: "uid",
  },
  {
    title: "产品编号",
    key: "pid",
  },
  {
    title: "状态",
    key: "status",
    render(row: AdminOrder) {
      return h(
        NTag,
        {
          type: "info",
        },
        { default: () => row.status }
      );
    },
  },
  {
    title: "购买数量",
    key: "purchase_number",
  },
  {
    title: "总价",
    key: "total_price",
  },
  {
    title: "创建时间",
    key: "create_time",
  },
  {
    title: "操作",
    key: "operation",
    render(row: AdminOrder) {
      return h(
        NButton,
        {
          type: "primary",
          onClick: () => {
            handleUpdateOperation(row);
          },
        },
        {
          default: () => "修改",
        }
      );
    },
  },
];

const loading = ref(true);
const infoString = localStorage.getItem("admin");
let adminInfo: AdminInfo;
let orders = ref<AdminOrder[]>([]);
if (infoString === null) {
  msg.error("无登录凭证");
} else {
  (async () => {
    adminInfo = JSON.parse(infoString);
    const url = serverConfig.urlPrefix + serverConfig.apiMap.admin.order;
    const response: AdminGetOderResponse = (
      await axios.get(url, {
        headers: {
          Authorization: adminInfo.token,
        },
      })
    ).data;
    if (response.code === 0) {
      orders.value = response.data;
      loading.value = false;
    } else {
      msg.warning("获取订单列表失败: " + response.msg);
    }
  })();
}

function handleUpdateOperation(row: AdminOrder) {
  //TODO
}
</script>

<template>
  <div id="main-container">
    <div v-if="loading">
      <NSkeleton text :repeat="5" />
      <NSkeleton text style="width: 60%" />
    </div>
    <NDataTable
      v-else
      :data="orders"
      :columns="columns"
      :pagination="{ pageSize: 20 }"
      striped
    />
  </div>
</template>

<style>
#main-container {
  margin: 20px;
}
</style>
