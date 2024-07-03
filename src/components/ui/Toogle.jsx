import styles from "./Toogle.module.css";

const Toogle = ({ handleChange, isCheked }) => {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        name="check"
        id="check"
        className={styles.toogle}
        onChange={handleChange}
        checked={isCheked}
      />
      <label htmlFor="check"></label>
    </div>
  );
};

export default Toogle;
