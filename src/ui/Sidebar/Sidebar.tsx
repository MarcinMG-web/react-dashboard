import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Drawer from '@mui/joy/Drawer';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ColorSchemeToggle from '../ColorSchemeToggle';
import ModalClose from '@mui/joy/ModalClose';

import { Card, CardContent, Sheet } from '@mui/joy';
import { useAppState } from '../../context/AppState';
import { signOut } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../api/firebase';
import RoutesEnum from '../../types/routesEnum';
import { useMediaQuery } from '@mui/material';
import LanguageToggle from '../LanguageToggle';

export default function Sidebar(): JSX.Element {
  const {
    state: { showSidebar },
    dispatch,
  } = useAppState();

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

  const isMobile = useMediaQuery('(max-width:600px)');

  const items = [
    {
      label: 'Orders',
      icon: <ShoppingCartRoundedIcon color='success' />,
      redirect: RoutesEnum.ORDERS,
    },
    {
      label: 'Invoice',
      icon: <DescriptionIcon color='primary' />,
      redirect: RoutesEnum.INVOICE,
    },
  ];

  const itemsAdmin = [
    {
      label: 'Support',
      icon: <SupportRoundedIcon />,
      redirect: RoutesEnum.SUPPORT,
    },
    {
      label: 'Settings',
      icon: <SettingsRoundedIcon />,
      redirect: RoutesEnum.SETTINGS,
    },
  ];

  return (
    <>
      <Sheet
        sx={{
          borderRadius: 'md',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Drawer
          open={showSidebar}
          size={isMobile ? 'lg' : 'sm'}
          onClose={() => dispatch({ type: 'SET_SHOW_SIDEBAR', payload: false })}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              mr: 2,
              ml: 2,
              mt: 2,
            }}
          >
            <LanguageToggle />
            <ModalClose size='lg' />
          </Box>

          <Divider
            sx={{
              m: 1,
            }}
          />

          <ColorSchemeToggle sx={{ m: 0.6 }} />

          <Divider
            sx={{
              m: 1,
            }}
          />

          <Input sx={{ m: 0.6 }} size='md' startDecorator={<SearchRoundedIcon />} placeholder='Search' />

          <Box
            sx={{
              minHeight: 0,
              overflow: 'hidden auto',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              mt: 3,
              [`& .${listItemButtonClasses.root}`]: {
                gap: 1.5,
              },
            }}
          >
            {items.map(({ label, icon, redirect }) => (
              <Card
                key={label}
                sx={{
                  boxShadow: 'none',
                  m: 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  '&:hover': { bgcolor: 'background.level1', border: '1px solid green' },
                }}
                onClick={() => navigate(redirect)}
              >
                <Box>{icon}</Box>
                <CardContent>
                  <Typography level='title-md'>{label}</Typography>
                </CardContent>
              </Card>
            ))}

            <List
              size='sm'
              sx={{
                mt: 'auto',
                flexGrow: 0,
                '--ListItem-radius': (theme) => theme.vars.radius.sm,
                '--List-gap': '8px',
                mb: 2,
              }}
            >
              {itemsAdmin.map(({ label, icon }) => (
                <ListItem
                  sx={{
                    '&:hover': {
                      border: '1px solid green',
                    },
                  }}
                  key={label}
                >
                  <ListItemButton disabled={true}>
                    {icon}
                    {label}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider
            sx={{
              m: 1,
            }}
          />

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
        </Drawer>
      </Sheet>
    </>
  );
}
