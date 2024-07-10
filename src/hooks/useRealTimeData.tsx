import { useEffect, useState } from 'react';
import { onSnapshot, CollectionReference, FirestoreError } from 'firebase/firestore';
import { DataRow } from '../components/OrderTable/utils/data';

interface useRealTimeDataProps {
  rowsData: DataRow[];
  rowsDataLoading: boolean;
  error: FirestoreError | null;
}

export default function useRealTimeData(collectionRef: CollectionReference): useRealTimeDataProps {
  const [rowsData, setRowsData] = useState<DataRow[]>([]);
  const [rowsDataLoading, setRowsDataLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const updatedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRowsData(updatedData as DataRow[]);
        setRowsDataLoading(false);
      },
      (error) => {
        setError(error);
        setRowsDataLoading(false);
      },
    );

    return () => unsubscribe();
  }, [collectionRef]);

  return { rowsData, rowsDataLoading, error };
}
