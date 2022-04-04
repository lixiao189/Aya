<script lang="ts" setup>
import Footer from "../components/Footer.vue";
import { renderIcon } from "../util";
import { RouterView, useRouter } from "vue-router";
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NIcon,
  MenuOption,
} from "naive-ui";
import { Home } from "@vicons/ionicons5";

const router = useRouter();

const infoString = localStorage.getItem("admin");
if (infoString === null) {
  router.push("/admin/login");
}

const menu: MenuOption[] = [
  {
    label: "主页",
    key: "index",
    icon: renderIcon(Home),
  },
  {
    label: "目录1",
    key: "menu1",
    icon: renderIcon(Home),
  },
];

function menuUpdateHandler(key: string, item: MenuOption) {
  console.log(key);
  console.log(item);
}
</script>

<template>
  <div v-if="infoString !== null">
    <NLayout>
      <NLayoutHeader bordered id="layout-header">
        <h2>Admin</h2>
      </NLayoutHeader>
      <NLayout has-sider id="layout-main">
        <NLayoutSider
          id="layout-sider"
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
        >
          <NMenu
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menu"
            @update:value="menuUpdateHandler"
          >
          </NMenu>
        </NLayoutSider>
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
