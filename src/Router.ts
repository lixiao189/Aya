import { createRouter, createWebHistory } from "vue-router";
import MarketIndex from "./pages/MarketIndex.vue";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import AdminPage from "./pages/AdminPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MarketIndex },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/admin", component: AdminPage },
  ],
});
