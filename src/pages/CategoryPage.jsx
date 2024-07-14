import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecordingsByCategory } from "@/redux/states/recordingsActions";
import Recordings from "@/components/Recordings";

import styles from "./CategoryPage.module.css";

const CategoryPage = () => {
  const dispatch = useDispatch();

  const { recordings, error, status } = useSelector(
    (state) => state.recordings
  );

  const { category } = useParams();

  const [filters, setFilters] = useState({
    category: category,
  });


  useEffect(() => {
    const request = dispatch(fetchRecordingsByCategory(filters));

    return () => {
      request.abort();
    };
  }, [dispatch, filters]);


  console.log(recordings);

  return (
    <div className={styles.container}>
        <Recordings list={recordings} />
      </div>
  )
};

export default CategoryPage;
