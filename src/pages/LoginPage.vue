<script lang="ts" setup>
// 导入第三方定义
import { LoginResponse } from "../define/Login";

// 导入自定义组件
import LoginBackground from "../components/login/LoginBackground.vue";
import Logo from "../components/Logo.vue";
import Footer from "../components/Footer.vue";
import Router from "../config/Router";

// 导入第三方组件
import {
  NSpace,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NButton,
  useDialog,
} from "naive-ui";
import axios from "axios";
import { serverConfig } from "../config/Server";
import { useRouter } from "vue-router";
import { ref } from "vue";

// 常量定义
const dialog = useDialog();
const router = useRouter();
const captchaUrl = serverConfig.urlPrefix + serverConfig.apiMap.user.captcha;

// 定义组件变量
const loginData = ref({
  username: "",
  password: "",
  captcha: "",
});

// 跳转到注册页面
function jumpToRegisterPage() {
  setTimeout(() => {
    Router.push("/register");
  }, 200);
}

async function login() {
  // debug
  console.log(
    loginData.value.username,
    loginData.value.password,
    loginData.value.captcha
  );

  const loginUrl = serverConfig.urlPrefix + serverConfig.apiMap.user.login;
  const respData: LoginResponse = (await axios.post(loginUrl, loginData.value))
    .data;

  if (!respData.code) {
    // 存下用户数据
    localStorage.setItem("token", respData.data.token);

    dialog.success({
      title: "登录成功",
      content: "点击确定后跳转到商城",
      positiveText: "确定",
      onPositiveClick: () => {
        router.push("/");
      },
    });
  } else {
    dialog.error({
      title: "登录错误",
      content: respData.msg,
      positiveText: "确定",
      onPositiveClick: () => {},
    });
  }
}
</script>

<template>
  <div id="login-page-container">
    <Logo />

    <LoginBackground />
    <NCard
      id="login-form"
      header-style="text-align: center; font-size: 20px;"
      :size="'small'"
      title="用户登录"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <NForm :model="loginData">
        <NFormItem :label="'手机号'">
          <NInput
            v-model:value="loginData.username"
            placeholder="请输入你的手机号"
          />
        </NFormItem>
        <NFormItem :label="'密码'">
          <NInput
            v-model:value="loginData.password"
            :type="'password'"
            placeholder="请输入你的密码"
          />
        </NFormItem>
        <NFormItem :label="'验证码'">
          <NInput
            v-model:value="loginData.captcha"
            placeholder="请输入图中的验证码"
          />
        </NFormItem>
        <NFormItem>
          <img id="captcha-img" :src="captchaUrl" />
        </NFormItem>

        <NSpace id="button-container" vertical :size="'small'">
          <NButton @click="login" class="form-button" color="#ea0437">
            登录
          </NButton>
          <NButton
            class="form-button"
            @click="jumpToRegisterPage"
            color="#ea0437"
            ghost
          >
            注册
          </NButton>
        </NSpace>
      </NForm>
    </NCard>

    <Footer />
  </div>
</template>

<style>
#login-page-container {
  position: relative;
}

#login-form {
  position: absolute;
  top: 75px;
  right: 100px;
}

.n-card {
  max-width: 350px;
}

#button-container {
  margin-top: 10px;
}

#captcha-img {
  height: 50px;
}

.form-button {
  width: 100%;
  margin-bottom: 18px;
}
</style>
