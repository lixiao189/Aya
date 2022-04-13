export interface CountReq {
  table: string;
}

export interface CountResponse {
  code: number;
  msg: string;
  data: number;
}
