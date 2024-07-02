import { Box, iconButtonClasses, Button, IconButton } from '@mui/joy';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function Pagination(): JSX.Element {
  const pages = [1, 2, 3, '…', 8, 9, 10];
  return (
    <Box
      className='Pagination-laptopUp'
      sx={{
        pt: 2,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
        display: {
          xs: 'none',
          md: 'flex',
        },
      }}
    >
      <Button size='sm' variant='outlined' color='neutral' startDecorator={<KeyboardArrowLeftIcon />}>
        Previous
      </Button>

      <Box sx={{ flex: 1 }} />
      {pages.map((page) => (
        <IconButton key={page} size='sm' variant={page ? 'outlined' : 'plain'} color='neutral'>
          {page}
        </IconButton>
      ))}
      <Box sx={{ flex: 1 }} />

      <Button size='sm' variant='outlined' color='neutral' endDecorator={<KeyboardArrowRightIcon />}>
        Next
      </Button>
    </Box>
  );
}
