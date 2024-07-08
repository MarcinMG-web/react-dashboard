import { User } from 'firebase/auth';
import { State } from './Interface';

// Initial State
export const initialState: State = {
  loading: false,
  currentUser: null,
  registerApp: false,
  openModalAddEditElements: {
    modal: false,
    isEdit: false,
  },
  openDeletedModal: false,
};

// Actions
export type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'SET_REGISTER_APP'; payload: boolean }
  | { type: 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS'; payload: { modal: boolean; isEdit: boolean } }
  | { type: 'SET_OPEN_DELETED_MODAL'; payload: boolean };

export type Dispatch = (action: Action) => void;
