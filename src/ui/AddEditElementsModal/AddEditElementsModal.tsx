import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useAppState } from '../../context/AppState';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@mui/joy';
import NewElementForm from '../../components/NewElementForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { newElementSchema } from '../../schema/newElementSchema';
import { ElementFormValues } from '../../types/newElementFormTypes';

export default function AddEditElementsModal(): JSX.Element {
  const {
    state: { openModalAddEditElements },
    dispatch,
  } = useAppState();

  const onClose = () =>
    dispatch({ type: 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS', payload: { modal: false, isEdit: false } });

  const methods = useForm({
    resolver: yupResolver(newElementSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (data: ElementFormValues) => {
    // To DO: Data to send

    onClose();
  };

  return (
    <>
      <Modal open={openModalAddEditElements.modal} onClose={onClose}>
        <ModalDialog
          aria-labelledby='nested-modal-title'
          aria-describedby='nested-modal-description'
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
            {openModalAddEditElements.isEdit ? (
              <EditIcon
                sx={{
                  color: 'var(--joy-palette-warning-500, #9A5B13)',
                }}
              />
            ) : (
              <AddIcon
                sx={{
                  color: 'var(--joy-palette-success-solidBg)',
                }}
              />
            )}
            {openModalAddEditElements.isEdit ? 'Edit element?' : 'Add new element?'}
          </DialogTitle>

          <Divider />

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <DialogContent>
                <NewElementForm />
              </DialogContent>

              <DialogActions>
                <Button variant='solid' color='success' type='submit'>
                  Submit
                </Button>
                <Button variant='outlined' color='neutral' onClick={onClose}>
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </FormProvider>
        </ModalDialog>
      </Modal>
    </>
  );
}
