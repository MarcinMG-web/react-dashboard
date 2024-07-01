import { User } from 'firebase/auth';

// State
export interface State {
  loading: boolean;
  currentUser: User | null;
  registerApp: boolean;
}
