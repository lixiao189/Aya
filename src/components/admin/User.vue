<script setup lang="ts">
import { User, GetUserResponse } from "../../define/User";
import { AdminInfo } from "../../define/Admin";
import { serverConfig } from "../../config/Server";
import { NDataTable, NTag, NSkeleton, useMessage } from "naive-ui";
import { h, ref } from "vue";
import axios from "axios";

const msg = useMessage();

const loading = ref(true);

const infoString = localStorage.getItem("admin");
let adminInfo: AdminInfo;
let users = ref<User[]>([]);
if (infoString === null) {
  msg.error("无登录凭证");
} else {
  (async () => {
    adminInfo = JSON.parse(infoString);
    const url = serverConfig.urlPrefix + serverConfig.apiMap.admin.user;
    const response: GetUserResponse = (
      await axios.get(url, {
        headers: {
          Authorization: adminInfo.token,
        },
      })
    ).data;
    users.value = response.data;
    loading.value = false;
  })();
}

const columns = [
  {
    title: "UID",
    key: "uid",
  },
  {
    title: "识别码",
    key: "identity_number",
  },
  {
    title: "用户名",
    key: "username",
  },
  {
    title: "性别",
    key: "sex",
    render(row: User) {
      return h(NTag, { type: "info" }, row.sex ? "男" : "女");
    },
  },
  {
    title: "年龄",
    key: "age",
  },
  {
    title: "状态",
    key: "status",
    render(row: User) {
      if (row.banned) {
        return h("div", [
          h(NTag, { type: "error" }, "封禁"),
          h(
            NTag,
            { type: row.dishonest ? "error" : "success" },
            row.dishonest ? "失信" : "守信"
          ),
        ]);
      } else {
        return h("div", [
          h(
            NTag,
            { type: row.dishonest ? "error" : "success" },
            row.dishonest ? "失信" : "守信"
          ),
        ]);
      }
    },
  },
  {
    title: "工作状况",
    key: "working_status",
  },
];
</script>

<template>
  <div v-if="loading">
    <NSkeleton text :repeat="5" />
    <NSkeleton text style="width: 60%" />
  </div>
  <NDataTable
    v-else
    :data="users"
    :columns="columns"
    :pagination="{ pageSize: 20 }"
    striped
  />
</template>
