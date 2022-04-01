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