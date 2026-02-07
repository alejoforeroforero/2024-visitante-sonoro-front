import { useUserStore } from "@/stores/useUserStore";
import useErrorHandler from "@/hooks/useErrorHandler";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import styles from "./Favorite.module.css";

const Favorite = ({ user, recordId }) => {
  const { errorAction } = useErrorHandler();
  const saveFavorite = useUserStore((state) => state.saveFavorite);
  const deleteFavorite = useUserStore((state) => state.deleteFavorite);
  const getUserInfo = useUserStore((state) => state.getUserInfo);

  if (!user) return null;

  const checkFavorite = (id) => {
    if (user) {
      const isIdInArray = user["favorite_records"]?.some(
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
        errorAction(res.message, '/auth');
      } else {
        toast("Se ha añadido a tus favoritos");
        getUserInfo();
      }
    };

    saveFavorite(recordId, afterSave);
  };

  const handleDeleteFavorite = () => {
    const afterDelete = (error, res) => {
      if (error) {
        errorAction(res.message, '/auth');
      } else {
        toast("Se ha eliminado de favoritos");
        getUserInfo();
      }
    };

    deleteFavorite(recordId, afterDelete);
  };

  return (
    <FaHeart
      onClick={checkFavorite(recordId) ? handleDeleteFavorite : handleSaveFavorite}
      className={styles['favorite']}
      color={checkFavorite(recordId) ? "#ef6161" : ''}
    />
  );
};

export default Favorite;
