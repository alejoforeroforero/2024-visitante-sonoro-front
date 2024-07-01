import { useDispatch } from 'react-redux';
import { changeAudio } from "@/redux/states/audioPlayerSlice";

import styles from "./RecordDetails.module.css";

const RecordDetails = ({ recordDetails }) => {

  const dispatch = useDispatch();

  const handleChangeAudio = ()=>{
    dispatch(changeAudio(recordDetails.audio))
  }

 
  return (
    <div className={styles.container}>
      <h1>Record Details</h1>
      <h2>{recordDetails.title}</h2>
      <p>{recordDetails.audioSrc}</p>
      <p>{recordDetails.category}</p>
      <p>{recordDetails.author}</p>
      <div className={styles.imagen}>
        <img src={recordDetails.image} alt="" />
      </div>
      <div>
        <p onClick={handleChangeAudio}>Play</p>
      </div>
    </div>
  );
};

export default RecordDetails;
