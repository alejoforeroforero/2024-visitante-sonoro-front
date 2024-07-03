import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import styles from "./Player.module.css";

const Player = ({ audioRef, currentAudioSrc }) => {
  const recordDetails = useSelector((state) => state.audio.recordDetails);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState(null);
  const [durationFormatted, setDurationFormatted] = useState("00:00");
  const [duration, setDuration] = useState(200);
  const [volumeWidth, setVolumeWidth] = useState(0);

  useEffect(() => {
    const setAudioData = () => {
      setDuration(audioRef.current.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.addEventListener("loadedmetadata", setAudioData);
    audioRef.current.addEventListener("timeupdate", setAudioTime);

    return () => {
      audioRef.current.removeEventListener("loadedmetadata", setAudioData);
      audioRef.current.removeEventListener("timeupdate", setAudioTime);
    };
  }, [currentAudioSrc]);

  useEffect(() => {
    setCurrentTimeFormatted(formatTime(audioRef.current.currentTime));
    if (duration > audioRef.current.currentTime) {
      setDurationFormatted(formatTime(duration - audioRef.current.currentTime));
    }
  }, [audioRef.current?.currentTime]);

  const handleOnPlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

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
    console.log(percentage);

    const volumeSelected = percentage / 100;

    audioRef.current.volume = volumeSelected;

    setVolumeWidth(offsetX);
  };

  const formatTime = (time) => {
    const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, "0");
    const min = parseInt(`${(time / 60) % 60}`, 10);

    return `${min}:${secs}`;
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
          src={currentAudioSrc}
          controls
          crossOrigin="anonymous"
          autoPlay
        />
        <div className={styles.buttons}>
          <FaStepBackward color="white" />
          {isPlaying && <FaPause onClick={handleOnPlay} color="white" />}
          {!isPlaying && <FaPlay onClick={handleOnPlay} color="white" />}
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
              style={{ width: volumeWidth ? volumeWidth : '100%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
