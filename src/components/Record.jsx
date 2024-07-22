import { useDispatch, useSelector } from "react-redux";
import { changeAudio, setIsPlaying } from "@/redux/states/audioPlayerSlice";
import { Link } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import styles from "./Record.module.css";

const Record = ({ record }) => {
  const dispatch = useDispatch();
  const currentAudioDetails = useSelector((state) => state.audio.recordDetails);
  const gIsPlaying = useSelector((state) => state.audio.isPlaying);

  const handleChangeAudio = () => {

    if(currentAudioDetails.id == record.id){
      if(gIsPlaying){
        dispatch(setIsPlaying(false));
      }else{
        dispatch(changeAudio(record));
        dispatch(setIsPlaying(true));
      }
    }else{
      dispatch(changeAudio(record));
      dispatch(setIsPlaying(true));
    }

  };

  return (
    <div className={styles.recordBox}>
      <div>
        <Link to={`/record/${record.id}`}>
          <h2>{record.title}</h2>
        </Link>
      </div>
      <div>
        {currentAudioDetails.id == record.id && gIsPlaying &&(
          <FaPause onClick={handleChangeAudio} size={30} />
        )}
        {currentAudioDetails.id == record.id && !gIsPlaying &&(
          <FaPlay onClick={handleChangeAudio} size={30} />
        )}
        {currentAudioDetails.id != record.id && (
          <FaPlay onClick={handleChangeAudio} size={30} />
        )}
      </div>
      <div>
        <h3>{record.author}</h3>
      </div>
      <div>
        <h4>
          Categoría:{" "}
          <Link to={`/catalogo/${record.categorySlug}`}>
            {" "}
            {record.category}
          </Link>
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
