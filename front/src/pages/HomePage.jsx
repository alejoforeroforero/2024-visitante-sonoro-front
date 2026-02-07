import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useRecordingsStore } from "@/stores/useRecordingsStore";
import { useAudioPlayerStore } from "@/stores/useAudioPlayerStore";
import Player from "@/components/Player";
import AudioVisualizer from "@/components/AudioVisualizer";
import { AnimatePresence } from "framer-motion";

import head from "@/assets/imgs/head.png";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [currentAudioSrc, setCurrentAudioSrc] = useState(null);
  const recordDetails = useRecordingsStore((state) => state.recordDetails);
  const recordDetailsSelected = useAudioPlayerStore((state) => state.recordDetails);
  const changeAudio = useAudioPlayerStore((state) => state.changeAudio);
  const [firstRender, setFirstRender] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (!firstRender) {
      changeAudio(recordDetails);
    }
  }, [recordDetails, changeAudio, firstRender]);

  useEffect(() => {
    if (recordDetails.audio) {
      setCurrentAudioSrc(recordDetails.audio);
      setFirstRender(true);
    }
  }, [recordDetailsSelected]);

  return (
    <>
      <div className={styles.generalContent}>
        <div className={styles.mainContent}>
          <div className={styles.logoHead}>
            <img src={head} alt="" />
          </div>
          <AudioVisualizer
            audioRef={audioRef}
            currentAudioSrc={currentAudioSrc}
          />
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </div>
      </div>
      <div className={styles.audioPlayerContent}>
        <Player audioRef={audioRef} currentAudioSrc={currentAudioSrc} />
      </div>
    </>
  );
};

export default HomePage;
