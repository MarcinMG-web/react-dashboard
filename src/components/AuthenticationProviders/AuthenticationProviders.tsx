import { Button, Stack, Typography } from '@mui/joy';
import Link from '@mui/joy/Link';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { auth, googleProvider } from '../../api/firebase';
import { useAppState } from '../../context/AppState';
import RoutesEnum from '../../types/routesEnum';
import GoogleIcon from '../../ui/GoogleIcon/GoogleIcon.tsx';
import { createdNewCollection } from '../../api/createdNewCollection.ts';

export default function AuthenticationProviders(): JSX.Element {
  const navigate = useNavigate();
  const {
    state: { registerApp },
    dispatch,
  } = useAppState();

  const { enqueueSnackbar } = useSnackbar();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        // Create a new collection post-registration
        createdNewCollection(user);

        dispatch({ type: 'SET_AUTHORIZED_USER', payload: user });
        navigate(RoutesEnum.ORDERS);
        enqueueSnackbar('Login successful, good to see you again!', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  return (
    <>
      <Stack gap={1}>
        <Typography component='h1' level='h3'>
          {registerApp ? 'Registration' : 'Sign in'}
        </Typography>
        <Typography level='body-sm'>
          New to company?{' '}
          {registerApp ? (
            <Link href={RoutesEnum.LOGIN} level='title-sm'>
              Sign in!
            </Link>
          ) : (
            <Link href={RoutesEnum.REGISTER} level='title-sm'>
              Sign up!
            </Link>
          )}
        </Typography>
      </Stack>

      <Button variant='soft' color='neutral' onClick={handleGoogleLogin} fullWidth startDecorator={<GoogleIcon />}>
        Continue with Google
      </Button>
    </>
  );
}
