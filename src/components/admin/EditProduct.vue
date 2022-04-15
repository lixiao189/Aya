<script lang="ts" setup>
import {
  NForm,
  NInput,
  NInputNumber,
  NSelect,
  NGrid,
  NFormItemGridItem,
  NDatePicker,
} from "naive-ui";
import { ref } from "vue";
import { ProductDetail } from "../../define/Product";

// 定义参数
const props = defineProps<{
  productData: ProductDetail;
}>();

// 定义 emit
defineEmits<{
  (e: "update:productData", productData: ProductDetail): void;
}>();

// 定义 ref 变量
const innerProductData = ref(props.productData);

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
        <NInput
          v-model:value="innerProductData.name"
          @input="$emit('update:productData', innerProductData)"
          placeholder="请输入商品名"
        />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="库存">
        <NInputNumber
          v-model:value="innerProductData.stock"
          @input="$emit('update:productData', innerProductData)"
          placeholder="请输入商品库存"
        />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="商品金额">
        <NInputNumber
          v-model:value="innerProductData.price"
          @input="$emit('update:productData', innerProductData)"
          placeholder="请输入商品金额"
          :step="0.01"
        >
          <template #suffix> ¥ </template>
        </NInputNumber>
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="商品收益率">
        <NInputNumber
          v-model:value="innerProductData.money_rate"
          @input="$emit('update:productData', innerProductData)"
          placeholder="请输入商品收益率"
          :step="0.1"
        >
          <template #suffix> % </template>
        </NInputNumber>
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="最大购买份数">
        <NInputNumber
          v-model:value="innerProductData.purchase_limit"
          @input="$emit('update:productData', innerProductData)"
          placeholder="请输入商品最大购买份数"
        />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="存款周期">
        <NInput
          v-model:value="innerProductData.product_term"
          @input="$emit('update:productData', innerProductData)"
          placeholder="请输入存款周期"
        />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="开始秒杀日期">
        <NDatePicker
          v-model:value="innerProductData.begin_time"
          @input="$emit('update:productData', innerProductData)"
          type="datetime"
        />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="结束秒杀日期">
        <NDatePicker
          v-model:value="innerProductData.end_time"
          @input="$emit('update:productData', innerProductData)"
          type="datetime"
        />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="起息日期">
        <NDatePicker
          v-model:formatted-value="innerProductData.value_date"
          value-format="yyyy-MM-dd"
          @input="$emit('update:productData', innerProductData)"
          type="date"
        />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="到息日期">
        <NDatePicker
          v-model:formatted-value="innerProductData.due_date"
          value-format="yyyy-MM-dd"
          @input="$emit('update:productData', innerProductData)"
          type="date"
        />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="风险水平">
        <NSelect
          v-model:value="innerProductData.risk_level"
          @input="$emit('update:productData', innerProductData)"
          placeholder="请选择风险水平"
          :options="riskOptions"
        />
      </NFormItemGridItem>

      <NFormItemGridItem :span="12" label="结算方法">
        <NSelect
          v-model:value="innerProductData.settlement_method"
          @input="$emit('update:productData', innerProductData)"
          placeholder="请输入结算方式"
          :options="purchaseOptions"
        />
      </NFormItemGridItem>
    </NGrid>
  </NForm>
</template>

<style></style>
