<script lang="ts" setup>
import { serverConfig } from "../../config/Server";
import { AdminLoginResponse } from "../../define/AdminLogin";
import { AdminInfo } from "../../define/Admin";
import {
  NCard,
  NForm,
  NFormItem,
  NInput,
  NButton,
  FormInst,
  useMessage,
} from "naive-ui";
import { ref } from "vue";
import axios from "axios";
const message = useMessage();
const formRef = ref<FormInst | null>(null);
const formValue = ref({
  username: "",
  password: "",
});
const rules = {
  username: {
    required: true,
    message: "请输入用户名",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: "blur",
  },
};

async function onSubmit() {
  try {
    await formRef.value?.validate();
  } catch (e) {
    message.error("无效输入");
    return;
  }

  const loginUrl = serverConfig.urlPrefix + serverConfig.apiMap.admin.login;
  let loginResponse: AdminLoginResponse;
  try {
    loginResponse = (await axios.post(loginUrl, formValue.value)).data;
  } catch (e) {
    message.error("请求错误");
    return;
  }
  console.log(loginResponse);

  if (!loginResponse.code) {
    let adminInfo: AdminInfo = {
      token: loginResponse.data.token,
      id: loginResponse.data.profile.admin_id,
      role: loginResponse.data.profile.role,
    };
    localStorage.setItem("admin", JSON.stringify(adminInfo));
    message.success("登录成功");
  } else {
    message.error("登录失败");
  }
}
</script>

<template>
  <NCard
    title="管理员登录"
    header-style="text-align: center; font-size: 20px;"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    id="login-form"
  >
    <NForm ref="formRef" :model="formValue" :rules="rules">
      <NFormItem label="用户名" path="username">
        <NInput placeholder="请输入用户名" v-model:value="formValue.username" />
      </NFormItem>
      <NFormItem label="密码" path="password">
        <NInput
          placeholder="请输入密码"
          type="password"
          show-password-on="mousedown"
          v-model:value="formValue.password"
        />
      </NFormItem>
      <NButton id="login-button" color="#ea0437" @click="onSubmit">
        登录
      </NButton>
    </NForm>
  </NCard>
</template>

<style>
#login-form {
  margin: 20px auto;
  width: 400px;
}

#login-button {
  width: 100%;
  margin-top: 20px;
}
</style>
