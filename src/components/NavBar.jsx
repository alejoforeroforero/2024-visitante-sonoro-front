import { Link } from "react-router-dom";

import Toogle from "@/components/ui/Toogle";

const NavBar = ({ isDark, setIsDark }) => {
  return (
    <>
      <nav>
        <div>
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
        </div>
        <div>
          <Toogle isCheked={isDark} handleChange={() => setIsDark(!isDark)} />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
