import { Link } from "react-router-dom";
import styles from "./Record.module.css";

const Record = ({ record }) => {
  //console.log(record);
  return (
    <Link to={`record/${record.id}`}>
      <div className="box">
        <h2 className="record-title">{record.title}</h2>
        <h3 className="record-title">{record.category}</h3>
        <h3 className="record-title">{record.author}</h3>
        {record.image && (
          <div className={styles.image}>
            <img src={record.image}></img>
          </div>
        )}
        {record.tags.map((tag) => {
          return <span key={tag.id}>{tag.title}</span>;
        })}
        
      </div>
    </Link>
  );
};

export default Record;
