<script lang="ts" setup>
import { RouterView, useRouter } from "vue-router";
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
} from "naive-ui";
import Footer from "../components/Footer.vue";

const router = useRouter();

const infoString = localStorage.getItem("admin");
if (infoString === null) {
  router.push("/admin/login");
}
</script>

<template>
  <div v-if="infoString !== null">
    <NLayout>
      <NLayoutHeader bordered id="layout-header"> title </NLayoutHeader>
      <NLayout has-sider id="layout-main">
        <NLayoutSider bordered id="layout-sider"> Admin </NLayoutSider>
        <NLayout>
          <div id="layout-container">
            <NLayoutContent id="layout-content">
              <RouterView />
            </NLayoutContent>
            <NLayoutFooter bordered id="layout-footer">
              <Footer />
            </NLayoutFooter>
          </div>
        </NLayout>
      </NLayout>
    </NLayout>
  </div>
</template>

<style>
:root {
  --header-height: 50px;
}

#layout-header {
  height: var(--header-height);
}

#layout-main {
  height: calc(100vh - var(--header-height));
}

#layout-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#layout-content {
  flex: 1 0 auto;
}

#layout-footer {
  flex: 0 0 auto;
}

#login-page-footer {
  line-height: 50px;
  margin-top: 0;
}
</style>
