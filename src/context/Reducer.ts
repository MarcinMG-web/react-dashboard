// Reducer to Handle Actions

import { State } from './Interface';
import { Action } from './InitialStateAndActions';

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'SET_REGISTER_APP':
      return {
        ...state,
        registerApp: action.payload,
      };
    case 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS':
      return {
        ...state,
        openModalAddEditElements: {
          modal: action.payload.modal,
          isEdit: action.payload.isEdit,
        },
      };
    case 'SET_OPEN_DELETED_MODAL':
      return {
        ...state,
        openDeletedModal: action.payload,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
