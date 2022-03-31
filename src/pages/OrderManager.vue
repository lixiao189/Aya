<script lang="ts" setup>
import { NSpace } from "naive-ui"
import logo from "../components/Logo.vue"
import Footer from "../components/Footer.vue"
import topbar from "../components/order/TopBar.vue"
import ordercard from "../components/order/OrderCard.vue"
</script>

<template>
  <logo/> 
  <topbar/>
  <NSpace id="back-space">
    <ordercard/>
    <ordercard/>
    <ordercard/>
    <ordercard/>
    <ordercard/>
    <ordercard/>
  </NSpace>
  <Footer/>
</template>

<style>
#back-space{
  height: auto;
}
</style>