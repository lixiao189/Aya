export interface Order {
  oid: string; //订单id
  pid: string; //商品id
  create_time: string; //创建时间
  status: string;  //订单状态
  purchase_number: number; //购买份数
  total_price: number; //订单总金额，单位为分
}
export interface OrderListResponse {
  code: number;
  msg: string;
  data: Order[];
}