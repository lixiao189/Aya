export interface LoginResponse {
  code: number;
  msg: string;
  data: {
    token: string;
  };
}
