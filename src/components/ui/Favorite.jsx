import { useDispatch } from "react-redux";
import { getUserInfo, saveFavorite, deleteFavorite } from "@/redux/states/userActions";
import useErrorHandler from "@/hooks/useErrorHandler";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import styles from "./Favorite.module.css";

const Favorite = ({ user, recordId }) => {
  const dispatch = useDispatch();
  const { errorAction } = useErrorHandler();

  if (!user) return null;

  const checkFavorite = (id) => {
    if (user) {
      const isIdInArray = user["favorite_records"].some(
        (item) => item.id === id
      );

      return isIdInArray;
    } else {
      return false;
    }
  };

  const handleSaveFavorite = () => {
    const afterSave = (error, res) => {
      if (error) {
        errorAction();
      } else {
        toast("Se ha añadido a tus favoritos");
        dispatch(getUserInfo());
      }
    };

    const data = {
      record_id: recordId,
    };

    const dataObj = {
      data,
      callback: afterSave,
    };

    dispatch(saveFavorite(dataObj));
  };

  const handleDeleteFavorite = () => {
    const afterDelete = (error, res) => {
      if (error) {
        errorAction();
      } else {
        toast("Se ha eliminado de favoritos");
        dispatch(getUserInfo());
      }
    };

    const data = {
      record_id: recordId,
    };

    const dataObj = {
      data,
      callback: afterDelete,
    };

    dispatch(deleteFavorite(dataObj));
  };

  return (
    <FaHeart
      onClick={checkFavorite(recordId) ? handleDeleteFavorite : handleSaveFavorite}
      className= {styles['favorite']}
      color={checkFavorite(recordId) ? "#ef6161" : ''}
    />
  );
};

export default Favorite;
