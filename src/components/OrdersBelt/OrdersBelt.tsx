import Button from '@mui/joy/Button'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import AddIcon from '@mui/icons-material/Add'
import { useAppState } from '../../context/AppState'
import { generatePDF } from './utils/generatePDF'
import { generateCSV } from './utils/generateCSV'

export default function OrdersBelt(): JSX.Element {
  const {
    state: { authorizedUser, dataWithFilters },
    dispatch,
  } = useAppState()

  const onClickAddNew = () =>
    dispatch({ type: 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS', payload: { modal: true, isEdit: false } })

  return (
    <Box
      sx={{
        display: 'flex',
        mt: 3,
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
        <Button
          color='neutral'
          variant='outlined'
          startDecorator={<DownloadRoundedIcon />}
          size='sm'
          onClick={() => generatePDF(dataWithFilters, authorizedUser)}
        >
          Download PDF
        </Button>
        <Button
          color='neutral'
          variant='outlined'
          startDecorator={<DownloadRoundedIcon />}
          size='sm'
          onClick={() => generateCSV(dataWithFilters)}
        >
          Download CSV
        </Button>
        <Button color='success' startDecorator={<AddIcon />} size='sm' onClick={onClickAddNew}>
          Add new
        </Button>
      </Box>
    </Box>
  )
}
