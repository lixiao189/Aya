<script setup lang="ts">
import { User } from "../../define/User";
import { NDataTable } from "naive-ui";
import { ref } from "vue";

const data = ref<User[]>([
  {
    birthday: "1998-01-01",
    uid: "351127945",
    sex: 1,
    working_status: 0,
    identity_number: "620163718",
    is_dishonest: 0,
    is_banned: 0,
    username: "abc",
  },
]);
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
  <NDataTable :data="data" :columns="columns" />
</template>
