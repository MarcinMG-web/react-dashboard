import dayjs from 'dayjs'
import { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'

export const createdNewCollection = async (user: User) => {
  const userDocRef = doc(db, 'customers', user.email!)
  const userDoc = await getDoc(userDocRef)

  if (!userDoc.exists()) {
    // Create a new collection for the new user
    await setDoc(userDocRef, {
      created: dayjs().format('YYYY-MM-DD'),
      active: true,
    })
  }
}
