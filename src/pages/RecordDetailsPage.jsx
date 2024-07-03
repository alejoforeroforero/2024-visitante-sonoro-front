import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecordDetails } from "@/redux/states/recordingsActions";
import RecordDetails from "@/components/RecordDetails";

const RecordDetailsPage = () => {
  const { recordId } = useParams();
  const recordDetails = useSelector((state) => state.recordings.recordDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecordDetails(recordId));
  }, []);

  return (
    <div className="box-conatiner">
      <RecordDetails recordDetails={recordDetails}/>
    </div>
  );
};

export default RecordDetailsPage;
