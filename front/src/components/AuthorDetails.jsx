import Recordings from "./Recordings";
import DemoImage from "@/components/ui/DemoImage";
import styles from "./AuthorDetails.module.css";

const AuthorDetails = ({ authorDetails }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imagen}>
        <DemoImage src={authorDetails.image} />
      </div>
      <h1 className={styles.title}>{authorDetails.name}</h1>
      <p className={styles.description}>{authorDetails.bio}</p>
      <div className={styles.recordings}>
        <Recordings list={authorDetails.recordings} />
      </div>
    </div>
  );
};

export default AuthorDetails;
