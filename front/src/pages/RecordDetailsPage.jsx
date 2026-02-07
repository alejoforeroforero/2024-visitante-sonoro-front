import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecordingsStore } from "@/stores/useRecordingsStore";
import RecordDetails from "@/components/RecordDetails";

import styles from './RecordDetailsPage.module.css';

const RecordDetailsPage = () => {
  const { recordId } = useParams();
  const recordDetails = useRecordingsStore((state) => state.recordDetails);
  const fetchRecordDetails = useRecordingsStore((state) => state.fetchRecordDetails);

  useEffect(() => {
    fetchRecordDetails(recordId);
  }, [recordId, fetchRecordDetails]);

  return (
    <div className={styles.container}>
      <RecordDetails recordDetails={recordDetails} />
    </div>
  );
};

export default RecordDetailsPage;
