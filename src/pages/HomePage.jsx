import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecordDetails } from "@/redux/states/recordingsActions";
import { changeAudio } from "@/redux/states/audioPlayerSlice";
import Player from "@/components/Player";
import AudioVisualizer from "@/components/AudioVisualizer";
import { AnimatePresence } from "framer-motion";

import head from "@/assets/imgs/head.png";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [currentAudioSrc, setCurrentAudioSrc] = useState(null);
  const recordDetails = useSelector((state) => state.recordings.recordDetails);
  const recordDetailsSelected = useSelector(
    (state) => state.audio.recordDetails
  );
  const [firstRender, setFirstRender] = useState(false);
  const dispatch = useDispatch();

  const audioRef = useRef(null);

  useEffect(() => {
    //dispatch(fetchRecordDetails(1));
  }, []);

  useEffect(() => {
    if (!firstRender) {
      dispatch(changeAudio(recordDetails));
    }
  }, [recordDetails]);

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
