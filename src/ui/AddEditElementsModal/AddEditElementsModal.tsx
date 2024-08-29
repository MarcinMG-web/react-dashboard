import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Divider from '@mui/joy/Divider'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import DialogActions from '@mui/joy/DialogActions'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { useAppState } from '../../context/AppState'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@mui/joy'
import NewElementForm from '../../components/NewElementForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { newElementSchema } from '../../schema/newElementSchema'
import { ElementFormValues, defaultElementFormValues } from '../../types/newElementFormTypes'
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../api/firebase'
import { ExpectedAPIFormat, dataPayloadNewElement } from '../../api/utils/dataPayloadNewElement'
import { useEffect } from 'react'
import { expectedElementFormValues } from '../../api/utils/expectedFrontedData'
import { useSnackbar } from 'notistack'
import { DataRow } from '../../components/OrderTable/utils/data'

export default function AddEditElementsModal(): JSX.Element {
  const {
    state: { openModalAddEditElements, selectedId, authorizedUser },
    dispatch,
  } = useAppState()

  const { enqueueSnackbar } = useSnackbar()

  const methods = useForm<ElementFormValues>({
    defaultValues: defaultElementFormValues,
    resolver: yupResolver(newElementSchema),
  })

  const onClose = () => {
    dispatch({ type: 'SET_OPEN_MODAL_ADD_EDIT_ELEMENTS', payload: { modal: false, isEdit: false } })
    methods.reset(defaultElementFormValues)
  }

  useEffect(() => {
    if (openModalAddEditElements.isEdit) {
      getDocumentById(selectedId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalAddEditElements.isEdit, selectedId])

  /**
   * ADD NEW ELEMENT:
   */
  const addNewOnSubmit = (data: ElementFormValues) => {
    // Convert data to the expected format
    const expectedFormatData = dataPayloadNewElement(data)

    // Use a custom ID based on the email
    const emailAsId = expectedFormatData.customer.email

    // Create a reference to the document with a custom ID
    const docRef = doc(db, 'customers', authorizedUser!.email!, 'users', emailAsId)

    // Use setDoc instead of addDoc to set the custom ID
    setDoc(docRef, expectedFormatData)
      .then(() => {
        onClose()
        enqueueSnackbar('The new item has been created!', { variant: 'success' })
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: 'error' })
      })
  }

  /**
   * EDIT ELEMENT:
   */
  const getDocumentById = (id: DataRow['id']) => {
    // Create a reference to the collection
    const ref = collection(db, 'customers', authorizedUser!.email!, 'users')

    // Create a reference to the document by ID
    const docRef = doc(ref, id)

    // Get the document
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          // Extract data from the document
          const dataFromDB = docSnap.data()
          // Convert data to the form values format
          const dataInEditForm = expectedElementFormValues(dataFromDB as ExpectedAPIFormat)
          // Set values to form
          methods.reset(dataInEditForm)
        }
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: 'error' })
      })
  }

  const editOnSubmit = (data: ElementFormValues) => {
    // Prepare the data in the expected format
    const expectedFormatData = dataPayloadNewElement(data)

    // Use the email as the document ID
    const emailAsId = expectedFormatData.customer.email

    // Create a reference to the document with the custom ID
    const docRef = doc(db, 'customers', authorizedUser!.email!, 'users', emailAsId)

    // Update the document
    updateDoc(docRef, expectedFormatData)
      .then(() => {
        // Close the dialog and show a success message
        onClose()
        enqueueSnackbar('The item has been edited!', { variant: 'warning' })
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: 'error' })
      })
  }

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
  )
}
