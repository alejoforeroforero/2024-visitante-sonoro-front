import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorDetails } from "@/redux/states/authorsActions";
import AuthorDetails from "@/components/AuthorDetails";

import styles from "./AuthorDetailsPage.module.css";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

const AuthorDetailsPage = () => {
  const { authorId } = useParams();
  const authorDetails = useSelector((state) => state.authors.authorDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthorDetails(authorId));
  }, []);

  return (
    <PageTransitionWrapper>
      <div className={styles.container}>
        <AuthorDetails authorDetails={authorDetails} />
      </div>
    </PageTransitionWrapper>
  );
};

export default AuthorDetailsPage;
