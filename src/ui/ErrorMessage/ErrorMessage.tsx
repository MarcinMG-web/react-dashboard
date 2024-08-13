import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { FormHelperText } from '@mui/joy'

interface ErrorMessageProps {
  error?: {
    message?: string
  }
  errorInArray?: string
}

export default function ErrorMessage({ error, errorInArray }: ErrorMessageProps): JSX.Element {
  return (
    <FormHelperText sx={{ fontSize: errorInArray }}>
      <WarningAmberRoundedIcon />
      {error?.message}
    </FormHelperText>
  )
}
