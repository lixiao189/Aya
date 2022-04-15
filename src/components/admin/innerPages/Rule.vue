<script lang="ts" setup>
import {
  Rule,
  GetRuleListResponse,
  GetRuleResponse,
} from "../../../define/Rule";
import { serverConfig } from "../../../config/Server";
import { AdminInfo } from "../../../define/Admin";

import {
  NSkeleton,
  NDataTable,
  useMessage,
  useDialog,
  NTag,
  NButton,
  NDescriptions,
  NDescriptionsItem,
  NSpace,
  NIcon,
  NForm,
  NFormItem,
  NInput,
  FormInst,
  FormRules,
} from "naive-ui";
import { Add } from "@vicons/ionicons5";
import { h, ref } from "vue";
import axios from "axios";
import { CreateRowProps } from "naive-ui/lib/data-table/src/interface";
import { result } from "lodash";

const msg = useMessage();
const dialog = useDialog();

const loading = ref(true);

const infoString = localStorage.getItem("admin");
let adminInfo: AdminInfo;

let rules = ref<Rule[]>([]);

if (infoString === null) {
  msg.error("无登录凭证");
} else {
  adminInfo = JSON.parse(infoString);
  getRuleList();
}

async function getRuleList() {
  const url = serverConfig.urlPrefix + serverConfig.apiMap.admin.rule;
  const response: GetRuleListResponse = (
    await axios.get(url, {
      headers: {
        Authorization: adminInfo.token,
      },
      params: {
        c: 100000, // TODO: add pagination
      },
    })
  ).data;

  if (response.code === 0) {
    rules.value = response.data;
    loading.value = false;
  } else {
    msg.warning("获取规则列表失败");
  }
}

const columns = [
  {
    title: "规则编号",
    key: "rid",
  },
  {
    title: "规则名称",
    key: "name",
  },
  {
    title: "状态",
    key: "status",
    render(row: Rule) {
      if (row.use === true) {
        return h(
          NTag,
          {
            type: "success",
          },
          {
            default: () => "启用",
          }
        );
      } else {
        return h(
          NTag,
          {
            type: "warning",
          },
          {
            default: () => "禁用",
          }
        );
      }
    },
  },
  {
    title: "创建时间",
    key: "create_time",
  },
  {
    title: "操作",
    key: "operation",
    render(row: Rule) {
      return h(
        NButton,
        {
          type: "info",
          disabled: row.use,
          onClick: (e: MouseEvent) => {
            e.stopPropagation();
            operationEnableHandler(row);
            return false;
          },
        },
        {
          default: () => "启用",
        }
      );
    },
  },
];

async function operationEnableHandler(row: Rule) {
  const url = `${serverConfig.urlPrefix}${serverConfig.apiMap.admin.rule}/${row.rid}`;
  const result: { code: number; msg: string; data: null } = (
    await axios.put(url, {
      Headers: {
        Authorization: adminInfo.token,
      },
    })
  ).data;
  if (result.code === 0) {
    row.use = true;
    msg.success("操作成功");
  } else {
    msg.error("操作失败");
  }
}

// Define properties on row
const rowProps: CreateRowProps<Rule> = (row: Rule) => {
  return {
    onClick: () => getRule(row.rid),
  };
};

async function getRule(rid: string) {
  const url = `${serverConfig.urlPrefix}${serverConfig.apiMap.admin.rule}/${rid}`;
  const response: GetRuleResponse = (
    await axios.get(url, {
      headers: {
        Authorization: adminInfo.token,
      },
    })
  ).data;
  if (response.code === 0) {
    dialog.info({
      title: "详细信息",
      content: () =>
        h(
          NDescriptions,
          {},
          {
            default: () => [
              h(
                NDescriptionsItem,
                {},
                { label: () => "规则定义", default: () => response.data }
              ),
            ],
          }
        ),
    });
  } else {
    msg.error("获取规则信息失败: " + response.msg);
  }
}

const addRuleFormRef = ref<FormInst | null>(null);
const addRuleFormModel = ref({
  name: "",
  expression: "",
});
const addRuleFormValidationRules: FormRules = {
  name: [
    {
      required: true,
      message: "请输入名称",
    },
  ],
  expression: [
    {
      required: true,
      message: "请输入表达式",
    },
  ],
};

function onAddRuleButtonClick() {
  // TODO: refactor to NModal
  // create input form dialog
  const d = dialog.info({
    title: "创建规则",
    positiveText: "确定",
    onPositiveClick: addRule,
    content: () =>
      h(
        NForm,
        {
          ref: addRuleFormRef,
          model: addRuleFormModel,
          rules: addRuleFormValidationRules,
        },
        {
          default: () => [
            h(
              NFormItem,
              {
                label: "名称",
                path: "name",
              },
              {
                default: () =>
                  h(NInput, {
                    value: addRuleFormModel.value.name,
                    placeholder: "输入名称",
                    onInput: (e) => {
                      addRuleFormModel.value.name = e;
                    },
                  }),
              }
            ),
            h(
              NFormItem,
              {
                label: "表达式",
                path: "expression",
              },
              {
                default: () =>
                  h(NInput, {
                    value: addRuleFormModel.value.expression,
                    placeholder: "输入表达式",
                    onInput: (e) => {
                      addRuleFormModel.value.expression = e;
                    },
                  }),
              }
            ),
          ],
        }
      ),
  });
}

async function addRule() {
  const url = serverConfig.urlPrefix + serverConfig.apiMap.admin.rule;
  const result: { code: number; msg: string; data: null } = (
    await axios.post(url, addRuleFormModel.value, {
      headers: {
        Authorization: adminInfo.token,
      },
    })
  ).data;
  if (result.code === 0) {
    addRuleFormModel.value = { name: "", expression: "" };
    msg.success("创建成功");
    return true;
  } else {
    msg.error("创建失败: " + result.msg);
    return false;
  }
}
</script>

<template>
  <div id="main-container">
    <div v-if="loading">
      <NSkeleton text :repeat="5" />
      <NSkeleton text style="width: 60%" />
    </div>
    <div v-else>
      <NSpace vertical>
        <NButton style="float: right" @click="onAddRuleButtonClick" circle>
          <template #icon>
            <NIcon><Add /></NIcon>
          </template>
        </NButton>
        <NDataTable
          :data="rules"
          :columns="columns"
          :row-props="rowProps"
          :pagination="{ pageSize: 20 }"
          striped
        >
        </NDataTable>
      </NSpace>
    </div>
  </div>
</template>

<style>
#main-container {
  margin: 20px;
}
</style>
