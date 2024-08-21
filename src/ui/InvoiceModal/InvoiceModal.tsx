import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import { useAppState } from '../../context/AppState'
import NewInvoiceForm from '../../components/NewInvoiceForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { invoiceSchema } from '../../schema/invoiceSchema'
import { InvoiceFormValues, defaultInvoiceValues } from '../../types/invoiceFormTypes'
import { Divider } from '@mui/joy'

export default function DeletedModal(): JSX.Element {
  const {
    state: { openInvoiceModal },
    dispatch,
  } = useAppState()

  const onClosed = () => {
    methods.reset()
    dispatch({ type: 'SET_OPEN_INVOICE_MODAL', payload: false })
  }

  const methods = useForm<InvoiceFormValues>({
    defaultValues: defaultInvoiceValues,
    resolver: yupResolver(invoiceSchema),
  })

  return (
    <Modal open={openInvoiceModal} onClose={onClosed}>
      <ModalDialog
        variant='outlined'
        role='alertdialog'
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: 'none',
            maxWidth: 'unset',
          },
        })}
      >
        <DialogTitle>
          <WarningRoundedIcon color='primary' />
          Invoice
        </DialogTitle>

        <Divider />

        <DialogContent>
          <FormProvider {...methods}>
            <NewInvoiceForm />
          </FormProvider>
        </DialogContent>
      </ModalDialog>
    </Modal>
  )
}
