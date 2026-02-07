import { Link } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { useAudioPlayerStore } from "@/stores/useAudioPlayerStore";
import { FaPlay, FaPause } from "react-icons/fa";
import Favorite from "@/components/ui/Favorite";

import styles from "./Record.module.css";

const Record = ({ record }) => {
  const user = useUserStore((state) => state.data);
  const currentAudioDetails = useAudioPlayerStore((state) => state.recordDetails);
  const gIsPlaying = useAudioPlayerStore((state) => state.isPlaying);
  const changeAudio = useAudioPlayerStore((state) => state.changeAudio);
  const setIsPlaying = useAudioPlayerStore((state) => state.setIsPlaying);

  const handleChangeAudio = () => {
    if (currentAudioDetails.id == record.id) {
      if (gIsPlaying) {
        setIsPlaying(false);
      } else {
        changeAudio(record);
        setIsPlaying(true);
      }
    } else {
      changeAudio(record);
      setIsPlaying(true);
    }
  };

  return (
    <div className={styles.recordBox}>
      <span>
        <Favorite user={user} recordId={record.id} />
      </span>

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
        {record.tags?.map((tag) => {
          return <span key={tag.id}>{tag.title}</span>;
        })}
      </div>
    </div>
  );
};

export default Record;
