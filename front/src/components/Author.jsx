import { Link } from "react-router-dom";
import styles from "./Author.module.css";

const Author = ({ author }) => {

  return (
    <Link to={`/perfil/${author.id}`}>
      <div className={styles.authorBox}>
        <div>
          <h2>{author.title}</h2>
        </div>
        <div>
          {author.image && (
            <div className={styles.image}>
              <img src={author.image}></img>
            </div>
          )}
        </div>
        <div>
          <p>{author.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Author;
