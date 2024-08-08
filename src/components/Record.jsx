import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlay, FaPause, FaHeart } from "react-icons/fa";
import { changeAudio, setIsPlaying } from "@/redux/states/audioPlayerSlice";
import {
  saveFavorite,
  deleteFavorite,
  getUserInfo,
} from "@/redux/states/userActions";
import useErrorHandler from "@/hooks/useErrorHandler";

import styles from "./Record.module.css";
import { toast } from "react-toastify";

const Record = ({ record }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const currentAudioDetails = useSelector((state) => state.audio.recordDetails);
  const gIsPlaying = useSelector((state) => state.audio.isPlaying);
  const { errorAction } = useErrorHandler();

  const handleChangeAudio = () => {
    if (currentAudioDetails.id == record.id) {
      if (gIsPlaying) {
        dispatch(setIsPlaying(false));
      } else {
        dispatch(changeAudio(record));
        dispatch(setIsPlaying(true));
      }
    } else {
      dispatch(changeAudio(record));
      dispatch(setIsPlaying(true));
    }
  };

  const checkFavorite = (id) => {
    if (user) {
      const isIdInArray = user["favorite_records"].some(
        (item) => item.id === id
      );

      return isIdInArray;
    } else {
      return false;
    }
  };

  const handleSaveFavorite = (recordId) => {
    const afterSave = (error, res) => {
      if (error) {
        errorAction();
      } else {
        toast('Se ha agregado de favoritos')
        dispatch(getUserInfo());
      }
    };

    const data = {
      record_id: recordId,
    };

    const dataObj = {
      data,
      callback: afterSave,
    };

    dispatch(saveFavorite(dataObj));
  };

  const handleDeleteFavorite = (recordId) => {
    const afterDelete = (error, res) => {

      if (error) {
        errorAction();
      } else {
        toast('Se ha eliminado de favoritos')
        dispatch(getUserInfo());
      }
    };

    const data = {
      record_id: recordId,
    };

    const dataObj = {
      data,
      callback: afterDelete,
    };

    dispatch(deleteFavorite(dataObj));
  };

  return (
    <div className={styles.recordBox}>
      {checkFavorite(record.id) && (
        <span>
          <FaHeart
            onClick={() => {
              handleDeleteFavorite(record.id);
            }}
            color="#ef6161"
          />
        </span>
      )}
      {!checkFavorite(record.id) && (
        <span>
          <FaHeart
            onClick={() => {
              handleSaveFavorite(record.id);
            }}
          />
        </span>
      )}

      <div className={styles.title}>
        <Link to={`/record/${record.id}`}>
          <h2>{record.title} </h2>
        </Link>
      </div>
      <div className={styles.play}>
        {currentAudioDetails.id == record.id && gIsPlaying && (
          <FaPause onClick={handleChangeAudio} size={30} />
        )}
        {currentAudioDetails.id == record.id && !gIsPlaying && (
          <FaPlay onClick={handleChangeAudio} size={30} />
        )}
        {currentAudioDetails.id != record.id && (
          <FaPlay onClick={handleChangeAudio} size={30} />
        )}
      </div>
      <div className={styles.author}>
        <h3>{record.author}</h3>
      </div>
      <div className={styles.category}>
        <h4>
          Categoría:{" "}
          <Link to={`/catalogo/${record.categorySlug}`}>
            {" "}
            {record.category}
          </Link>
        </h4>
      </div>
      <div className={styles.tag}>
        {record.tags.map((tag) => {
          return <span key={tag.id}>{tag.title}</span>;
        })}
      </div>

      {/* {record.image && (
        <div className={styles.image}>
          <img src={record.image}></img>
        </div>
      )} */}
    </div>
  );
};

export default Record;
