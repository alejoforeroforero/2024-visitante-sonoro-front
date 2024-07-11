import Record from "./Record";

import styles from "./Recordings.module.css";

const Recordings = ({ list }) => {

  return (
    <div className={styles.recordsInnerContainer}>
      {list?.length > 0 ? (
        list.map((record) => {
          return <Record key={record.id} record={record} />;
        })
      ) : (
        <p>No hay grabaciones disponibles</p>
      )}
    </div>
  );
};

export default Recordings;
