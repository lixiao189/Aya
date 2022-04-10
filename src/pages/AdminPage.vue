<script lang="ts" setup>
import Footer from "../components/Footer.vue";
import { AdminInfo } from "../define/Admin";
import { redirect, renderIcon } from "../util";
import { RouterView, useRoute, useRouter } from "vue-router";
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
  NEmpty,
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
import { computed } from "vue";

const router = useRouter();
const route = useRoute();
const currentMenuKey = computed(() => route.path.substring(7));
const msg = useMessage();

const infoString = localStorage.getItem("admin");
let adminInfo: AdminInfo;
let menu: MenuOption[] = [
  {
    label: "主页",
    key: "index",
    icon: renderIcon(Home),
  },
];
let permissionKeys: string[] = ["", "index"];
const menuKeyValueMap: { [index: string]: MenuOption } = {
  PRODUCT_ADMIN: {
    label: "商品管理",
    key: "product",
    icon: renderIcon(Cart),
  },
  ORDER_ADMIN: {
    label: "订单管理",
    key: "order",
    icon: renderIcon(Clipboard),
  },
  USER_ADMIN: {
    label: "用户管理",
    key: "user",
    icon: renderIcon(People),
  },
  RULE_ADMIN: {
    label: "规则管理",
    key: "rule",
    icon: renderIcon(Receipt),
  },
};
if (infoString === null) {
  router.push("/admin/login");
} else {
  adminInfo = JSON.parse(infoString);
  if (adminInfo.role[0] === "ROOT") {
    // @root permission
    for (let v of Object.values(menuKeyValueMap)) {
      menu.push(v);
      if (v.key != undefined) permissionKeys.push(v.key.toLocaleString());
    }
  } else {
    // check permission
    adminInfo.role.map((x) => {
      const option: MenuOption = menuKeyValueMap[x];
      menu.push(option);
      if (option.key != undefined)
        permissionKeys.push(option.key.toLocaleString());
    });
  }
}
let access = computed(() => {
  if (adminInfo.role[0] === "ROOT") return true;
  for (let v of permissionKeys) {
    if (v === currentMenuKey.value) return true;
  }
  return false;
});
console.log(access.value);

const userOptions: DropdownOption[] = [
  {
    label: "退出",
    key: "logout",
  },
];

function menuOptionHandler(key: string, _: MenuOption) {
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
            :value="currentMenuKey"
            @update:value="menuOptionHandler"
          >
          </NMenu>
        </NLayoutSider>
        <NLayout>
          <div id="layout-container">
            <!-- main container -->
            <NLayoutContent id="layout-content">
              <RouterView v-if="access" />
              <div v-else id="empty-holder">
                <NEmpty> 403 </NEmpty>
              </div>
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

#empty-holder {
  padding: 100px;
}

.n-icon {
  vertical-align: middle;
}
</style>
