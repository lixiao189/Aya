<script lang="ts" setup>
import { NCard, NForm, NFormItem, NInput, NButton } from "naive-ui";
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
    <NForm>
      <NFormItem label="用户名">
        <NInput placeholder="请输入用户名" />
      </NFormItem>
      <NFormItem label="密码">
        <NInput
          placeholder="请输入密码"
          type="password"
          show-password-on="mousedown"
        />
      </NFormItem>
      <NButton id="login-button" color="#ea0437"> 登录 </NButton>
    </NForm>
  </NCard>
</template>

<style>
#login-form {
  margin: 20px auto;
  width: 500px;
}

#login-button {
  width: 100%;
  margin-top: 20px;
}
</style>
