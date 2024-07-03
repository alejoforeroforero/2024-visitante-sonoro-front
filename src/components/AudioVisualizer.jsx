import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AudioVisualizer.module.css";
import styled from "styled-components";

const Canvas = styled.canvas`
  width: 100%;
  height: 200px;
  background: #333;
`;

const AudioVisualizer = ({ audioRef, currentAudioSrc }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const frame1 = useRef(0);

  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;

    const initAudioContext = () => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
    };

    if (audioRef.current && !audioContextRef.current) {
      audioRef.current.crossOrigin = "anonymous"; // Ensure CORS is set for the audio element
      initAudioContext();
    }

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");

    const animateAudio = () => {
      if (!audioRef.current.paused) {
        if (!analyserRef.current || !dataArrayRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / dataArrayRef.current.length) * 3;
        let barHeight;
        let x = -80;
        let prevX = 0;
        let prevY = canvas.height / 2;

        dataArrayRef.current.forEach((item) => {
          barHeight = item / 3 + canvas.height / 4;

          canvasCtx.beginPath();
          canvasCtx.moveTo(prevX, prevY);
          canvasCtx.bezierCurveTo(prevX, prevY, prevX, prevY, x, barHeight);
          canvasCtx.strokeStyle = "#fff";
          canvasCtx.stroke();

          prevX = x;
          prevY = barHeight;
          x += barWidth + 1;
        });
      }

      frame1.current = requestAnimationFrame(animateAudio);
    };

    frame1.current = requestAnimationFrame(animateAudio);

    return () => {
      cancelAnimationFrame(frame1.current);
    };
  }, [currentAudioSrc]);

  return (
    <Canvas ref={canvasRef} />
  );
};

export default AudioVisualizer;
