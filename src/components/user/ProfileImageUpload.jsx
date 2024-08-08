import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, uploadProfileImage } from "@/redux/states/userActions";

const ProfileImageUpload = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const afterSubmit = () => {
    dispatch(getUserInfo());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const data = {
        file,
        callback: afterSubmit,
      };
      dispatch(uploadProfileImage(data));
      setFile(null);
    }
  };

  const handleTextClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="update-profile-img">
      <p onClick={handleTextClick}>Cambiar Foto de perfil</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        {file && (
          <button type="submit" disabled={!file || status === "loading"}>
            {status === "loading" ? "Uploading..." : "Upload"}
          </button>
        )}
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ProfileImageUpload;
