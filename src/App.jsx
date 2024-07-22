import { useEffect, useLayoutEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { changeMode } from "./redux/states/audioPlayerSlice";
import { autoSignin } from "./redux/states/userSlice";

import NavBar from "@/components/NavBar";
import IntroPage from "@/pages/IntroPage";
import HomePage from "./pages/HomePage";

import "./App.css";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const preference = window.matchMedia("(prefers-color-scheme:dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const [firstClick, setFirstClick] = useState(false);
  const token = localStorage.getItem("token");


  if (token) {
    dispatch(autoSignin());
  }

  useLayoutEffect(()=>{
    
  })

  useEffect(() => {    
    dispatch(changeMode(isDark));
  }, [isDark]);

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
