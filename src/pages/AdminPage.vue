<script lang="ts" setup>
import { RouterView, useRouter } from "vue-router";
// import Footer from "../components/Footer.vue";
// import Logo from "../components/Logo.vue";

const router = useRouter();

const infoString = localStorage.getItem("admin");
if (infoString === null) {
  router.push("/admin/login");
}
</script>

<template>
  <div v-if="infoString !== null">
    <RouterView />
  </div>
</template>
