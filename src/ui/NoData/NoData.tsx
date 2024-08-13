import Typography from '@mui/material/Typography'
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone'
import { Stack } from '@mui/joy'

interface NoDataProps {
  colSpan?: number
}

export default function NoData({ colSpan = 6 }: NoDataProps): JSX.Element {
  return (
    <tr>
      <td colSpan={colSpan} style={{ textAlign: 'center', padding: '20px 0' }}>
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
          <DraftsTwoToneIcon color='primary' sx={{ fontSize: 40 }} />
          <Typography variant='overline' color='textSecondary'>
            No Data
          </Typography>
        </Stack>
      </td>
    </tr>
  )
}
