import { Button, Stack, Tooltip } from '@mui/joy'
import Avatar from '@mui/joy/Avatar'
import Typography from '@mui/joy/Typography'
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import DescriptionIcon from '@mui/icons-material/Description'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import ChipColor from '../../ui/ChipColor'
import RowMenu from '../RowMenu'
import { Status } from '../../ui/ChipColor/ChipColor'
import useLocalStorage from '../../hooks/useLocalStorage'
import { DataRow } from '../OrderTable/utils/data'
import { useAppState } from '../../context/AppState'

interface BodyTableProps {
  displayedRows: DataRow[]
}

export default function BodyTable({ displayedRows }: BodyTableProps): JSX.Element {
  const { dispatch } = useAppState()

  const [selected, setSelected] = useLocalStorage('selectedStars', [])

  const handleStarClick = (row: DataRow) => {
    if (selected.includes(row?.created)) {
      setSelected(selected.filter((el: string) => el !== row?.created))
    } else {
      setSelected([...selected, row?.created])
    }
  }

  const onClickEditElement = (id: DataRow['id']) => {
    dispatch({ type: 'SET_SELECTED_ID', payload: id })
    dispatch({ type: 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS', payload: { modal: true, isEdit: true } })
  }

  const onClickRemovedElement = (id: DataRow['id']) => {
    dispatch({ type: 'SET_SELECTED_ID', payload: id })
    dispatch({ type: 'SET_OPEN_DELETED_MODAL', payload: true })
  }

  const onClickOpenInvoiceModal = () => dispatch({ type: 'SET_OPEN_INVOICE_MODAL', payload: true })

  return (
    <>
      {displayedRows.map((row: DataRow) => (
        <tr key={row.id}>
          <td style={{ textAlign: 'center', width: 48 }}>
            <Tooltip title='Select' color='warning' placement='top'>
              <Stack
                onClick={() => handleStarClick(row)}
                style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
              >
                {selected.includes(row?.created) ? <StarIcon color='warning' /> : <StarBorderIcon />}
              </Stack>
            </Tooltip>
          </td>
          <td>
            <Typography level='body-xs'>{`INV - ${row.invoice.number}`}</Typography>
          </td>
          <td>
            <Typography level='body-xs'>{row.invoice.date}</Typography>
          </td>
          <td>
            <ChipColor status={row.invoice.status as Status} />
          </td>
          <td>
            <Stack direction='row' alignItems='center'>
              <Avatar size='sm'>{row.customer.initial}</Avatar>
              <div>
                <Typography level='body-md' color='success'>
                  {row.customer?.name}
                </Typography>
                <Typography level='body-xs'>{row.customer.email}</Typography>
              </div>
            </Stack>
          </td>
          <td>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Tooltip title='Edit' color='warning' placement='top-end'>
                <Button color='warning' variant='plain' size='md' onClick={() => onClickEditElement(row.id)}>
                  <CreateTwoToneIcon color='warning' />
                </Button>
              </Tooltip>

              <Tooltip title='Delete' color='danger' placement='top-end'>
                <Button color='danger' variant='plain' size='md' onClick={() => onClickRemovedElement(row.id)}>
                  <DeleteForeverTwoToneIcon
                    sx={{
                      color: 'var(--joy-palette-danger-700, #7D1212)',
                    }}
                  />
                </Button>
              </Tooltip>

              <Tooltip title='Invoice' color='primary' placement='top-end'>
                <Button color='primary' variant='plain' size='md' onClick={onClickOpenInvoiceModal}>
                  <DescriptionIcon />
                </Button>
              </Tooltip>

              <RowMenu />
            </Stack>
          </td>
        </tr>
      ))}
    </>
  )
}
