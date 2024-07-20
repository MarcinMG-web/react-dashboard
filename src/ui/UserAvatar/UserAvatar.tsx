import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Box, Typography } from '@mui/joy';
import { signOut } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../api/firebase';
import { useAppState } from '../../context/AppState';
import RoutesEnum from '../../types/routesEnum';

export default function UserAvatar(): JSX.Element {
  const { dispatch } = useAppState();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        navigate(RoutesEnum.LOGIN);
        dispatch({ type: 'SET_REGISTER_APP', payload: false });
        dispatch({ type: 'SET_SHOW_SIDEBAR', payload: false });
        enqueueSnackbar('Logout completed successfully. See you next time!', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', m: 2 }}>
      <Avatar variant='outlined' size='sm' src='src/assets/avatars.png' />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography level='title-sm'>Jon Do.</Typography>
        <Typography level='body-xs'>jon@do.com</Typography>
      </Box>
      <IconButton size='sm' variant='plain' color='danger' onClick={logOut}>
        <LogoutRoundedIcon />
      </IconButton>
    </Box>
  );
}
