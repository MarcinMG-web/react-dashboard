import { Button, Stack } from '@mui/joy';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';
import { ErrorCode, ErrorPageProps } from './utils/types';
import {
  AnimatedErrorOutlineIcon,
  AnimatedLockPersonIcon,
  AnimatedReportProblemIcon,
  AnimatedRunningWithErrorsIcon,
} from './utils/animation';

export default function ErrorPages({ errorCode }: ErrorPageProps) {
  const navigate = useNavigate();

  const redirect = () => navigate(-1);

  const displayError = (errorCode?: ErrorCode) => {
    switch (errorCode) {
      case 400:
        return {
          status: '400',
          title: 'Bad Request',
          subTitle: 'The server could not understand the request due to invalid syntax.',
          icon: <AnimatedErrorOutlineIcon />,
        };

      case 403:
        return {
          status: '403',
          title: 'Forbidden',
          subTitle: 'Sorry, you are not authorized to access this page.',
          icon: <AnimatedLockPersonIcon />,
        };

      case 404:
        return {
          status: '404',
          title: 'Not Found',
          subTitle: 'Sorry, the page you visited does not exist.',
          icon: <AnimatedReportProblemIcon />,
        };

      default:
        return {
          status: '500',
          title: 'Internal Server Error',
          subTitle: 'Sorry, something went wrong.',
          icon: <AnimatedRunningWithErrorsIcon />,
        };
    }
  };

  const { status, title, subTitle, icon } = displayError(errorCode);

  return (
    <>
      <CssBaseline />
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          textAlign: 'center',
        }}
      >
        {icon}
        <Typography level='h1' fontSize='xl'>
          {status}
        </Typography>

        <Typography level='body-xs' sx={{ mt: 1, mb: 2 }}>
          {title}
        </Typography>

        <Typography level='body-sm'>{subTitle}</Typography>
        <Button
          sx={{
            mt: 3,
          }}
          onClick={redirect}
        >
          Back
        </Button>
      </Stack>
    </>
  );
}
