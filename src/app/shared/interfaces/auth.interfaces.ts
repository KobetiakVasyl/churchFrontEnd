export interface SignInBody {
  email: string;
  password: string;
}

export interface SignUpResponse {
  message: string;
  success: boolean;
}

export interface SignUpBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number;
  phoneNumber: string;
}

export interface SignInResponse {
  token: string;
}

export interface ResetPasswordBody {
  userId: number;
  password: string;
  passwordForComparison: string;
}

export interface SendEmailToResetPasswordBody {
  email: string;
}
