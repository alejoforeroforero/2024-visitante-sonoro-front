import { useSelector } from "react-redux";
import { FaSun, FaMoon } from "react-icons/fa";
import styles from "./Toogle.module.css";
import { useEffect, useState } from "react";

const Toogle = ({ handleChange }) => {
  const mode = useSelector((state) => state.audio.mode);

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
