<script lang="ts" setup>
import { NCard } from "naive-ui";
import { NButton, NSpace } from "naive-ui";
import { NTag } from "naive-ui";
import { serverConfig } from "../../config/Server";
import { OrderPayResponse } from "../../define/Order"
import { onMounted,ref } from "vue";
import axios from "axios";
import { useDialog } from "naive-ui";
import { useRouter } from "vue-router";


const dialog = useDialog();
const router = useRouter();

const props = defineProps<{
  oid : string; // 订单id
  create_time: string; //创建时间
  status: string; //订单状态
  purchase_number: number; //购买份数
  total_price: number; //订单总金额，单位为分
}>();
function payTheOrder() {
  (async () => {
    const token = localStorage.getItem("token") as string;
    const postPayUrl = serverConfig.urlPrefix+serverConfig.apiMap.order.pay;
    
    const respData: OrderPayResponse = (
      await axios.post(postPayUrl+'/'+props.oid,{
        Headers:{ Authorization: token },
      })
    )
    if (respData.code == 0) {
      dialog.success({
        title: "成功",
        content: "支付成功",
        positiveText: "确定",
        onPositiveClick: () => {
          router.push("/order");
        },
      });
    } else {
      dialog.error({
        title: "支付失败",
        content: respData.msg,
        positiveText: "确定",
        onPositiveClick: () => {
          router.push("/order");
        },
      });
    }
  }
  )};

function cancelTheOrder(){
  (async () => {
    const token = localStorage.getItem("token") as string;
    const postCancelUrl = serverConfig.urlPrefix+serverConfig.apiMap.order.cancel;
    
    const respData: OrderPayResponse = (
      await axios.post(postCancelUrl+'/'+props.oid,{
        Headers:{ Authorization: token },
      })
    )
    if (respData.code == 0) {
      dialog.success({
        title: "成功",
        content: "取消成功",
        positiveText: "确定",
        onPositiveClick: () => {
          router.push("/order");
        },
      });
    } else {
      dialog.error({
        title: "取消失败",
        content: respData.msg,
        positiveText: "确定",
        onPositiveClick: () => {
          router.push("/order");
        },
      });
    }
  }
  )}


</script>

<template>
  <div class="order-card-container">
    <NCard :title=oid class="order-card">
      <template #header-extra>
        <NTag type="warning">{{ status }}</NTag>
      </template>
      创建时间：{{ create_time }} <br />
      购买份数：{{ purchase_number }}
      <template #footer> 价格：{{ total_price }} </template>
      <template #action>
        <NButton type="info" class="order-button" @click="payTheOrder">支付</NButton>
        <NButton type="error" class="order-button">取消</NButton>
      </template>
    </NCard>
  </div>
</template>

<style>
.order-card {
  width: 30px;
}

.order-button {
  margin-right: 5%;
}

.order-card-container {
  margin: 20px auto;
}
</style>
