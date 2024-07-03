import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Toogle from "@/components/ui/Toogle";

import logo from "@/assets/imgs/head.png";
import styles from "./NavBar.module.css";

const NavBar = ({ isDark, setIsDark }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
          <p>Visitante sonoro</p>
        </div>
        <div className={styles.dark}>
          <Toogle isCheked={isDark} handleChange={() => setIsDark(!isDark)} />
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
            <Link onClick={() => setShowMenu(false)} to="/">
              Inicio
            </Link>
            <Link onClick={() => setShowMenu(false)} to="/recordings">
              Catalogo
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
