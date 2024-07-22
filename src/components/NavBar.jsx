import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "@/redux/states/userActions";
import Toogle from "@/components/ui/Toogle";

import { GiHamburgerMenu } from "react-icons/gi";
import logo from "@/assets/imgs/head.png";
import styles from "./NavBar.module.css";

const NavBar = ({ isDark, setIsDark }) => {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleChange = () => {
    setIsDark(!isDark);
  };

  const handleSignout = () => {
    dispatch(signout(user.token));
  };

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.logo}>
          <Link onClick={() => setShowMenu(false)} to="/">
            <img src={logo} alt="" />
          </Link>
          <Link onClick={() => setShowMenu(false)} to="/">
            <p>Visitante sonoro</p>
          </Link>
        </div>
        <div className={styles.dark}>
          <div className={styles.auth}>
            {!user.token && (
              <>
                <Link to="auth">Sign up</Link>
                <Link to="auth">Sign in</Link>
              </>
            )}
            {user.token && <p onClick={handleSignout}>Log out</p>}
          </div>
          <Toogle isDark={{ isDark }} handleChange={handleChange} />
        </div>
        <div className={styles.hamburguer}>
          <GiHamburgerMenu
            onClick={() => setShowMenu(!showMenu)}
            size={30}
            color="var(--menu-color)"
          />
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
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
