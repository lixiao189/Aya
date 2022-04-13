import { ProductDetail } from "./Product";

export interface AdminProductListReq {
  p: number;
  c: number;
}

export interface AdminProuductListResponse {
  code: number;
  msg: string;
  data: ProductDetail[];
}
