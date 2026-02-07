import { useEffect, useState } from "react";
import { useAuthorsStore } from "@/stores/useAuthorsStore";
import Authors from "@/components/Authors";

import styles from "./AuthorsPage.module.css";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

const AuthorsPage = () => {
  const authors = useAuthorsStore((state) => state.authors);
  const fetchAuthors = useAuthorsStore((state) => state.fetchAuthors);

  const [filters, setFilters] = useState({
    title: "",
    authorId: "",
  });

  useEffect(() => {
    fetchAuthors(filters);
  }, [filters, fetchAuthors]);

  return (
    <PageTransitionWrapper>
      <div className={styles.container}>
        <Authors list={authors} />
      </div>
    </PageTransitionWrapper>
  );
};

export default AuthorsPage;
