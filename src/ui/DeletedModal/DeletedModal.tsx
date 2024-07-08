import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useAppState } from '../../context/AppState';

export default function DeletedModal(): JSX.Element {
  const {
    state: { openDeletedModal },
    dispatch,
  } = useAppState();

  const onClosed = () => dispatch({ type: 'SET_OPEN_DELETED_MODAL', payload: false });

  const onSubmit = () => {
    onClosed();
  };

  return (
    <>
      <Modal open={openDeletedModal} onClose={onClosed}>
        <ModalDialog variant='outlined' role='alertdialog'>
          <DialogTitle>
            <WarningRoundedIcon />
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
