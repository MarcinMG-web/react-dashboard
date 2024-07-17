import Typography from '@mui/material/Typography';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import { Stack } from '@mui/joy';

export default function NoData(): JSX.Element {
  return (
    <Stack display='row' alignItems='center'>
      <DraftsTwoToneIcon color='primary' sx={{ fontSize: 40 }} />
      <Typography variant='overline' color='textSecondary'>
        No Data
      </Typography>
    </Stack>
  );
}
