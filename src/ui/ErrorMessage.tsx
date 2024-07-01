import { InfoOutlined } from '@mui/icons-material';
import { FormHelperText } from '@mui/joy';

interface ErrorMessageProps {
  error?: {
    message?: string;
  };
}

export default function ErrorMessage({ error }: ErrorMessageProps): JSX.Element {
  return (
    <FormHelperText>
      <InfoOutlined />
      {error?.message}
    </FormHelperText>
  );
}
