import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { useUserStore } from "@/stores/useUserStore";
import { useAudioPlayerStore } from "@/stores/useAudioPlayerStore";
import { ToastContainer } from "react-toastify";
import useAuth from "@/hooks/useAuth";

import NavBar from "@/components/NavBar";
import IntroPage from "@/pages/IntroPage";
import HomePage from "./pages/HomePage";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const preference = window.matchMedia("(prefers-color-scheme:dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  const firstClick = useUserStore((state) => state.firstClick);
  const setFirstClick = useUserStore((state) => state.setFirstClick);
  const isAuthorized = useUserStore((state) => state.isAuthorized);
  const getUserInfo = useUserStore((state) => state.getUserInfo);
  const changeMode = useAudioPlayerStore((state) => state.changeMode);

  useAuth();

  useEffect(() => {
    if (isAuthorized) {
      getUserInfo();
    }
  }, [isAuthorized, getUserInfo]);

  useEffect(() => {
    changeMode(isDark);
  }, [isDark, changeMode]);

  const handleFirstClick = () => {
    setFirstClick(true);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
