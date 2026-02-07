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
    if (currentAudioDetails._id == record._id) {
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

  const categoryName = record.category?.name || record.category;
  const categorySlug = record.category?.slug || record.category;

  return (
    <div className={styles.recordBox}>
      <span className={styles.demoBadge}>DEMO</span>
      <span>
        <Favorite user={user} recordId={record._id} />
      </span>

      <div className={styles.title}>
        <Link to={`/record/${record._id}`}>
          <h2>{record.title} </h2>
        </Link>
      </div>
      <div className={styles.play}>
        {currentAudioDetails._id == record._id && gIsPlaying && (
          <FaPause onClick={handleChangeAudio} size={30} />
        )}
        {currentAudioDetails._id == record._id && !gIsPlaying && (
          <FaPlay onClick={handleChangeAudio} size={30} />
        )}
        {currentAudioDetails._id != record._id && (
          <FaPlay onClick={handleChangeAudio} size={30} />
        )}
      </div>
      <div className={styles.author}>
        <h3>{record.author}</h3>
      </div>
      <div className={styles.category}>
        <h4>
          Categoría:{" "}
          <Link to={`/catalogo/${categorySlug}`}>
            {categoryName}
          </Link>
        </h4>
      </div>
      <div className={styles.tag}>
        {record.tags?.map((tag, index) => {
          return <span key={tag._id || index}>{tag.title || tag}</span>;
        })}
      </div>
    </div>
  );
};

export default Record;
