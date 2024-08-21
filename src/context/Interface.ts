import { User } from 'firebase/auth'
import { DataRow } from '../components/OrderTable/utils/data'
import { RefObject } from 'react'

// State
export interface State {
  loading: boolean
  authorizedUser: User | null
  registerApp: boolean
  openModalAddEditElements: { modal: boolean; isEdit: boolean }
  openDeletedModal: boolean
  openInvoiceModal: boolean
  selectedId: string
  queryText: string
  selectedStatus: string
  selectedCustomer: string
  dataWithFilters: DataRow[]
  showSidebar: boolean
  componentRef: RefObject<HTMLDivElement> | null
}
