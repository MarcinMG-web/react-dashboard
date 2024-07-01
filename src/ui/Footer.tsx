import { Box, Typography } from '@mui/joy';
import packageJson from '../../package.json';

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <Box component='footer' sx={{ py: 3 }}>
      <Typography level='body-xs' textAlign='center'>
        <h5>© Dashboard App {year}</h5> <h6> Wersja aplikacji: {packageJson.version}</h6>
      </Typography>
    </Box>
  );
}
