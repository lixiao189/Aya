<script setup lang="ts">
import { User, GetUserResponse } from "../../../define/User";
import { AdminInfo } from "../../../define/Admin";
import { serverConfig } from "../../../config/Server";
import {
  NDataTable,
  NTag,
  NSkeleton,
  NButton,
  NPopconfirm,
  useMessage,
} from "naive-ui";
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
    if (response.code === 0) {
      users.value = response.data;
      loading.value = false;
    } else {
      msg.warning("获取用户列表失败: " + response.msg);
    }
  })();
}

const columns = [
  {
    title: "用户编号",
    key: "uid",
  },
  {
    title: "身份证号",
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
      return h(
        NTag,
        { type: "info" },
        { default: () => (row.sex ? "男" : "女") }
      );
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
          h(
            NTag,
            { type: row.dishonest ? "error" : "success" },
            { default: () => (row.dishonest ? "失信" : "守信") }
          ),
          h(NTag, { type: "error" }, { default: () => "封禁" }),
        ]);
      } else {
        return h("div", [
          h(
            NTag,
            { type: row.dishonest ? "error" : "success" },
            { default: () => (row.dishonest ? "失信" : "守信") }
          ),
        ]);
      }
    },
  },
  {
    title: "工作状况",
    key: "working_status",
  },
  {
    title: "操作",
    key: "operation",
    render(row: User) {
      return h(
        NPopconfirm,
        {
          positiveText: "是",
          negativeText: "否",
          onPositiveClick: () => {
            handleBanOperation(row);
          },
        },
        {
          default: () => "确认执行?",
          trigger: () =>
            h(
              NButton,
              { type: "warning", size: "small", disabled: row.banned },
              { default: () => "封禁" }
            ),
        }
      );
    },
  },
];

async function handleBanOperation(row: User) {
  const url =
    serverConfig.urlPrefix + serverConfig.apiMap.admin.user + "/" + row.uid;
  const response: { code: number; msg: string } = (
    await axios.delete(url, {
      headers: {
        Authorization: adminInfo.token,
      },
    })
  ).data;
  if (response.code === 0) {
    msg.success("操作成功");
    row.banned = true;
  } else {
    msg.error("操作失败: " + response.msg);
  }
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
      :data="users"
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
