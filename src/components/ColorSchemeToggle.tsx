import { useColorScheme, IconButton } from '@mui/joy';
import { useState, useEffect } from 'react';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { IconButtonProps } from '@mui/joy/IconButton';

export default function ColorSchemeToggle({ onClick, ...rest }: IconButtonProps): JSX.Element {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label='toggle light/dark mode'
      size='sm'
      variant='outlined'
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      {...rest}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}
