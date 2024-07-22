import { Box, Link } from '@mui/joy'

export default function LanguageToggle(): JSX.Element {
  return (
    <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
      <Link level='title-sm' href='#replace-with-a-link'>
        EN
      </Link>
      |
      <Link level='title-sm' href='#replace-with-a-link'>
        PL
      </Link>
    </Box>
  )
}
