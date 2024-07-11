import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAuthors } from "@/redux/states/authorsActions";
import Authors from "@/components/Authors";

import styles from "./AuthorsPage.module.css";

const AuthorsPage = () => {
  const dispatch = useDispatch();

  const { authors, error, status } = useSelector(
    (state) => state.authors
  );

  const [filters, setFilters] = useState({
    title: "",
    authorId:''
  });


  useEffect(() => {
    const request = dispatch(fetchAuthors(filters));

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

  return (
    <div className={styles.container}>
      <Authors list={authors} />
    </div>
  )
}

export default AuthorsPage
