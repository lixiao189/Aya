export type User = {
  uid: string;
  username: string;
  age: number;
  sex: boolean;
  working_status: string;
  identity_number: string;
  dishonest: boolean;
  banned: boolean;
};

export type GetUserResponse = {
  code: number;
  msg: string;
  data: User[];
};
