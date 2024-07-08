import { Box, Button, Link } from '@mui/joy';
import { signOut } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { auth } from '../../api/firebase';
import { useAppState } from '../../context/AppState';
import RoutesEnum from '../../types/routesEnum';
import ColorSchemeToggle from '../ColorSchemeToggle';

export default function Header(): JSX.Element {
  const { dispatch } = useAppState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        navigate(RoutesEnum.DASHBOARD);
        dispatch({ type: 'SET_REGISTER_APP', payload: false });
        enqueueSnackbar('Logout completed successfully. See you next time!', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  const visibleLogoutButton = pathname === RoutesEnum.APP;

  return (
    <Box
      component='header'
      sx={{
        py: 3,
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '3vw',
        marginRight: '3vw',
      }}
    >
      <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        {visibleLogoutButton && (
          <Button variant='outlined' color='danger' onClick={logOut}>
            Log Out
          </Button>
        )}
        <Link level='title-sm' href='#replace-with-a-link'>
          EN
        </Link>
        |
        <Link level='title-sm' href='#replace-with-a-link'>
          PL
        </Link>
      </Box>

      <ColorSchemeToggle />
    </Box>
  );
}
