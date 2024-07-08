import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import { ColorPaletteProp } from '@mui/joy/styles';
import Chip from '@mui/joy/Chip';

export type Status = 'Paid' | 'Refunded' | 'Cancelled';

interface ChipColorProps {
  status: Status;
}

export default function ChipColor({ status }: ChipColorProps): JSX.Element {
  const chipOption = {
    Paid: <CheckRoundedIcon />,
    Refunded: <AutorenewRoundedIcon />,
    Cancelled: <BlockIcon />,
  };

  const statusColors: Record<Status, ColorPaletteProp> = {
    Paid: 'success',
    Refunded: 'neutral',
    Cancelled: 'danger',
  };

  return (
    <Chip variant='soft' size='sm' startDecorator={chipOption[status]} color={statusColors[status]}>
      {status}
    </Chip>
  );
}
