import { Link } from "react-router-dom";
import DemoImage from "@/components/ui/DemoImage";
import styles from "./Author.module.css";

const Author = ({ author }) => {

  return (
    <Link to={`/perfil/${author._id}`}>
      <div className={styles.authorBox}>
        <div>
          <h2>{author.name}</h2>
        </div>
        <div>
          {author.image && (
            <div className={styles.image}>
              <DemoImage src={author.image} />
            </div>
          )}
        </div>
        <div>
          <p>{author.bio}</p>
        </div>
      </div>
    </Link>
  );
};

export default Author;
