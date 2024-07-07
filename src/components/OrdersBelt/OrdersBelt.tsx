import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import AddIcon from '@mui/icons-material/Add';

export default function OrdersBelt(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        mb: 1,
        gap: 1,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'start', sm: 'center' },
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Typography level='h2' component='h1'>
        Orders
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          marginLeft: 'auto',
        }}
      >
        <Button color='neutral' variant='outlined' startDecorator={<DownloadRoundedIcon />} size='sm'>
          Download PDF
        </Button>
        <Button color='neutral' variant='outlined' startDecorator={<DownloadRoundedIcon />} size='sm'>
          Download CSV
        </Button>
        <Button color='success' startDecorator={<AddIcon />} size='sm'>
          Add new
        </Button>
      </Box>
    </Box>
  );
}
