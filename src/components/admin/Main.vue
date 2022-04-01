<script lang="ts" setup>
import { NSkeleton } from "naive-ui";
</script>

<template>
  <div id="main-container">
    <NSkeleton text :repeat="5" /> <NSkeleton text style="width: 60%" />
  </div>
</template>

<style>
#main-container {
  margin: 20px;
}
</style>
