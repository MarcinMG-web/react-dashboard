import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, FirestoreError, doc } from 'firebase/firestore';
import { DataRow } from '../components/OrderTable/utils/data';
import { auth, db } from '../api/firebase';

interface UseRealTimeDataResult {
  rowsData: DataRow[];
  rowsDataLoading: boolean;
  rowsDataError: FirestoreError | null;
}

export default function useRealTimeData(): UseRealTimeDataResult {
  const [rowsData, setRowsData] = useState<DataRow[]>([]);
  const [rowsDataLoading, setRowsDataLoading] = useState(true);
  const [rowsDataError, setRowsDataError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Reference to the user's orders collection in Firestore
        const userOrdersCollectionRef = collection(db, 'customers', user.email!, 'users');
        const queryRef = query(userOrdersCollectionRef); // Firestore query based on the collection reference

        // Reference to the user's document in Firestore
        const userDocRef = doc(db, 'customers', user?.email as string);

        // Subscribe to changes in the user's document
        const unsubscribeSnapshot = onSnapshot(
          userDocRef,
          (doc) => {
            if (doc.exists()) {
              // If the document exists, subscribe to changes in the orders collection
              onSnapshot(queryRef, (querySnapshot) => {
                const payload: DataRow[] = []; // Array to store fetched DataRow objects

                querySnapshot.forEach((doc) => payload.push(doc.data() as DataRow)); // Push each document data into the payload array
                setRowsData(payload); // Update state with fetched data
                setRowsDataLoading(false); // Set loading state to false after data is fetched
              });
            }
          },
          (error) => {
            setRowsDataError(error);
            setRowsDataLoading(false);
          },
        );

        return () => unsubscribeSnapshot();
      } else {
        setRowsData([]);
        setRowsDataLoading(false);
        setRowsDataError(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { rowsData, rowsDataLoading, rowsDataError };
}
