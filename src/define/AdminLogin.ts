export interface AdminLoginResponse {
  code: number;
  msg: string;
  data: {
    token: string;
    profile: {
      admin_id: string;
      role: string;
    };
  };
}
