import { Card, Box, CardContent, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

interface MenuCardsProps {
  label: string;
  icon: JSX.Element;
  redirect: string;
}

export default function MenuCards({ label, icon, redirect }: MenuCardsProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <Card
      key={label}
      sx={{
        boxShadow: 'none',
        m: 0.6,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        '&:hover': { bgcolor: 'background.level1', border: '1px solid green' },
      }}
      onClick={() => navigate(redirect)}
    >
      <Box>{icon}</Box>
      <CardContent>
        <Typography level='title-md'>{label}</Typography>
      </CardContent>
    </Card>
  );
}
