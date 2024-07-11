import { useDispatch } from "react-redux";
import { changeAudio } from "@/redux/states/audioPlayerSlice";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import styles from "./Record.module.css";

const Record = ({ record }) => {
  const dispatch = useDispatch();

  const handleChangeAudio = () => {
    dispatch(changeAudio(record));
  };

  return (
    <div className={styles.recordBox}>
      <div>
        <Link to={`/record/${record.id}`}>
          <h2>{record.title}</h2>
        </Link>
      </div>
      <div>
        <FaPlay onClick={handleChangeAudio} size={30} />
      </div>
      <div>
        <h3>{record.author}</h3>
      </div>
      <div>
        <h4>
          Categoría:  <Link> {record.category}</Link>{" "}
        </h4>
      </div>
      <div>
        {record.tags.map((tag) => {
          return <span key={tag.id}>{tag.title}</span>;
        })}
      </div>

      {record.image && (
        <div className={styles.image}>
          <img src={record.image}></img>
        </div>
      )}
    </div>
  );
};

export default Record;
