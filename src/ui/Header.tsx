import { Box, Button, IconButton, Typography } from '@mui/joy';
import logoIcon from '../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import RoutesEnum from '../types/routesEnum';
import ColorSchemeToggle from '../components/ColorSchemeToggle';

export default function Header(): JSX.Element {
  const { dispatch } = useAppState();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logOut = async () => {
    navigate(RoutesEnum.DASHBOARD);
    dispatch({ type: 'SET_REGISTER_APP', payload: false });
  };

  const visibleLogoutButton = pathname === RoutesEnum.APP;

  return (
    <Box
      component='header'
      sx={{
        py: 3,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        <IconButton variant='soft' color='primary' size='sm'>
          <img src={logoIcon} alt='icon' style={{ width: '20px', height: '20px' }} />
          {visibleLogoutButton && (
            <Button variant='soft' color='neutral' onClick={logOut}>
              Log Out
            </Button>
          )}
        </IconButton>
      </Box>

      <Typography level='title-lg' sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        Dashboard App
      </Typography>

      <ColorSchemeToggle />
    </Box>
  );
}
