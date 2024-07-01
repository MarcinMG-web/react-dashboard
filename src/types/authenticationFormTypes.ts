export type FormValues = {
  [AuthForm.EMAIL]: string;
  [AuthForm.PASSWORD]: string;
};

export enum AuthForm {
  EMAIL = 'email',
  PASSWORD = 'password',
}
