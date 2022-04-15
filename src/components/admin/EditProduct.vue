<script lang="ts" setup>
import {
  NForm,
  NInput,
  NButton,
  NInputNumber,
  NSelect,
  NGrid,
  NFormItemGridItem,
  NDatePicker,
} from "naive-ui";

// select 组件定义
const riskOptions = [
  {
    label: "低",
    value: "低",
  },
  {
    label: "中",
    value: "中",
  },
  {
    label: "高",
    value: "高",
  },
];
const purchaseOptions = [
  {
    label: "到期付息",
    value: "到期付息",
  },
  {
    label: "每月付息",
    value: "每月付息",
  },
];
</script>

<template>
  <NForm
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <NGrid :cols="24" :x-gap="24">
      <NFormItemGridItem :span="12" label="商品名">
        <NInput placeholder="请输入商品名" />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="库存">
        <NInputNumber placeholder="请输入商品库存" />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="商品金额">
        <NInputNumber placeholder="请输入商品金额" :step="0.01">
          <template #suffix> ¥ </template>
        </NInputNumber>
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="商品收益率">
        <NInputNumber placeholder="请输入商品收益率" :step="0.1">
          <template #suffix> % </template>
        </NInputNumber>
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="最大购买份数">
        <NInputNumber placeholder="请输入商品最大购买份数" />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="存款周期">
        <NInputNumber placeholder="请输入存款周期">
          <template #suffix> 天 </template>
        </NInputNumber>
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="开始秒杀日期">
        <NDatePicker type="datetime" />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="结束秒杀日期">
        <NDatePicker type="datetime" />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="起息日期">
        <NDatePicker type="datetime" />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="到息日期">
        <NDatePicker type="datetime" />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="风险水平">
        <NSelect placeholder="请选择风险水平" :options="riskOptions" />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="结算方法">
        <NSelect placeholder="请输入结算方式" :options="purchaseOptions" />
      </NFormItemGridItem>
    </NGrid>
  </NForm>

  <div id="admin-product-update-button-container">
    <NButton :type="'primary'">提交</NButton>
  </div>
</template>

<style></style>
