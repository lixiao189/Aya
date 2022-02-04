<script lang="ts" setup>
import { NCard, NForm, NFormItem, NInput, NButton } from "naive-ui";
</script>

<template>
  <NCard
    header-style="text-align: center; font-size: 20px;"
    id="login-card"
    size="small"
    :size="'large'"
    title="用户登录"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
  >
    <NForm>
      <NFormItem :label="'手机号'">
        <NInput class="input-frame" placeholder="请输入你的手机号"/>
      </NFormItem>

      <NFormItem :label="'密码'">
        <NInput class="input-frame" placeholder="请输入你的密码" />
      </NFormItem>

      <div>
        <NButton id="login-button" color="#ea0437">登录</NButton>
      </div>
    </NForm>
  </NCard>
</template>

<style>
.n-card {
  max-width: 350px;
}

#login-button {
  width: 100%;
  margin-bottom: 18px;
  margin-top: 10px;
}
</style>
