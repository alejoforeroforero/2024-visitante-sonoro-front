import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import ProfileImageUpload from "@/components/user/ProfileImageUpload";

import styles from "./UserProfile.module.css";

const UserProfile = ({ user }) => {
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

  return (
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
        <h3>{user?.bio}</h3>
        <p>{user?.birth_date}</p>
        {/* <p>{user?.email}</p> */}
        {/* <p>{user?.address}</p> */}
        {/* <p>{user?.phone_number}</p> */}
      </div>
    </div>
  );
};

export default UserProfile;
