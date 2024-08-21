import { Button, Stack } from '@mui/joy'
import { validationByStep } from '../NewInvoiceForm/utils/validationByStep'
import { enqueueSnackbar } from 'notistack'
import { generatePDF } from '../../pages/InvoicePage/utils/generateInvoicePDF'
import { useAppState } from '../../context/AppState'
import { useFormContext } from 'react-hook-form'
import { Dispatch, RefObject, SetStateAction } from 'react'

interface PaginationInvoiceProps {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  steps: {
    title: string
    icon: JSX.Element
  }[]
}

export default function PaginationInvoice({ activeStep, setActiveStep, steps }: PaginationInvoiceProps): JSX.Element {
  const {
    state: { componentRef, openInvoiceModal },
  } = useAppState()

  const { reset, trigger } = useFormContext()

  const handleNext = async () => {
    const fieldsToValidate = validationByStep(activeStep)
    const valid = await trigger(fieldsToValidate)

    if (valid && activeStep < steps.length) {
      setActiveStep((prev) => prev + 1)
    } else if (!valid) {
      enqueueSnackbar('Please fill in all required fields!', { variant: 'error' })
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1)
    }
  }

  const resetAndStartAgain = () => {
    setActiveStep(0)
    reset()
  }

  const handlePrintClick = () => {
    generatePDF(componentRef as RefObject<HTMLDivElement>)
    enqueueSnackbar('Success download .pdf file!', { variant: 'success' })
  }

  const stepLength = openInvoiceModal ? steps.length : steps.length - 1

  return (
    <Stack width='98%' direction='row' justifyContent='space-between' padding={{ xs: '5px', sm: '10px' }}>
      <Button color='neutral' variant='outlined' onClick={handleBack} disabled={activeStep === 0}>
        Back
      </Button>

      {activeStep === stepLength ? (
        <Stack direction='row' spacing={1}>
          <Button color='danger' variant='outlined' onClick={resetAndStartAgain}>
            Reset & Start Again
          </Button>
          <Button color={openInvoiceModal ? 'primary' : 'success'} onClick={handlePrintClick}>
            Download Invoice
          </Button>
        </Stack>
      ) : (
        <Button color='neutral' variant='outlined' onClick={handleNext}>
          Next
        </Button>
      )}
    </Stack>
  )
}
