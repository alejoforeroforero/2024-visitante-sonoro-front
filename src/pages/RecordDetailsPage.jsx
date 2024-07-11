import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecordDetails } from "@/redux/states/recordingsActions";
import RecordDetails from "@/components/RecordDetails";

import styles from './RecordDetailsPage.module.css';

const RecordDetailsPage = () => {
  const { recordId } = useParams();
  const recordDetails = useSelector((state) => state.recordings.recordDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecordDetails(recordId));
  }, []);

  return (
    <div className={styles.container}>
      <RecordDetails recordDetails={recordDetails}/>
    </div>
  );
};

export default RecordDetailsPage;
