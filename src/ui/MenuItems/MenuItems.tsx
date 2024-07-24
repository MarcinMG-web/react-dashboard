import { ListItem, ListItemButton } from '@mui/joy'
import { useNavigate } from 'react-router-dom'

interface MenuItemsProps {
  label: string
  icon: JSX.Element
  redirect: string
}

export default function MenuItems({ label, icon, redirect }: MenuItemsProps): JSX.Element {
  const navigate = useNavigate()

  return (
    <ListItem
      sx={{
        '&:hover': {
          border: '1px solid green',
        },
      }}
      key={redirect}
    >
      <ListItemButton onClick={() => navigate(redirect)} disabled={true}>
        {icon}
        {label}
      </ListItemButton>
    </ListItem>
  )
}
