import { server } from "./ServerVariables";

export const serverConfig = {
  urlPrefix: server.protocol + server.hostnameWithPort + server.apiPrefix,
  apiMap: {
    user: {
      register: "/user/register",
      login: "/user/login",
      captcha: "/user/captcha",
    },
    admin: {
      login: "/admin/login",
      user: "/admin/user",
      order: "/admin/order",
    },
    product: {
      list: "/product/list",
      detail: "/product/detail",
      stock: "/product/stock",
      getUrl: "/product/token",
      submitOrder: "/product/kill",
    },
    order: {
      list: "/order/list",
      cancel: "/order/cancel",
      pay: "/order/pay",
    },
  },
};
