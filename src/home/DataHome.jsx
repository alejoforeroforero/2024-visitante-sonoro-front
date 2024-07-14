import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

import { fetchRecordings } from "@/redux/states/recordingsActions";
import Recordings from "@/components/Recordings";

import styles from './DataHome.module.css';

const DataHome = () => {
  const dispatch = useDispatch();

  const { recordings, error, status } = useSelector(
    (state) => state.recordings
  );

  const [filters, setFilters] = useState({
    title: "",
    categoryId: null,
  });

  useEffect(() => {
    const request = dispatch(fetchRecordings(filters));

    return () => {
      request.abort();
    };
  }, [dispatch, filters]);

  const handleFilters = () => {
    setFilters({
      title: "jazz",
      categoryId: 2,
    });
  };

  return <div className={`${styles.container}`}>
    <Recordings list={recordings} />
  </div>;
};

export default DataHome;
