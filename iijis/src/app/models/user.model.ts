export type userRegistrationModel = {
  firstName: string;
  lastName: string;
  affiliation: string;
  country: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
};
export type userRegistrationModelResponse = {
  tokens: {
    access : token,
    refresh : token
  },
  user: user
};
export type token = {
  expires : string;
  token : string;
};
export type user = {
  affiliation: string;
  country: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
  file?: any;
  role: string;
  password?: string;
  confirmPassword?: string;
  oldPassword?: string;
};
export type userLoginModel = {
  email : string;
  password : string;
};
export type userLoginModelResponse = {
  tokens: {
    access : token,
    refresh : token
  },
  user: user
};
export enum Role {
  user = 'user',
  admin = 'admin'
}
