export interface ISendOtp {
    email: string,
    name?: string
}

export interface IVerifyOtp {
  email: string
  otp: string
}