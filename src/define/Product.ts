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
