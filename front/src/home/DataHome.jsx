import { useEffect, useState } from "react";
import { useRecordingsStore } from "@/stores/useRecordingsStore";
import Recordings from "@/components/Recordings";

import styles from './DataHome.module.css';

const DataHome = () => {
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
    <div className={`${styles.container}`}>
      <Recordings list={recordings} />
    </div>
  );
};

export default DataHome;
