<script setup lang="ts">
import { User, GetUserResponse } from "../../define/User";
import { AdminInfo } from "../../define/Admin";
import { serverConfig } from "../../config/Server";
import { NDataTable, useMessage } from "naive-ui";
import { ref } from "vue";
import axios from "axios";
const msg = useMessage();

const infoString = localStorage.getItem("admin");
let adminInfo: AdminInfo;
let users = ref<User[]>([]);
if (infoString === null) {
  msg.error("无登录凭证");
} else {
  adminInfo = JSON.parse(infoString);
  const url = serverConfig.urlPrefix + serverConfig.apiMap.admin.user;
  const response: GetUserResponse = (
    await axios.get(url, {
      headers: {
        Authorization: adminInfo.token,
      },
    })
  ).data;
  debugger;
  users.value = response.data;
}

// const data = [
//   {
//     age: 23,
//     uid: "351127945",
//     sex: false,
//     working_status: "UNKNOWN",
//     identity_number: "620163718",
//     dishonest: false,
//     banned: false,
//     username: "abc",
//   },
// ];
const columns = [
  {
    title: "UID",
    key: "uid",
  },
  {
    title: "Username",
    key: "username",
  },
  {
    title: "Sex",
    key: "sex",
  },
];
</script>

<template>
  <NDataTable :data="users" :columns="columns" />
</template>
