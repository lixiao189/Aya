// 商品的传输类型定义
export interface Product {
  pid: string;
  begin_time: number;
  end_time: number;
  name: string;
  stock: number;
  price: number;
  money_rate: number;
}

// 获取商品列表的响应类型定义
export interface ProductListResponse {
  code: number;
  msg: string;
  data: Product[];
}

// 产品的详情信息
export interface ProductDetail {
  pid: string;
  begin_time: number;
  end_time: number;
  name: string;
  stock: number;
  price: number;
  money_rate: number;
  purchase_limit: number;
  incre_amount: number;
  product_term: string;
  risk_level: string;
  value_date: string;
  due_date: string;
  settlement_method: string;
}

// 获取产品详情的响应结构的定义
export interface ProductDetailResponse {
  code: number;
  msg: string;
  data: ProductDetail;
}

// 获取产品实时库存的响应
export interface ProductStockResponse {
  code: number;
  msg: string;
  data: number;
}

// 获取产品秒杀 URL 的接口响应
export interface ProductOrderUrlResponse {
  code: number;
  msg: string;
  data: string;
}

/* ================ 提交订单接口 ================== */

// 提交订单接口请求数据格式
export interface SubmitOrder {
  pid: string;
  end_time: number;
  purchase_number: number;
  price: number;
}

// 提交订单接口接收数据格式
export interface SubmitOrderResponse {
  code: number;
  msg: string;
  data: string;
}
