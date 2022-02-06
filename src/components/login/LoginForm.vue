<script lang="ts" setup>
import { NSpace, NCard, NForm, NFormItem, NInput, NButton } from "naive-ui";
import Router from "../../Router";

// 跳转到注册页面
function jumpToRegisterPage() {
  setTimeout(() => {
    Router.push("/register");
  }, 200);
}
</script>

<template>
  <NCard
    header-style="text-align: center; font-size: 20px;"
    id="login-card"
    :size="'small'"
    title="用户登录"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
  >
    <NForm>
      <NFormItem :label="'手机号'">
        <NInput class="input-frame" placeholder="请输入你的手机号" />
      </NFormItem>

      <NFormItem :label="'密码'">
        <NInput :type="'password'" class="input-frame" placeholder="请输入你的密码" />
      </NFormItem>

      <NSpace id="button-container" vertical :size="'small'">
        <NButton id="form-button" color="#ea0437">登录</NButton>
        <NButton
          id="form-button"
          @click="jumpToRegisterPage"
          color="#ea0437"
          ghost
          >注册</NButton
        >
      </NSpace>
    </NForm>
  </NCard>
</template>

<style>
.n-card {
  max-width: 350px;
}

#button-container {
  margin-top: 10px;
}

#form-button {
  width: 100%;
  margin-bottom: 18px;
}
</style>
