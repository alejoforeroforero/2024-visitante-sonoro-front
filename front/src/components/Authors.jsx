import Author from "./Author";
import styles from "./Authors.module.css";

const Authors = ({ list }) => {
  return (
    <div className="box-conatiner">
      <div className={styles.boxContainer}>
        {list.length > 0 ? (
          list.map((author) => {
            return <Author key={author.id} author={author} />;
          })
        ) : (
          <p>No Perfiles creados</p>
        )}
      </div>
    </div>
  );
};

export default Authors;
