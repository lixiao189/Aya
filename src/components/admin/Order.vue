<script lang="ts" setup>
import { serverConfig } from "../../config/Server";
import { AdminInfo } from "../../define/Admin";
import { AdminOrder, AdminGetOderResponse } from "../../define/AdminOrder";
import axios from "axios";
import { NSkeleton, useMessage, NDataTable } from "naive-ui";
import { ref } from "vue";

const msg = useMessage();

const columns = [
  {
    title: "OID",
    key: "oid",
  },
  {
    title: "UID",
    key: "uid",
  },
  {
    title: "PID",
    key: "pid",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Total Price",
    key: "total_price",
  },
  {
    title: "Create Time",
    key: "create_time",
  },
  {
    title: "Purchase Number",
    key: "purchase_number",
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
