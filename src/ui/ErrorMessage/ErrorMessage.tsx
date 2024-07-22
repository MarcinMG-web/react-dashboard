import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { FormHelperText } from '@mui/joy'

interface ErrorMessageProps {
  error?: {
    message?: string
  }
}

export default function ErrorMessage({ error }: ErrorMessageProps): JSX.Element {
  return (
    <FormHelperText>
      <WarningAmberRoundedIcon />
      {error?.message}
    </FormHelperText>
  )
}
