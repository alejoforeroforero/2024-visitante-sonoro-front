import { useDispatch, useSelector } from "react-redux";
import { changeAudio, setIsPlaying } from "@/redux/states/audioPlayerSlice";
import { Link } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import Favorite from "@/components/ui/Favorite";

import styles from "./RecordDetails.module.css";

const RecordDetails = ({ recordDetails }) => {
  console.log(recordDetails);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const currentAudioDetails = useSelector((state) => state.audio.recordDetails);
  const gIsPlaying = useSelector((state) => state.audio.isPlaying);

  console.log(recordDetails.author)

  const handleChangeAudio = () => {
    if (currentAudioDetails.id == recordDetails.id) {
      if (gIsPlaying) {
        dispatch(setIsPlaying(false));
      } else {
        dispatch(changeAudio(recordDetails));
        dispatch(setIsPlaying(true));
      }
    } else {
      dispatch(changeAudio(recordDetails));
      dispatch(setIsPlaying(true));
    }
  };

  return (
    <div className={styles.container}>
      <span>
        <Favorite user={user} recordId={recordDetails.id} />
      </span>
      <h2>{recordDetails.title}</h2>
      <h3>{recordDetails.author}</h3>
      <p>{recordDetails.description}</p>
      <p>
        Categoría:
        <Link to={`/catalogo/${recordDetails.categorySlug}`}>
          {" "}
          {recordDetails.category}
        </Link>
      </p>
      <div className={styles.imagen}>
        <img src={recordDetails.image} alt="" />
      </div>
      <div className={styles.play}>
        {currentAudioDetails.id == recordDetails.id && gIsPlaying && (
          <FaPause onClick={handleChangeAudio} size={30} />
        )}
        {currentAudioDetails.id == recordDetails.id && !gIsPlaying && (
          <FaPlay onClick={handleChangeAudio} size={30} />
        )}
        {currentAudioDetails.id != recordDetails.id && (
          <FaPlay onClick={handleChangeAudio} size={30} />
        )}
      </div>
    </div>
  );
};

export default RecordDetails;
