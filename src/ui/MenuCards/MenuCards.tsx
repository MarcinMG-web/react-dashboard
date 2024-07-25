import { Card, Box, CardContent, Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../context/AppState'

interface MenuCardsProps {
  label: string
  icon: JSX.Element
  redirect: string
}

export default function MenuCards({ label, icon, redirect }: MenuCardsProps): JSX.Element {
  const { dispatch } = useAppState()
  const navigate = useNavigate()

  const redirectOnPage = () => {
    navigate(redirect)
    dispatch({ type: 'SET_SHOW_SIDEBAR', payload: false })
  }

  return (
    <Card
      sx={{
        boxShadow: 'none',
        m: 0.6,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        '&:hover': { bgcolor: 'background.level1', border: '1px solid green' },
      }}
      onClick={redirectOnPage}
    >
      <Box>{icon}</Box>
      <CardContent>
        <Typography level='title-md'>{label}</Typography>
      </CardContent>
    </Card>
  )
}
