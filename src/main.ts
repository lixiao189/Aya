import { createApp } from "vue";
import App from "./App.vue";
import Router from "./config/Router";
import axios from "axios";

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const respData: any = response.data;
    if (respData.code == 403) {
      window.location.href = "/ban";
    }

    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 创建 Vue app 对象
const app = createApp(App);
app.use(Router);
app.mount("#app");
