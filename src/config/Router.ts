import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../pages/MarketIndex.vue") },
    { path: "/login", component: () => import("../pages/LoginPage.vue") },
    { path: "/register", component: () => import("../pages/RegisterPage.vue") },
    {
      path: "/admin",
      component: () => import("../pages/AdminPage.vue"),
      children: [
        {
          path: "",
          component: () => import("../components/admin/Main.vue"),
        },
        {
          path: "login",
          component: () => import("../components/admin/Login.vue"),
        },
      ],
    },
  ],
});
