import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: 'var(--color-myBrown)',
            '&:hover': {
              background: 'var(--color-myBrownHover)',
            },
          }),
        }),
      },
    },
  },
});
