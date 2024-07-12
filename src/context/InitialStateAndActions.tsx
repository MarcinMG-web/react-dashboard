import { User } from 'firebase/auth';
import { State } from './Interface';

// Initial State
export const initialState: State = {
  loading: false,
  authorizedUser: null,
  registerApp: false,
  openModalAddEditElements: {
    modal: false,
    isEdit: false,
  },
  openDeletedModal: false,
  selectedId: '',
};

// Actions
export type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AUTHORIZED_USER'; payload: User | null }
  | { type: 'SET_REGISTER_APP'; payload: boolean }
  | { type: 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS'; payload: { modal: boolean; isEdit: boolean } }
  | { type: 'SET_OPEN_DELETED_MODAL'; payload: boolean }
  | { type: 'SET_SELECTED_ID'; payload: string };

export type Dispatch = (action: Action) => void;
