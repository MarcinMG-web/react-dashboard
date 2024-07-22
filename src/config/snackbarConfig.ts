import styled from '@emotion/styled'
import { MaterialDesignContent } from 'notistack'

export const snackbarConfig = {
  iconVariant: {
    success: ' ✅ ',
    error: ' ✖️ ',
    warning: ' ⚠️ ',
    info: ' ℹ️ ',
  },
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  autoHideDuration: 5000,
}

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor:
      'var(--variant-solidBg, var(--joy-palette-success-solidBg, var(--joy-palette-success-500, #1F7A1F)))',
    fontWeight: 600,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: 'var(--joy-palette-danger-700, #7D1212)',
    fontWeight: 600,
  },
  '&.notistack-MuiContent-info': {
    fontWeight: 600,
  },
  '&.notistack-MuiContent-warning': {
    fontWeight: 600,
  },
}))
