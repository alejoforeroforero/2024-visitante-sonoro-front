import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "@/redux/states/userActions";
import Record from "@/components/Record";
import UserProfile from "@/components/user/UserProfile";

import styles from "./UserProfilePage.module.css";

const UserProfilePage = () => {
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className={styles["user"]}>
      <UserProfile user={user} />

      <div className={styles["user-fav-title"]}>
        <h2>Grabaciones favoritas</h2>
      </div>

      <div className={styles["user-recordings"]}>
        {user?.favorite_records && user.favorite_records.length > 0 ? (
          user.favorite_records.map((record) => (
            <Record key={record.id} record={record} />
          ))
        ) : (
          <h3>No tienes grabaciones marcadas como favoritas</h3>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
