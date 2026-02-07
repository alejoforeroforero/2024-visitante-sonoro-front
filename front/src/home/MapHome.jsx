import mapa from "@/assets/imgs/mapa.jpg";
import { Link } from "react-router-dom";
import styles from "./MapHome.module.css";

const MapHome = () => {
  return (
    <div className={styles.container}>
      <h1>Explora nuestro catálogo desde el mapa interactivo</h1>
      <div>
        <Link to={`/mapa`}>
          <img src={mapa} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default MapHome;
