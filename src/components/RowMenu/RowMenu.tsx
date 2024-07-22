import { Dropdown, MenuButton, IconButton, Menu, MenuItem, Divider } from '@mui/joy'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'

export default function RowMenu(): JSX.Element {
  const menuItems = [
    {
      name: 'Edit',
    },
    {
      name: 'Rename',
    },
    {
      name: 'Move',
    },
  ]

  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}>
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size='sm' sx={{ minWidth: 140 }}>
        {menuItems.map(({ name }) => (
          <MenuItem key={name}>{name}</MenuItem>
        ))}
        <Divider />
        <MenuItem color='danger'>Delete</MenuItem>
      </Menu>
    </Dropdown>
  )
}
