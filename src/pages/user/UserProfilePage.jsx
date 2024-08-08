import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import ProfileImageUpload from "@/components/user/ProfileImageUpload";
import styles from "./UserProfilePage.module.css";
import { getUserInfo } from "@/redux/states/userActions";
import Record from "@/components/Record";

const UserProfilePage = () => {
  const user = useSelector((state) => state.user.data);

  console.log(user);

  const dispatch = useDispatch();

  const FormattedDate = ({ dateString }) => {
    const formatDate = (dateString) => {
      const options = {
        year: "numeric",
        month: "long",
      };

      return new Date(dateString).toLocaleDateString("es-ES", options);
    };

    return <p>En Visitante sonoro desde {formatDate(dateString)}</p>;
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className={styles["user"]}>
      <div className={styles["user-info"]}>
        <div className={styles["user-info-img"]}>
          <div>
            {user?.profile_picture || user?.google_picture ? (
              <img
                src={user?.profile_picture || user?.google_picture}
                alt="User profile"
              />
            ) : (
              <FaUser />
            )}
            <ProfileImageUpload />
          </div>
        </div>
        <div className={styles["user-info-info"]}>
          <h2>
            {user?.first_name} {user?.last_name}{" "}
            <Link to="/edit-profile">
              <FaPencilAlt />
            </Link>
          </h2>
          {user?.date_joined && <FormattedDate dateString={user.date_joined} />}
          {/* <p>{user?.email}</p> */}
          <h3>{user?.bio}</h3>
          {/* <p>{user?.address}</p> */}
          {/* <p>{user?.phone_number}</p> */}
          <p>{user?.birth_date}</p>
        </div>
      </div>

      <div className={styles["user-fav-title"]}>
        <h2>Grabaciones favoritas</h2>
      </div>

      <div className={styles["user-recordings"]}>
        {user?.favorite_records &&
          user.favorite_records.map((record) => {
            return <Record key={record.id} record={record} />;
          })}
      </div>
    </div>
  );
};

export default UserProfilePage;
