import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthorsStore } from "@/stores/useAuthorsStore";
import AuthorDetails from "@/components/AuthorDetails";

import styles from "./AuthorDetailsPage.module.css";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

const AuthorDetailsPage = () => {
  const { authorId } = useParams();
  const authorDetails = useAuthorsStore((state) => state.authorDetails);
  const fetchAuthorDetails = useAuthorsStore((state) => state.fetchAuthorDetails);

  useEffect(() => {
    fetchAuthorDetails(authorId);
  }, [authorId, fetchAuthorDetails]);

  return (
    <PageTransitionWrapper>
      <div className={styles.container}>
        <AuthorDetails authorDetails={authorDetails} />
      </div>
    </PageTransitionWrapper>
  );
};

export default AuthorDetailsPage;
