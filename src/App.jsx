import { useState } from "react";
import useLocalStorage from "use-local-storage";

import IntroPage from "@/pages/IntroPage";
import NavBar from "@/components/NavBar";
import AudioVisualizer from "@/components/AudioVisualizer";

const audioSrc = "http://127.0.0.1:8000/media/audio/Dominguito_toma_2.mp3";

import "./App.css";

function App() {
  const preference = window.matchMedia("(prefers-color-scheme:dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const [firstClick, setFirstClick] = useState(false);

  const handleFirstClick = () => {
    setFirstClick(true);
  };

  return (
    <>
      {!firstClick && <IntroPage handleFirstClick={handleFirstClick} />}
      {firstClick && (
        <div className="App" data-theme={isDark ? "dark" : "light"}>
          <NavBar isDark={isDark} setIsDark={setIsDark} />
          <AudioVisualizer src={audioSrc} />
        </div>
      )}
    </>
  );
}

export default App;
