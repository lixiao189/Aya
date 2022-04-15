<script lang="ts" setup>
import { serverConfig } from "../../../config/Server";
import { AdminInfo } from "../../../define/Admin";
import { AdminOrder, AdminGetOderResponse } from "../../../define/AdminOrder";
import axios from "axios";
import {
  NSkeleton,
  useMessage,
  NDataTable,
  NTag,
  NDrawer,
  NDrawerContent,
  NButton,
  NSelect,
  SelectOption,
  NForm,
  NFormItem,
} from "naive-ui";
import { h, ref } from "vue";

const msg = useMessage();

const columns = [
  {
    title: "订单编号",
    key: "oid",
  },
  {
    title: "用户编号",
    key: "uid",
  },
  {
    title: "产品编号",
    key: "pid",
  },
  {
    title: "状态",
    key: "status",
    render(row: AdminOrder) {
      return h(
        NTag,
        {
          type: "info",
        },
        { default: () => row.status }
      );
    },
  },
  {
    title: "购买数量",
    key: "purchase_number",
  },
  {
    title: "总价",
    key: "total_price",
  },
  {
    title: "创建时间",
    key: "create_time",
  },
  {
    title: "操作",
    key: "operation",
    render(row: AdminOrder) {
      return h(
        NButton,
        {
          type: "info",
          onClick: () => {
            handleUpdateOperation(row);
          },
        },
        {
          default: () => "修改",
        }
      );
    },
  },
];

const statusOptions: SelectOption[] = [
  {
    label: "已创建",
    value: "CREATED",
  },
  {
    label: "已完成",
    value: "COMPLETED",
  },
  {
    label: "已取消",
    value: "CANCELLED",
  },
  {
    label: "超时取消",
    value: "TIMEOUT",
  },
  {
    label: "异常",
    value: "EXCEPTION",
  },
];

const loading = ref(true);
const infoString = localStorage.getItem("admin");
let adminInfo: AdminInfo;
let orders = ref<AdminOrder[]>([]);
if (infoString === null) {
  msg.error("无登录凭证");
} else {
  (async () => {
    adminInfo = JSON.parse(infoString);
    const url = serverConfig.urlPrefix + serverConfig.apiMap.admin.order;
    const response: AdminGetOderResponse = (
      await axios.get(url, {
        headers: {
          Authorization: adminInfo.token,
        },
        // TODO: Add pagination
        params: {
          c: 100000,
        },
      })
    ).data;
    if (response.code === 0) {
      orders.value = response.data;
      loading.value = false;
    } else {
      msg.warning("获取订单列表失败: " + response.msg);
    }
  })();
}

const updateDrawerActive = ref(false);
let updatingRow: AdminOrder;
const updateFormModel = ref({
  status: "",
});

function handleUpdateOperation(row: AdminOrder) {
  console.log(row);
  updatingRow = row;
  let value;
  for (let item of statusOptions) {
    if (item.label == row.status) {
      value = item.value;
      break;
    }
  }
  updateFormModel.value.status = value as string;
  updateDrawerActive.value = true;
}

const processing = ref(false);

async function handleUpdateSubmit() {
  processing.value = true;
  const status = updateFormModel.value.status;
  const url = `${serverConfig.urlPrefix}${serverConfig.apiMap.admin.order}/${updatingRow.oid}/${status}`;
  const result: { code: number; msg: string; data: null } = (
    await axios.post(url, null, {
      headers: {
        Authorization: adminInfo.token,
      },
    })
  ).data;

  if (result.code == 0) {
    let label;
    for (let item of statusOptions) {
      if (item.value == status) {
        label = item.label;
      }
    }
    updatingRow.status = label as string;
    msg.success("操作成功");
  } else {
    msg.error(`操作失败: ${result.msg}`);
  }
  updateDrawerActive.value = false;
  processing.value = false;
}
</script>

<template>
  <div id="main-container">
    <div v-if="loading">
      <NSkeleton text :repeat="5" />
      <NSkeleton text style="width: 60%" />
    </div>
    <NDataTable
      v-else
      :data="orders"
      :columns="columns"
      :pagination="{ pageSize: 20 }"
      striped
    />
    <NDrawer
      v-model:show="updateDrawerActive"
      :trap-focus="false"
      :mask-closable="!processing"
      to="#layout-container"
    >
      <NDrawerContent>
        <template #header> 修改订单 </template>
        <template #default>
          <NForm>
            <NFormItem label="状态">
              <NSelect
                v-model:value="updateFormModel.status"
                :options="statusOptions"
                placeholder="请选择状态"
              />
            </NFormItem>
            <NButton
              type="primary"
              @click="handleUpdateSubmit"
              :disabled="processing"
              >确定</NButton
            >
          </NForm>
        </template>
      </NDrawerContent>
    </NDrawer>
  </div>
</template>

<style>
#main-container {
  margin: 20px;
}
</style>
