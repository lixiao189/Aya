export const serverConfig = {
  // urlPrefix: "http://127.0.0.1:4523/mock/620323/api/v1",
  urlPrefix: "http://localhost:8080/api/v1",
  apiMap: {
    user: {
      register: "/user/register",
      login: "/user/login",
      captcha: "/user/captcha",
    },
    admin: {
      login: "/admin/login",
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
