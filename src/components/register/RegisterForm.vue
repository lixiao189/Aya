<script lang="ts" setup>
import { NCard, NForm, NSpace, NInput, NButton, NFormItem } from "naive-ui";
</script>

<template>
  <NSpace
    style="margin-top: 30px; margin-bottom: 55px;"
    :justify="'center'"
  >
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
        <NButton id="register-button" color="#ea0437">注册</NButton>
      </div>
    </NCard>
  </NSpace>
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
