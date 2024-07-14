import { useDispatch } from "react-redux";
import { changeAudio } from "@/redux/states/audioPlayerSlice";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

import styles from "./RecordDetails.module.css";

const RecordDetails = ({ recordDetails }) => {
  const dispatch = useDispatch();

  const handleChangeAudio = () => {
    dispatch(changeAudio(recordDetails));
  };

  return (
    <div className={styles.container}>
      <h2>{recordDetails.title}</h2>
      <h3>{recordDetails.author}</h3>
      <p>{recordDetails.description}</p>
      <p>
        Categoría:
        <Link to={`/catalogo/${recordDetails.categorySlug}`}> {recordDetails.category}</Link>
      </p>
      <div className={styles.imagen}>
        <img src={recordDetails.image} alt="" />
      </div>
      <div>
        <FaPlay onClick={handleChangeAudio} size={30} />
      </div>
    </div>
  );
};

export default RecordDetails;
