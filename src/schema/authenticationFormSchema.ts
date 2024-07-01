import * as yup from 'yup';
import { AuthForm } from '../types/authenticationFormTypes';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const authSchema = yup.object({
  [AuthForm.EMAIL]: yup.string().matches(emailRegex, 'Invalid email address').required('Required'),
  [AuthForm.PASSWORD]: yup.string().min(8, 'Password must be at least 8 characters long').required('Required'),
});
