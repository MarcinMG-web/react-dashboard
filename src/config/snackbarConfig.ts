import styled from '@emotion/styled';
import { MaterialDesignContent } from 'notistack';

export const snackbarConfig = {
  iconVariant: {
    success: ' ✅ ',
    error: ' ✖️ ',
    warning: ' ⚠️ ',
    info: ' ℹ️ ',
  },
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  autoHideDuration: 5000,
};

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor:
      'var(--variant-solidBg, var(--joy-palette-success-solidBg, var(--joy-palette-success-500, #1F7A1F)))',
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#970C0C',
  },
}));
