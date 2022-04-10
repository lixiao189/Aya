<script lang="ts" setup>
import {NCard} from "naive-ui";
import {NButton, NSpace} from "naive-ui";
import {NTag} from "naive-ui";
import {serverConfig} from "../../config/Server";
import {Order, OrderPayResponse} from "../../define/Order"
import {onMounted, ref} from "vue";
import axios from "axios";
import {useMessage} from "naive-ui";
import {useRouter} from "vue-router";
import {price2Chinese} from "../../util";

const log = useMessage();
const router = useRouter();

const props = defineProps<{
  order: Order;
  index: number;
}>();

function payTheOrder() {
  (async () => {
        const token = localStorage.getItem("token") as string;
        const postPayUrl = serverConfig.urlPrefix + serverConfig.apiMap.order.pay;

        const respData: OrderPayResponse = (
            await axios.post(postPayUrl + '/' + props.order.oid,null , {
              headers: {Authorization: token},
            })
        )
        if (respData.code == 0) {
          log.success("支付成功");
        } else {
          log.error("支付失败:" + respData.msg);
        }
      }
  )();
}

function cancelTheOrder() {
  (async () => {
        const token = localStorage.getItem("token") as string;
        const postCancelUrl = serverConfig.urlPrefix + serverConfig.apiMap.order.cancel;

        const respData: OrderPayResponse = (
            await axios.post(postCancelUrl + '/' + props.order.oid, {
              Headers: {Authorization: token},
            })
        )
        if (respData.code == 0) {
          log.success("操作成功");
        } else {
          log.error("取消订单失败:"+respData.msg);
        }
      }
  )();
}

function showProductDetail() {

}

function status2Tag(status: string){
  switch (status){
    case "未支付":{
      return "info";
    }
    case "超时取消":{
      return "warning";
    }
    case "已取消":{
      return "warning";
    }
    case "已完成":{
      return "success";
    }
    case "订单异常":{
      return "error";
    }
  }
  return "default";
}

</script>

<template>
  <div class="order-card-container">
    <NCard :title="'我的订单 No.'+index" class="order-card">
      <template #header-extra>
        <NTag :type="status2Tag(order.status)">{{ order.status }}</NTag>
      </template>
      商品编号：{{ order.pid }} <br/>
      创建时间：{{ order.create_time }} <br/>
      购买份数：{{ order.purchase_number }}
      <template #footer>
        订单金额：￥{{ (order.total_price/100).toFixed(2) }} <br />&emsp;&emsp;&emsp;&emsp;&emsp;<label style="color: #888">{{ price2Chinese(order.total_price/100) }}</label>
      </template>
      <template #action>
        <NButton class="order-button" @click="showProductDetail">查看商品</NButton>
        <NButton v-if="order.status==='未支付'" type="info" class="order-button" @click="payTheOrder">支付</NButton>
        <NButton v-if="order.status==='未支付'" type="error" class="order-button" @click="cancelTheOrder">取消</NButton>
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
