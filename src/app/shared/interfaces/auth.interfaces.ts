export interface ISignInBody {
  email: string;
  password: string;
}

// TODO: extend from user interface when user interface will be presented
export interface ISignUpBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number;
  phoneNumber: string;
}

export interface ISignInResponse {
  token: string;
}

export interface IResetPasswordBody {
  userId: number;
  password: string;
  passwordForComparison: string;
}

export interface IRequestResetPasswordBody {
  email: string;
}
