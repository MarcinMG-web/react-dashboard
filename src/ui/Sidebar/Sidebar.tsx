import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Drawer from '@mui/joy/Drawer';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ModalClose from '@mui/joy/ModalClose';
import ColorSchemeToggle from '../ColorSchemeToggle';
import { Sheet } from '@mui/joy';
import { useAppState } from '../../context/AppState';
import { useMediaQuery } from '@mui/material';
import RoutesEnum from '../../types/routesEnum';
import LanguageToggle from '../LanguageToggle';
import UserAvatar from '../UserAvatar';
import MenuCards from '../MenuCards';
import MenuItems from '../MenuItems';

export default function Sidebar(): JSX.Element {
  const {
    state: { showSidebar },
    dispatch,
  } = useAppState();

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
    <Sheet
      sx={{
        p: 1,
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
            <MenuCards label={label} icon={icon} redirect={redirect} />
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
            {itemsAdmin.map(({ label, icon, redirect }) => (
              <MenuItems label={label} icon={icon} redirect={redirect} />
            ))}
          </List>
        </Box>

        <Divider
          sx={{
            m: 1,
          }}
        />

        <UserAvatar />
      </Drawer>
    </Sheet>
  );
}
