import styles from "./DemoImage.module.css";

const DemoImage = ({ src, alt = "" }) => {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.image} />
      <span className={styles.badge}>DEMO</span>
    </div>
  );
};

export default DemoImage;
