import styles from "./IntroPage.module.css";

import head from "@/assets/imgs/head.png";
import headPhones from "@/assets/imgs/headphones.png";

const IntroPage = ({ handleFirstClick }) => {
  return (
    <div className={styles.intro}>
      <div className={styles.head}>
        <img src={head} alt="" onClick={handleFirstClick} />
      </div>
      <div className={styles.title}>
        <h1 onClick={handleFirstClick}>VISITANTE SONORO</h1>
      </div>
      <div className={styles.instructions}>
        <img src={headPhones} alt="" />
        <p>Conecta tus audifonos para una mejor experiencia</p>
      </div>
      <div className={styles.demoBanner}>
        <span className={styles.demoBadge}>DEMO</span>
        <p>
          Este es un demo con datos de ejemplo. Proyecto desarrollado como FullStack Developer
          en Nova Et Vetera (2023-2024) — prototipo de API para preservar y compartir los
          paisajes sonoros rurales de Colombia.
        </p>
      </div>
    </div>
  );
};

export default IntroPage;
