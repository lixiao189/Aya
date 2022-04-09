<script lang="ts" setup>
import Footer from "../components/Footer.vue";
import { AdminInfo } from "../define/Admin";
import { redirect, renderIcon } from "../util";
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
  NDropdown,
  DropdownOption,
  useMessage,
} from "naive-ui";
import {
  Home,
  People,
  Clipboard,
  Cart,
  Receipt,
  ChevronDown,
} from "@vicons/ionicons5";

const router = useRouter();
const msg = useMessage();

const infoString = localStorage.getItem("admin");
let adminInfo: AdminInfo;
if (infoString === null) {
  router.push("/admin/login");
} else {
  adminInfo = JSON.parse(infoString);
}

const userOptions: DropdownOption[] = [
  {
    label: "退出",
    key: "logout",
  },
];

const menu: MenuOption[] = [
  {
    label: "主页",
    key: "index",
    icon: renderIcon(Home),
  },
  {
    label: "商品管理",
    key: "product",
    icon: renderIcon(Cart),
  },
  {
    label: "用户管理",
    key: "user",
    icon: renderIcon(People),
  },
  {
    label: "订单管理",
    key: "order",
    icon: renderIcon(Clipboard),
  },
  {
    label: "规则管理",
    key: "rule",
    icon: renderIcon(Receipt),
  },
];

function menuOptionHandler(key: string, item: MenuOption) {
  console.log(key);
  console.log(item);
  router.push("/admin/" + key);
}

function userOptionHandler(key: string | number) {
  switch (key) {
    case "logout": {
      localStorage.removeItem("admin");
      msg.info("您已退出登录");
      redirect(router, "/admin/login", 500);
      break;
    }
  }
}
</script>

<template>
  <div v-if="infoString !== null">
    <NLayout>
      <NLayoutHeader bordered id="layout-header">
        <!-- Header -->
        <div id="header-title">后台管理系统</div>
        <div class="placeholder"></div>
        <NDropdown
          trigger="click"
          :options="userOptions"
          @select="userOptionHandler"
        >
          <div id="header-user-stat">
            {{ adminInfo.name }} <NIcon><ChevronDown /></NIcon>
          </div>
        </NDropdown>
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
            @update:value="menuOptionHandler"
          >
          </NMenu>
        </NLayoutSider>
        <NLayout>
          <div id="layout-container">
            <!-- main container -->
            <NLayoutContent id="layout-content">
              <RouterView />
            </NLayoutContent>
            <NLayoutFooter bordered id="layout-footer">
              <!-- footer -->
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
  display: flex;
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

#header-title {
  font-size: large;
  font-weight: bold;
  padding: 0 20px;
  line-height: var(--header-height);
  flex: 0 0 auto;
}

.placeholder {
  flex: 1 0 auto;
}

#header-user-stat {
  margin: 0 20px;
  font-weight: 200;
  line-height: var(--header-height);
  flex: 0 0 auto;
  cursor: pointer;
}

.n-icon {
  vertical-align: middle;
}
</style>
