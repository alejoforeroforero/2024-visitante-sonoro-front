import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsPlaying } from "@/redux/states/audioPlayerSlice";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import styles from "./Player.module.css";

const Player = ({ audioRef }) => {
  const dispatch = useDispatch();

  const recordDetails = useSelector((state) => state.audio.recordDetails);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState(null);
  const [durationFormatted, setDurationFormatted] = useState("00:00");
  const [duration, setDuration] = useState(200);
  const [volumeWidth, setVolumeWidth] = useState(0);
  const gIsPlaying = useSelector((state) => state.audio.isPlaying);

  // useEffect(() => {
  //   if (audioRef.current) {

  //     if (audioRef.current.duration) {
  //       const setAudioData = () => {

  //         setDuration(audioRef.current.duration);
  //       };

  //       const setAudioTime = () => {
  //         setCurrentTime(audioRef.current.currentTime);
  //       };

  //       console.log(audioRef.current);

  //       audioRef.current.addEventListener("loadedmetadata", setAudioData);
  //       audioRef.current.addEventListener("timeupdate", setAudioTime);
  //       audioRef.current.volume = 0.1;

  //       return () => {
  //         audioRef.current.removeEventListener("loadedmetadata", setAudioData);
  //         audioRef.current.removeEventListener("timeupdate", setAudioTime);
  //       };
  //     }
  //   }
  // }, []);

  if (recordDetails?.audio) {
    if (audioRef.current) {
      if (audioRef.current.duration) {
        const setAudioData = () => {
          setDuration(audioRef.current.duration);
        };

        const setAudioTime = () => {
          setCurrentTime(audioRef.current.currentTime);
        };
        audioRef.current.addEventListener("loadedmetadata", setAudioData);
        audioRef.current.addEventListener("timeupdate", setAudioTime);
        audioRef.current.volume = 0.1;
      }
    }
  }

  useEffect(() => {
    setCurrentTimeFormatted(formatTime(audioRef.current.currentTime));
    if (duration > audioRef.current.currentTime) {
      setDurationFormatted(formatTime(duration - audioRef.current.currentTime));
    }
  }, [audioRef.current?.currentTime]);

  const handleOnPlay = () => {
    if (audioRef.current.paused) {
      dispatch(setIsPlaying(true));
    } else {
      dispatch(setIsPlaying(false));
    }
  };

  if (gIsPlaying) {
    audioRef.current?.play();
  } else {
    audioRef.current?.pause();
  }

  const handleProgressClick = (event) => {
    const progressBar = event.target;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / progressBar.clientWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeClick = (event) => {
    const volume = event.target;
    const rect = volume.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;

    const percentage = (offsetX * 100) / rect.width;

    const volumeSelected = percentage / 100;

    audioRef.current.volume = volumeSelected;

    setVolumeWidth(offsetX);
  };

  const formatTime = (time) => {
    const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, "0");
    const min = parseInt(`${(time / 60) % 60}`, 10);

    return `${min}:${secs}`;
  };

  const getAudioSrc = (audioSrc) => {
    let audioPath = audioSrc;
    const baseURL = import.meta.env.VITE_BASE_URL_BACKEND;

    if (!audioPath.startsWith("http")) {
      audioPath = baseURL + audioPath;
    }

    return audioPath;
  };

  return (
    <div className={styles.player}>
      <div className={styles.info}>
        {recordDetails?.author && <p>{recordDetails.author}</p>}
        {recordDetails?.title && <p>{recordDetails.title}</p>}
        {recordDetails?.category && <p>{recordDetails.category}</p>}
      </div>
      <div className={styles.controls}>
        <audio
          ref={audioRef}
          src={recordDetails?.audio ? getAudioSrc(recordDetails?.audio) : ""}
          controls
          crossOrigin="anonymous"
          autoPlay
        />
        <div className={styles.buttons}>
          <FaStepBackward color="white" />
          {gIsPlaying && <FaPause onClick={handleOnPlay} color="white" />}
          {!gIsPlaying && <FaPlay onClick={handleOnPlay} color="white" />}
          <FaStepForward color="white" />
        </div>
        <div className={styles.progress}>
          <div className={styles.currentTime}>{currentTimeFormatted}</div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressOver}
              onClick={handleProgressClick}
            ></div>
            <div className={styles.progressBarBG}>
              <div
                className={styles.currentProgress}
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className={styles.time}>{durationFormatted}</div>
        </div>
      </div>
      <div className={styles.volumeContainer}>
        <div className={styles.volume}>
          <div className={styles.volumeOver} onClick={handleVolumeClick}></div>
          <div className={styles.volumeBG}>
            <div
              className={styles.currentVolume}
              style={{ width: volumeWidth ? volumeWidth : "100%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
