import { ProductDetail } from "./Product";

export interface AdminProductListReq {
  p: number;
  c: number;
}

export interface AdminProductListResponse {
  code: number;
  msg: string;
  data: ProductDetail[];
}

export interface AdminProductResponse {
  code: number;
  msg: string;
  data: null;
}
