<script lang="ts" setup>
// TODO 添加表单输入校验
import Logo from "../components/Logo.vue";
import Footer from "../components/Footer.vue";
import { serverConfig } from "../config/Server";
import { Register, RegisterResponse } from "../define/Register";

import axios from "axios";
import {
  NCard,
  NForm,
  NSpace,
  NInput,
  NButton,
  NFormItem,
  NDialog,
  useDialog,
} from "naive-ui";
import { useRouter } from "vue-router";

// 常量区域
const dialog = useDialog();
const router = useRouter();

async function register() {
  const reqData: Register = {
    username: "111",
    password: "2323",
    identity_number: "12121",
  };
  const respData = (
    await axios.post(
      serverConfig.urlPrefix + serverConfig.apiMap.user.register,
      reqData
    )
  ).data as RegisterResponse;

  if (respData.code == 0) {
    dialog.success({
      title: "注册成功",
      content: "点击确定后登录",
      positiveText: "确定",
      onPositiveClick: () => {
        router.push("/login");
      },
    });
  } else {
    dialog.error({
      title: "注册错误",
      content: respData.msg,
      positiveText: "确定",
      onPositiveClick: () => {},
    });
  }
}
</script>

<template>
  <Logo />

  <NSpace style="margin-top: 30px; margin-bottom: 55px" :justify="'center'">
    <NCard title="用户注册" :size="'large'">
      <NForm>
        <NFormItem label="手机号">
          <NInput placeholder="请输入你的手机号"></NInput>
        </NFormItem>

        <NFormItem label="身份证号">
          <NInput placeholder="请输入你的身份证号"></NInput>
        </NFormItem>

        <NFormItem label="密码">
          <NInput placeholder="请输入你的密码" :type="'password'"></NInput>
        </NFormItem>

        <NFormItem label="确认密码">
          <NInput placeholder="请再次输入你的密码" :type="'password'"></NInput>
        </NFormItem>
      </NForm>

      <div>
        <NButton @click="register" id="register-button" color="#ea0437">
          注册
        </NButton>
      </div>
    </NCard>
  </NSpace>

  <Footer />
</template>

<style>
.n-card {
  min-width: 500px;
}

#register-button {
  margin-top: 11px;
  margin-bottom: 11px;
  width: 100%;
}
</style>
