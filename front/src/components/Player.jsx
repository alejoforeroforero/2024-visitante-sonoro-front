import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAudioPlayerStore } from "@/stores/useAudioPlayerStore";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaCircle,
} from "react-icons/fa";
import styles from "./Player.module.css";

const Player = ({ audioRef }) => {
  const recordDetails = useAudioPlayerStore((state) => state.recordDetails);
  const gIsPlaying = useAudioPlayerStore((state) => state.isPlaying);
  const setIsPlaying = useAudioPlayerStore((state) => state.setIsPlaying);

  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState(null);
  const [durationFormatted, setDurationFormatted] = useState("00:00");
  const [duration, setDuration] = useState(0);
  const [volumePercentage, setVolumePercentage] = useState(10);
  const [localIsPlaying, setLocalIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");
  const volumeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (recordDetails?.audio) {
      setAudioSrc(getAudioSrc(recordDetails.audio));
      setLocalIsPlaying(false);
    }
  }, [recordDetails]);

  useEffect(() => {
    let isMounted = true;
    const audio = audioRef.current;

    if (audio && audioSrc) {
      const setAudioData = () => {
        if (isMounted) setDuration(audio.duration);
      };

      const setAudioTime = () => {
        if (isMounted) setCurrentTime(audio.currentTime);
      };

      const handleAudioEnded = () => {
        if (isMounted) {
          setIsPlaying(false);
          setLocalIsPlaying(false);
        }
      };

      audio.addEventListener("loadedmetadata", setAudioData);
      audio.addEventListener("timeupdate", setAudioTime);
      audio.addEventListener("ended", handleAudioEnded);
      audio.volume = volumePercentage / 100;

      return () => {
        if (audio) {
          audio.removeEventListener("loadedmetadata", setAudioData);
          audio.removeEventListener("timeupdate", setAudioTime);
          audio.removeEventListener("ended", handleAudioEnded);
        }
        isMounted = false;
      };
    }
  }, [audioRef, audioSrc, volumePercentage, setIsPlaying]);

  useEffect(() => {
    setCurrentTimeFormatted(formatTime(audioRef.current?.currentTime || 0));
    if (duration > (audioRef.current?.currentTime || 0)) {
      setDurationFormatted(
        formatTime(duration - (audioRef.current?.currentTime || 0))
      );
    }
  }, [audioRef.current?.currentTime, duration]);

  const handleOnPlay = () => {
    if (audioRef.current && audioSrc) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .catch((error) => console.error("Error playing audio:", error));
        setIsPlaying(true);
        setLocalIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        setLocalIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      if (gIsPlaying) {
        audioRef.current
          .play()
          .catch((error) => console.error("Error playing audio:", error));
        setLocalIsPlaying(true);
      } else {
        audioRef.current.pause();
        setLocalIsPlaying(false);
      }
    }
  }, [gIsPlaying, audioSrc]);

  const handleProgressClick = (event) => {
    if (audioRef.current && duration > 0) {
      const progressBar = event.target;
      const rect = progressBar.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const newTime = (offsetX / progressBar.clientWidth) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (clientX) => {
    if (audioRef.current && volumeRef.current) {
      const volume = volumeRef.current;
      const rect = volume.getBoundingClientRect();
      let offsetX = clientX - rect.left;

      offsetX = Math.max(0, Math.min(offsetX, rect.width));

      const percentage = (offsetX / rect.width) * 100;
      setVolumePercentage(percentage);
      audioRef.current.volume = percentage / 100;
    }
  };

  const handleVolumeMouseDown = (event) => {
    setIsDragging(true);
    handleVolumeChange(event.clientX);
  };

  const handleVolumeMouseMove = (event) => {
    if (isDragging) {
      handleVolumeChange(event.clientX);
    }
  };

  const handleVolumeMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleVolumeMouseMove);
      document.addEventListener("mouseup", handleVolumeMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleVolumeMouseMove);
      document.removeEventListener("mouseup", handleVolumeMouseUp);
    };
  }, [isDragging]);

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
        {recordDetails?.title && (
          <Link to={`/record/${recordDetails.id}`}>
            {recordDetails.title}
          </Link>
        )}
        {recordDetails?.author && (
          <p>{recordDetails.author} </p>
        )}
      </div>
      <div className={styles.controls}>
        <audio ref={audioRef} src={audioSrc} controls crossOrigin="anonymous" />
        <div className={styles.buttons}>
          <FaStepBackward color="white" />
          {localIsPlaying ? (
            <FaPause onClick={handleOnPlay} color="white" />
          ) : (
            <FaPlay onClick={handleOnPlay} color="white" />
          )}
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
        <div className={styles.volume} ref={volumeRef}>
          <div
            className={styles.volumeOver}
            onMouseDown={handleVolumeMouseDown}
          ></div>
          <div className={styles.volumeBG}>
            <div
              className={styles.currentVolume}
              style={{ width: `${volumePercentage}%` }}
            ></div>
          </div>
          <div
            className={styles.volumeKnob}
            style={{ left: `${volumePercentage}%` }}
            onMouseDown={handleVolumeMouseDown}
          >
            <FaCircle color="white" size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
