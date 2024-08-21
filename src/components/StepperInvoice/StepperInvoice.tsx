import { Stepper, stepClasses, typographyClasses, Step, StepIndicator, Box, Typography } from '@mui/joy'
import { useAppState } from '../../context/AppState'

interface StepperInvoiceProps {
  activeStep: number
  steps: {
    title: string
    icon: JSX.Element
  }[]
}

export default function StepperInvoice({ activeStep, steps }: StepperInvoiceProps): JSX.Element {
  const {
    state: { openInvoiceModal },
  } = useAppState()

  const getStepColor = (index: number) => {
    switch (true) {
      case openInvoiceModal:
        return 'primary'
      case activeStep === index:
        return 'success'
      default:
        return 'neutral'
    }
  }

  return (
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
            <StepIndicator variant='soft' color={getStepColor(index)}>
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
  )
}
