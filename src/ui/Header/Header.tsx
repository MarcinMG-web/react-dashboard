import { Box, Button, Tooltip } from '@mui/joy'
import { useLocation } from 'react-router-dom'
import { useAppState } from '../../context/AppState'
import RoutesEnum from '../../types/routesEnum'
import ColorSchemeToggle from '../ColorSchemeToggle'
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone'
import PageLocator from '../PageLocator'
import LanguageToggle from '../LanguageToggle'

export default function Header(): JSX.Element {
  const { dispatch } = useAppState()
  const { pathname } = useLocation()

  const visibleLanguageAndChangeColorArray = [RoutesEnum.LOGIN, RoutesEnum.REGISTER]

  const visibleLanguageAndChangeColor = visibleLanguageAndChangeColorArray.includes(pathname as RoutesEnum)

  return (
    <Box
      component='header'
      sx={{
        pt: 0.5,
        display: 'flex',
        justifyContent: 'space-between',
        px: 1,
        py: 1,
        mr: 6,
        ml: 6,
      }}
    >
      {visibleLanguageAndChangeColor ? (
        <>
          <LanguageToggle />
          <ColorSchemeToggle />
        </>
      ) : (
        <>
          <PageLocator />

          <Tooltip title='Menu' color='neutral' placement='top-end'>
            <Button
              variant='outlined'
              color='neutral'
              onClick={() => dispatch({ type: 'SET_SHOW_SIDEBAR', payload: true })}
            >
              <MenuTwoToneIcon />
            </Button>
          </Tooltip>
        </>
      )}
    </Box>
  )
}
