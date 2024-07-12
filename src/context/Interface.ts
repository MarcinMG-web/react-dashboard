import { User } from 'firebase/auth';

// State
export interface State {
  loading: boolean;
  authorizedUser: User | null;
  registerApp: boolean;
  openModalAddEditElements: { modal: boolean; isEdit: boolean };
  openDeletedModal: boolean;
  selectedId: string;
}
