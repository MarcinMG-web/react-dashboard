import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone'
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone'
import SpeakerNotesTwoToneIcon from '@mui/icons-material/SpeakerNotesTwoTone'
import TransferWithinAStationTwoToneIcon from '@mui/icons-material/TransferWithinAStationTwoTone'
import { Box, Stack } from '@mui/joy'
import InvoiceHeader from '../InvoiceHeader'
import InvoiceSellerBuyer from '../InvoiceSellerBuyer'
import InvoiceNotes from '../InvoiceNotes'
import InvoicesListed from '../InvoicesListed'
import InvoicePaymentAndPreferences from '../InvoicePaymentAndPreferences'
import { useState } from 'react'
import PaginationInvoice from '../PaginationInvoice'
import StepperInvoice from '../StepperInvoice'
import Invoice from '../Invoice'
import { useAppState } from '../../context/AppState'

export default function NewInvoiceForm(): JSX.Element {
  const {
    state: { openInvoiceModal, componentRef },
  } = useAppState()

  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { title: 'Date', icon: <CalendarTodayRoundedIcon /> },
    { title: 'Seller / Buyer', icon: <TransferWithinAStationTwoToneIcon /> },
    { title: 'Main', icon: <AppRegistrationTwoToneIcon /> },
    { title: 'Payment Details', icon: <PaymentTwoToneIcon /> },
    { title: 'Notes', icon: <SpeakerNotesTwoToneIcon /> },
  ]

  const renderStepComponent = (step: number) => {
    switch (step) {
      case 0:
        return <InvoiceHeader />
      case 1:
        return <InvoiceSellerBuyer />
      case 2:
        return <InvoicesListed />
      case 3:
        return <InvoicePaymentAndPreferences />
      case 4:
        return <InvoiceNotes />
      case 5:
        return openInvoiceModal ? (
          <Box width='99%' height='100vh' display='flex' alignItems='center' justifyContent='center' ref={componentRef}>
            <Invoice />
          </Box>
        ) : null
      default:
        return null
    }
  }

  return (
    <Box>
      <Stack display='flex' alignItems='center'>
        <StepperInvoice activeStep={activeStep} steps={steps} />
      </Stack>

      <Box sx={{ padding: { xs: '5px', sm: '10px' } }}>{renderStepComponent(activeStep)}</Box>

      <PaginationInvoice activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />
    </Box>
  )
}
