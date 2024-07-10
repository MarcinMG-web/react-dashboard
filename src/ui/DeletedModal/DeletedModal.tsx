import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useAppState } from '../../context/AppState';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { useSnackbar } from 'notistack';

export default function DeletedModal(): JSX.Element {
  const {
    state: { openDeletedModal, selectedId },
    dispatch,
  } = useAppState();

  const { enqueueSnackbar } = useSnackbar();

  const onClosed = () => dispatch({ type: 'SET_OPEN_DELETED_MODAL', payload: false });

  const onSubmit = async () => {
    try {
      const customerDoc = doc(db, 'customers', selectedId);
      await deleteDoc(customerDoc);
      onClosed();
      enqueueSnackbar('The item has been deleted!', { variant: 'success' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  return (
    <>
      <Modal open={openDeletedModal} onClose={onClosed}>
        <ModalDialog
          variant='outlined'
          role='alertdialog'
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
          <DialogTitle>
            <WarningRoundedIcon
              sx={{
                color: 'var(--joy-palette-danger-700, #7D1212)',
              }}
            />
            Confirmation
          </DialogTitle>

          <Divider />

          <DialogContent>Are you sure you want to discard all of your notes?</DialogContent>

          <DialogActions>
            <Button variant='solid' color='danger' onClick={onSubmit}>
              Discard notes
            </Button>
            <Button variant='outlined' color='neutral' onClick={onClosed}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}