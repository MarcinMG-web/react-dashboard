import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Stack } from '@mui/joy'
import Link from '@mui/joy/Link'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../api/firebase.ts'
import { useAppState } from '../../context/AppState.tsx'
import { authSchema } from '../../schema/authenticationFormSchema.ts'
import { AuthForm, FormValues, defaultAuthValues } from '../../types/authenticationFormTypes.ts'
import RoutesEnum from '../../types/routesEnum.ts'
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage.tsx'
import { useSnackbar } from 'notistack'
import { createdNewCollection } from '../../api/createdNewCollection.ts'

export default function AuthenticationForm(): JSX.Element {
  const navigate = useNavigate()

  const {
    state: { registerApp },
    dispatch,
  } = useAppState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultAuthValues,
    resolver: yupResolver(authSchema),
  })

  const { EMAIL, PASSWORD } = AuthForm

  const { enqueueSnackbar } = useSnackbar()

  const onSubmitRegistration = async (data: FormValues) => {
    const { email, password } = data

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user

        // Create a new collection post-registration
        createdNewCollection(user)

        dispatch({ type: 'SET_AUTHORIZED_USER', payload: user })
        navigate(RoutesEnum.ORDERS)
        enqueueSnackbar('Registration completed successfully, let`s get started!', { variant: 'success' })
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' })
      })
  }

  const onSubmitLogIn = async (data: FormValues) => {
    const { email, password } = data

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user
        dispatch({ type: 'SET_AUTHORIZED_USER', payload: user })
        navigate(RoutesEnum.ORDERS)
        enqueueSnackbar('Let`s get started!', { variant: 'success' })
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' })
      })
  }

  return (
    <form onSubmit={registerApp ? handleSubmit(onSubmitRegistration) : handleSubmit(onSubmitLogIn)}>
      <FormControl error={!!errors[EMAIL]}>
        <FormLabel>Email</FormLabel>
        <Input type='email' {...register(EMAIL)} />
        {!!errors[EMAIL] && <ErrorMessage error={errors[EMAIL]} />}
      </FormControl>

      <FormControl error={!!errors[PASSWORD]}>
        <FormLabel>Password</FormLabel>
        <Input type='password' {...register(PASSWORD)} />
        {!!errors[PASSWORD] && <ErrorMessage error={errors[PASSWORD]} />}
      </FormControl>

      <Stack gap={4} sx={{ mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Checkbox size='sm' label='Remember me' name='persistent' />
          <Link level='title-sm' href='#replace-with-a-link'>
            Forgot your password?
          </Link>
        </Box>

        <Button type='submit' color='success' fullWidth>
          {registerApp ? 'Registration' : 'Sign in'}
        </Button>
      </Stack>
    </form>
  )
}
