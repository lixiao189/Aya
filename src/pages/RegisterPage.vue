<script lang="ts" setup>

import { ref } from "vue";
import TopBar from "../components/TopBar.vue";
import Footer from "../components/Footer.vue";
import { serverConfig } from "../config/Server";
import { RegisterResponse } from "../define/Register";

import axios from "axios";
import {
  NCard,
  NForm,
  NSpace,
  NInput,
  NButton,
  NFormItem,
  useDialog,
} from "naive-ui";
import { useRouter } from "vue-router";

// 常量区域
const dialog = useDialog();
const router = useRouter();

const registerData = ref({
  username: "",
  password: "",
  identity_number: "",
});
const confirmPwd = ref("");

async function register() {
  if (
    registerData.value.username.trim() === "" ||
    registerData.value.password.trim() === "" ||
    registerData.value.identity_number.trim().length !== 18
  ) {
    dialog.error({
      title: "注册失败",
      content: "无效的输入",
      positiveText: "确定",
    });
    return;
  }
  if (registerData.value.password !== confirmPwd.value) {
    dialog.error({
      title: "注册失败",
      content: "两次输入密码不一致",
      positiveText: "确定",
    });
  }
  const respData = (
    await axios.post(
      serverConfig.urlPrefix + serverConfig.apiMap.user.register,
      registerData.value
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
  <TopBar :no-button="true" />

  <NSpace style="margin-top: 30px; margin-bottom: 55px" :justify="'center'">
    <NCard title="用户注册" :size="'large'">
      <NForm>
        <NFormItem label="手机号">
          <NInput
            placeholder="请输入你的手机号"
            v-model:value="registerData.username"
          ></NInput>
        </NFormItem>

        <NFormItem label="身份证号">
          <NInput
            placeholder="请输入你的身份证号"
            v-model:value="registerData.identity_number"
          ></NInput>
        </NFormItem>

        <NFormItem label="密码">
          <NInput
            placeholder="请输入你的密码"
            :type="'password'"
            v-model:value="registerData.password"
          ></NInput>
        </NFormItem>

        <NFormItem label="确认密码">
          <NInput
            placeholder="请再次输入你的密码"
            :type="'password'"
            v-model:value="confirmPwd"
          ></NInput>
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

<style scoped>
.n-card {
  min-width: 500px;
}

#register-button {
  margin-top: 11px;
  margin-bottom: 11px;
  width: 100%;
}
</style>
