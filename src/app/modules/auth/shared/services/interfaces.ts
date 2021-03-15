export interface POSTSignUpBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number;
  phoneNumber: string;
  locality: string;
  churchName: string;
  country: string;
}

export interface POSTSignInBody {
  email: string;
  password: string;
}

export interface POSTSignUpResponse {
  message: string;
  success: boolean;
}

export interface POSTSignInResponse {
  token: string;
}

export interface Role {
  id: number;
  roleName: string;
}
