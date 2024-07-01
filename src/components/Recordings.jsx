import Record from "./Record";
const Recordings = ({ list }) => {  
  return (
    <div className="box-conatiner">
      {list.length > 0 ? (
        list.map((record) => {
          return <Record key={record.id} record={record} />;
        })
      ) : (
        <p>No hay grbaciones disponibles</p>
      )}
    </div>
  );
};

export default Recordings;
