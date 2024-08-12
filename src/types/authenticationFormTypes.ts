export type FormValues = {
  [AuthForm.EMAIL]: string
  [AuthForm.PASSWORD]: string
}

export enum AuthForm {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export const defaultAuthValues: FormValues = {
  [AuthForm.EMAIL]: '',
  [AuthForm.PASSWORD]: '',
}
