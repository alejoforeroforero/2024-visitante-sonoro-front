import Recordings from "./Recordings";
import styles from "./AuthorDetails.module.css";

const AuthorDetails = ({ authorDetails }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imagen}>
        <img src={authorDetails.image} alt="" />
      </div>
      <h1 className={styles.title}>{authorDetails.title}</h1>
      <p className={styles.description}>{authorDetails.description}</p>
      <div className={styles.recordings}>
        <Recordings list={authorDetails.recordings} />
      </div>
    </div>
  );
};

export default AuthorDetails;
