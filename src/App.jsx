import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeMode } from "./redux/states/audioPlayerSlice";
import { setFirstClick } from "./redux/states/userSlice";
import { getUserInfo } from "./redux/states/userActions";
import { ToastContainer } from "react-toastify";

import useAuth from "@/hooks/useAuth";

import NavBar from "@/components/NavBar";
import IntroPage from "@/pages/IntroPage";
import HomePage from "./pages/HomePage";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const dispatch = useDispatch();

  const preference = window.matchMedia("(prefers-color-scheme:dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const firstClick = useSelector((state) => state.user.firstClick);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  useAuth();

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getUserInfo());
    }
  }, [isAuthorized]);

  useEffect(() => {
    dispatch(changeMode(isDark));
  }, [isDark]);

  const handleFirstClick = () => {
    dispatch(setFirstClick(true));
  };

  return (
    <>
      <ToastContainer />
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
