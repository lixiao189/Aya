import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    // ===================== Market Page Router ===============================
    { path: "/", component: () => import("../pages/MarketIndex.vue") },
    { path: "/login", component: () => import("../pages/LoginPage.vue") },
    { path: "/register", component: () => import("../pages/RegisterPage.vue") },
    { path: "/order", component: () => import("../pages/OrderManager.vue") },
    { path: "/ban", component: () => import("../pages/NoPermission.vue") },

    // ===================== Admin Page Router ===============================
    {
      path: "/admin",
      component: () => import("../pages/AdminPage.vue"),

      children: [
        {
          path: "",
          component: () => import("../components/admin/Main.vue"),
        },
        {
          path: "index",
          component: () => import("../components/admin/Main.vue"),
        },
        {
          path: "user",
          name: "admin-user",
          component: () => import("../components/admin/User.vue"),
        },
      ],
    },
    {
      path: "/admin/login",
      component: () => import("../pages/AdminLoginPage.vue"),
    },
  ],
});
