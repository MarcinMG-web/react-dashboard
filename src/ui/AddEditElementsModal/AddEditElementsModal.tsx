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
import { addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { customerCollectionRef, db } from '../../api/firebase';
import { ExpectedAPIFormat, dataPayloadNewElement } from '../../api/utils/dataPayloadNewElement';
import { useEffect } from 'react';
import { expectedElementFormValues } from '../../api/utils/expectedFrontedData';
import { useSnackbar } from 'notistack';

export default function AddEditElementsModal(): JSX.Element {
  const {
    state: { openModalAddEditElements, selectedId },
    dispatch,
  } = useAppState();

  const { enqueueSnackbar } = useSnackbar();

  const onClose = () =>
    dispatch({ type: 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS', payload: { modal: false, isEdit: false } });

  const methods = useForm<ElementFormValues>({
    resolver: yupResolver(newElementSchema),
  });

  useEffect(() => {
    if (openModalAddEditElements.isEdit && selectedId) {
      getDocumentById(selectedId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalAddEditElements.isEdit, selectedId]);

  // ADD NEW ELEMENT:
  const addNewOnSubmit = async (data: ElementFormValues) => {
    try {
      const expectedFormatData = dataPayloadNewElement(data);
      await addDoc(customerCollectionRef, expectedFormatData);
      onClose();
      enqueueSnackbar('The new item has been created!', { variant: 'success' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  // EDIT ELEMENT:
  const getDocumentById = async (id: string) => {
    try {
      const docRef = doc(customerCollectionRef, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const dataFromDB = docSnap.data();
        const dataInEditForm = expectedElementFormValues(dataFromDB as ExpectedAPIFormat);
        // Set values to form
        methods.reset(dataInEditForm);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const editOnSubmit = async (data: ElementFormValues) => {
    try {
      const expectedFormatData = dataPayloadNewElement(data);
      const customerDoc = doc(db, 'customers', selectedId);
      await updateDoc(customerDoc, expectedFormatData);
      onClose();
      enqueueSnackbar('The item has been edited!', { variant: 'warning' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
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
            <form
              onSubmit={
                openModalAddEditElements.isEdit
                  ? methods.handleSubmit(editOnSubmit)
                  : methods.handleSubmit(addNewOnSubmit)
              }
            >
              <DialogContent>
                <NewElementForm />
              </DialogContent>

              <DialogActions>
                <Button variant='solid' color={openModalAddEditElements.isEdit ? 'warning' : 'success'} type='submit'>
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
