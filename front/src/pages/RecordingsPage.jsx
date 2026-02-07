import { useEffect, useState } from "react";
import { useRecordingsStore } from "@/stores/useRecordingsStore";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import Recordings from "@/components/Recordings";

import styles from "./RecordingsPage.module.css";

const RecordingsPage = () => {
  const recordings = useRecordingsStore((state) => state.recordings);
  const fetchRecordings = useRecordingsStore((state) => state.fetchRecordings);

  const [filters, setFilters] = useState({
    title: "",
    categoryId: null,
  });

  useEffect(() => {
    fetchRecordings(filters);
  }, [filters, fetchRecordings]);

  return (
    <PageTransitionWrapper>
      <div className={styles.container}>
        <Recordings list={recordings} />
      </div>
    </PageTransitionWrapper>
  );
};

export default RecordingsPage;
