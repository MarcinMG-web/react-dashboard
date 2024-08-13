import Stepper from '@mui/joy/Stepper'
import Step, { stepClasses } from '@mui/joy/Step'
import StepIndicator from '@mui/joy/StepIndicator'
import Typography, { typographyClasses } from '@mui/joy/Typography'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone'
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone'
import SpeakerNotesTwoToneIcon from '@mui/icons-material/SpeakerNotesTwoTone'
import { Box, Button, Stack } from '@mui/joy'
import InvoiceHeader from '../InvoiceHeader'
import InvoiceSellerBuyer from '../InvoiceSellerBuyer'
import InvoiceNotes from '../InvoiceNotes'
import InvoicesListed from '../InvoicesListed'
import InvoicePaymentAndPreferences from '../InvoicePaymentAndPreferences'
import { enqueueSnackbar } from 'notistack'
import { generatePDF } from '../../pages/InvoicePage/utils/generateInvoicePDF'
import { RefObject, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { validationByStep } from './utils/validationByStep'

interface NewInvoiceFormProps {
  componentRef: RefObject<HTMLDivElement>
}

export default function NewInvoiceForm({ componentRef }: NewInvoiceFormProps): JSX.Element {
  const { reset, trigger } = useFormContext()
  const [activeStep, setActiveStep] = useState(0)

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
    generatePDF(componentRef)
    enqueueSnackbar('Success download .pdf file!', { variant: 'success' })
  }

  const steps = [
    { title: 'Date and Seller / Buyer', icon: <CalendarTodayRoundedIcon /> },
    { title: 'Main', icon: <AppRegistrationTwoToneIcon /> },
    { title: 'Payment Details', icon: <PaymentTwoToneIcon /> },
    { title: 'Notes', icon: <SpeakerNotesTwoToneIcon /> },
  ]

  const renderStepComponent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <InvoiceHeader />
            <InvoiceSellerBuyer />
          </>
        )
      case 1:
        return <InvoicesListed />
      case 2:
        return <InvoicePaymentAndPreferences />
      case 3:
        return <InvoiceNotes />
      default:
        return null
    }
  }

  return (
    <Box>
      <Stack display='flex' alignItems='center'>
        <Stepper
          orientation='horizontal'
          sx={{
            width: { xs: '90vw', sm: '70vw', md: '50vw' },
            mt: '15px',
            '--Stepper-horizontalGap': '1rem',
            '--StepIndicator-size': '2rem',
            '--Step-gap': '0.5rem',
            '--Step-connectorInset': '0.5rem',
            '--Step-connectorRadius': '0.75rem',
            '--Step-connectorThickness': '3px',
            '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',
            [`& .${stepClasses.completed}`]: {
              '&::after': { bgcolor: 'success.solidBg' },
            },
            [`& .${typographyClasses['title-sm']}`]: {
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontSize: { xs: '8px', sm: '10px' },
            },
          }}
        >
          {steps.map((step, index) => (
            <Step
              key={index}
              completed={activeStep > index}
              active={activeStep === index}
              indicator={
                <StepIndicator variant='soft' color={activeStep === index ? 'success' : 'neutral'}>
                  {step.icon}
                </StepIndicator>
              }
            >
              <Box
                sx={{
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <Typography level='title-sm'>{`Step ${index + 1}`}</Typography>
                {step.title}
              </Box>
            </Step>
          ))}
        </Stepper>
      </Stack>

      <Box sx={{ padding: { xs: '5px', sm: '10px' } }}>{renderStepComponent(activeStep)}</Box>

      <Stack width='98%' direction='row' justifyContent='space-between' padding={{ xs: '5px', sm: '10px' }}>
        <Button color='neutral' variant='outlined' onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>

        {activeStep === 3 ? (
          <Stack direction='row' spacing={1}>
            <Button color='danger' variant='outlined' onClick={resetAndStartAgain}>
              Reset & Start Again
            </Button>
            <Button color='success' onClick={handlePrintClick}>
              Download Invoice
            </Button>
          </Stack>
        ) : (
          <Button color='neutral' variant='outlined' onClick={handleNext}>
            Next
          </Button>
        )}
      </Stack>
    </Box>
  )
}
