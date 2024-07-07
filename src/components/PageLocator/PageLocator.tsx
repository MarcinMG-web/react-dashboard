import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function PageLocator(): JSX.Element {
  return (
    <Breadcrumbs size='sm' aria-label='breadcrumbs' separator={<ChevronRightRoundedIcon />} sx={{ pl: 0 }}>
      <Link underline='none' color='neutral' href='#some-link' aria-label='Home'>
        <HomeRoundedIcon />
      </Link>
      <Link underline='hover' color='neutral' href='#some-link' fontSize={12} fontWeight={500}>
        Dashboard
      </Link>
      <Typography color='primary' fontWeight={500} fontSize={12}>
        Orders
      </Typography>
    </Breadcrumbs>
  );
}
