import { User } from 'firebase/auth';
import { State } from './Interface';
import { DataRow } from '../components/OrderTable/utils/data';

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
  queryText: '',
  selectedStatus: '',
  selectedCustomer: '',
  dataWithFilters: [],
};

// Actions
export type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AUTHORIZED_USER'; payload: User | null }
  | { type: 'SET_REGISTER_APP'; payload: boolean }
  | { type: 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS'; payload: { modal: boolean; isEdit: boolean } }
  | { type: 'SET_OPEN_DELETED_MODAL'; payload: boolean }
  | { type: 'SET_SELECTED_ID'; payload: string }
  | { type: 'SET_QUERY_TEXT'; payload: string }
  | { type: 'SET_SELECTED_STATUS'; payload: string }
  | { type: 'SET_SELECTED_CUSTOMER'; payload: string }
  | { type: 'SET_DATA_WITH_FILTERS'; payload: DataRow[] };

export type Dispatch = (action: Action) => void;
