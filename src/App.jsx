import { useState } from "react";
import useLocalStorage from "use-local-storage";

import NavBar from "@/components/NavBar";
import IntroPage from "@/pages/IntroPage";
import HomePage from "./pages/HomePage";

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
          <HomePage />         
        </div>
      )}
    </>
  );
}

export default App;
