export interface Register {
  username: string;
  password: string;
  identity_number: string;
}

export interface RegisterResponse {
  code: number;
  msg: string;
  data: object;
}
