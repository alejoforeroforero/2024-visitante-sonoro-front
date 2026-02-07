import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Record from "@/components/Record";
import UserProfile from "@/components/user/UserProfile";

import styles from "./UserProfilePage.module.css";

const UserProfilePage = () => {
  const user = useUserStore((state) => state.data);
  const getUserInfo = useUserStore((state) => state.getUserInfo);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <div className={styles["user"]}>
      <UserProfile user={user} />

      <div className={styles["user-fav-title"]}>
        <h2>Grabaciones favoritas</h2>
      </div>

      <div className={styles["user-recordings"]}>
        {user?.favorite_records && user.favorite_records.length > 0 ? (
          user.favorite_records.map((record) => (
            <Record key={record._id} record={record} />
          ))
        ) : (
          <h3>No tienes grabaciones marcadas como favoritas</h3>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
