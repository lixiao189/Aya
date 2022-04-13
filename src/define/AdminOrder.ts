export type AdminGetOderResponse = {
  code: number;
  msg: string;
  data: AdminOrder[];
};

export type AdminOrder = {
  oid: string;
  uid: string;
  pid: string;
  status: string;
  total_price: number;
  create_time: string;
  purchase_number: number;
};
