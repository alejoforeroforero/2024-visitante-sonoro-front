import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecordingsStore } from "@/stores/useRecordingsStore";
import Recordings from "@/components/Recordings";

import styles from "./CategoryPage.module.css";

const CategoryPage = () => {
  const recordings = useRecordingsStore((state) => state.recordings);
  const fetchRecordingsByCategory = useRecordingsStore((state) => state.fetchRecordingsByCategory);

  const { category } = useParams();

  useEffect(() => {
    if (category) {
      fetchRecordingsByCategory({ category });
    }
  }, [category, fetchRecordingsByCategory]);

  return (
    <div className={styles.container}>
      <Recordings list={recordings} />
    </div>
  );
};

export default CategoryPage;
