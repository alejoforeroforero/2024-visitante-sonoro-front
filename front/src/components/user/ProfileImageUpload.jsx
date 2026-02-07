import { useState, useRef } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-toastify";
import useErrorHandler from "@/hooks/useErrorHandler";

const ProfileImageUpload = () => {
  const status = useUserStore((state) => state.status);
  const error = useUserStore((state) => state.error);
  const uploadProfileImage = useUserStore((state) => state.uploadProfileImage);
  const getUserInfo = useUserStore((state) => state.getUserInfo);

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const { errorAction } = useErrorHandler();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const afterSubmit = (error, res) => {
      if (error) {
        errorAction(res.message, "/auth");
      } else {
        toast(res.message);
        setTimeout(() => {
          getUserInfo();
        }, 1000);
      }
    };

    if (file) {
      uploadProfileImage(file, afterSubmit);
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
