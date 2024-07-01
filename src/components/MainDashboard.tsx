import { Box, Divider, Stack } from '@mui/joy';

import AuthenticationForm from './AuthenticationForm.tsx';
import AuthenticationProviders from './AuthenticationProviders.tsx';

export default function MainDashboard(): JSX.Element {
  return (
    <Box
      component='main'
      sx={{
        my: 'auto',
        py: 2,
        pb: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 400,
        maxWidth: '100%',
        mx: 'auto',
        borderRadius: 'sm',
        '& form': {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        },
      }}
    >
      <Stack gap={4} sx={{ mb: 2 }}>
        <AuthenticationProviders />
      </Stack>

      <Divider
        sx={(theme) => ({
          [theme.getColorSchemeSelector('light')]: {
            color: { xs: '#FFF', md: 'text.tertiary' },
          },
        })}
      >
        or
      </Divider>

      <Stack gap={4} sx={{ mt: 2 }}>
        <AuthenticationForm />
      </Stack>
    </Box>
  );
}
