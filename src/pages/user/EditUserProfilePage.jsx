import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import UserUpdateForm from "@/components/user/UserUpdateForm";
import { errorMessage } from "@/redux/states/userActions";

const EditUserProfilePage = () => {
  const { data, isAuthorized } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useAuth();

  useEffect(() => {
    if (!isAuthorized) {
      toast(errorMessage);

      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    }
  }, [isAuthorized]);

  return (
    <div>
      {data && <UserUpdateForm />}
      {!data && <p>No tienes permisos</p>}
    </div>
  );
};

export default EditUserProfilePage;
