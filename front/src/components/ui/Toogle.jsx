import { useAudioPlayerStore } from "@/stores/useAudioPlayerStore";
import { FaSun, FaMoon } from "react-icons/fa";
import styles from "./Toogle.module.css";

const Toogle = ({ handleChange }) => {
  const mode = useAudioPlayerStore((state) => state.mode);

  return (
    <div className={styles.container}>
      {mode ? (
        <FaMoon onClick={handleChange} color="#fff" size={15} />
      ) : (
        <FaSun onClick={handleChange} color="#f1c40f" size={20} />
      )}
    </div>
  );
};

export default Toogle;
