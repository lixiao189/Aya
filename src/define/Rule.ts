export type Rule = {
  rid: string;
  name: string;
  use: boolean;
  create_time: string;
};

export type GetRuleListResponse = {
  code: number;
  msg: string;
  data: Rule[];
};

export type GetRuleResponse = {
  code: number;
  msg: string;
  data: string;
};
