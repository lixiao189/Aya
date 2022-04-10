export type AdminLoginResponse = {
  code: number;
  msg: string;
  data: {
    token: string;
    profile: {
      username: string;
      admin_id: string;
      role: string[];
    };
  };
};
