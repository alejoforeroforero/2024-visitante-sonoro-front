import { useUserStore } from "@/stores/useUserStore";
import { useAudioPlayerStore } from "@/stores/useAudioPlayerStore";
import { Link } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import Favorite from "@/components/ui/Favorite";
import DemoImage from "@/components/ui/DemoImage";

import styles from "./RecordDetails.module.css";

const RecordDetails = ({ recordDetails }) => {
  const user = useUserStore((state) => state.data);
  const currentAudioDetails = useAudioPlayerStore((state) => state.recordDetails);
  const gIsPlaying = useAudioPlayerStore((state) => state.isPlaying);
  const changeAudio = useAudioPlayerStore((state) => state.changeAudio);
  const setIsPlaying = useAudioPlayerStore((state) => state.setIsPlaying);

  const handleChangeAudio = () => {
    if (currentAudioDetails._id == recordDetails._id) {
      if (gIsPlaying) {
        setIsPlaying(false);
      } else {
        changeAudio(recordDetails);
        setIsPlaying(true);
      }
    } else {
      changeAudio(recordDetails);
      setIsPlaying(true);
    }
  };

  const categoryName = recordDetails.category?.name || recordDetails.category;
  const categorySlug = recordDetails.category?.slug || recordDetails.category;

  return (
    <div className={styles.container}>
      <span>
        <Favorite user={user} recordId={recordDetails._id} />
      </span>
      <h2>{recordDetails.title}</h2>
      <h3>{recordDetails.author}</h3>
      <p>{recordDetails.description}</p>
      <p>
        Categoría:
        <Link to={`/catalogo/${categorySlug}`}>
          {" "}
          {categoryName}
        </Link>
      </p>
      <div className={styles.imagen}>
        <DemoImage src={recordDetails.image} />
      </div>
      <div className={styles.play}>
        {currentAudioDetails._id == recordDetails._id && gIsPlaying && (
          <FaPause onClick={handleChangeAudio} size={30} />
        )}
        {currentAudioDetails._id == recordDetails._id && !gIsPlaying && (
          <FaPlay onClick={handleChangeAudio} size={30} />
        )}
        {currentAudioDetails._id != recordDetails._id && (
          <FaPlay onClick={handleChangeAudio} size={30} />
        )}
      </div>
    </div>
  );
};

export default RecordDetails;
