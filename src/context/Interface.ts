import { User } from 'firebase/auth';
import { DataRow } from '../components/OrderTable/utils/data';

// State
export interface State {
  loading: boolean;
  authorizedUser: User | null;
  registerApp: boolean;
  openModalAddEditElements: { modal: boolean; isEdit: boolean };
  openDeletedModal: boolean;
  selectedId: string;
  queryText: string;
  selectedStatus: string;
  selectedCustomer: string;
  dataWithFilters: DataRow[];
}
