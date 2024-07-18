import { useLocation, Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function PageLocator(): JSX.Element {
  const { pathname } = useLocation();
  const arrayOfPathnames = pathname.split('/').filter((path) => path);

  return (
    <Breadcrumbs size='sm' aria-label='breadcrumbs' separator={<ChevronRightRoundedIcon />} sx={{ pl: 0 }}>
      <HomeRoundedIcon />

      {arrayOfPathnames.map((value, index) => {
        const to = `/${arrayOfPathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === arrayOfPathnames.length - 1;
        const displayPath = value.charAt(0).toUpperCase() + value.slice(1);

        return isLast ? (
          <Typography color='primary' fontWeight={500} fontSize={12} key={to}>
            {displayPath}
          </Typography>
        ) : (
          <Link
            underline='hover'
            color='neutral'
            component={RouterLink}
            to={to}
            fontSize={12}
            fontWeight={500}
            key={to}
          >
            {displayPath}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
