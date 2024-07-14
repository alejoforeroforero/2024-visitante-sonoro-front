import video from "@/assets/videos/0.mp4";
import styles from "./Trailer.module.css";

const textoDescEs =
  "Visitante Sonoro®  es una red social de audios capturados por artistas locales con tecnología binaural, \
  emitidos desde el campo colombiano. Constituye a su vez un archivo web, disponible a través de un servicio \
  de suscripción cuyo objetivo principal es redistribuir la totalidad de los ingresos y ofrecer así una alternativa \
  justa de sustento para sus creadores.";

const Trailer = () => {
  return (
    <div className={`${styles.container} section-vh`}>
      <div className={styles.left}>
        <p>{textoDescEs}</p>
      </div>
      <div className={styles.right}>
        <video autoPlay={true} volume={0} loop={true} src={video}></video>
      </div>
    </div>
  );
};

export default Trailer;
