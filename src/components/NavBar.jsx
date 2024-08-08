import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "@/redux/states/userActions";
import { authUser } from "@/redux/states/userSlice";
import { googleLogout } from "@react-oauth/google";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import Toogle from "@/components/ui/Toogle";

import { GiHamburgerMenu } from "react-icons/gi";
import logo from "@/assets/imgs/head.png";
import styles from "./NavBar.module.css";

const NavBar = ({ isDark, setIsDark }) => {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const handleChange = () => {
    setIsDark(!isDark);
  };

  const afterLogout = () => {
    toast("Haz cerrado sesión correctamente");
    dispatch(authUser(false));
  };

  const handleSignout = () => {
    if (user["google_id"]) {
      googleLogout();
    }

    setShowMenu(false);

    dispatch(signout(afterLogout));
  };

  return (
    <>
      <nav className={styles.container}>
        <div className={styles["nav-bar-left"]}>
          <Link onClick={() => setShowMenu(false)} to="/">
            <img src={logo} alt="" />
          </Link>
          <Link onClick={() => setShowMenu(false)} to="/">
            <p>Visitante sonoro</p>
          </Link>
        </div>
        <div className={styles["nav-bar-center"]}>
          <FaSearch size={18} color="#fff" />
          <input type="text" placeholder="Search..." />
        </div>
        <div className={styles["nav-bar-right"]}>
          <div className={styles.auth}>
            {!user && <Link to="auth">Iniciar Sesión</Link>}
            {user && (
              <Link to="/profile">
                {user?.profile_picture || user?.google_picture ? (
                  <img
                    src={user?.profile_picture || user?.google_picture}
                    alt="User profile"
                  />
                ) : (
                  <FaUser />
                )}
              </Link>
            )}
          </div>
          <div className={styles.dark}>
            <Toogle isDark={{ isDark }} handleChange={handleChange} />
          </div>
          <div className={styles.hamburguer}>
            <GiHamburgerMenu
              onClick={() => setShowMenu(!showMenu)}
              size={30}
              color="var(--menu-color)"
            />
          </div>
        </div>
        {showMenu && (
          <div className={styles.menu}>
            <Link onClick={() => setShowMenu(false)} to="/catalogo">
              Catalogo
            </Link>
            <Link onClick={() => setShowMenu(false)} to="/perfiles">
              Perfiles
            </Link>
            <Link onClick={() => setShowMenu(false)} to="/mapa">
              Mapa
            </Link>
            <Link onClick={() => setShowMenu(false)} to="/chat">
              Chat
            </Link>
            {user && (
              <>
                <hr />
                <Link onClick={handleSignout} to="/">
                  Cerrar Sesión
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
